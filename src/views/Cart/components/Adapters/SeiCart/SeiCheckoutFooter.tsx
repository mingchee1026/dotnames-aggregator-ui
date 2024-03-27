import WalletModal from "@/components/Wallet/WalletModal";
import { useAppSelector } from "@/redux/store";
import { useWallet } from "multichain-walletkit-sdk-react";
import React, { useEffect, useMemo } from "react";
import { SEI_CHAIN_ID, SEI_REDUX_GRP_KEY } from "./config";
import BigNumber from "bignumber.js";
import CheckoutConfirmationModal from "./CheckoutConfirmationModal";

type Props = {};

function SeiCheckoutFooter({}: Props) {
  const account = useAppSelector((state) => state.login.account);
  const wallet = useWallet();
  console.log(`🚀 ~ file: SeiCheckoutFooter.tsx:8 ~ account:`, {
    account,
    wallet,
  });
  const registerDomainsBatch = async () => {};
  const checkoutList = useAppSelector(
    // @ts-ignore
    (s) => s.checkout.checkoutGroupWithPrice[SEI_REDUX_GRP_KEY]
  );

  const [fullPrice, isLoading] = useMemo(() => {
    let sum = 0;
    let isLoading;
    for (let index = 0; index < checkoutList?.length; index++) {
      const element = checkoutList[index];
      if (element?.isLoading) {
        isLoading = element?.isLoading;
      }
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
      <div className="flex justify-between text-xl items-center">
        <p className="">Sub Total</p>
        {isLoading ? (
          <p className="w-[50%] h-[2em] animate-pulse bg-gray-400/20 rounded-xl flex items-center"></p>
        ) : (
          <p className="min-h-[2em] flex items-center">
            {new BigNumber(fullPrice)?.toFixed(5)} SEI
          </p>
        )}
      </div>
      {account && wallet?.chainId === SEI_CHAIN_ID && (
        <div className="w-full gap-2 flex my-5">
          <CheckoutConfirmationModal />
        </div>
      )}
      {!account && <WalletModal btnClasses="w-full my-5" />}
      {account && wallet?.chainId !== SEI_CHAIN_ID && (
        <WalletModal walletMode={true} btnClasses="w-full my-5" />
      )}
    </div>
  );
}

export default SeiCheckoutFooter;
