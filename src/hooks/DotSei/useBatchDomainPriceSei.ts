import { getCosmWasmClient } from "@sei-js/core";
import { UseQueryOptions, useQueries, useQuery } from "@tanstack/react-query";
import { seiProvider } from "@/utils/providers/seiProvider";
import { Love_Light } from "next/font/google";
import { contracts } from "@/configs/contracts";
import { ChainId } from "@/configs/chainIds";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { cartSlice } from "@/redux/slices/cartSlice";
import { getDomainWitoutTld } from "@/utils";
export const useBatchDomainPriceSei = (
  domainsList: any,
  duration: number,
  chainId: any
) => {
  const labels = domainsList?.map((d: any) => getDomainWitoutTld(d?.name));
  const dispatch = useDispatch();
  const queriesSplit = _.chunk(labels, 3);

  const queries = queriesSplit.map((qList) => {
    return {
      queryKey: [...qList, "useBatchDomainPrice", "query", duration, chainId],
      queryFn: async () => {
        const cosmWasmClient = await seiProvider(chainId);

        const calls = qList?.map((l) => {
          // Get price
          const queryMsg = {
            rent_price: {
              name: l,
              duration,
            },
          };
          return {
            // @ts-ignore
            address: contracts.Controller[chainId],
            data: btoa(JSON.stringify(queryMsg)),
          };
        });
        console.log("============block_aggregate========================");
        console.log(
          JSON.stringify({
            try_aggregate: {
              queries: calls,
            },
          })
        );
        console.log("====================================");
        const queryResponse = await cosmWasmClient.queryContractSmart(
          // @ts-ignore
          contracts.multicall[chainId],
          {
            block_aggregate: {
              queries: calls,
            },
          }
        );
        return queryResponse;
      },
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      enabled: qList && qList?.length > 0,
    };
  });
  const data = useQueries({
    queries,
  });
  const unsplitData = data?.map((comboQueryData) => {
    return comboQueryData?.data?.return_data;
  });

  const flattenData = _.flattenDeep(unsplitData);
  console.log(
    `🚀 ~ file: useBatchDomainPriceSei.ts:69 ~ flattenData:`,
    flattenData
  );
  const loadingDatas = data?.map((comboQueryData) => {
    return comboQueryData?.isLoading;
  });
  const loadingDatasMap = queriesSplit?.map((spl, idx) => {
    const isLoading = loadingDatas[idx];

    return spl.map((d, i) => {
      return {
        value: d,
        isLoading,
      };
    });
  });
  const loadingDatasMapFlat = _.flattenDeep(loadingDatasMap)?.map(
    (result, idx) => {
      const domainData = domainsList[idx];

      return {
        ...domainData,

        isLoading: result?.isLoading,
      };
    }
  );
  console.log(`🚀 ~ loadingDatasMap:`, {
    loadingDatasMap,
    loadingDatasMapFlat,
    flattenData,
  });
  // const mappedData = flattenData?.map((result, idx) => {
  //   const domainData = domainsList[idx];
  //   const isLoading = loadingDatasMapFlat[idx]?.isLoading;

  //   const price = result?.success ? JSON.parse(atob(result?.data))?.price : 0;

  //   return {
  //     ...domainData,
  //     pricePerYear: price,
  //     price: Number(price) / 1e6, // Change unit,
  //     fullPrice: Number(price) / 1e6,
  //     years: 1,
  //     isLoading: isLoading,
  //     error: result?.error,
  //   };
  // });
  // if (flattenData?.length > 0 && flattenData[0]?.price) {
  //   return mappedData;
  // } else {
  //   return loadingDatasMapFlat;
  // }
  const finalData = loadingDatasMapFlat?.map((d, idx) => {
    const result = flattenData[idx];
    const price = result?.success ? JSON.parse(atob(result?.data))?.price : 0;

    return {
      ...d,
      pricePerYear: price,
      price: Number(price) / 1e6, // Change unit,
      fullPrice: Number(price) / 1e6,
      years: 1,

      error: result?.error,
    };
  });
  return finalData;
};
