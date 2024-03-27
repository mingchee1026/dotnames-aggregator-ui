import { ChainId } from "@/configs/chainIds";
import { EVMWallet } from "@/utils/evm";
import SIDRegister from "@web3-name-sdk/register";

export const useSidRegister = async (
  wallet: EVMWallet,
  label: string,
  duration: number
) => {
  try {
    const resultSwitchChain = await (wallet as EVMWallet)
      .switchChain(ChainId.BSC)
      .then(() => {
        return true;
      })
      .catch((err) => {
        alert(
          `Something went error for switch to BSC mannet. Error: ${err}`
        );
        return false;
      });
    if (!resultSwitchChain) return false;
    const signer = (wallet as EVMWallet).getSigner();
    const address = await signer.getAddress();
    // @ts-ignore
    const register = new SIDRegister({ signer, chainId: ChainId.BSC });
    await register.register(label, address, duration / 365);

    return true;
  } catch (err: any) {
    console.error(err);
  }

  return false;
};
