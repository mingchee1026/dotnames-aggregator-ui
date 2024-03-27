import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
const { ChainId, Wallet } = require("multichain-walletkit-sdk-core");
import {
  useWalletsForChain,
  useWalletsForChainWithStatus,
  useChangeWallet,
} from "multichain-walletkit-sdk-react";

import { loginSuccess } from "@/redux/slices/loginSlice";

import Image from "next/image";
import toast from "react-hot-toast";

type Props = {
  chain?: typeof ChainId;
  onSelectWallet: any;
};

function WalletConnectorModal({ chain, onSelectWallet }: Props) {
  // const { wallets, isDetectingWallets } = useWalletsForChainWithStatus(chain);
  const wallets = useWalletsForChain(chain);
  const changeWallet = useChangeWallet();
  const dispatch = useDispatch();

  const onChangeWallet = async (wallet: typeof Wallet) => {
    await changeWallet(wallet);

    const addresses = await wallet.connect().catch((error: any) => {
      console.log(`🚀 ~ file: WalletConnectorModal.tsx:23 ~ error:`, error);
      toast.error(`Connection failed. ${error}`, {
        style: {
          background: "#363636",
          color: "lightgray",
        },
      });

      return;
    });

    if (wallet.getAddress()) {
      dispatch(loginSuccess(wallet.getAddress()));
    }

    try {
      typeof window !== "undefined" &&
        // @ts-ignore
        window?.modal__select_wallet?.close();
    } catch (error) {
      console.log(`🚀 ~ file: WalletConnectorModal.tsx:33 ~ error:`, error);
    }
  };

  return (
    <dialog id="modal__select_wallet" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Connect wallet</h3>
        {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
        {/* <div className=""> */}
        <ul
          tabIndex={0}
          className="menu p-2 shadow bg-base-100 rounded-box mt-8"
        >
          {wallets.map((wallet) => {
            return (
              <li key={wallet.getName()} onClick={() => onChangeWallet(wallet)}>
                <a>
                  <img
                    src={wallet.getIcon()}
                    width={24}
                    height={24}
                    alt={wallet.getName()}
                  />
                  {wallet.getName()}
                </a>
              </li>
            );
          })}
        </ul>
        {/* </div> */}
      </div>
    </dialog>
  );
}

export default WalletConnectorModal;
