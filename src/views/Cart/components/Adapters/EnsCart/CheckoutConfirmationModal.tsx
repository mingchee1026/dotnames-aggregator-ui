import { DomainInterFace } from "@/types/domain";
import { useEffect, useMemo, useRef, useState } from "react";
import CartRow from "../../CartRow";
import {
  DAY_TO_SEC,
  ENS_COMMITMENT_SECRET,
  EXPLORER_URL,
  TLD_TO_PLATFORM_DETAILS,
  YEAR_TO_SEC,
} from "@/configs/constants";
import { formatWrapedText, getDomainWitoutTld } from "@/utils";
import { useWallet } from "multichain-walletkit-sdk-react";
import { useAppSelector } from "@/redux/store";
import { useBulkRegisterContract } from "@/hooks/Ens/useContracts";
import { EVMWallet } from "@/utils/evm";
import { useDispatch } from "react-redux";
import {
  useBatchDomainCommitmentsCreate,
  useBatchDomainCommitmentsData,
} from "@/hooks/Ens/useBatchDomainCommitments";
import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import {
  ENS_CHAIN_ID,
  ENS_DOMAIN_URL,
  ENS_EXPLORER_URL,
  ENS_PLATFORM_URL,
  ENS_REDUX_GRP_KEY,
} from "./config";
import Countdown from "react-countdown";
import BigNumber from "bignumber.js";
import { cartSlice } from "@/redux/slices/cartSlice";
import { ethers } from "ethers";
import { Toaster, toast } from "react-hot-toast";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { motion, useScroll, useSpring } from "framer-motion";
import { now } from "lodash";
import Link from "next/link";

