import { ChainId } from "@/configs/chainIds";
import { ethers } from "ethers";
import ensABI from "@/configs/abis/ETHRegistrarController.json";
import { contracts } from "@/configs/contracts";
import { ethProvider } from "@/utils/providers/evmProviders";
import BulkRegisterENSABI from "@/configs/abis/BulkRegisterENS.json";
import { RPC_URL } from "@/configs/rpc";

export const useEnsRegistrar = (params: any) => {
  const { signer } = params;
  const provider = ethProvider();
  const contract = new ethers.Contract(
    contracts.Controller[ChainId.ETHEREUM],
    ensABI,
    signer ? signer : provider
  );

  return contract;
};
export const useBulkRegisterContract = (params: any) => {
  const { signer } = params;
  // const provider = new ethers.providers.StaticJsonRpcProvider(
  //   RPC_URL[ChainId.GÖRLI],
  //   {
  //     chainId: 5,
  //     name: "Ethereum",
  //   }
  // );
  const provider = ethProvider();

  const contract = new ethers.Contract(
    contracts.bulkRegister[ChainId.GÖRLI],
    BulkRegisterENSABI,
    signer ? signer : provider
  );

  return contract;
};
