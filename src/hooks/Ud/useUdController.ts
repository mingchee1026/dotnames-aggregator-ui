import { ChainId } from "@/configs/chainIds";
import { EVMWallet } from "@/utils/evm";
import axios from "axios";

export const useUdRegister = async (
  wallet: EVMWallet,
  label: string,
  duration: number
) => {
  try {
    const resultSwitchChain = await (wallet as EVMWallet)
      .switchChain(ChainId.POLYGON)
      .then(() => {
        return true;
      })
      .catch((err) => {
        alert(
          `Something went error for switch to Polygon mainnet. Error: ${err}`
        );
        return false;
      });

    if (!resultSwitchChain) return false;

    const address = wallet?.getAddress();

    const data = {
      name: label,
      address: address,
    };

    let resp = await axios.post(`/api/lookup/uns?&name=${label}`, data);

    const result = await resp.data;
    console.log(result);

    if (result.code) {
      console.log(`ERROR : ${result.code}\r\n${result.message}`);
      return false;
    }

    return true;
  } catch (err: any) {
    console.error(err);
  }

  return false;
};
