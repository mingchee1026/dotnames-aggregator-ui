import React, { useEffect } from "react";
import CartRow from "../../CartRow";
import { useBatchDomainPriceSei } from "@/hooks/DotSei/useBatchDomainPriceSei";
import { YEAR_TO_SEC } from "@/configs/constants";
import { useAppSelector } from "@/redux/store";
import SeiCheckout from "./SIDArbCheckout";
import { useDispatch } from "react-redux";
import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import { SIDARB_CHAIN_ID, SIDARB_REDUX_GRP_KEY } from "./config";
import ENSCheckout from "./SIDArbCheckout";
import { useBatchDomainPriceENS } from "@/hooks/Ens/useBatchDomainPriceENS";
import SIDBnbCheckout from "./SIDArbCheckout";
import { useBatchDomainPriceSIDARB } from "@/hooks/Sid/arb/useBatchDomainPriceARB";

type Props = {};

function SIDArbCart({ setactiveGroupKey, grpKey, list }: any) {
  const pricedDomainList = useBatchDomainPriceSIDARB(
    list,
    YEAR_TO_SEC,
    SIDARB_CHAIN_ID
  );
  console.log(
    `🚀 ~ file: ENSCart.tsx:17 ~ pricedDomainList:`,
    pricedDomainList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      checkoutSlice.actions.setCheckoutGroup({
        key: SIDARB_REDUX_GRP_KEY,
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

export default SIDArbCart;
