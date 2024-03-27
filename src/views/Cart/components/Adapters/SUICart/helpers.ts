import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";
// @ts-ignore
import type { SuiWallet } from "multichain-walletkit-sdk-sui";
import { getDomainWitoutTld } from "@/utils";

import { contracts } from "@/configs/contracts";
import { GasPrice, coins } from "@cosmjs/stargate";
import { DomainInterFace } from "@/types/domain";
import { YEAR_TO_SEC } from "@/configs/constants";
import BigNumber from "bignumber.js";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
// const { SuiWallet } = require("multichain-walletkit-sdk-sui");

export const bulkRegisterSUINS = async ({
  wallet,
  sender,
  domainsList,
  chainId,
}: {
  wallet: any | undefined;
  sender: string;
  domainsList: DomainInterFace[];
  chainId: any;
}) => {
  try {
    const tx = new TransactionBlock();

    const registrations = domainsList?.map((domain: DomainInterFace) => {
      const duration = domain?.years!;
      const lowercaseLabel = domain?.name?.toLowerCase();

      const label = getDomainWitoutTld(domain?.name);
      let rentprice = 2 * duration;
      if (label.length === 3) {
        rentprice = 5 * duration;
      } else if (label.length >= 4) {
        rentprice = 1 * duration;
      }
      const registration = tx.moveCall({
        target:
          "0x0cf216d6964d17c08e35bd85d3c57bee7413209c63f659567b7b44ce125bc44f::register::register",
        arguments: [
          tx.object(
            "0xedc672fadedee348108618da7555f771d4fec8d3331779a8411ff8184aded726"
          ), // SUINS_ADDRESS
          // tx.pure(["sui", label]), // domain could be `my_name.sui`
          tx.pure(lowercaseLabel), // domain could be `my_name.sui`
          tx.pure(duration), // amount of years to register for. (1,2,3,4,5)
          tx.splitCoins(tx.gas, [tx.pure(rentprice * 1_000_000_000)]), // price for 3 digits = 500 SUI (500*1_000_000_000) MIST, 4 digits = 100 SUI, 5 digits+ = 20SUI
          tx.object(
            "0x0000000000000000000000000000000000000000000000000000000000000006"
          ),
        ],
      });
      tx.moveCall({
        target:
          "0x9af70a4cb6d7144e68fd972eef672a74c7fe41aa5c0bb67ba40d7d1ae87bfb19::direct_setup::set_target_address",
        arguments: [
          tx.object(
            "0xedc672fadedee348108618da7555f771d4fec8d3331779a8411ff8184aded726"
          ), // SUINS_ADDRESS
          // tx.pure(["sui", label]), // domain could be `my_name.sui`
          registration,
          tx.pure(
            "0xa4e632aab1f53ffd2207fde89d8d5d16b347258d58d472e175303d320b37de9f"
          ),
          tx.object(
            "0x0000000000000000000000000000000000000000000000000000000000000006"
          ),
        ],
      });
      return registration;
      // return tx.moveCall({
      //   target:
      //     "0x701b8ca1c40f11288a1ed2de0a9a2713e972524fbab748a7e6c137225361653f::register::register",
      //   arguments: [
      //     tx.object(
      //       "0xedc672fadedee348108618da7555f771d4fec8d3331779a8411ff8184aded726"
      //     ), // SUINS_ADDRESS
      //     tx.pure(label, "string"), // domain could be `my_name.sui`
      //     tx.pure(duration, "u8"), // amount of years to register for. (1,2,3,4,5)
      //     tx.splitCoins(tx.gas, [tx.pure(rentprice * 1000000000)]), // price for 3 digits = 500 SUI (500*1_000_000_000) MIST, 4 digits = 100 SUI, 5 digits+ = 20SUI
      //     tx.object(SUI_CLOCK_OBJECT_ID),
      //   ],
      // });
    });

    const walletAddress = wallet?.getAddress();
    if (!walletAddress) {
      alert("Please connect to wallet.");
      return;
    }

    tx.transferObjects(
      [...registrations],
      tx.pure(
        "0xa4e632aab1f53ffd2207fde89d8d5d16b347258d58d472e175303d320b37de9f",
        "address"
      )
    ); // transfer the name to the user
    // tx.transferObjects([registration], tx.pure(account, 'address')); // transfer the name to the user
    console.log(`🚀 ~ file: helpers.ts:63 ~ tx:`, tx, registrations);

    // sign and execute transaction
    const txn = await (wallet as SuiWallet).signAndSendTransaction({
      transactionBlock: tx,
    });

    return txn;
  } catch (err: any) {
    console.error(err);
  }
};
export const registerSUINS = async ({
  wallet,
  name,
  duration,
  account,
}: {
  wallet: SuiWallet;
  name: string;
  duration: number;
  account: string;
}) => {
  try {
    const lowercaseLabel = name?.toLowerCase();
    const label = getDomainWitoutTld(lowercaseLabel);
    let rentprice = 2 * duration;

    if (label.length === 3) {
      rentprice = 5 * duration;
    } else if (label.length >= 4) {
      rentprice = 1 * duration;
    }

    const rpcUrl = getFullnodeUrl("testnet");
    // const rpcUrl = getFullnodeUrl("mainnet");
    const client = new SuiClient({ url: rpcUrl });

    const tx = new TransactionBlock();
    const registration = tx.moveCall({
      target:
        "0x0cf216d6964d17c08e35bd85d3c57bee7413209c63f659567b7b44ce125bc44f::register::register",
      arguments: [
        tx.object(
          "0xedc672fadedee348108618da7555f771d4fec8d3331779a8411ff8184aded726"
        ), // SUINS_ADDRESS
        // tx.pure(["sui", label]), // domain could be `my_name.sui`
        tx.pure(lowercaseLabel), // domain could be `my_name.sui`
        tx.pure(duration), // amount of years to register for. (1,2,3,4,5)
        tx.splitCoins(tx.gas, [tx.pure(rentprice * 1_000_000_000)]), // price for 3 digits = 500 SUI (500*1_000_000_000) MIST, 4 digits = 100 SUI, 5 digits+ = 20SUI
        tx.object(
          "0x0000000000000000000000000000000000000000000000000000000000000006"
        ),

        // tx.pure(
        //   "0xa4e632aab1f53ffd2207fde89d8d5d16b347258d58d472e175303d320b37de9f"
        // ),

        // tx.pure(
        //   "0xa4e632aab1f53ffd2207fde89d8d5d16b347258d58d472e175303d320b37de9f"
        // ),
        // tx.moveCall({
        //   target:
        //     "0x9af70a4cb6d7144e68fd972eef672a74c7fe41aa5c0bb67ba40d7d1ae87bfb19::set_target_address::DirectSetup",
        //   arguments: [],
        // }),
        // tx.moveCall({
        //   target:
        //     "0x9af70a4cb6d7144e68fd972eef672a74c7fe41aa5c0bb67ba40d7d1ae87bfb19::set_reverse_lookup::DirectSetup",
        // }),
      ],
    });
    tx.moveCall({
      target:
        "0x9af70a4cb6d7144e68fd972eef672a74c7fe41aa5c0bb67ba40d7d1ae87bfb19::direct_setup::set_target_address",
      arguments: [
        tx.object(
          "0xedc672fadedee348108618da7555f771d4fec8d3331779a8411ff8184aded726"
        ), // SUINS_ADDRESS
        // tx.pure(["sui", label]), // domain could be `my_name.sui`
        registration,
        tx.pure(
          "0xa4e632aab1f53ffd2207fde89d8d5d16b347258d58d472e175303d320b37de9f"
        ),
        tx.object(
          "0x0000000000000000000000000000000000000000000000000000000000000006"
        ),
      ],
    });
    console.log(`🚀 ~ file: helpers.ts:124 ~ registration:`, {
      registration: registration,
      rentprice,
      tx,
      gas: tx.gas,
    });

    // const registration = tx.moveCall({
    //   target:
    //     "0x9d451fa0139fef8f7c1f0bd5d7e45b7fa9dbb84c2e63c2819c7abd0a7f7d749d::register::register",
    //   arguments: [
    //     tx.object(
    //       "0x6e0ddefc0ad98889c04bab9639e512c21766c5e6366f89e696956d9be6952871"
    //     ), // SUINS_ADDRESS
    //     tx.pure(label, "string"), // domain could be `my_name.sui`
    //     tx.pure(duration, "u8"), // amount of years to register for. (1,2,3,4,5)
    //     tx.splitCoins(tx.gas, [tx.pure(rentprice * 1000000000)]), // price for 3 digits = 500 SUI (500*1_000_000_000) MIST, 4 digits = 100 SUI, 5 digits+ = 20SUI
    //     tx.object(SUI_CLOCK_OBJECT_ID),
    //   ],
    // });
    const walletAddress = wallet?.getAddress();
    if (!walletAddress) {
      alert("Please connect to wallet.");
      return;
    }

    tx.transferObjects(
      [registration],
      tx.pure(
        "0xa4e632aab1f53ffd2207fde89d8d5d16b347258d58d472e175303d320b37de9f",
        "address"
      )
    ); // transfer the name to the user
    // tx.transferObjects([registration], tx.pure(account, 'address')); // transfer the name to the user

    // sign and execute transaction
    const txn = await (wallet as SuiWallet).signAndSendTransaction({
      transactionBlock: tx,
    });

    return txn;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};
