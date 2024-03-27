import React, { useEffect } from "react";
import CartRow from "../../CartRow";
import { useBatchDomainPriceSei } from "@/hooks/DotSei/useBatchDomainPriceSei";
import { YEAR_TO_SEC } from "@/configs/constants";
import { useAppSelector } from "@/redux/store";
import SeiCheckout from "./UDCheckout";
import { useDispatch } from "react-redux";
import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import { UD_REDUX_GRP_KEY } from "./config";
import UDCheckoutFooter from "./UDCheckoutFooter";
import { useBatchDomainPriceUD } from "@/hooks/Ud/useBatchDomainPriceUD";
import UDCheckout from "./UDCheckout";

type Props = {};

function UDCart({ setactiveGroupKey, grpKey, list, checked }: any) {
  const { data: pricedDomainList, isLoading } = useBatchDomainPriceUD(
    list,
    YEAR_TO_SEC
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      checkoutSlice.actions.setCheckoutGroup({
        key: UD_REDUX_GRP_KEY,
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

export default UDCart;
