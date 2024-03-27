import { DomainInterFace } from "@/types/domain";
// import { useDispatch } from "react-redux";
// import { useEnsRegistrar } from "./useContracts";

import _ from "lodash";
import MulticallABI from "@/configs/abis/Multicall2.json";
import EnsControllerABI from "@/configs/abis/ETHRegistrarController.json";
import BulkRegisterENSABI from "@/configs/abis/BulkRegisterENS.json";

import { ChainId } from "@/configs/chainIds";
import { Interface, isAddress } from "ethers/lib/utils.js";
import { ethers } from "ethers";
import { RPC_URL } from "@/configs/rpc";
import { normalise } from "@/utils/namehash";
import { contracts } from "@/configs/contracts";
import { useQueries } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { getDomainWitoutTld } from "@/utils";
import { useAppSelector } from "@/redux/store";
import {
  DAY_TO_SEC,
  ENS_COMMITMENT_SECRET,
  YEAR_TO_SEC,
  ZERO_ADDRESS,
} from "@/configs/constants";
import { checkoutSlice } from "@/redux/slices/checkoutSlice";
import { useDispatch } from "react-redux";
import { ENS_REDUX_GRP_KEY } from "@/views/Cart/components/Adapters/EnsCart/config";

// https://etherscan.io/address/0x5ba1e12693dc8f9c48aad8770482f4739beed696#code
const MULTICALL_ADDRESS = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696";

export const useBatchDomainCommitmentsCreate = (
  domainsList: DomainInterFace[],
  account: string,
  chainId: number
) => {
  // const dispatch = useDispatch();
  const duration = domainsList[0]?.years! * YEAR_TO_SEC;

  const queriesSplit = _.chunk(domainsList, 5);
  const queries = queriesSplit.map((qList: DomainInterFace[]) => {
    return {
      queryKey: [
        ...qList,
        "useBatchDomainCommitments",
        "query",
        account,
        duration,
      ],
      queryFn: async () => {
        const calls = qList?.map((l: DomainInterFace) => {
          const normalisedLabel = normalise(getDomainWitoutTld(l?.name));

          return {
            // @ts-ignore
            address: contracts.bulkRegister[chainId],
            name: "bulkMakeCommitment",
            params: [
              [normalisedLabel], // name
              account,
              l?.years! * YEAR_TO_SEC,
              ENS_COMMITMENT_SECRET, // secret https://www.devoven.com/encoding/string-to-bytes32 bytes for "DotNames"
            ],
          };
        });

        const queryResponse = await genericMulticall(
          BulkRegisterENSABI,
          calls,
          chainId
        );

        const parsedResp = queryResponse?.map((r: any, i: number) => {
          const domain = qList[i];
          if (!r?.success) {
            return {
              ...domain,
            };
          }
          const [[commitment]] = r?.data;
          return {
            ...domain,
            commitment,
          };
        });

        return parsedResp;
      },
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      enabled:
        account && isAddress(account) && qList && qList?.length > 0
          ? true
          : false,
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
  const showLoading = flattenData?.find(
    (v) => typeof v?.commitment == "undefined"
  );
  console.log(`🚀 ~ file: useBatchDomainCommitments.ts:112 ~ flattenData:`, {
    flattenData,
    flattenDataLoading,
    showLoading,
  });
  if (flattenData?.length > 0 && !showLoading) {
    return flattenData;
  } else {
    return flattenDataLoading;
  }
};
export const useBatchDomainCommitmentsData = (
  domainsList: DomainInterFace[],
  account: string,
  chainId: number
) => {
  //   const dispatch = useDispatch();

  const queriesSplit = _.chunk(domainsList, 5);

  const queries = queriesSplit.map((qList: DomainInterFace[]) => {
    return {
      queryKey: [...qList, "useBatchDomainCommitmentsData", "query", account],
      queryFn: async () => {
        const calls = qList?.map((l: DomainInterFace) => {
          return {
            // @ts-ignore
            address: contracts.bulkRegister[chainId],
            name: "commitments",
            // @ts-ignore
            params: [l?.commitment],
          };
        });

        const queryResponse = await genericMulticall(
          BulkRegisterENSABI,
          calls,
          chainId
        );

        const parsedResp = queryResponse?.map((r: any, i: number) => {
          const domain = qList[i];
          if (!r?.success) {
            return {
              ...domain,
              commitmentValidity: 0,
            };
          }
          const [commitmentValidity] = r?.data;
          return {
            ...domain,
            commitmentValidity:
              new BigNumber(commitmentValidity?._hex)
                .plus(DAY_TO_SEC)
                ?.toNumber() || 0,
          };
        });

        return parsedResp;
      },
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      enabled:
        account &&
        isAddress(account) &&
        qList?.find((v: DomainInterFace) => v?.commitment) &&
        qList &&
        qList?.length > 0
          ? true
          : false,
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
  const showLoading = flattenData?.find(
    (v) => typeof v?.commitmentValidity == "undefined"
  );

  if (flattenData?.length > 0 && !showLoading) {
    return {
      data: flattenData,
      refetch: async () => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          await element?.refetch();
        }
      },
    };
  } else {
    return {
      data: flattenDataLoading,
      refetch: async () => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          await element?.refetch();
        }
      },
    };
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
      name: "Ethereum",
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
