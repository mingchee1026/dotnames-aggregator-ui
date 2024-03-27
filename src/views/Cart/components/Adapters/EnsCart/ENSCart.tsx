import React, { useEffect } from "react";
import CartRow from "../../CartRow";
import { useBatchDomainPriceSei } from "@/hooks/DotSei/useBatchDomainPriceSei";
import { YEAR_TO_SEC } from "@/configs/constants";
import { useAppSelector } from "@/redux/store";
import SeiCheckout from "./ENSCheckout";
import { useDispatch } from "react-redux";
import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import { ENS_CHAIN_ID, ENS_REDUX_GRP_KEY } from "./config";
import ENSCheckout from "./ENSCheckout";
import { useBatchDomainPriceENS } from "@/hooks/Ens/useBatchDomainPriceENS";

type Props = {};

function ENSCart({ setactiveGroupKey, grpKey, list }: any) {
  const pricedDomainList = useBatchDomainPriceENS(
    list,
    YEAR_TO_SEC,
    ENS_CHAIN_ID
  );
  console.log(
    `🚀 ~ file: ENSCart.tsx:17 ~ pricedDomainList:`,
    pricedDomainList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      checkoutSlice.actions.setCheckoutGroup({
        key: ENS_REDUX_GRP_KEY,
        data: pricedDomainList,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricedDomainList]);
  return (
    <div className="grid lg:grid-cols-[3fr_1.5fr] items-start">
      <div className="flex flex-wrap gap-5">
        {pricedDomainList?.length > 0 &&
          pricedDomainList?.map((d: any) => {
            return <CartRow {...d} key={d?.name} />;
          })}
      </div>
      <ENSCheckout list={pricedDomainList} />
    </div>
  );
}

export default ENSCart;
