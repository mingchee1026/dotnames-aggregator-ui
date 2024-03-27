import { normalise } from "@/utils/namehash";
import { EVMWallet } from "@/utils/evm";
import { formatBytes32String } from "ethers/lib/utils.js";
import { useEnsRegistrar } from "./useContracts";
import { ChainId } from "@/configs/chainIds";
import { contracts } from "@/configs/contracts";

export const useEnsRegister = async (
  wallet: EVMWallet,
  label: string,
  duration: number
) => {
const signer = (wallet as EVMWallet).getSigner();
const ensRegistrar = useEnsRegistrar({ signer });
const addr = await signer.getAddress();
  try {
    const normalisedLabel = normalise(label);
    const resultSwitchChain = await (wallet as EVMWallet)
      .switchChain(ChainId.ETHEREUM)
      .then(() => {
        return true;
      })
      .catch((err) => {
        alert(
          `Something went error for switch to Ethereum mannet. Error: ${err}`
        );
        return false;
      });

    if (!resultSwitchChain) {
      return false;
    }

    const secret = formatBytes32String("dotlab" + normalisedLabel);
    const commit_data = await ensRegistrar.makeCommitment(
      normalisedLabel,
      addr,
      duration,
      secret,
      contracts.Resolver[ChainId.ETHEREUM],
      [],
      true,
      1
    );

    const resultCommit = await ensRegistrar
      .commit(commit_data)
      .then((data: any) => {
        console.log("resultCommit data", data);
        return { tx: data };
      })
      .catch((error: any) => {
        console.log("resultCommit data error", error);
        return { tx: null, errcode: error.error?.code! };
      });

    if (resultCommit.tx !== null) {
      const txCommitReceipt = await resultCommit.tx.wait();
      if (txCommitReceipt.status !== 1) {
        return false;
      }
    } else if (resultCommit.errcode !== -32603) {
      return false;
    }

    const price = await ensRegistrar.rentPrice(normalisedLabel, duration);
    const bufferedPrice = price[0].mul(110).div(100);

    await new Promise(() =>
      setTimeout(async () => {
        const resultRegister = await ensRegistrar.register(
          normalisedLabel,
          addr,
          duration,
          secret,
          contracts.Resolver[ChainId.ETHEREUM],
          [],
          true,
          1,
          {
            value: bufferedPrice,
            gasLimit: 510000,
            nonce: undefined,
          }
        );

        const txRegisterReceipt = await resultRegister.wait();
        alert(txRegisterReceipt);
      }, 60000)
    );

    return true;
  } catch (err: any) {
    console.error(err);
  }

  return false;
};
