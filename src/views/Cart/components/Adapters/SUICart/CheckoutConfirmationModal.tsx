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
import { GasPrice, coins } from "@cosmjs/stargate";

import { formatWrapedText, getDomainWitoutTld } from "@/utils";
import { useWallet } from "multichain-walletkit-sdk-react";
import { useAppSelector } from "@/redux/store";

import { EVMWallet } from "@/utils/evm";
import { useDispatch } from "react-redux";

import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import {
  SUI_REDUX_GRP_KEY,
  SUI_TLD,
  SUI_CHAIN_ID,
  SUI_DOMAIN_URL,
  SUI_PLATFORM_URL,
  SUI_EXPLORER_URL,
} from "./config";
import Countdown from "react-countdown";
import BigNumber from "bignumber.js";
import { cartSlice } from "@/redux/slices/cartSlice";

import { Toaster, toast } from "react-hot-toast";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";

import {} from "@/hooks/Sid/useContracts";

import { contracts } from "@/configs/contracts";
import { bulkRegisterSUINS } from "./helpers";
import { RPC_URL } from "@/configs/rpc";
import Link from "next/link";

const ONE_MINUTE_DIFF = 86340000;
const WAIT_TIME_IN_MINUTE = 1;
function CheckoutConfirmationModal() {
  const [commitWaitTimerIsOver, setCommitWaitTimerIsOver] = useState(false);
  const [registeredDomains, setregisteredDomains] = useState([]);

  const account = useAppSelector((state) => state.login.account);
  // const account = "0x0ce60D140f6a10718F81884E0A5cc68698CDA7Ab";
  const wallet = useWallet();
  const signer = wallet?.signer;
  const dispatch = useDispatch();

  const [registerTxn, setRegisterTxn] = useState({
    isPending: false,
    hash: null,
    isFailed: false,
    reason: null,
    isSuccess: false,
    isSubmitted: false,
  });
  const checkoutList = useAppSelector(
    // @ts-ignore
    (s) => s.checkout.checkoutGroupWithPrice[SUI_REDUX_GRP_KEY]
  );

  console.log(
    `🚀 ~ file: CheckoutConfirmationModal.tsx:76 ~ checkoutList:`,
    checkoutList
  );
  // @ts-ignore
  const platformData = TLD_TO_PLATFORM_DETAILS[SUI_TLD];

  const [subTotal] = useMemo(() => {
    console.log(
      `🚀 ~ file: CheckoutConfirmationModal.tsx:69 ~ checkoutList:`,
      checkoutList
    );
    let sum = 0;
    let isLoading;
    for (let index = 0; index < checkoutList?.length; index++) {
      const element = checkoutList[index];
      if (element?.isLoading) {
        isLoading = element?.isLoading;
      }

      sum += Number(element?.fullPrice) || 0;
    }
    // const sum = checkoutList?.reduce((a, b) => {
    //   return Number(a) + Number(b?.fullPrice) || 0;
    // }, 0);
    return [sum, isLoading];
  }, [checkoutList]);
  const handleBulkRegister = async () => {
    const tid = toast.loading("Pending Txn");
    setRegisterTxn((prev) => {
      return {
        ...prev,
        isPending: true,
      };
    });
    try {
      const tx = await bulkRegisterSUINS({
        wallet: wallet,
        domainsList: checkoutList,
        chainId: SUI_CHAIN_ID,
        sender: account!,
      });
      // const tx = await registerSUINS({
      //   wallet: wallet,
      //   duration: Number(domain?.years),
      //   name: domain?.name,
      //   account: account!,
      // });
      if (tx) {
        toast.success(
          <div>
            <p>Transaction success</p>
            <p>
              {" "}
              <a
                className="text-secondary text-xs"
                target="_blank"
                referrerPolicy="no-referrer"
                href={`${SUI_EXPLORER_URL}/txblock/${tx?.id}`}
              >
                View On Explorer
              </a>
            </p>
          </div>,
          {
            id: tid,
          }
        );

        await setRegisterTxn((prev) => {
          return {
            ...prev,
            hash: tx?.id,
            isSuccess: true,
            isPending: false,
          };
        });
        // @ts-ignore
        await setregisteredDomains(() => {
          const tempChList = [...checkoutList];
          for (let index = 0; index < checkoutList.length; index++) {
            const element = checkoutList[index];

            dispatch(cartSlice?.actions?.removeFromCartByName(element?.name));
          }
          return tempChList;
        });
        console.log(`🚀 ~ file: CheckoutConfirmationModal.tsx:135 ~ tx:`, tx);
      } else {
        toast.error(
          <div>
            <p>Transaction Failed</p>
          </div>,
          {
            id: tid,
          }
        );
        setRegisterTxn((prev: any) => {
          return {
            ...prev,
            hash: tx?.id,
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
      setRegisterTxn((prev: any) => {
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

  return (
    <>
      <button
        className="py-3 px-5 relative   bg-primary z-10 text-white text-xs rounded-3xl w-full"
        type="button"
        onClick={() => {
          (
            document.getElementById(
              "suins_checkout_confirmation_modal"
            ) as HTMLDialogElement
          ).showModal();
        }}
      >
        Proceed
      </button>
      <dialog
        id="suins_checkout_confirmation_modal"
        className="modal backdrop-blur"
      >
        <Toaster
          toastOptions={{
            style: {
              zIndex: "99999",
            },
          }}
        />
        <motion.div className="modal-box p-5">
          <div className="flex justify-between ">
            <h3 className="font-bold text-lg">Confirm Details</h3>
            <button
              className="btn btn-xs btn-square btn-ghost"
              onClick={() => {
                (
                  document?.getElementById(
                    "suins_checkout_confirmation_modal"
                  ) as HTMLDialogElement
                ).close();
                setRegisterTxn({
                  isPending: false,
                  hash: null,
                  isFailed: false,
                  reason: null,
                  isSuccess: false,
                  isSubmitted: false,
                });
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
          {registerTxn?.isPending && (
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

          {!registerTxn?.isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="overflow-hidden mt-5">
                {registerTxn?.isSuccess &&
                  registerTxn?.hash &&
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
                          href={`${SUI_DOMAIN_URL}/${getDomainWitoutTld(name)}`}
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

                {checkoutList?.length > 0 && (
                  <div className="w-full space-y-4 overflow-scroll">
                    {checkoutList?.map((d: DomainInterFace) => {
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
                      } = d;

                      return (
                        <div
                          className="p-3 flex w-full rounded-xl items-center  justify-between shadow-sm border border-gray-400/40 h-fit "
                          key={name}
                        >
                          <div className="flex justify-between w-full items-center">
                            <div className="flex gap-4 items-center ">
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
                                        {new BigNumber(fullPrice!)?.toFixed(4)}{" "}
                                        ${platformData?.coin?.symbol} for{" "}
                                        {years} years
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className=" gap-4 my-5 space-y-3 w-full">
                  <div className="w-full space-y-2">
                    {
                      <div className="w-full">
                        {!registerTxn?.isSuccess && (
                          <button
                            className="btn btn-secondary text-white rounded-full w-full"
                            onClick={handleBulkRegister}
                            disabled={registerTxn?.isPending}
                          >
                            {registerTxn?.isPending ? (
                              <>
                                <span className="loading loading-ring loading-sm"></span>
                                <span>Txn Pending</span>
                              </>
                            ) : (
                              <> Buy all</>
                            )}
                          </button>
                        )}
                        {registerTxn?.isSuccess && registerTxn?.hash && (
                          <div className="grid grid-cols-2 gap-2 ">
                            <a
                              target="_blank"
                              referrerPolicy="no-referrer"
                              // @ts-ignore
                              href={`${SUI_EXPLORER_URL}/txblock/${registerTxn?.hash}`}
                              className="btn  btn-secondary text-white rounded-full w-full"
                            >
                              View on Explorer
                            </a>
                            <a
                              target="_blank"
                              referrerPolicy="no-referrer"
                              href={`${SUI_PLATFORM_URL}/account/my-names`}
                              className="btn  btn-secondary text-white rounded-full w-full"
                            >
                              View on SUINS
                            </a>
                          </div>
                        )}
                      </div>
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
        <form method="dialog" className="modal-backdrop">
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
    <>
      <Countdown
        ref={countDownRef}
        key={key}
        autoStart={autoStart && true}
        renderer={renderer}
        date={date}
      />
    </>
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
    <>
      <Countdown
        ref={countDownRef}
        key={key}
        autoStart={autoStart && true}
        renderer={renderer}
        date={date}
        now={now}
        onComplete={onComplete}
      />
    </>
  );
};
