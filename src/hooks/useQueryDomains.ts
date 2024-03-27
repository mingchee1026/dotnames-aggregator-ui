// import { getQuote } from "../adapters/kyberswap";
import type { UseQueryOptions } from "@tanstack/react-query";
import {
  useQueries,
  useQuery,
  // useQuery,
  // UseQueryResult,
} from "@tanstack/react-query";

import {
  SUPPORTED_TLDS,
  TLD_TO_PLATFORM_DETAILS,
  UD_SUPPORTED_TLDS,
  YEAR_TO_SEC,
  ZERO_ADDRESS,
} from "@/configs/constants";
import { useDispatch } from "react-redux";
import { queryDomainsSlice } from "@/redux/slices/queryDomainsSlice";
import { useBatchDomainPriceUD } from "./Ud/useBatchDomainPriceUD";
import axios from "axios";
import { DomainInterFace } from "@/types/domain";
import { useDebounce } from "use-debounce";

interface SearchResult {
  name: string;
  status: string;
  address: string;
  price: number;
  canRegister: boolean;
}

export const useQueryAllDomains = (label: string) => {
  const [debouncedQuery] = useDebounce(label, 700);

  console.log(
    `🚀 ~ file: useQueryDomains.ts:22 ~ debouncedQuery:`,
    debouncedQuery
  );
  const udDomainsList = UD_SUPPORTED_TLDS?.map((tld) => {
    return { name: `${debouncedQuery}.${tld}` };
  });
  const udNames = udDomainsList?.map((d: any) => d?.name);
  const { data: udDomainsListData, ...othersUdQueryData } = useQuery({
    queryKey: [udNames, YEAR_TO_SEC, debouncedQuery],
    queryFn: async () => {
      const resp = await axios.get(
        `/api/lookup/uns/domains?names=${JSON.stringify(udNames)}`,
        {}
      );
      return resp?.data;
    },
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    enabled: debouncedQuery && debouncedQuery?.trim() !== "" ? true : false,
  });

  const dispatch = useDispatch();

  const queries =
    debouncedQuery && debouncedQuery?.trim() !== ""
      ? SUPPORTED_TLDS.map<UseQueryOptions<any>>((tld) => {
          return {
            queryKey: ["useQueryAllDomains", tld, debouncedQuery],
            queryFn: async () => {
              console.log(
                `🚀 ~ file: useQueryDomains.ts:86 ~ UD_SUPPORTED_TLDS:`,
                { tld, UD_SUPPORTED_TLDS }
              );
              if (UD_SUPPORTED_TLDS.includes(tld)) {
                return {
                  name: `${debouncedQuery}.${tld}`,
                  isLoading: othersUdQueryData?.isLoading,
                  // @ts-ignore
                  platform: TLD_TO_PLATFORM_DETAILS[tld],
                };
              }
              const res = await fetch(
                `/api/lookup?prefix=${tld}&name=${debouncedQuery}`
              );
              const result = (await res.json()) as DomainInterFace;
              if (tld === "sui") {
                console.log(
                  `🚀 ~ file: useQueryDomains.ts:68 ~ result:`,
                  result
                );
              }
              return result;
            },

            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            refetchOnMount: false,
            enabled:
              debouncedQuery && debouncedQuery?.trim() !== "" ? true : false,
          };
        })
      : [];

  const result = useQueries({
    queries,
  });

  const res = result?.map((r, idx) => {
    const tld = SUPPORTED_TLDS[idx];

    if (udDomainsListData && UD_SUPPORTED_TLDS.includes(tld)) {
      const udData = udDomainsListData?.items?.find(
        (udd: { name: string }) => udd?.name === r.data?.name
      );

      const canRegister =
        udData?.availability?.status === "AVAILABLE" ? true : false;
      return {
        name: r.data?.name,
        status: canRegister ? "Available" : "Registered",
        address: ZERO_ADDRESS,
        isLoading:
          othersUdQueryData?.isLoading || othersUdQueryData.isRefetching,
        price: udData?.availability?.price?.listPrice?.usdCents / 100 || 0,
        canRegister: canRegister,
        error: othersUdQueryData?.error,
        tld,
        expiry: 0,
        // @ts-ignore
        platform: TLD_TO_PLATFORM_DETAILS[tld],
        isRefetching:
          othersUdQueryData?.isLoading || othersUdQueryData.isRefetching,
      };
    }
    return {
      ...r.data,
      isLoading: r.isLoading || r.isRefetching,
      isRefetching: r?.isLoading || r.isRefetching,
      error: r.error,
      tld,
      // @ts-ignore
      platform: TLD_TO_PLATFORM_DETAILS[tld],
    };
  });
  console.log(`🚀 ~ file: useQueryDomains.ts:101 ~ res:`, res);

  if (debouncedQuery) {
    dispatch(queryDomainsSlice.actions.setQueryLabel(debouncedQuery));
  }
  console.log(`🚀 ~ file: useQueryDomains.ts:45 ~ result:`, result);
  if (othersUdQueryData) {
    dispatch(queryDomainsSlice.actions.setDomainsList(res));
    dispatch(queryDomainsSlice.actions.setFilteredList(res));
  }

  return {
    data: result,
    refetch: async () => {
      await Promise.all(
        result.map(async (r) => {
          return await r.refetch();
        })
      );
    },
  };
};
