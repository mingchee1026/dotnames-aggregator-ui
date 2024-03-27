import React, { useEffect } from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import WalletModal from "../Wallet/WalletModal";
import { useAppSelector } from "@/redux/store";
import {
  useChangeWallet,
  useWallet,
  useWalletsForChainWithStatus,
} from "multichain-walletkit-sdk-react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/slices/loginSlice";
import { useLocalStore } from "@/hooks/useLocalStore";

type Props = { isFromDashLayout?: boolean };

function Header({}: Props) {
  const cartCount = useAppSelector((state) => state?.cart?.cart?.length);
  const { wallet, chainId } = useLocalStore();
  const account = useAppSelector((state) => state.login.account);
  const { wallets } = useWalletsForChainWithStatus(chainId);
  const selectedWallet = useWallet(chainId);
  const changeWallet = useChangeWallet();

  const dispatch = useDispatch();

  const handleWalletConnect = async (w: any) => {
    try {
      await w?.connect();
      await changeWallet(w);
      if (w.getAddress()) {
        dispatch(loginSuccess(w.getAddress()));
      }
    } catch (error) {
      console.log(`🚀 ~ file: Header.tsx:35 ~ error:`, error);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined" && !account && !selectedWallet) {
      if (wallet && chainId) {
        const selected = wallets?.find((w: any) => w?.getName() === wallet);
        if (selected) {
          handleWalletConnect(selected);
        }
      }
    }
  }, [wallets, account, wallet, chainId]);
  return (
    <div
      className="flex justify-between w-full p-2 py-5 md:p-5 backdrop:blur-lg rounded-2xl  border border-gray-400/20"
      style={{
        boxShadow: "0px 0px 10px rgb(0 0 0 / 0.05)",
      }}
    >
      <div className="flex flex-wrap items-center w-fit">
        <div className="flex flex-wrap items-center lg:block">
          <Link
            href={"/"}
            className="flex items-center justify-start w-[7em] h-fit"
          >
            <img src="/images/logos/dotnames-pink.svg" alt="Dotnames" />
          </Link>
        </div>
      </div>
      <div className="flex  items-center gap-2 lg:gap-5 ">
        <div className="flex flex-wrap items-center hidden lg:flex">
          <div className="hidden w-auto lg:block">
            <ul className="flex items-center text-sm gap-10">
              <li className="hover:text-gray-700">
                <Link href="/domains/">Domains</Link>
              </li>
              <li className="hover:text-gray-700">
                <Link href="/rankings">Rankings</Link>
              </li>
              <li className="hover:text-gray-700">
                <Link href="/account">Account</Link>
              </li>
              <li className="hover:text-gray-700">
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="indicator">
          {cartCount > 0 && (
            <span className="indicator-item  bg-primary rounded-full w-[20px] h-[20px] flex items-center justify-center text-white text-[0.7em]">
              {cartCount}
            </span>
          )}
          <Link href={"/cart"} className="btn  btn-circle btn-sm">
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
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </Link>
        </div>

        {/* <ThemeSwitch /> */}
        <WalletModal />
      </div>
    </div>
  );
}

export default Header;
