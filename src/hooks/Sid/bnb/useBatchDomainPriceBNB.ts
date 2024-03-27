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
import { useQueries } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { getDomainWitoutTld } from "@/utils";
import { YEAR_TO_SEC } from "@/configs/constants";

// https://etherscan.io/address/0x5ba1e12693dc8f9c48aad8770482f4739beed696#code
const MULTICALL_ADDRESS = "0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4";

export const useBatchDomainPriceSIDBNB = (
  domainsList: any,
  duration: number,
  chainId: number
) => {
  // const dispatch = useDispatch();
  const queriesSplit = _.chunk(domainsList, 5);
  const queries = queriesSplit.map((qList: any) => {
    return {
      queryKey: [...qList, "useBatchDomainPrice", "query", duration],
      queryFn: async () => {
        const calls = qList?.map((l: any) => {
          const normalisedLabel = normalise(getDomainWitoutTld(l?.name));

          return {
            // @ts-ignore
            address: contracts.Controller[chainId],
            name: "rentPrice",
            params: [normalisedLabel, duration],
          };
        });

        const queryResponse = await genericMulticall(
          EnsControllerABI,
          calls,
          chainId
        );

        const parsedResp = queryResponse?.map((r: any, i: number) => {
          const domain = qList[i];
          if (!r?.success) {
            return domain;
          }
          const price = new BigNumber(r?.data?.price?.base?._hex)
            ?.div(1e18)
            .toFixed(5);
          return {
            ...domain,
            pricePerYear: price,
            price: Number(price), // Change unit,
            fullPrice: Number(price),
            years: duration / YEAR_TO_SEC,
          };
        });

        return parsedResp;
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
    return comboQueryData?.data;
  });
  const loadingDatas = data?.map((comboQueryData) => {
    return comboQueryData?.isLoading;
  });
  const loadingDatasMap = queriesSplit?.map((spl, idx) => {
    const isLoading = loadingDatas[idx];

    return spl.map((d: any) => {
      return {
        ...d,
        isLoading,
      };
    });
  });
  const flattenData = _.flattenDeep(unsplitData);
  const flattenDataLoading = _.flattenDeep(loadingDatasMap);
  if (flattenData?.length > 0 && flattenData[0]?.price) {
    return flattenData;
  } else {
    return flattenDataLoading;
  }
};

export const genericMulticall = async (
  abi: any[],
  calls: any,
  chainId: number
): Promise<any> => {
  const rpcProvider = new ethers.providers.StaticJsonRpcProvider(
    // @ts-ignore
    RPC_URL[chainId],
    {
      chainId,
      name: "BSC",
    }
  );
  // const rpcSigner = signer.provider
  // const multi = new web3Client.eth.Contract(multiAbi, contracts.multicall[chainId]);
  // const provider = new ethers.providers.Web3Provider(provider);
  // const signer = provider.getSigner();

  const multicontract = new ethers.Contract(
    // @ts-ignore
    contracts.multicall[chainId],
    MulticallABI,
    rpcProvider
  );

  const itf = new Interface(abi);

  const calldata = calls.map((call: any) => {
    return {
      target: call.address.toLowerCase(),
      callData: itf.encodeFunctionData(call.name, call.params),
    };
  });

  const resp = await multicontract.callStatic.tryAggregate(false, calldata);
  //   const returnData = resp?.map((result) => {
  //     return {
  //       ...result,
  //     };
  //   });
  const res = resp.map((call: any, i: number) => {
    return {
      success: call?.success,
      data: itf.decodeFunctionResult(calls[i].name, call.returnData),
    };
  });

  return res;
};
