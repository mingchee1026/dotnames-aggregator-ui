// import { useDispatch } from "react-redux";
// import { useEnsRegistrar } from "./useContracts";

import _ from "lodash";
import MulticallABI from "@/configs/abis/Multicall2.json";
import EnsControllerABI from "@/configs/abis/ETHRegistrarController.json";

import { ChainId } from "@/configs/chainIds";
import { Interface } from "ethers/lib/utils.js";
import { ethers } from "ethers";
import { RPC_URL } from "@/configs/rpc";
import { normalise } from "@/utils/namehash";
import { contracts } from "@/configs/contracts";
import { useQueries, useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { getDomainWitoutTld } from "@/utils";
import axios from "axios";

// https://etherscan.io/address/0x5ba1e12693dc8f9c48aad8770482f4739beed696#code
const MULTICALL_ADDRESS = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696";

export const useBatchDomainPriceUD = (domainsList: any, duration: number) => {
  const names = domainsList?.map((d: any) => d?.name);

  const d = useQuery({
    queryKey: [names, duration],
    queryFn: async () => {
      const resp = await axios.get(
        `/api/lookup/uns/domains?names=${JSON.stringify(names)}`,
        {}
      );
      return resp?.data;
    },
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    enabled: domainsList && domainsList?.length > 0,
  });

  const mappedData = domainsList?.map((domain: any, idx: number) => {
    const result = d?.data?.items && d?.data?.items[idx];
    console.log(`🚀 ~ file: useBatchDomainPriceUD.ts:42 ~ result:`, result);

    const price = result?.availability?.price?.listPrice?.usdCents / 100;

    return {
      ...domain,
      pricePerYear: price,
      price: Number(price), // Change unit,
      fullPrice: Number(price),
      years: 1,
    };
  });
  return { ...d, data: mappedData };
};
