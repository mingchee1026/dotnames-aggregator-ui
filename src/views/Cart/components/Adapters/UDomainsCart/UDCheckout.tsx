import { YEAR_TO_SEC } from "@/configs/constants";
import { useSeiDomainRentPrice } from "@/hooks/DotSei/useDomainPrice";
import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import { useAppSelector } from "@/redux/store";
import { formatWrapedText } from "@/utils";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import SeiCheckoutFooter from "./UDCheckoutFooter";
import { UD_COIN_DENOM, UD_REDUX_GRP_KEY } from "./config";
import UDCheckoutFooter from "./UDCheckoutFooter";
import { useUdDomainRentPrice } from "@/hooks/Ud/useDomainPrice";
import CheckoutDomainModal from "./CheckoutDomainModal";

type Props = {};

const ListItem = ({ domain, grpIndex, totalPrice }: any) => {
  const dispatch = useDispatch();

  const domainPrice = useUdDomainRentPrice(
    domain?.name,
    0,
    (data) => {
      dispatch(
        checkoutSlice.actions.setCheckoutGroupitem({
          key: UD_REDUX_GRP_KEY,
          data: {
            ...domain,
            fullPrice: data,
            years: 1,
            grpIndex,
          },
          grpIndex,
        })
      );
    },
    true,
    domain?.price
  );
  console.log(`🚀 ~ file: SeiCheckout.tsx:15 ~ domainPrice:`, domainPrice);
  //   useEffect(() => {
  //     console.log("DISPATCH_______");
  //     if (yearsSelected === 1) {
  //       dispatch(
  //         checkoutSlice.actions.setCheckoutGroupitem({
  //           key: "sei",
  //           data: {
  //             ...domain,
  //             fullPrice: domain?.price,
  //             years: yearsSelected,
  //             grpIndex,
  //           },
  //           grpIndex,
  //         })
  //       );
  //     }
  //     // return () => null;
  //   }, [yearsSelected]);
  useEffect(() => {
    dispatch(
      checkoutSlice.actions.setCheckoutGroupitem({
        key: UD_REDUX_GRP_KEY,
        data: {
          ...domain,
          fullPrice: domainPrice?.data || domain?.price,
          years: 1,
          grpIndex,
        },
        grpIndex,
      })
    );
  }, [domainPrice?.data, domain?.price, dispatch, domain, grpIndex]);
  if (domain?.isLoading) {
    return (
      <div
        key={domain?.name}
        className="p-2 border-b border-base-300 my-2  grid grid-cols-[2fr_1.5fr_1.5fr] items-center justify-center"
      >
        <p className="w-[80%] h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>

        <p className="w-[80%] h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>

        <p className="w-[100%] h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>
      </div>
    );
  }
  return (
    <div
      key={domain?.name}
      className="p-2 border-b border-base-300 my-2  grid grid-cols-[2fr_1.5fr] items-center justify-center"
    >
      <div className="tooltip text-start w-fit" data-tip={domain?.name}>
        <p className="font-[500] ">{formatWrapedText(domain?.name, 5, 6)}</p>
      </div>

      <div className="flex justify-between items-center text-xs">
        <p>
          {domainPrice?.data} {UD_COIN_DENOM.symbol}
        </p>
        <CheckoutDomainModal domain={domain} totalPrice={totalPrice} />
      </div>
    </div>
  );
};

function UDCheckout({ list }: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      checkoutSlice.actions.setCheckoutGroup({
        key: UD_REDUX_GRP_KEY,
        data: list,
      })
    );
  }, [dispatch, list]);
  const [totalPrice, isLoading] = useMemo(() => {
    let sum = 0;
    let isLoading;

    for (let index = 0; index < list?.length; index++) {
      const element = list[index];
      if (element?.isLoading) {
        isLoading = element?.isLoading;
      }
      sum += Number(element?.fullPrice) || 0;
    }

    return [sum, isLoading];
  }, [list]);

  console.log(`🚀 ~ file: UDCheckout.tsx:116 ~ [totalPrice, isLoading]:`, [
    totalPrice,
    isLoading,
  ]);
  return (
    <div className="border border-gray-400/40 p-5 rounded-lg h-full min-h-[70vh] my-5 lg:my-0">
      <p className="capitalize text-xl">Polygon Network</p>
      {list?.map((domain: any, index: number) => {
        console.log(
          `🚀 ~ file: SeiCheckout.tsx:90 ~ domain, index:`,
          domain,
          index
        );

        return (
          <ListItem
            domain={domain}
            key={domain?.name}
            grpIndex={index}
            totalPrice={totalPrice}
          />
        );
      })}
      <UDCheckoutFooter />
    </div>
  );
}

export default UDCheckout;
