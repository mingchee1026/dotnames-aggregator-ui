import { TLD_TO_PLATFORM_DETAILS, YEAR_TO_SEC } from "@/configs/constants";
import { useSeiDomainRentPrice } from "@/hooks/DotSei/useDomainPrice";
import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import { useAppSelector } from "@/redux/store";
import { formatWrapedText } from "@/utils";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SeiCheckoutFooter from "./SeiCheckoutFooter";
import { SEI_CHAIN_ID, SEI_COIN_DENOM, SEI_REDUX_GRP_KEY } from "./config";
import BigNumber from "bignumber.js";
import { useBatchDomainPriceSei } from "@/hooks/DotSei/useBatchDomainPriceSei";

type Props = {};

const ListItem = ({
  domain,
  grpIndex,
  yearsSelected,
  isLoading,
  fullprice,
}: any) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const platformData = TLD_TO_PLATFORM_DETAILS[domain?.tld];
  useEffect(() => {
    dispatch(
      checkoutSlice.actions.setCheckoutGroupitem({
        key: SEI_REDUX_GRP_KEY,
        data: {
          ...domain,
          fullPrice: fullprice,
          years: yearsSelected,
          grpIndex,
        },
        grpIndex,
      })
    );
  }, [domain?.price, dispatch, domain, grpIndex, fullprice, yearsSelected]);
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
      className="p-2 border-b border-base-300 my-2  flex items-center justify-between"
    >
      <div
        className="tooltip text-start w-fit  min-h-[2em] flex items-center"
        data-tip={domain?.name}
      >
        <p className="font-[500] ">{formatWrapedText(domain?.name, 5, 6)}</p>
      </div>

      <div className="flex justify-center text-xs min-h-[2em] flex items-center">
        {isLoading && (
          <p className="w-[10em] h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>
        )}
        {!isLoading && (
          <p>
            {new BigNumber(fullprice)?.toFixed(5)} {platformData?.coin?.symbol}{" "}
          </p>
        )}
      </div>
    </div>
  );
};

function SeiCheckout({ list }: any) {
  const [yearsSelected, setyearsSelected] = useState(1);
  const pricedDomainList = useBatchDomainPriceSei(
    list,
    YEAR_TO_SEC * yearsSelected,
    SEI_CHAIN_ID
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      checkoutSlice.actions.setCheckoutGroup({
        key: SEI_REDUX_GRP_KEY,
        data: list,
      })
    );
  }, [dispatch, list]);

  return (
    <div className="border border-gray-400/40 p-5 rounded-lg h-full min-h-[70vh] my-5 lg:my-0">
      <div className="flex justify-between">
        <p className="capitalize text-xl">
          {SEI_COIN_DENOM?.networkName} Network
        </p>
        <div className="grid grid-cols-[0.5fr_1fr_0.5fr] gap-2 items-center">
          <button
            className="btn btn-sm btn-square"
            onClick={() => {
              setyearsSelected((prev) => prev + 1);
            }}
          >
            +
          </button>
          <p className="capitalize">
            {yearsSelected} {yearsSelected > 1 ? "Years" : "Year"}
          </p>
          <button
            className="btn btn-sm btn-square"
            onClick={() => {
              setyearsSelected((prev) => {
                if (prev > 1) {
                  return prev - 1;
                }
                return prev;
              });
            }}
          >
            -
          </button>
        </div>
      </div>
      {pricedDomainList?.map((domain: any, index: number) => {
        return (
          <ListItem
            key={`checkout__${domain?.name}`}
            domain={domain}
            grpIndex={index}
            yearsSelected={yearsSelected}
            isLoading={domain?.isLoading}
            fullprice={domain?.fullPrice}
          />
        );
      })}
      <SeiCheckoutFooter />
    </div>
  );
}

export default SeiCheckout;
