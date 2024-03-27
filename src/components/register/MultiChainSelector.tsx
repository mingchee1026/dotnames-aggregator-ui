import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const {
  ChainId,
  Wallet,
  toChainName,
} = require("multichain-walletkit-sdk-core");

import { useAvailableChains, useWallet } from "multichain-walletkit-sdk-react";

import WalletConnectorModal from "./WalletConnectorModal";

import { logout } from "@/redux/slices/loginSlice";

type Props = {
  btnClassNames?: string;
};

const MultiChainSelector = ({ btnClassNames }: Props) => {
  const dispatch = useDispatch();
  // Retrieve all available chains
  const chains: (typeof ChainId)[] = useAvailableChains();
  const [chain, setChain] = useState<typeof ChainId | undefined>();
  //   const changeWallet = useChangeWallet();
  const wallet = useWallet();

  // @ts-ignore
  const account = useSelector((state) => state.login.account);

  const getAccountString = () => {
    const hash = String(account);
    const first = hash.substring(0, 3);
    const len = hash.length;
    const last = hash.substring(len - 4, len);
    return `${first}...${last}`;
  };

  const onChangeChain = (chain: typeof ChainId) => {
    setChain(chain);

    try {
      typeof window !== "undefined" &&
        // @ts-ignore
        window?.modal__select_wallet?.showModal();
    } catch (error) {
      console.log(`🚀 ~ file: WalletSelectModal.tsx:30 ~ error:`, error);
    }
  };

  const onSelectWallet = async () => {
    // if (!wallet) {
    //   toast.error("The connection failed.", {
    //     style: {
    //       background: "#363636",
    //       color: "lightgray",
    //     },
    //   });
    //   return;
    // }
    // try {
    //   typeof window !== "undefined" &&
    //     // @ts-ignore
    //     window?.modal__select_wallet?.close();
    // } catch (error) {
    //   console.log(`🚀 ~ file: WalletSelectModal.tsx:55 ~ error:`, error);
    // }
    // await wallet.connect().catch((error: any) => {
    //   console.log(`🚀 ~ file: WalletSelectModal.tsx:59 ~ error:`, error);
    //   return;
    // });
    // const address = wallet.getAddress();
    // setAddress(address);
  };

  const onClickDisconnect = async () => {
    if (!wallet) {
      return;
    }

    await wallet.disconnect();
    dispatch(logout());
  };

  return (
    <div>
      {/* {!account && (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-primary text-white"
          >
            Connect chain
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
          >
            {chains.map((chain) => {
              return (
                <li
                  key={toChainName(chain)}
                  onClick={() => onChangeChain(chain)}
                >
                  <a>{toChainName(chain)}</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {account && (
        <div>
          {getAccountString()}{" "}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-primary text-white"
            onClick={onClickDisconnect}
          >
            Switch chain
          </div>
        </div>
      )} */}
      <div className="dropdown dropdown-top dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="px-4 py-2 mx-auto mt-5 text-sm border border-gray-400 w-fit bg-white/10 rounded-3xl"
        >
          {account ? "Switch chain" : "Connect chain"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
        >
          {chains.map((chain) => {
            return (
              <li key={toChainName(chain)} onClick={() => onChangeChain(chain)}>
                <a>{toChainName(chain)}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <WalletConnectorModal chain={chain} onSelectWallet={onSelectWallet} />
    </div>
  );
};

export default MultiChainSelector;
