import { ChainId } from "@/configs/chainIds";
import { ethers } from "ethers";
import ensABI from "@/configs/abis/ETHRegistrarController.json";
import { contracts } from "@/configs/contracts";
import { bnbProvider } from "@/utils/providers/evmProviders";
import BulkRegisterSID from "@/configs/abis/BulkRegisterSID.json";
import { RPC_URL } from "@/configs/rpc";

export const useSidRegistrar = (params: any) => {
  const { signer } = params;
  const provider = bnbProvider();
  const contract = new ethers.Contract(
    contracts.Controller[ChainId.BSC],
    ensABI,
    signer ? signer : provider
  );

  return contract;
};
export const useBulkRegisterContractSIDBNB = (params: any) => {
  const { signer, chainId } = params;
  // const provider = new ethers.providers.StaticJsonRpcProvider(
  //   RPC_URL[ChainId.GÖRLI],
  //   {
  //     chainId: 5,
  //     name: "Ethereum",
  //   }
  // );
  const provider = bnbProvider();

  const contract = new ethers.Contract(
    // @ts-ignore
    contracts.bulkRegister[chainId],
    BulkRegisterSID,
    signer ? signer : provider
  );

  return contract;
};
export const useBulkRegisterContractSIDARB = (params: any) => {
  const { signer, chainId } = params;
  const provider = new ethers.providers.StaticJsonRpcProvider(
    RPC_URL[ChainId.ARBITRUM_GOERLI],
    {
      chainId: chainId,
      name: "Arbitrum",
    }
  );
  // const provider = bnbProvider();

  const contract = new ethers.Contract(
    // @ts-ignore
    contracts.bulkRegister[chainId],
    BulkRegisterSID,
    signer ? signer : provider
  );

  return contract;
};
