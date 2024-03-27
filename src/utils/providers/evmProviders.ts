import { ChainId } from "@/configs/chainIds";
import { RPC_URL } from "@/configs/rpc";
import { ethers } from "ethers";

export const ethProvider = () => {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    RPC_URL[ChainId.ETHEREUM],
    {
      chainId: 1,
      name: "Ethereum",
    }
  );

  return provider;
};

export const bnbProvider = () => {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    RPC_URL[ChainId.BSC],
    {
      chainId: 56,
      name: "BNB Chain",
    }
  );
  return provider;
};
export const evmProvider = ({ chainId, name }: any) => {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    // @ts-ignore
    RPC_URL[chainId],
    {
      chainId: chainId,
      name: name,
    }
  );
  return provider;
};
