import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ensABI from "@/configs/abis/ETHRegistrarController.json";
import { normalise } from "@/utils/namehash";
import { EVMWallet } from "@/utils/evm";
import { formatBytes32String } from "ethers/lib/utils.js";

// const ens_controller_address = "0x253553366Da8546fC250F225fe3d25d0C782303b";
// const ens_public_resolver = "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63";
// const providerUrl = "https://eth-rpc.gateway.pokt.network";
// const chainid = 1;

// for testnet
const ens_controller_address = "0xCc5e7dB10E65EED1BBD105359e7268aa660f6734";
const ens_public_resolver = "0xCc5e7dB10E65EED1BBD105359e7268aa660f6734";
const providerUrl_evm_test = "https://goerli.blockpi.network/v1/rpc/public";
const chainid = 5;

export const useDomainRentPrice = (label: string, duration: number): any => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentPrice = async (domainName: string) => {
      setIsLoading(true);
      setError(null);

      try {
        // Connect to the Ethereum provider
        const provider = new ethers.providers.StaticJsonRpcProvider(
          providerUrl_evm_test,
          {
            chainId: 1,
            name: "Ethereum",
          }
        );
        // Create an instance of your smart contract
        const contract = new ethers.Contract(
          ens_controller_address,
          ensABI,
          provider
        );

        const price = await contract.rentPrice(domainName, duration);
        const bufferedPrice = price[0].mul(110).div(100);
        const realPrice = ethers.utils.formatEther(bufferedPrice);

        // console.log(".............. rawPrice", price);
        // console.log(".............. bufferPrice", price);
        // console.log(".............. realPrice", realPrice);

        setData(realPrice);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred");
      }

      setIsLoading(false);
    };

    const normalisedLabel = normalise(label);
    fetchRentPrice(normalisedLabel);
  }, [label, duration]);

  return { data, isLoading, error };
};

export const registerDomain = async (
  wallet: EVMWallet,
  label: string,
  duration: number
) => {
  try {
    const normalisedLabel = normalise(label);

    const resultSwitchChain = await (wallet as EVMWallet)
      .switchChain(chainid)
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

    // Connect to the Ethereum provider
    const provider = new ethers.providers.StaticJsonRpcProvider(
      providerUrl_evm_test,
      {
        chainId: 1,
        name: "Ethereum",
      }
    );

    const signer = (wallet as EVMWallet).getSigner();
    const addr = await signer.getAddress();

    const ensReadControllerContract = new ethers.Contract(
      ens_controller_address,
      ensABI,
      provider
    );

    const secret = formatBytes32String("dotlab" + normalisedLabel);
    const commit_data = await ensReadControllerContract.makeCommitment(
      normalisedLabel,
      addr,
      duration,
      secret,
      ens_public_resolver,
      [],
      true,
      1
    );

    const ensWriteControllerContract = new ethers.Contract(
      ens_controller_address,
      ensABI,
      signer
    );

    const resultCommit = await ensWriteControllerContract
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

    const price = await ensReadControllerContract.rentPrice(
      normalisedLabel,
      duration
    );
    const bufferedPrice = price[0].mul(110).div(100);

    await new Promise(() =>
      setTimeout(async () => {
        const resultRegister = await ensWriteControllerContract.register(
          normalisedLabel,
          addr,
          duration,
          secret,
          ens_public_resolver,
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
