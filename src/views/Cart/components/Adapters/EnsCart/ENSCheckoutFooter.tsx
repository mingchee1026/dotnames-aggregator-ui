import WalletModal from "@/components/Wallet/WalletModal";
import { useAppSelector } from "@/redux/store";
import { useChangeWallet, useWallet } from "multichain-walletkit-sdk-react";
import React, { useEffect, useMemo } from "react";
import { ENS_COIN_DENOM, ENS_REDUX_GRP_KEY, ENS_CHAIN_ID } from "./config";
import BigNumber from "bignumber.js";
import {
  useBatchDomainCommitmentsCreate,
  useBatchDomainCommitmentsData,
} from "@/hooks/Ens/useBatchDomainCommitments";
import { useBulkRegisterContract } from "@/hooks/Ens/useContracts";
import { EVMWallet } from "@/utils/evm";
import { DomainInterFace } from "@/types/domain";
import { useDispatch } from "react-redux";
import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import CheckoutConfirmationModal from "./CheckoutConfirmationModal";

type Props = {};

function ENSCheckoutFooter({}: Props) {
  // const account = "0x0ce60D140f6a10718F81884E0A5cc68698CDA7Ab";
  const account = useAppSelector((state) => state.login.account);

  const wallet = useWallet();
  const changeWallet = useChangeWallet();

  const checkoutList = useAppSelector(
    // @ts-ignore
    (s) => s.checkout.checkoutGroupWithPrice[ENS_REDUX_GRP_KEY]
  );

  const [fullPrice, isLoading] = useMemo(() => {
    let sum = 0;
    let isLoading;
    for (let index = 0; index < checkoutList?.length; index++) {
      const element = checkoutList[index];
      if (element?.isLoading) {
        isLoading = element?.isLoading;
      }
      console.log(
        `🚀 ~ file: SeiCheckoutFooter.tsx:18 ~ element:`,
        " element?.fullPrice",
        element?.fullPrice,
        element
      );
      sum += Number(element?.fullPrice) || 0;
    }

    return [sum, isLoading];
  }, [checkoutList]);

  return (
    <div>
      {/* <div className=" w-full my-5">
        <p className="text-xl">Discount</p>
        <div className="join w-full">
          <div className=" w-full">
            <div>
              <input
                className="input input-bordered w-full join-item"
                placeholder="Apply Coupon"
              />
            </div>
          </div>

          <button className="btn join-item">Apply</button>
        </div>
      </div> */}
      <div className="flex justify-between text-xl">
        <p className="">Sub Total</p>
        {isLoading ? (
          <p className="w-[50%] h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>
        ) : (
          <p>
            {new BigNumber(fullPrice)?.toFixed(5)} {ENS_COIN_DENOM.symbol}
          </p>
        )}
      </div>

      {account && wallet && wallet?.network?.chainId === ENS_CHAIN_ID && (
        <div className="w-full gap-2 flex my-5">
          <CheckoutConfirmationModal />
        </div>
      )}

      {!account && <WalletModal btnClasses="w-full my-5" />}
      {account && !wallet && (
        <WalletModal walletMode={true} btnClasses="w-full my-5" />
      )}
      {account && wallet && wallet?.network?.chainId !== ENS_CHAIN_ID && (
        <button
          className="btn btn-primary rounded-full text-white w-full my-2 "
          onClick={async () => {
            try {
              await wallet?.switchChain(ENS_CHAIN_ID);
              await changeWallet(wallet);
              await wallet?.connect();
            } catch (error) {
              console.log(
                `🚀 ~ file: ENSCheckoutFooter.tsx:92 ~ error:`,
                error
              );
            }
          }}
        >
          Switch chain
        </button>
        // <WalletModal walletMode={true} btnClasses="w-full my-5" />
      )}
    </div>
  );
}

export default ENSCheckoutFooter;
