import { useState, useEffect } from "react";
import {
  COMPASS_WALLET,
  getCosmWasmClient,
  getSigningCosmWasmClient,
} from "@sei-js/core";
import { GasPrice, coins } from "@cosmjs/stargate";
import { normalise } from "@/utils/namehash";
import { SeiWallet } from "multichain-walletkit-sdk-sei";

const RPC_URL: string = "https://rpc.atlantic-2.seinetwork.io/";
const CONTRACT_REGISTRY: string =
  "sei1vcap3eeztjle3qy8cl50e80qy9anpr8njkasa66g9dk34l0jtrls7huhv7";
const CONTRACT_REGISTRAR: string =
  "sei1ywtz0ug9syuy9mg00ce93ake4j84f0y6lshc8cxdq2czuyav895qf0mmqy";
const CONTRACT_RESOLVER: string =
  "sei1a74yars3jdanxj2myukt9vfmrk65p2a88jj3axdl9g6pulhgf84sqqqjas";
const CONTRACT_REVERSE_REGISTRAR: string =
  "sei1cmmfxy0n97s87cfxxran2xkmfl3cmm3fq6wrj3vy8hpgxyn80d9q3d55kk";
const CONTRACT_CONTROLLER: string =
  "sei12p2mwewadmf46zmulydyuphdrsxlss6j924ef7wppylaa2g5eypsg403f3";

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
        const cosmWasmClient = await getCosmWasmClient(RPC_URL);

        // Get price
        const queryMsg = {
          rent_price: {
            name: domainName,
            duration: duration,
          },
        };

        // Query a smart contract state
        const queryResponse = await cosmWasmClient.queryContractSmart(
          CONTRACT_CONTROLLER,
          queryMsg
        );

        setData(queryResponse.price);
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
  wallet: SeiWallet,
  label: string,
  duration: number
) => {
  try {
    const cosmWasmClient = await getCosmWasmClient(RPC_URL);

    // Get price
    const queryMsg = {
      rent_price: {
        name: label,
        duration: duration,
      },
    };

    // Query a smart contract state
    const queryResponse = await cosmWasmClient.queryContractSmart(
      CONTRACT_CONTROLLER,
      queryMsg
    );

    const rentPrice = queryResponse.price;

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

    // Create a CosmWasmClient
    const signingCosmWasmClient = await getSigningCosmWasmClient(
      RPC_URL,
      offlineSigner,
      {
        gasPrice: GasPrice.fromString("0.025usei"),
      }
    );

    // Execute a message on a smart contract
    // const fee = await calculateFee(Number(rentprice), "0.1usei");

    const msg = {
      register: {
        name: label,
        owner: senderAddress,
        duration: duration,
        reverse_record: true,
      },
    };

    // const gasEstimation = await signingCosmWasmClient.simulate("sei1qxx73cazru3qu6zxjrnyetqsewlvnm5n0v7dja", [{typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract", value: msg}], "MSG");
    // const fee = await calculateFee(gasEstimation * 1.2, "0.1usei");

    const funds: any = [
      {
        denom: "usei",
        amount: rentPrice,
      },
    ];

    const fee = "auto";
    // const amount = { amount: rentprice, denom: "usei" };
    const amts = coins(rentPrice, "usei");
    const result = await signingCosmWasmClient.execute(
      senderAddress,
      CONTRACT_CONTROLLER,
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
