import { useEffect, useState } from "react";

export const useLocalStore = () => {
  const [wallet, setWallet] = useState<string>("");
  const [chainId, setChainId] = useState<number>(0);

  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");
    const storedChainId = localStorage.getItem("chainId");

    if (typeof window !== "undefined" && storedWallet && storedChainId) {
      setWallet(storedWallet);
      setChainId(parseInt(storedChainId));
    }
  }, []);

  return { wallet, chainId };
};
