import { normalise } from "@/utils/namehash";
import axios from "axios";
import { useEffect, useState } from "react";

export const useUdDomainRentPrice = (
  label: string,
  duration: number, // Lifetime domains - unwanted field
  cb?: (value?: any) => void,
  disabled?: boolean,
  defaultPrice?: number
): any => {
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
        const price = result.availability.price.listPrice.usdCents / 100;
        cb && cb(price);

        setData(price.toString());
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred");
      }

      setIsLoading(false);
    };

    const normalisedLabel = normalise(label);
    if (disabled) {
      defaultPrice && setData(defaultPrice?.toFixed(5));
      cb && cb(0);
    } else {
      fetchRentPrice(normalisedLabel);
    }
  }, [label, disabled, defaultPrice]);

  return { data, isLoading, error };
};
