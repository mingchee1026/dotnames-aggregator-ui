import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { normalise } from "@/utils/namehash";
import { useSidRegistrar } from "./useContracts";

export const useSidDomainRentPrice = (label: string, duration: number): any => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sidRegistrar = useSidRegistrar({})
  useEffect(() => {
    const fetchRentPrice = async (domainName: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const price = await sidRegistrar.rentPrice(domainName, duration);
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