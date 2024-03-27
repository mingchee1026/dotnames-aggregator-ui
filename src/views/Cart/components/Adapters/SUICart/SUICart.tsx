import React, { useEffect } from "react";
import CartRow from "../../CartRow";

import { YEAR_TO_SEC } from "@/configs/constants";
import { useAppSelector } from "@/redux/store";

import { useDispatch } from "react-redux";
import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import { SUI_CHAIN_ID, SUI_REDUX_GRP_KEY } from "./config";
import UDCheckoutFooter from "./SUICheckoutFooter";
import { useBatchDomainPriceUD } from "@/hooks/Ud/useBatchDomainPriceUD";
import UDCheckout from "./SUICheckout";
import { useBatchDomainPriceSUINS } from "@/hooks/SuiNs/useBatchDomainPriceSUINS";

type Props = {};

function SUICart({ setactiveGroupKey, grpKey, list, checked }: any) {
  const { data: pricedDomainList, isLoading } = useBatchDomainPriceSUINS(
    list,
    1,
    SUI_CHAIN_ID
  );
  console.log(`🚀 ~ isLoading:`, { data: pricedDomainList, isLoading });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      checkoutSlice.actions.setCheckoutGroup({
        key: SUI_REDUX_GRP_KEY,
        data: pricedDomainList?.map((d: any) => {
          return {
            ...d,
            isLoading,
          };
        }),
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="grid lg:grid-cols-[3fr_1.5fr] items-start">
        <div className="flex flex-wrap gap-5">
          {pricedDomainList &&
            pricedDomainList?.map((d: any) => {
              return <CartRow {...d} key={d?.name} isLoading={isLoading} />;
            })}
        </div>
        <UDCheckout
          list={pricedDomainList?.map((d: any) => {
            return {
              ...d,
              isLoading,
            };
          })}
        />
      </div>
    </>
  );
}

export default SUICart;
