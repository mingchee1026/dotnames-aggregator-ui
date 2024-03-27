import { useState, useEffect } from "react";
import { normalise } from "@/utils/namehash";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
  SUI_CLOCK_OBJECT_ID,
  JsonRpcProvider,
  mainnetConnection,
} from "@mysten/sui.js";
// import { SuinsClient } from "@suins/toolkit";
// @ts-ignore
import { SuiWallet } from "multichain-walletkit-sdk-sui";

// const chainid = 101;
const chainid = 101;

export const useDomainRentPrice = (label: string, duration: number): any => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentPrice = async (domainName: string) => {
      setIsLoading(true);
      setError(null);

      try {
        let price = 20;

        if (label.length === 3) {
          price = 500;
        } else if (label.length === 4) {
          price = 100;
        }

        setData(price.toString());
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
  wallet: SuiWallet,
  label: string,
  duration: number
) => {
  try {
    let rentprice = 20;

    if (label.length === 3) {
      rentprice = 500;
    } else if (label.length === 4) {
      rentprice = 100;
    }

    const rpcUrl = getFullnodeUrl("mainnet");
    const client = new SuiClient({ url: rpcUrl });

    const tx = new TransactionBlock();
    const registration = tx.moveCall({
      target:
        "0x9d451fa0139fef8f7c1f0bd5d7e45b7fa9dbb84c2e63c2819c7abd0a7f7d749d::register::register",
      arguments: [
        tx.object(
          "0x6e0ddefc0ad98889c04bab9639e512c21766c5e6366f89e696956d9be6952871"
        ), // SUINS_ADDRESS
        tx.pure(label, "string"), // domain could be `my_name.sui`
        tx.pure(duration, "u8"), // amount of years to register for. (1,2,3,4,5)
        tx.splitCoins(tx.gas, [tx.pure(rentprice * 1000000000)]), // price for 3 digits = 500 SUI (500*1_000_000_000) MIST, 4 digits = 100 SUI, 5 digits+ = 20SUI
        tx.object(SUI_CLOCK_OBJECT_ID),
      ],
    });
    const walletAddress = wallet?.getAddress();
    if (!walletAddress) {
      alert("Please connect to wallet.");
      return;
    }

    tx.transferObjects(
      [registration],
      tx.object((wallet as SuiWallet).getAddress()!)
    ); // transfer the name to the user
    // tx.transferObjects([registration], tx.pure(account, 'address')); // transfer the name to the user

    // sign and execute transaction
    await (wallet as SuiWallet).signAndSendTransaction({
      transactionBlock: tx,
    });

    return true;
  } catch (err: any) {
    console.error(err);
  }

  return false;
};
