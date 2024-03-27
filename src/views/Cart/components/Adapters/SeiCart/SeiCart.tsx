import React, { useEffect } from "react";
import CartRow from "../../CartRow";
import { useBatchDomainPriceSei } from "@/hooks/DotSei/useBatchDomainPriceSei";
import { YEAR_TO_SEC } from "@/configs/constants";
import { useAppSelector } from "@/redux/store";
import SeiCheckout from "./SeiCheckout";
import { useDispatch } from "react-redux";
import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import { SEI_CHAIN_ID, SEI_REDUX_GRP_KEY } from "./config";

type Props = {};

function SeiCart({ setactiveGroupKey, grpKey, list, checked }: any) {
  const pricedDomainList = useBatchDomainPriceSei(
    list,
    YEAR_TO_SEC,
    SEI_CHAIN_ID
  );
  const dispatch = useDispatch();

  console.log(`🚀 ~ file: SeiCart.tsx:10 ~ d:`, { pricedDomainList, list });
  useEffect(() => {
    dispatch(
      checkoutSlice.actions.setCheckoutGroup({
        key: SEI_REDUX_GRP_KEY,
        data: pricedDomainList,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="grid lg:grid-cols-[3fr_1.5fr] items-start">
        <div className="flex flex-wrap gap-5">
          {pricedDomainList?.length > 0 &&
            pricedDomainList?.map((d: any) => {
              return <CartRow {...d} key={d?.name} />;
            })}
        </div>
        <SeiCheckout list={pricedDomainList} />
      </div>
    </>
  );
}

export default SeiCart;
