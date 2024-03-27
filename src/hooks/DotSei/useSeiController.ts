import { getSigningCosmWasmClient } from "@sei-js/core";
import { useSeiDomainRentPrice } from "./useDomainPrice";
import { RPC_URL } from "@/configs/rpc";
import { ChainId } from "@/configs/chainIds";
//@ts-ignore
import { SeiWallet } from "multichain-walletkit-sdk-sei";
import { GasPrice, coins } from "@cosmjs/stargate";
import { contracts } from "@/configs/contracts";



export const useDotSeiRegister = async (
  wallet: SeiWallet,
  label: string,
  duration: number
) => {
    const domainPrice = useSeiDomainRentPrice(label,duration);
  try {
    const senderAddress = wallet.getAddress();
    if (!senderAddress) {
      alert("Please connect to wallet!");
      return;
    }

    const offlineSigner = wallet.getOfflineSigner();

    if (!offlineSigner) {
      alert("Please connect to wallet!");
      return;
    }

    const signingCosmWasmClient = await getSigningCosmWasmClient(
      RPC_URL[ChainId.SEI],
      offlineSigner,
      {
        gasPrice: GasPrice.fromString("0.025usei"),
      }
    );
    const msg = {
      register: {
        name: label,
        owner: senderAddress,
        duration: duration,
        reverse_record: true,
      },
    };
    const funds: any = [
      {
        denom: "usei",
        amount: domainPrice*10e5,
      },
    ];

    const fee = "auto";
    const result = await signingCosmWasmClient.execute(
      senderAddress,
      contracts.Controller[ChainId.SEI],
      msg,
      fee,
      undefined, //"",
      funds //amts
    );

    console.log(result);

    return true;
  } catch (err: any) {
    console.error(err);
  }

  return false;
};
