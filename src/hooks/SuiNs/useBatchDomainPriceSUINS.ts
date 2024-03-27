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
import { DomainInterFace } from "@/types/domain";

export const useBatchDomainPriceSUINS = (
  domainsList: any,
  duration: number, // in years
  chainId: any
) => {
  console.log(
    `🚀 ~ file: useBatchDomainPriceSUINS.ts:25 ~ duration:`,
    duration
  );
  const d = useQuery({
    queryKey: ["useBatchDomainPriceSUINS", domainsList, duration],
    queryFn: async () => {
      const result = domainsList?.map((d: DomainInterFace) => {
        const label = getDomainWitoutTld(d?.name);
        let price = 20 * duration;

        if (label.length === 3) {
          price = 500 * duration;
        } else if (label.length === 4) {
          price = 100 * duration;
        }
        return price;
      });
      // Introduce a 5-second delay using a Promise to show skeletons
      const delayedResult = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(result);
        }, 1000);
      });
      console.log(`🚀 ~ delayedResult:`, delayedResult);

      return delayedResult;
    },
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    enabled: domainsList && domainsList?.length > 0,
  });
  const mappedData = domainsList?.map(
    (domain: DomainInterFace, idx: number) => {
      const result = d?.data && (d?.data as number[])[idx];

      const price = result;

      return {
        ...domain,
        pricePerYear: price,
        price: Number(price), // Change unit,
        fullPrice: Number(price),
        years: duration,
      };
    }
  );
  return { ...d, data: mappedData };
};
