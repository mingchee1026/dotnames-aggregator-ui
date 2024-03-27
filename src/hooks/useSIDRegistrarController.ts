import { useState, useEffect } from "react";
import { ethers } from "ethers";
import sidABI from "@/configs/abis/SIDRegistrarcontroller.json";
import { normalise } from "@/utils/namehash";
import { EVMWallet } from "@/utils/evm";
import { formatBytes32String } from "ethers/lib/utils.js";
import SIDRegister from "@web3-name-sdk/register";
import {
  validateName,
  getSidAddress,
  namehash,
  // @ts-ignore
} from "@siddomains/sidjs";
import {
  getResolverContract,
  getSIDContract,
  // @ts-ignore
} from "@siddomains/sidjs/dist/utils/contract";
import {
  interfaces,
  // @ts-ignore
} from "@siddomains/sidjs/dist/constants/interfaces";
import { getTldByChainId } from "@/utils";
import { ChainId } from "@/configs/chainIds";

const providerUrl_bnb = "https://1rpc.io/bnb";
const providerUrl_bnb_test = "https://bsc-testnet.publicnode.com";
// const chainid = 56;
const chainid = 97;

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
          providerUrl_bnb_test,
          {
            chainId: ChainId.BSC,
            name: "BNB Chain",
          }
        );

        const registrarControllerContract = await getRegistrarController(
          chainid,
          provider
        );

        // const addr = await signer.getAddress();
        const price = await registrarControllerContract.rentPrice(
          domainName,
          duration
        );

        const bufferedPrice = price[0].mul(110).div(100);
        const realPrice = ethers.utils.formatEther(bufferedPrice);

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
    // const provider = new providers.Web3Provider(window.ethereum)
    const provider = new ethers.providers.StaticJsonRpcProvider(
      providerUrl_bnb,
      {
        chainId: ChainId.BSC,
        name: "BNB Chain",
      }
    );
    // switch to bsc
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
    if (!resultSwitchChain) return false;

    // get signer
    // const signer = provider.getSigner()
    const signer = (wallet as EVMWallet).getSigner();
    // get address
    const address = await signer.getAddress();
    // init SIDRegister
    // @ts-ignore
    const register = new SIDRegister({ signer, chainId: chainid });

    await register.register(label, address, duration / 365);

    return true;
  } catch (err: any) {
    console.error(err);
  }

  return false;
};

async function getRegistrarController(chainId: number, provider: any) {
  const sidAddress = getSidAddress(chainId);
  const sidContract = getSIDContract({
    address: sidAddress,
    provider: provider,
  });

  const hash = namehash(getTldByChainId(chainId));
  const resolverAddr = await sidContract.resolver(hash);
  const resolverContract = getResolverContract({
    address: resolverAddr,
    provider: provider,
  });
  const registrarControllerAddr = await resolverContract.interfaceImplementer(
    hash,
    interfaces.permanentRegistrar
  );

  const registrarController = new ethers.Contract(
    registrarControllerAddr,
    sidABI,
    provider
  );

  return registrarController as ethers.Contract;
}
