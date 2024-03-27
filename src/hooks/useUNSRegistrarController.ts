import { useState, useEffect } from "react";
import { normalise } from "@/utils/namehash";
import { EVMWallet } from "@/utils/evm";
import axios from "axios";

const unsEndpointUrl: string = "https://api.unstoppabledomains.com";
const unsSandboxEndpointUrl: string = "https://api.ud-sandbox.com";
let unsEthProviderUrl: string = "https://mainnet.infura.io/v3";
let unsPolygonProviderUrl: string = "https://polygon-mainnet.infura.io/v3";
const unsApiKey: string = "jykfkgvapza5_9lrvsczxqypouvxqfw3w_ydtdzpfq7pao0d";

// const chainid = 101;
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
        const resp = await axios.get(`/api/lookup/uns?&name=${domainName}`);
        const result = await resp.data;

        setData(result.availability.price.listPrice.usdCents);
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
