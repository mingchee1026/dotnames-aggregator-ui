import { useEffect, useState } from "react";
import { useEnsRegistrar } from "./useContracts";
import { ethers } from "ethers";
import { normalise as normalize } from "@/utils/namehash";
import { getDomainWitoutTld } from "@/utils";

export const useEnsDomainRentPrice = (
  label: string,
  duration: number,
  cb?: (value?: any) => void,
  disabled?: boolean,
  defaultPrice?: number
): any => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ensRegistrar = useEnsRegistrar({});

  useEffect(() => {
    const fetchRentPrice = async (domainName: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const price = await ensRegistrar.rentPrice(domainName, duration);
        const bufferedPrice = price[0].mul(110).div(100);
        const realPrice = ethers.utils.formatEther(bufferedPrice);
        cb && cb(realPrice);
        setData(realPrice);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred");
      }

      setIsLoading(false);
    };

    const normalisedLabel = normalize(getDomainWitoutTld(label));
    if (disabled) {
      defaultPrice && setData(defaultPrice.toFixed(5));
      cb && cb(0);
      return;
    } else {
      fetchRentPrice(normalisedLabel);
    }
  }, [label, duration, disabled, ensRegistrar, cb, defaultPrice]);
  return { data, isLoading, error };
};
