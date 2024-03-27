//@ts-ignore 
import { SuiWallet } from "multichain-walletkit-sdk-sui";
import { useSuiNsDomainRentPrice } from "./useDomainPrice";
import { SUI_CLOCK_OBJECT_ID, TransactionBlock, } from "@mysten/sui.js";
export const useSuiNsRegister = async (
  wallet: SuiWallet,
  label: string,
  duration: number
) => {
    const rentPrice = useSuiNsDomainRentPrice(label, duration);
  try {
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
        tx.splitCoins(tx.gas, [tx.pure(rentPrice * 1000000000)]), // price for 3 digits = 500 SUI (500*1_000_000_000) MIST, 4 digits = 100 SUI, 5 digits+ = 20SUI
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
    ); 
    await (wallet as SuiWallet).signAndSendTransaction({
      transactionBlock: tx,
    });

    return true;
  } catch (err: any) {
    console.error(err);
  }

  return false;
};
