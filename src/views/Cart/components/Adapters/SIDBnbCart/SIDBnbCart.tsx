import React, { useEffect } from "react";
import CartRow from "../../CartRow";
import { useBatchDomainPriceSei } from "@/hooks/DotSei/useBatchDomainPriceSei";
import { YEAR_TO_SEC } from "@/configs/constants";
import { useAppSelector } from "@/redux/store";
import SeiCheckout from "./SIDBnbCheckout";
import { useDispatch } from "react-redux";
import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import { SIDBNB_CHAIN_ID, SIDBNB_REDUX_GRP_KEY } from "./config";
import ENSCheckout from "./SIDBnbCheckout";
import { useBatchDomainPriceENS } from "@/hooks/Ens/useBatchDomainPriceENS";
import SIDBnbCheckout from "./SIDBnbCheckout";
import { useBatchDomainPriceSIDBNB } from "@/hooks/Sid/bnb/useBatchDomainPriceBNB";

type Props = {};

function SIDBnbCart({ setactiveGroupKey, grpKey, list }: any) {
  const pricedDomainList = useBatchDomainPriceSIDBNB(
    list,
    YEAR_TO_SEC,
    SIDBNB_CHAIN_ID
  );
  console.log(
    `🚀 ~ file: ENSCart.tsx:17 ~ pricedDomainList:`,
    pricedDomainList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      checkoutSlice.actions.setCheckoutGroup({
        key: SIDBNB_REDUX_GRP_KEY,
        data: pricedDomainList,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricedDomainList]);
  return (
    <>
      <div className="grid lg:grid-cols-[3fr_1.5fr] items-start">
        <div className="flex flex-wrap gap-5">
          {pricedDomainList?.length > 0 &&
            pricedDomainList?.map((d: any) => {
              return <CartRow {...d} key={d?.name} />;
            })}
        </div>
        <SIDBnbCheckout list={pricedDomainList} />
      </div>
    </>
  );
}

export default SIDBnbCart;
