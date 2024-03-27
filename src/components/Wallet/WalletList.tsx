import { loginSuccess } from "@/redux/slices/loginSlice";
import {
  useChangeWallet,
  useWallet,
  useWalletsForChainWithStatus,
} from "multichain-walletkit-sdk-react";
import React from "react";
import { useDispatch } from "react-redux";

function WalletList({ chainId }: any) {
  const { wallets } = useWalletsForChainWithStatus(chainId);
  const selectedWallet = useWallet(chainId);
  const changeWallet = useChangeWallet();

  const dispatch = useDispatch();
  console.log(`🚀 ~ file: WalletList.tsx:18 ~ wallets:`, selectedWallet);

  const handleWalletConnect = async (w: any) => {
    try {
      await w?.connect();
      await changeWallet(w);
      if (w.getAddress()) {
        dispatch(loginSuccess(w.getAddress()));
      }
    } catch (error) {
      console.log(`🚀 ~ file: WalletList.tsx:28 ~ error:`, error);
    }
  };
  return (
    <>
      {wallets?.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3 w-full overflow-scroll">
          {wallets?.map((w, idx) => {
            return (
              <div
                key={w?.adapter?.name}
                onClick={() => {
                  localStorage.setItem("wallet", w?.getName());
                  handleWalletConnect(w);
                }}
                className="bg-gray-500/10 hover:bg-gray-500/20 rounded-xl p-2 w-full flex flex-col items-center h-fit py-4 space-y-2 cursor-pointer"
              >
                <img src={w?.getIcon()} alt="" width={34} height={34} />

                <p className="text-center text-xs"> {w?.getName()}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="grid grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-3 w-full overflow-scroll">
          Please select chain first
        </p>
      )}
    </>
  );
}

export default WalletList;
