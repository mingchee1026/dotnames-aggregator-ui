/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAvailableChains, useWallet } from "multichain-walletkit-sdk-react";
import { logout } from "@/redux/slices/loginSlice";
import toast, { Toaster } from "react-hot-toast";
import WalletList from "./WalletList";
import { CHAIN_INDEX_DATA_MAP } from "@/configs/chains";
import { useAppSelector } from "@/redux/store";
import { formatAddress } from "@/utils";
import classnames from "classnames";

function WalletModal({ walletMode = false, btnClasses = "" }) {
  const chainIndexes = useAvailableChains();
  const dispatch = useDispatch();
  const selectedWallet = useWallet();
  const [selectChainIndex, setselectChainIndex] = useState(2);
  const account = useAppSelector((state) => state.login.account);
  const [showWalletOptions, setshowWalletOptions] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(account ? account : "");
    toast.success("Copied");
  };
  const onClickDisconnect = async () => {
    if (!selectedWallet) {
      return;
    }
    await selectedWallet.disconnect();
    localStorage.removeItem("wallet");
    localStorage.removeItem("chainId");
    dispatch(logout());
  };
  return (
    <>
      {account && !walletMode ? (
        <div
          className={classnames(
            btnClasses,
            "text-xs flex bg-primary text-white gap-1 p-2 px-3 items-center rounded-full cursor-pointer"
          )}
          onClick={() => {
            (
              document?.getElementById(
                "wallet_select_modal"
              ) as HTMLDialogElement
            )?.showModal();
            setshowWalletOptions(false);
          }}
        >
          <img
            src={selectedWallet?.getIcon()}
            alt=""
            width={30}
            height={30}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/logos/dotnames-circle.svg";
              target.className = "border border-white/50 rounded-full";
            }}
          />
          <p>{formatAddress(account)}</p>
        </div>
      ) : (
        <button
          className={classnames(
            btnClasses,
            "btn  btn-primary text-white text-xs rounded-full "
          )}
          onClick={() => {
            (
              document?.getElementById(
                "wallet_select_modal"
              ) as HTMLDialogElement
            )?.showModal();
            setshowWalletOptions(false);
          }}
        >
          {walletMode ? (
            <>
              Switch Wallet{" "}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                  />
                </svg>
              </span>
            </>
          ) : (
            <>
              Connect Wallet{" "}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                  />
                </svg>
              </span>
            </>
          )}
        </button>
      )}
      <dialog id="wallet_select_modal" className="modal">
        {account && !showWalletOptions && (
          <div className="modal-box">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">Account</h3>
              <button
                className="btn btn-xs btn-square btn-ghost"
                onClick={() => {
                  (
                    document?.getElementById(
                      "wallet_select_modal"
                    ) as HTMLDialogElement
                  ).close();
                  setshowWalletOptions(false);
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
            <div className="flex-col flex items-center gap-2">
              <img
                src={
                  selectedWallet?.getIcon() === undefined
                    ? "/images/logos/dotnames-circle.svg"
                    : selectedWallet?.getIcon()
                }
                alt=""
                width={100}
                height={100}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/logos/dotnames-circle.svg";
                }}
                className="p-2 bg-gray-500/10 rounded-full"
              />
              <div className="flex items-center gap-2 text-sm">
                <p>{formatAddress(account)}</p>
                <button onClick={handleCopyClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-5 ">
                <button
                  className="btn btn-sm text-[12px]"
                  onClick={() => setshowWalletOptions(true)}
                >
                  Switch Wallet
                </button>
                <button
                  className="btn btn-error btn-sm text-[12px] text-white"
                  onClick={() => {
                    onClickDisconnect();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        {(!account || showWalletOptions) && (
          <div className="modal-box">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">Connect Wallet</h3>
              <button
                className="btn btn-xs btn-square btn-ghost"
                onClick={() => {
                  (
                    document?.getElementById(
                      "wallet_select_modal"
                    ) as HTMLDialogElement
                  ).close();
                  setshowWalletOptions(false);
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
            <div className="flex mt-5 gap-3 w-full overflow-scroll h-80">
              <div className="flex gap-2 items-start">
                <div className="space-y-4 ">
                  {/* random value */}

                  {chainIndexes?.map((ci) => {
                    if (CHAIN_INDEX_DATA_MAP[ci as number]?.icon) {
                      return (
                        <img
                          key={ci}
                          src={CHAIN_INDEX_DATA_MAP[ci]?.icon}
                          width={50}
                          height={50}
                          className={`rounded-2xl hover:bg-gray-500/20 p-2 cursor-pointer ${
                            ci === selectChainIndex
                              ? "bg-gray-500/20 shadow"
                              : ""
                          }`}
                          alt={CHAIN_INDEX_DATA_MAP[ci]?.name}
                          onClick={() => {
                            setselectChainIndex(ci);
                            localStorage.setItem("chainId", ci);
                          }}
                        />
                      );
                    }
                    return (
                      <img
                        key={ci}
                        src="/meta/favicon.png"
                        alt=""
                        onClick={() => {
                          setselectChainIndex(ci);
                          localStorage.setItem("chainId", ci);
                        }}
                      />
                    );
                  })}
                </div>
                <div className="flex items-start divider bg-black/10 h-full w-[2px] my-0"></div>
              </div>
              <WalletList chainId={selectChainIndex} />
            </div>
          </div>
        )}
        <Toaster />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default WalletModal;
