import { evmProvider } from "@/utils/providers/evmProviders";
import { ethers } from "ethers";
import ERC20ABI from "@/configs/abis/ERC20.json";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
export const useAllowance = (
  erc20TokenAddress: string,
  account: string,
  spender: string,
  chainId: number,
  amount: number,
  decimals: number,
  params?: any
) => {
  const { signer } = params;
  const provider = evmProvider({ chainId, name: "POLYGON" });
  const erc20contract = new ethers.Contract(
    erc20TokenAddress,
    ERC20ABI,
    signer ? signer : provider
  );
  const [allowance, setallowance] = useState(0);
  useEffect(() => {
    const fetchAllowance = async () => {
      try {
        const [allowance] = await erc20contract.functions.allowance(
          account,
          spender
        );
        console.log(`🚀 ~ file: useAllowance.ts:26 ~ allowance:`, {
          allowance: new BigNumber(allowance?._hex)
            .div(10 ** decimals)
            .toNumber(),
        });
        setallowance(
          new BigNumber(allowance?._hex).div(10 ** decimals).toNumber()
        );
      } catch (error) {
        console.log(`🚀 ~ file: useAllowance.ts:30 ~ error:`, error);
      }
    };
    if (account && spender && decimals && amount > 0) {
      fetchAllowance();
    }
  }, [account, decimals, erc20contract.functions, spender]);
  const approve = async () => {
    try {
      console.log(
        `🚀 ~ file: useAllowance.ts:63 ~ erc20contract:`,
        erc20contract,
        new BigNumber(amount).multipliedBy(10 ** decimals).toString()
      );
      const tx = await erc20contract.functions.approve(
        spender,
        new BigNumber(amount).multipliedBy(10 ** decimals).toString()
      );
      const receipt = await tx.wait();
      console.log(`🚀 ~ file: useAllowance.ts:58 ~ receipt:`, receipt);
      if (receipt) {
        setallowance(Number(amount));
        return tx.hash;
      }
      throw Error("Transaction failed");
    } catch (error) {
      console.log(`🚀 ~ file: useAllowance.ts:48 ~ error:`, error);
      throw error;
    }
  };
  return {
    allowance,
    approve,
  };
};
