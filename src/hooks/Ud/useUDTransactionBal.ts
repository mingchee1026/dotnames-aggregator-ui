import { UD_MINT_API } from "@/views/Cart/components/Adapters/UDomainsCart/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePaymasterContract } from "./useContracts";
import { ethers } from "ethers";
import MulticallABI from "@/configs/abis/Multicall2.json";
import { Interface } from "ethers/lib/utils.js";
const UD_SUBGRAPH_URI = process.env.NEXT_PUBLIC_UD_SUBGRAPH_URI||"";
const userDomainPaidTxnsQuery = `
{
  domainPaids(where:{owner:"0x51165411769160859ec0feb8af17dc50ce08e3b0"}) {
    id
    owner
    domain
    price

  }}`;
const userDomainStatusQuery = `
{
  newURIs(where:{uri:"hello.polygon"}) {
    id
  }
  domainRefundeds(where:{owner:"0x51165411769160859ec0feb8af17dc50ce08e3b0",domain:"fasdafsdf.polygon"}) {
    id
  }

}`;
export const useUDDomainPaids = (account: string) => {
  const res = useQuery({
    queryKey: ["useUDDomainPaids", account as string],
    queryFn: async () => {
      const result = await axios.post(UD_SUBGRAPH_URI, {
        query: `{
  domainPaids(where:{owner:"${account.toLowerCase()}"}) {
    id
    owner
    domain
    price
transactionHash
  }}`,
      });

      return result?.data?.data?.domainPaids;
    },
    enabled: account && account?.trim() !== "" ? true : false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
  });
  return res;
};

export const useUDDomainStatusSG = (account: string, domainName: string) => {
  const res = useQuery({
    queryKey: ["useUDDomainStatusSG", account, domainName],
    queryFn: async () => {
      try {
        const result = await axios.post(UD_SUBGRAPH_URI, {
          query: userDomainStatusQuery,
        });
        if (result) {
          return result.data;
        }
      } catch (error) {
        throw error;
      }
    },
    enabled: account && account?.trim() !== "" ? true : false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
  });
  return res;
};

export const useUDDomainStatusDB = (account: string, domainName: string) => {
  const res = useQuery({
    queryKey: ["useUDDomainStatusDB", account, domainName],
    queryFn: async () => {
      try {
        const result = await axios.get(`${UD_MINT_API}/getData/${domainName}`);
        if (result.data) {
          return result.data?.data;
        }
      } catch (error) {
        throw error;
      }
    },
    enabled:
      account &&
      account?.trim() !== "" &&
      domainName &&
      domainName?.trim() !== ""
        ? true
        : false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
  });
  return res;
};
export const useUDDomainRefundStatus = (
  account: string,
  domainName: string,
  paymasterAddress: string,
  chainId: number
) => {
  const paymasterContract = usePaymasterContract({
    paymasterAddress,
    chainId,
  });
  const res = useQuery({
    queryKey: ["useUDDomainRefundStatus", account, domainName],
    queryFn: async () => {
      try {
        const result = await axios.get(`${UD_MINT_API}/getData/${domainName}`);
        if (result.data) {
          return result.data?.data;
        }
      } catch (error) {
        throw error;
      }
    },
    enabled:
      account &&
      account?.trim() !== "" &&
      domainName &&
      domainName?.trim() !== ""
        ? true
        : false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
  });
  return res;
};
export const useUDDomainRefundStatusSG = (
  account: string,
  domainName: string,
  enabled: boolean
) => {
  const res = useQuery({
    queryKey: ["useUDDomainRefundStatusSG", account, domainName],
    queryFn: async () => {
      try {
        const result = await axios.post(UD_SUBGRAPH_URI, {
          query: `
{
  domainRefundeds(where:{owner:"${account?.toLowerCase()}",domain:"${domainName}"}) {
    id
    owner
    domain
    price

  }}`,
        });
        if (result.data) {
          return result.data?.data?.domainRefundeds[0];
        }
      } catch (error) {
        throw error;
      }
    },
    enabled,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
  });
  return res;
};
