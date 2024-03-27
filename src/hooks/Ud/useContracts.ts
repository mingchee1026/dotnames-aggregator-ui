import { ChainId } from "@/configs/chainIds";
import { ethers } from "ethers";
import UDPaymaster from "@/configs/abis/UDPaymaster.json";
import { contracts } from "@/configs/contracts";
import { ethProvider, evmProvider } from "@/utils/providers/evmProviders";
import BulkRegisterENSABI from "@/configs/abis/BulkRegisterENS.json";
import { RPC_URL } from "@/configs/rpc";

export const usePaymasterContract = (params: any) => {
  const { signer, paymasterAddress, chainId } = params;
  const provider = evmProvider({
    name: "POLYGON",
    chainId,
  });
  const contract = new ethers.Contract(
    paymasterAddress,
    UDPaymaster,
    signer ? signer : provider
  );

  return contract;
};
