import { DomainInterFace } from "@/types/domain";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TLD_TO_PLATFORM_DETAILS } from "@/configs/constants";
import { formatWrapedText, getDomainWitoutTld } from "@/utils";
import {
  UD_CHAIN_ID,
  UD_COIN_DENOM,
  UD_DOMAIN_VIEW_URL,
  UD_EXPLORER_URL,
  UD_MINT_API,
  UD_PAYMASTER,
} from "./config";
import { useAllowance } from "@/hooks/Ud/useAllowance";
import { useAppSelector } from "@/redux/store";
import { useWallet } from "multichain-walletkit-sdk-react";
import toast, { Toaster } from "react-hot-toast";
import { ethers } from "ethers";
import { usePaymasterContract } from "@/hooks/Ud/useContracts";
import { EVMWallet } from "@/utils/evm";
import BigNumber from "bignumber.js";
import axios from "axios";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { useDispatch } from "react-redux";
import { cartSlice } from "@/redux/slices/cartSlice";
import { useRouter } from "next/router";

type Props = {};

function CheckoutDomainModal({
  domain,
  totalPrice,
}: {
  domain: DomainInterFace;
  totalPrice: number;
}) {
  const router = useRouter();
  console.log(
    `🚀 ~ file: CheckoutDomainModal.tsx:21 ~ totalPrice:`,
    totalPrice
  );
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
  } = domain;
  const [approvalTxn, setApprovaTxn] = useState({
    isPending: false,
    hash: null,
    isFailed: false,
    reason: null,
    isSuccess: false,
    isSubmitted: false,
  });
  // UD Paymaster txn
  const [registerTxn, setRegisterTxn] = useState({
    isPending: false,
    hash: null,
    result: null,
    mintIsFailed: false,
    isFailed: false,
    reason: null,
    isSuccess: false,
    isSubmitted: false,
    isRefundable: false,
  });

  // const [mintCall, setMintCall] = useState({
  //   isPending: false,
  //   result: null,
  //   isFailed: false,
  //   reason: null,
  //   isSuccess: false,
  //   isSubmitted: false,
  // });
  const dispatch = useDispatch();
  const account = useAppSelector((state) => state.login.account);
  const wallet = useWallet();
  const signer = (wallet as EVMWallet)?.getSigner();
  const udPaymasterContract = usePaymasterContract({
    signer,
    paymasterAddress: UD_PAYMASTER,
    chainId: UD_CHAIN_ID,
  });
  // @ts-ignore
  const platformData = TLD_TO_PLATFORM_DETAILS[domain?.tld];
  const { allowance, approve } = useAllowance(
    UD_COIN_DENOM.address,
    account!,
    UD_PAYMASTER,
    UD_CHAIN_ID,
    totalPrice,
    UD_COIN_DENOM.decimals,
    { signer }
  );
  console.log(
    `🚀 ~ file: CheckoutDomainModal.tsx:47 ~ { allowance, approve }:`,
    { allowance, approve }
  );
  const handleApproval = async () => {
    const tid = toast.loading("Pending Txn");

    setApprovaTxn((prev) => {
      return {
        ...prev,
        isPending: true,
      };
    });
    if (account && signer && wallet) {
      try {
        const hash = await approve();
        console.log(`🚀 ~ file: CheckoutDomainModal.tsx:117 ~ hash:`, hash);
        if (hash) {
          toast.success(
            <div>
              <p>Transaction success</p>
              <p>
                {" "}
                <a
                  className="text-secondary text-xs"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  href={`${UD_EXPLORER_URL}/tx/${hash}`}
                >
                  View On Explorer
                </a>
              </p>
            </div>,
            {
              id: tid,
            }
          );
          setApprovaTxn((prev) => {
            return {
              ...prev,
              isSuccess: true,
              isPending: false,
              hash,
            };
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
                  referrerPolicy="no-referrer"
                  href={`${UD_EXPLORER_URL}/tx/${hash}`}
                >
                  View On Explorer
                </a>
              </p>
            </div>,
            {
              id: tid,
            }
          );
          setApprovaTxn((prev) => {
            return {
              ...prev,
              isSuccess: false,
              isFailed: true,
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
        console.log(`🚀 ~ file: CheckoutDomainModal.tsx:198 ~ error:`, error);
        setApprovaTxn((prev) => {
          return {
            ...prev,
            isSuccess: false,
            isFailed: true,
            isPending: false,
          };
        });
      }
    } else {
      toast.error(
        <div>
          <p>Account Error</p>
        </div>,
        {
          id: tid,
        }
      );
      setApprovaTxn((prev) => {
        return {
          ...prev,
          isPending: false,
        };
      });
    }
  };
  const handlePayment = async () => {
    const tid = toast.loading("Pending Txn");

    setRegisterTxn((prev) => {
      return {
        ...prev,
        isPending: true,
      };
    });
    //   const args =
    console.log(
      `🚀 ~ file: CheckoutDomainModal.tsx:207 ~ udPaymasterContract.functions:`,
      {
        functions: udPaymasterContract.functions,
        fullPrice,
        args: [
          name,
          new BigNumber(fullPrice!)
            .multipliedBy(10 ** UD_COIN_DENOM.decimals)
            .toString(),
        ],
      }
    );
    if (account && signer && wallet) {
      try {
        const tx = await udPaymasterContract.functions.payForDomain(
          name,
          new BigNumber(fullPrice!)
            .multipliedBy(10 ** UD_COIN_DENOM.decimals)
            .toString()
        );

        if (tx) {
          const hash = tx.hash;
          const receipt = await tx.wait();
          console.log(
            `🚀 ~ file: CheckoutDomainModal.tsx:240 ~ receipt:`,
            receipt
          );
          if (receipt) {
            try {
              const mintResult = await axios.get(`${UD_MINT_API}/mint/${hash}`);
              if (mintResult) {
                console.log(
                  `🚀 ~ file: CheckoutDomainModal.tsx:248 ~ mintResult:`,
                  mintResult
                );
                toast.success(
                  <div>
                    <p>Transaction submitted to UD</p>
                    <p>
                      {" "}
                      <a
                        className="text-secondary text-xs"
                        target="_blank"
                        referrerPolicy="no-referrer"
                        href={`${UD_EXPLORER_URL}/tx/${hash}`}
                      >
                        View On Explorer
                      </a>
                    </p>
                  </div>,
                  {
                    id: tid,
                  }
                );
                setRegisterTxn((prev: any) => {
                  return {
                    ...prev,
                    isSuccess: true,
                    isPending: false,
                    hash,
                    result: mintResult,
                  };
                });
              }
            } catch (error) {
              await setRegisterTxn((prev) => {
                return {
                  ...prev,
                  isSuccess: false,
                  mintIsFailed: true,
                  isPending: false,
                  hash,
                };
              });
              toast.error(
                <div>
                  <p>UD Mint Failed</p>
                </div>,
                {
                  id: tid,
                }
              );
              console.log(
                `🚀 ~ file: CheckoutDomainModal.tsx:241 ~ error:`,
                error
              );
            }
          }
          console.log(`🚀 ~ file: CheckoutDomainModal.tsx:215 ~ hash:`, hash);
        } else {
          toast.error(
            <div>
              <p>Transaction Failed</p>
            </div>,
            {
              id: tid,
            }
          );
          setRegisterTxn((prev) => {
            return {
              ...prev,
              isSuccess: false,
              isFailed: true,
              isPending: false,
            };
          });
        }
      } catch (error) {
        await setRegisterTxn((prev) => {
          return {
            ...prev,
            isSuccess: false,
            isFailed: true,
            isPending: false,
          };
        });
        toast.error(
          <div>
            <p>Transaction Failed</p>
          </div>,
          {
            id: tid,
          }
        );
        console.log(`🚀 ~ file: CheckoutDomainModal.tsx:198 ~ error:`, error);
      }
    } else {
      toast.error(
        <div>
          <p>Account Error</p>
        </div>,
        {
          id: tid,
        }
      );
      await setRegisterTxn((prev) => {
        return {
          ...prev,
          isPending: false,
        };
      });
    }
  };
  return (
    <div>
      <button
        className="btn btn-primary btn-sm text-white text-xs inline-block whitespace-nowrap"
        onClick={() =>
          (
            document?.getElementById(
              `ud_checkout_modal_${domain?.name}`
            ) as HTMLDialogElement
          )?.showModal()
        }
        disabled={
          !account || !wallet || wallet?.network?.chainId !== UD_CHAIN_ID
        }
      >
        Buy now
      </button>
      <dialog
        id={`ud_checkout_modal_${domain?.name}`}
        className="modal  backdrop-blur"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="modal-box p-5 space-y-2"
        >
          <div className="flex justify-between ">
            <h3 className="font-bold text-lg">Confirm Details</h3>
            <button
              className="btn btn-xs btn-square btn-ghost"
              onClick={async () => {
                if (registerTxn.isSuccess || registerTxn?.mintIsFailed) {
                  await dispatch(
                    cartSlice?.actions?.removeFromCartByName(name)
                  );
                }

                await (
                  document?.getElementById(
                    `ud_checkout_modal_${domain?.name}`
                  ) as HTMLDialogElement
                )?.close();
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
          {registerTxn?.isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Player
                autoplay
                loop
                src="/lottie/success.json"
                style={{ height: "150px", width: "150px" }}
              >
                <Controls
                  visible={false}
                  buttons={["play", "repeat", "frame"]}
                />
              </Player>
              <p className="text-center text-[1.2em]">
                {" "}
                Domain is submitted for minting at UD
              </p>{" "}
            </motion.div>
          )}
          {registerTxn?.mintIsFailed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Player
                autoplay
                loop
                src="/lottie/failed.json"
                style={{ height: "150px", width: "150px" }}
              >
                <Controls
                  visible={false}
                  buttons={["play", "repeat", "frame"]}
                />
              </Player>
              <p className="text-center text-[1.2em]">
                {" "}
                Domain minting failed at UD
              </p>{" "}
            </motion.div>
          )}

          {(registerTxn?.isPending || approvalTxn.isPending) && (
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
          {!registerTxn?.isPending &&
            !approvalTxn.isPending &&
            !registerTxn.isSuccess &&
            !registerTxn?.mintIsFailed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="p-3 flex w-full rounded-xl items-center  justify-between shadow-sm border border-gray-400/40 h-fit"
              >
                <div className="flex gap-4 items-center">
                  <div className="border border-gray-400/30 w-fit p-3 rounded-[1em] bg-base-100">
                    <img
                      src={platformData?.icon ?? "/images/platforms/ens.png"}
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
                        <p className="text-xs">Register for lifetime</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p>
                  {fullPrice} {UD_COIN_DENOM.symbol}
                </p>
              </motion.div>
            )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            {allowance < fullPrice! &&
              !registerTxn.isSuccess &&
              !registerTxn?.mintIsFailed && (
                <button
                  className="btn w-full rounded-full btn-secondary"
                  onClick={handleApproval}
                  disabled={registerTxn?.isPending || approvalTxn?.isPending}
                >
                  Approve
                </button>
              )}

            {allowance >= fullPrice! &&
              !registerTxn.isSuccess &&
              !registerTxn?.mintIsFailed && (
                <button
                  className="btn w-full rounded-full btn-secondary"
                  onClick={handlePayment}
                  disabled={registerTxn?.isPending || approvalTxn?.isPending}
                >
                  Submit Payment
                </button>
              )}
          </motion.div>
          {registerTxn.isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className=" flex gap-4 grid grid-cols-2"
            >
              <button
                onClick={async () => {
                  if (registerTxn.isSuccess || registerTxn?.mintIsFailed) {
                    await dispatch(
                      cartSlice?.actions?.removeFromCartByName(name)
                    );
                    await router.push("/account");
                  }
                }}
                className="btn w-full rounded-full btn-secondary"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.8485 17.4344H32.0814C29.8856 17.4344 28.1055 19.2145 28.1055 21.4104C28.1055 23.6062 29.8856 25.3863 32.0814 25.3863H33.8485C36.0444 25.3863 37.8245 23.6062 37.8245 21.4104C37.8245 19.2145 36.0444 17.4344 33.8485 17.4344Z"
                    stroke="white"
                    stroke-width="2.38558"
                  />
                  <path
                    d="M17.9434 9.92425H23.2447C26.6516 9.92425 28.9402 9.92989 30.6474 10.1594C32.2782 10.3787 32.9762 10.7576 33.4369 11.2182C33.8974 11.6788 34.2763 12.3767 34.4956 14.0076C34.6348 15.0432 34.6917 16.2928 34.7149 17.8762H37.3661C37.3026 13.4945 36.9777 11.0104 35.3111 9.34389C33.241 7.27361 29.9087 7.27361 23.2447 7.27361H17.9434C11.2793 7.27361 7.94721 7.27361 5.87692 9.34389C3.80664 11.4142 3.80664 14.7462 3.80664 21.4104C3.80664 28.0744 3.80664 31.4066 5.87692 33.4768C7.94721 35.5471 11.2793 35.5471 17.9434 35.5471H23.2447C29.9087 35.5471 33.241 35.5471 35.3111 33.4768C36.9777 31.8103 37.3026 29.3262 37.3661 24.9446H34.7149C34.6917 26.5279 34.6348 27.7776 34.4956 28.8131C34.2763 30.4439 33.8974 31.1419 33.4369 31.6026C32.9762 32.0631 32.2782 32.442 30.6474 32.6613C28.9402 32.8908 26.6516 32.8965 23.2447 32.8965H17.9434C14.5364 32.8965 12.2478 32.8908 10.5406 32.6613C8.90976 32.442 8.21178 32.0631 7.7512 31.6026C7.29064 31.1419 6.91169 30.4439 6.69243 28.8131C6.46292 27.1059 6.45728 24.8173 6.45728 21.4104C6.45728 18.0034 6.46292 15.7148 6.69243 14.0076C6.91169 12.3767 7.29064 11.6788 7.7512 11.2182C8.21178 10.7576 8.90976 10.3787 10.5406 10.1594C12.2478 9.92989 14.5364 9.92425 17.9434 9.92425Z"
                    fill="white"
                  />
                  <path
                    d="M12.2012 16.5508H21.9202"
                    stroke="white"
                    stroke-width="2.38558"
                    stroke-linecap="round"
                  />
                </svg>
                View Account
              </button>
              <button
                onClick={async () => {
                  if (registerTxn.isSuccess || registerTxn?.mintIsFailed) {
                    await window.open(
                      `${UD_DOMAIN_VIEW_URL}/${name}`,
                      "_blank"
                    );
                    await dispatch(
                      cartSlice?.actions?.removeFromCartByName(name)
                    );
                  }
                }}
                className="btn w-full rounded-full btn-secondary"
              >
                <img
                  src={platformData?.icon ?? "/images/platforms/ens.png"}
                  alt=""
                  width={24}
                  height={24}
                />{" "}
                Unstoppable Account
              </button>
            </motion.div>
          )}
          {registerTxn?.mintIsFailed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className=" flex gap-4 grid grid-cols-2"
            >
              <button
                onClick={async () => {
                  if (registerTxn.isSuccess || registerTxn?.mintIsFailed) {
                    await dispatch(
                      cartSlice?.actions?.removeFromCartByName(name)
                    );
                    await router.push("/account");
                  }
                }}
                className="btn w-full rounded-full btn-secondary"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.8485 17.4344H32.0814C29.8856 17.4344 28.1055 19.2145 28.1055 21.4104C28.1055 23.6062 29.8856 25.3863 32.0814 25.3863H33.8485C36.0444 25.3863 37.8245 23.6062 37.8245 21.4104C37.8245 19.2145 36.0444 17.4344 33.8485 17.4344Z"
                    stroke="white"
                    stroke-width="2.38558"
                  />
                  <path
                    d="M17.9434 9.92425H23.2447C26.6516 9.92425 28.9402 9.92989 30.6474 10.1594C32.2782 10.3787 32.9762 10.7576 33.4369 11.2182C33.8974 11.6788 34.2763 12.3767 34.4956 14.0076C34.6348 15.0432 34.6917 16.2928 34.7149 17.8762H37.3661C37.3026 13.4945 36.9777 11.0104 35.3111 9.34389C33.241 7.27361 29.9087 7.27361 23.2447 7.27361H17.9434C11.2793 7.27361 7.94721 7.27361 5.87692 9.34389C3.80664 11.4142 3.80664 14.7462 3.80664 21.4104C3.80664 28.0744 3.80664 31.4066 5.87692 33.4768C7.94721 35.5471 11.2793 35.5471 17.9434 35.5471H23.2447C29.9087 35.5471 33.241 35.5471 35.3111 33.4768C36.9777 31.8103 37.3026 29.3262 37.3661 24.9446H34.7149C34.6917 26.5279 34.6348 27.7776 34.4956 28.8131C34.2763 30.4439 33.8974 31.1419 33.4369 31.6026C32.9762 32.0631 32.2782 32.442 30.6474 32.6613C28.9402 32.8908 26.6516 32.8965 23.2447 32.8965H17.9434C14.5364 32.8965 12.2478 32.8908 10.5406 32.6613C8.90976 32.442 8.21178 32.0631 7.7512 31.6026C7.29064 31.1419 6.91169 30.4439 6.69243 28.8131C6.46292 27.1059 6.45728 24.8173 6.45728 21.4104C6.45728 18.0034 6.46292 15.7148 6.69243 14.0076C6.91169 12.3767 7.29064 11.6788 7.7512 11.2182C8.21178 10.7576 8.90976 10.3787 10.5406 10.1594C12.2478 9.92989 14.5364 9.92425 17.9434 9.92425Z"
                    fill="white"
                  />
                  <path
                    d="M12.2012 16.5508H21.9202"
                    stroke="white"
                    stroke-width="2.38558"
                    stroke-linecap="round"
                  />
                </svg>
                View Account
              </button>
              <button
                onClick={async () => {
                  if (registerTxn.isSuccess || registerTxn?.mintIsFailed) {
                    await window.open(
                      `${UD_EXPLORER_URL}/tx/${registerTxn?.hash}`,
                      "_blank"
                    );
                    await dispatch(
                      cartSlice?.actions?.removeFromCartByName(name)
                    );
                  }
                }}
                className="btn w-full rounded-full btn-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707z" />
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                </svg>
                View Transaction
              </button>
            </motion.div>
          )}
        </motion.div>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={async (e) => {
              if (registerTxn.isSuccess || registerTxn?.mintIsFailed) {
                await dispatch(cartSlice?.actions?.removeFromCartByName(name));
              } else {
              }
            }}
          >
            close
          </button>
        </form>
        <Toaster />
      </dialog>
    </div>
  );
}

export default CheckoutDomainModal;
