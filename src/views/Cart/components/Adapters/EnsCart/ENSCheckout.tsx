import { TLD_TO_PLATFORM_DETAILS, YEAR_TO_SEC } from "@/configs/constants";
import { useSeiDomainRentPrice } from "@/hooks/DotSei/useDomainPrice";
import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import { useAppSelector } from "@/redux/store";
import { formatWrapedText } from "@/utils";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SeiCheckoutFooter from "./ENSCheckoutFooter";
import ENSCheckoutFooter from "./ENSCheckoutFooter";
import { useEnsDomainRentPrice } from "@/hooks/Ens/useDomainPrice";
import BigNumber from "bignumber.js";
import { ENS_CHAIN_ID, ENS_COIN_DENOM, ENS_REDUX_GRP_KEY } from "./config";
import { useBatchDomainPriceENS } from "@/hooks/Ens/useBatchDomainPriceENS";
import { DomainInterFace } from "@/types/domain";

type Props = {};

const ListItem = ({
  domain,
  grpIndex,
  yearsSelected,
  isLoading,
  fullprice,
}: any) => {
  console.log(`🚀 ~ domain:`, { domain });
  // @ts-ignore
  const platformData = TLD_TO_PLATFORM_DETAILS[domain?.tld];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      checkoutSlice.actions.setCheckoutGroupitem({
        key: ENS_REDUX_GRP_KEY,
        data: {
          ...domain,
          fullPrice: fullprice,
          years: yearsSelected,
          grpIndex,
        },
        grpIndex,
      })
    );
    // @ts-ignore
  }, [yearsSelected, domain?.price, dispatch, domain, grpIndex, fullprice]);
  if (isLoading) {
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
      <div className="tooltip text-start w-fit" data-tip={domain?.name}>
        <p className="font-[500] ">{formatWrapedText(domain?.name, 5, 6)}</p>
      </div>

      <div className="flex justify-center text-xs">
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

function ENSCheckout({ list }: any) {
  const [yearsSelected, setyearsSelected] = useState(1);
  const pricedDomainList = useBatchDomainPriceENS(
    list,
    YEAR_TO_SEC * yearsSelected,
    ENS_CHAIN_ID
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      checkoutSlice.actions.setCheckoutGroup({
        key: ENS_REDUX_GRP_KEY,
        data: list,
      })
    );
  }, [dispatch, list]);

  return (
    <div className="border border-gray-400/40 p-5 rounded-lg h-full min-h-[70vh] my-5 lg:my-0">
      <div className="flex justify-between">
        <p className="capitalize text-xl">
          {ENS_COIN_DENOM?.networkName} Network
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
                console.log(`🚀 ~ file: ENSCheckout.tsx:138 ~ prev:`, prev);
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
      {pricedDomainList?.map((domain: DomainInterFace, index: number) => {
        return (
          <ListItem
            domain={domain}
            key={`checkout__${domain?.name}`}
            grpIndex={index}
            yearsSelected={yearsSelected}
            isLoading={domain?.isLoading}
            fullprice={domain?.fullPrice}
          />
        );
      })}
      <ENSCheckoutFooter />
    </div>
  );
}

export default ENSCheckout;