const ONE_MINUTE_DIFF = 86340000;
const WAIT_TIME_IN_MINUTE = 1;
function CheckoutConfirmationModal() {
  const [commitWaitTimerIsOver, setCommitWaitTimerIsOver] = useState(false);

  const account = useAppSelector((state) => state.login.account);

  const wallet = useWallet();
  const signer = (wallet as EVMWallet)?.getSigner();
  const dispatch = useDispatch();
  const [commitmentTxn, setCommitmentTxn] = useState({
    isPending: false,
    hash: null,
    isFailed: false,
    reason: null,
    isSuccess: false,
    isSubmitted: false,
  });
  const [bulkRegisterTxn, setBulkRegisterTxn] = useState({
    isPending: false,
    hash: null,
    isFailed: false,
    reason: null,
    isSuccess: false,
    isSubmitted: false,
  });
  const [registeredDomains, setregisteredDomains] = useState([]);
  const checkoutList = useAppSelector(
    // @ts-ignore
    (s) => s.checkout.checkoutGroupWithPrice[ENS_REDUX_GRP_KEY]
  );

  const checkoutListWithCommitments = useBatchDomainCommitmentsCreate(
    checkoutList,
    account!,
    ENS_CHAIN_ID
  );
  const {
    data: checkoutListWithCommitmentsValidity,
    refetch: refetchCheckoutListWithCommitmentsValidity,
  } = useBatchDomainCommitmentsData(
    checkoutListWithCommitments,
    account!,
    ENS_CHAIN_ID
  );

  const bulkRegisterContract = useBulkRegisterContract({ signer });

  // @ts-ignore
  const platformData = TLD_TO_PLATFORM_DETAILS["eth"];
  const bulkCommitRequired = async () => {
    const tid = toast.loading("Pending Txn");
    if (wallet?.network?.chainId !== ENS_CHAIN_ID) {
      toast.error(
        <div>
          <p>Wrong Network</p>
        </div>,
        {
          id: tid,
        }
      );
      return;
    }
    setCommitmentTxn((prev) => {
      return {
        ...prev,
        isPending: true,
      };
    });
    // Bulk commit only domains with less than 6 hrs validity

    const commits = checkoutListWithCommitmentsValidity
      ?.map((domain: DomainInterFace) => {
        if (
          domain?.commitmentValidity! * 1000 <= new Date()?.getTime() &&
          domain?.commitment
        ) {
          return domain?.commitment;
        }
        return null;
      })
      ?.filter((v: any) => v);

    try {
      const tx = await bulkRegisterContract?.functions?.bulkCommit(commits);
      console.log(`🚀 ~ tx:`, tx);
      if (tx) {
        toast.loading(
          <div>
            <p>Transaction Submitted</p>
            <p>
              {" "}
              <a
                className="text-secondary text-xs"
                target="_blank"
                href={`${ENS_EXPLORER_URL}/tx/${tx?.hash}`}
              >
                View On Explorer
              </a>
            </p>
          </div>,
          {
            id: tid,
          }
        );
        setCommitmentTxn((prev) => {
          return {
            ...prev,
            hash: tx?.hash,
            isSubmitted: true,
          };
        });
        const receipt = await tx?.wait();
        if (receipt) {
          toast.success(
            <div>
              <p>Transaction success</p>
              <p>
                {" "}
                <a
                  className="text-secondary  text-xs"
                  target="_blank"
                  href={`${ENS_EXPLORER_URL}/tx/${tx?.hash}`}
                >
                  View On Explorer
                </a>
              </p>
            </div>,
            {
              id: tid,
            }
          );
          console.log(
            `🚀 ~ file: CheckoutConfirmationModal.tsx:86 ~ receipt:`,
            receipt
          );
          await refetchCheckoutListWithCommitmentsValidity();
          await setCommitWaitTimerIsOver(false);

          await setCommitmentTxn((prev) => {
            return {
              ...prev,
              hash: tx?.hash,
              isSuccess: true,
              isPending: false,
            };
          });
        } else {
          toast.error(
            <div>
              <p>Transaction Failed</p>
              <p>
                {" "}
                <a
                  className="text-secondary  text-xs"
                  target="_blank"
                  href={`${ENS_EXPLORER_URL}/tx/${tx?.hash}`}
                >
                  View On Explorer
                </a>
              </p>
            </div>,
            {
              id: tid,
            }
          );
          setCommitmentTxn((prev: any) => {
            return {
              ...prev,
              hash: tx?.hash,
              isSuccess: false,
              isFailed: true,
              reason: "Something went wrong",
              isPending: false,
            };
          });
        }
      } else {
        toast.error(
          <div>
            <p>Transaction Failed</p>
            <p>
              {" "}
              <a
                className="text-secondary text-xs"
                target="_blank"
                href={`${ENS_EXPLORER_URL}/tx/${tx?.hash}`}
              >
                View On Explorer
              </a>
            </p>
          </div>,
          {
            id: tid,
          }
        );
        setCommitmentTxn((prev: any) => {
          return {
            ...prev,
            hash: tx?.hash,
            isSuccess: false,
            isFailed: true,
            reason: "Something went wrong",
            isPending: false,
          };
        });
      }
    } catch (error) {
      toast.error(
        <div>
          <p>Transaction Failed</p>
        </div>,
        {
          id: tid,
        }
      );
      setCommitmentTxn((prev) => {
        return {
          ...prev,
          isSuccess: false,
          isFailed: true,
          // @ts-ignore
          reason: error?.message,
          isPending: false,
        };
      });

      console.log(
        `🚀 ~ file: CheckoutConfirmationModal.tsx:75 ~ error:`,
        error
      );
    }
  };
  const [subTotal] = useMemo(() => {
    let sum = 0;
    let isLoading;
    for (
      let index = 0;
      index < checkoutListWithCommitmentsValidity?.length;
      index++
    ) {
      const element = checkoutListWithCommitmentsValidity[index];
      if (element?.isLoading) {
        isLoading = element?.isLoading;
      }

      sum += Number(element?.fullPrice) || 0;
    }
    // const sum = checkoutList?.reduce((a, b) => {
    //   return Number(a) + Number(b?.fullPrice) || 0;
    // }, 0);
    return [sum, isLoading];
  }, [checkoutListWithCommitmentsValidity]);
  const bulkRegister = async () => {
    const tid = toast.loading("Pending Txn");
    if (wallet?.network?.chainId !== ENS_CHAIN_ID) {
      toast.error(
        <div>
          <p>Wrong Network</p>
        </div>,
        {
          id: tid,
        }
      );
      return;
    }
    setBulkRegisterTxn((prev) => {
      return {
        ...prev,
        isPending: true,
      };
    });

    const duration =
      // @ts-ignore
      (checkoutListWithCommitmentsValidity[0] as DomainInterFace)?.years *
      YEAR_TO_SEC;
    const names = checkoutListWithCommitmentsValidity?.map(
      (d: DomainInterFace) => getDomainWitoutTld(d?.name)
    );

    try {
      const tx = await bulkRegisterContract.functions.bulkRegister(
        names,
        account,
        duration,
        ENS_COMMITMENT_SECRET,
        {
          value: ethers.utils.parseEther(subTotal?.toString()),
        }
      );
      if (tx) {
        toast.loading(
          <div>
            <p>Transaction Submitted</p>
            <p>
              {" "}
              <a
                className="text-secondary text-xs"
                target="_blank"
                href={`${ENS_EXPLORER_URL}/tx/${tx?.hash}`}
              >
                View On Explorer
              </a>
            </p>
          </div>,
          {
            id: tid,
          }
        );
        setBulkRegisterTxn((prev) => {
          return {
            ...prev,
            hash: tx?.hash,
            isSubmitted: true,
          };
        });
        const receipt = await tx?.wait();
        if (receipt) {
          toast.success(
            <div>
              <p>Transaction success</p>
              <p>
                {" "}
                <a
                  className="text-secondary text-xs"
                  target="_blank"
                  href={`${ENS_EXPLORER_URL}/tx/${tx?.hash}`}
                >
                  View On Explorer
                </a>
              </p>
            </div>,
            {
              id: tid,
            }
          );
          await setBulkRegisterTxn((prev) => {
            return {
              ...prev,
              hash: tx?.hash,
              isSuccess: true,
              isPending: false,
            };
          });
          console.log(
            `🚀 ~ file: CheckoutConfirmationModal.tsx:151 ~ receipt:`,
            receipt
          );
          // @ts-ignore
          await setregisteredDomains(() => {
            const tempChList = [...checkoutListWithCommitmentsValidity];
            for (
              let index = 0;
              index < checkoutListWithCommitmentsValidity.length;
              index++
            ) {
              const element = checkoutListWithCommitmentsValidity[index];

              dispatch(cartSlice?.actions?.removeFromCartByName(element?.name));
            }
            return tempChList;
          });
        } else {
          toast.error(
            <div>
              <p>Transaction Failed</p>
              <p>
                {" "}
                <a
                  className="text-secondary text-xs"
                  target="_blank"
                  href={`${ENS_EXPLORER_URL}/tx/${tx?.hash}`}
                >
                  View On Explorer
                </a>
              </p>
            </div>,
            {
              id: tid,
            }
          );
          setBulkRegisterTxn((prev: any) => {
            return {
              ...prev,
              hash: tx?.hash,
              isSuccess: false,
              isFailed: true,
              reason: "Something went wrong",
              isPending: false,
            };
          });
        }
      } else {
        toast.error(
          <div>
            <p>Transaction Failed</p>
          </div>,
          {
            id: tid,
          }
        );
        setBulkRegisterTxn((prev: any) => {
          return {
            ...prev,
            hash: tx?.hash,
            isSuccess: false,
            isFailed: true,
            reason: "Something went wrong",
            isPending: false,
          };
        });
      }
    } catch (error) {
      toast.error(
        <div>
          <p>Transaction Failed</p>
        </div>,
        {
          id: tid,
        }
      );
      setBulkRegisterTxn((prev: any) => {
        return {
          ...prev,
          isSuccess: false,
          isFailed: true,
          // @ts-ignore
          reason: error?.message,
          isPending: false,
        };
      });
      console.log(
        `🚀 ~ file: CheckoutConfirmationModal.tsx:430 ~ error:`,
        error
      );
    }
  };

  const isCommitRequired = useMemo(() => {
    const found = checkoutListWithCommitmentsValidity?.find(
      (domain: DomainInterFace) => {
        if (
          !domain?.isLoading &&
          (domain?.commitmentValidity as number) * 1000 <= new Date()?.getTime()
        ) {
          return domain;
        }
      }
    );
    return found;
  }, [checkoutListWithCommitmentsValidity]);
  const [isCommitmentOnWait, maxCommitment] = useMemo(() => {
    let maxCommit = 0;
    const found = checkoutListWithCommitmentsValidity?.find(
      (domain: DomainInterFace) => {
        if (maxCommit < (domain?.commitmentValidity as number) * 1000) {
          maxCommit = (domain?.commitmentValidity as number) * 1000;
        }

        if (
          !commitWaitTimerIsOver &&
          !domain?.isLoading &&
          (domain?.commitmentValidity as number) * 1000 -
            new Date()?.getTime() >=
            ONE_MINUTE_DIFF
        ) {
          return domain;
        }
      }
    );
    return [found, maxCommit];
  }, [checkoutListWithCommitmentsValidity, commitWaitTimerIsOver]);

  return (
    <>
      <button
        className="py-3 px-5 relative   bg-primary z-10 text-white text-xs rounded-3xl w-full"
        type="button"
        onClick={() => {
          (
            document.getElementById(
              "ens_checkout_confirmation_modal"
            ) as HTMLDialogElement
          ).showModal();
          setCommitmentTxn({
            isPending: false,
            hash: null,
            isFailed: false,
            reason: null,
            isSuccess: false,
            isSubmitted: false,
          });
          setBulkRegisterTxn({
            isPending: false,
            hash: null,
            isFailed: false,
            reason: null,
            isSuccess: false,
            isSubmitted: false,
          });
        }}
      >
        Proceed
      </button>
      <dialog
        id="ens_checkout_confirmation_modal"
        className="modal backdrop-blur"
      >
        <Toaster
          toastOptions={{
            style: {
              zIndex: "99999",
            },
          }}
        />
        <div className="modal-box p-5">
          <div>
            <div className="flex justify-between ">
              <h3 className="font-bold text-lg">Confirm Details</h3>
              <button
                className="btn btn-xs btn-square btn-ghost"
                onClick={() => {
                  (
                    document?.getElementById(
                      "ens_checkout_confirmation_modal"
                    ) as HTMLDialogElement
                  ).close();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
            {(bulkRegisterTxn?.isPending || commitmentTxn?.isPending) && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center my-5"
              >
                {" "}
                <span className="loading loading-ring w-[10em] bg-primary"></span>
                <p> Pending Txn</p>
              </motion.div>
            )}
            {!bulkRegisterTxn?.isPending && !commitmentTxn?.isPending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="overflow-hidden mt-5 space-y-2">
                  {bulkRegisterTxn?.isSuccess &&
                    bulkRegisterTxn?.hash &&
                    registeredDomains?.map((d: DomainInterFace) => {
                      if (!d) {
                        return <></>;
                      }
                      const {
                        name,
                        status,
                        address,
                        canRegister,
                        platform,
                        isLoading,
                        index,
                        fullPrice,
                        years,
                      } = d;

                      return (
                        <div
                          className="p-3 flex w-full rounded-xl items-center  justify-between shadow-sm border border-gray-400/40 h-fit "
                          key={name}
                        >
                          <div className="flex gap-4 items-center">
                            <div className="border border-gray-400/30 w-fit p-3 rounded-[1em] bg-base-100">
                              <img
                                src={
                                  platformData?.icon ??
                                  "/images/platforms/ens.png"
                                }
                                alt=""
                                width={40}
                                height={40}
                              />
                            </div>

                            <div className="flex gap-4 items-center">
                              <div>
                                {isLoading ? (
                                  <p className="w-[60%] h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>
                                ) : (
                                  <div className="tooltip" data-tip={name}>
                                    <p className="text-xl font-[500]">
                                      {formatWrapedText(name, 10, 8)}
                                    </p>
                                  </div>
                                )}
                                <div>
                                  {isLoading ? (
                                    <p className="w-full h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>
                                  ) : (
                                    <p className="text-xs">
                                      Registered for {years}{" "}
                                      {years! > 1 ? "years" : "year"}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link
                            href={`${ENS_DOMAIN_URL}/${name}`}
                            className="btn btn-square btn-sm"
                            target="_blank"
                            referrerPolicy="no-referrer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M15 3h6v6" />
                              <path d="M10 14 21 3" />
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            </svg>
                          </Link>
                        </div>
                      );
                    })}
                  {checkoutListWithCommitmentsValidity?.length > 0 && (
                    <div className="w-full space-y-4 overflow-scroll">
                      {checkoutListWithCommitmentsValidity?.map(
                        (d: DomainInterFace) => {
                          if (!d) {
                            return <></>;
                          }
                          const {
                            name,
                            status,
                            address,
                            canRegister,
                            platform,
                            isLoading,
                            index,
                            tld,
                            price,
                            years,
                            fullPrice,
                            commitmentValidity,
                          } = d;
                          const parsedCommitmentValidity =
                            commitmentValidity! > 0
                              ? new Date(
                                  Number(commitmentValidity!) * 1000
                                ).getTime()
                              : 0;

                          return (
                            <div
                              className="p-3 flex w-full rounded-xl items-center  justify-between shadow-sm border border-gray-400/40 h-fit "
                              key={name}
                            >
                              <div className="flex gap-4 items-center">
                                <div className="border border-gray-400/30 w-fit p-3 rounded-[1em] bg-base-100">
                                  <img
                                    src={
                                      platformData?.icon ??
                                      "/images/platforms/ens.png"
                                    }
                                    alt=""
                                    width={40}
                                    height={40}
                                  />
                                </div>
                                <div className="flex gap-4 items-center">
                                  <div>
                                    {isLoading ? (
                                      <p className="w-[60%] h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>
                                    ) : (
                                      <div className="tooltip" data-tip={name}>
                                        <p className="text-xl font-[500]">
                                          {formatWrapedText(name, 10, 8)}
                                        </p>
                                      </div>
                                    )}
                                    <div>
                                      {isLoading ? (
                                        <p className="w-full h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>
                                      ) : (
                                        <p className="text-xs">
                                          {new BigNumber(fullPrice!)?.toFixed(
                                            4
                                          )}{" "}
                                          ${platformData?.coin?.symbol} for{" "}
                                          {years} years
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <ValidityCounter
                                  key={name}
                                  autoStart={parsedCommitmentValidity && true}
                                  date={parsedCommitmentValidity}
                                />

                                {(parsedCommitmentValidity as number) <=
                                  new Date()?.getTime() && (
                                  <div className="badge badge-warning text-xs">
                                    Commit Required
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}

                  <div className=" gap-4 my-5 space-y-3 w-full">
                    {isCommitRequired && (
                      <div className="space-y-3 w-full">
                        <div className="bg-warning/50 p-2 rounded-lg text-xs  flex items-center gap-2 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>

                          <span>
                            Some domains requied to be commited please commit
                            them using below button or remove them from cart.
                          </span>
                        </div>
                        <button
                          className="btn  btn-secondary bg-secondary text-white rounded-full w-full "
                          onClick={bulkCommitRequired}
                          disabled={
                            commitmentTxn?.isPending ||
                            checkoutListWithCommitmentsValidity?.length <= 0
                          }
                        >
                          {commitmentTxn?.isPending ? (
                            <>
                              <span className="loading loading-ring loading-sm"></span>
                              <span>Txn Pending</span>
                            </>
                          ) : (
                            <>Commit Required Domains</>
                          )}
                        </button>
                      </div>
                    )}
                    <ValidityProgressCounter
                      key={""}
                      autoStart={true}
                      now={() => new Date().getTime()}
                      onComplete={() => {}}
                      date={
                        maxCommitment -
                        ONE_MINUTE_DIFF +
                        60000 * WAIT_TIME_IN_MINUTE -
                        60000
                      }
                      renderer={({
                        hours,
                        minutes,
                        seconds,
                        completed,
                        ...other
                      }: any) => {
                        const maxSec = 60000 * WAIT_TIME_IN_MINUTE;
                        const percent = 100 - (other.total * 100) / maxSec;

                        if (other?.total > 0) {
                          setCommitWaitTimerIsOver(false);
                        }
                        if (completed && other?.total === 0) {
                          if (
                            other?.props?.date ===
                            maxCommitment -
                              ONE_MINUTE_DIFF +
                              60000 * WAIT_TIME_IN_MINUTE -
                              60000
                          ) {
                            setCommitWaitTimerIsOver(true);
                          }

                          // Render a completed state
                          return null;
                        } else {
                          // Render a countdown
                          return (
                            <div>
                              <div className="relative mb-5 h-6 rounded-full w-full bg-gray-200 animate-pulse ">
                                <motion.div
                                  className={`h-full skeleton  rounded-full bg-secondary `}
                                  style={{
                                    width: `${percent}%`,
                                  }}
                                >
                                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-black">
                                    <span className="countdown font-mono text-sm">
                                      {/* @ts-ignore */}
                                      <span style={{ "--value": hours }}></span>
                                      :
                                      <span
                                        //  @ts-ignore
                                        style={{ "--value": minutes }}
                                      ></span>
                                      :{/* @ts-ignore */}
                                      <span
                                        // @ts-ignore
                                        style={{ "--value": seconds }}
                                      ></span>
                                    </span>
                                  </span>
                                </motion.div>
                              </div>
                            </div>
                          );
                        }
                      }}
                    />{" "}
                    <div className="w-full space-y-2">
                      {!commitWaitTimerIsOver &&
                        isCommitmentOnWait &&
                        !isCommitRequired && (
                          <div className="space-y-3 w-full">
                            <div className="bg-warning/50 p-2 rounded-lg text-xs  flex items-center gap-2 ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                              </svg>

                              <span>
                                Please wait for a minute to get commitment valid
                              </span>
                            </div>
                          </div>
                        )}
                      {!isCommitRequired && (
                        <div className="w-full">
                          {!bulkRegisterTxn?.isSuccess && (
                            <button
                              className="btn btn-secondary text-white rounded-full w-full shadow-inner "
                              onClick={bulkRegister}
                              disabled={
                                bulkRegisterTxn?.isPending ||
                                // isCommitmentOnWait ||
                                !commitWaitTimerIsOver ||
                                checkoutListWithCommitmentsValidity?.length <= 0
                              }
                            >
                              {bulkRegisterTxn?.isPending ? (
                                <>
                                  <span className="loading loading-ring loading-sm"></span>
                                  <span>Txn Pending</span>
                                </>
                              ) : (
                                <> Buy all</>
                              )}
                            </button>
                          )}
                          {bulkRegisterTxn?.isSuccess &&
                            bulkRegisterTxn?.hash && (
                              <div className="grid grid-cols-2 gap-2 ">
                                <a
                                  // @ts-ignore
                                  href={`${ENS_EXPLORER_URL}/tx/${bulkRegisterTxn?.hash}`}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  className="btn  btn-secondary text-white rounded-full w-full"
                                >
                                  View on Explorer
                                </a>
                                <a
                                  href={`${ENS_PLATFORM_URL}/${account}`}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  className="btn  btn-secondary text-white rounded-full w-full"
                                >
                                  View on ENS
                                </a>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => {
            setCommitmentTxn({
              isPending: false,
              hash: null,
              isFailed: false,
              reason: null,
              isSuccess: false,
              isSubmitted: false,
            });
            setBulkRegisterTxn({
              isPending: false,
              hash: null,
              isFailed: false,
              reason: null,
              isSuccess: false,
              isSubmitted: false,
            });
          }}
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default CheckoutConfirmationModal;

const ValidityCounter = ({ key, autoStart, date }: any) => {
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed, ...other }: any) => {
    if (completed) {
      // Render a completed state
      return null;
    } else {
      // Render a countdown
      return (
        <span className="countdown font-mono text-sm">
          {/* @ts-ignore */}
          <span style={{ "--value": hours }}></span>:{/* @ts-ignore */}
          <span style={{ "--value": minutes }}></span>:{/* @ts-ignore */}
          <span style={{ "--value": seconds }}></span>
        </span>
      );
    }
  };
  const countDownRef = useRef(null);

  useEffect(() => {
    if (date && countDownRef?.current) {
      // @ts-ignore
      countDownRef?.current?.start();
    }
  }, [date]);
  return (
    <Countdown
      ref={countDownRef}
      key={key}
      autoStart={autoStart && true}
      renderer={renderer}
      date={date}
    />
  );
};
const ValidityProgressCounter = ({
  key,
  autoStart,
  date,
  now,
  renderer,
  onComplete,
}: any) => {
  const countDownRef = useRef(null);

  useEffect(() => {
    if (date && countDownRef?.current) {
      // @ts-ignore
      countDownRef?.current?.start();
    }
  }, [date]);
  return (
    <Countdown
      ref={countDownRef}
      key={key}
      autoStart={autoStart && true}
      renderer={renderer}
      date={date}
      now={now}
      onComplete={onComplete}
    />
  );
};
