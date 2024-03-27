import { ChainId } from "@/configs/chainIds";
import { RPC_URL } from "@/configs/rpc";
import { getCosmWasmClient } from "@sei-js/core";

export const seiProvider = async (chainId:any) => {
  // @ts-ignore
  const seiProvider = await getCosmWasmClient(RPC_URL[chainId]);
  return seiProvider;
};
