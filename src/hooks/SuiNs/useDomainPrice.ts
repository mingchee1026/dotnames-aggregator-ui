import { normalise } from "@/utils/namehash";
import { useEffect, useState } from "react";

export const useSuiNsDomainRentPrice = (
  label: string,
  duration: number,
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
        let price = 20;

        if (label.length === 3) {
          price = 500;
        } else if (label.length === 4) {
          price = 100;
        }
        cb && (await cb(price));
        setData(price.toString());
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred");
      }

      setIsLoading(false);
    };

    const normalisedLabel = normalise(label);
    if (disabled) {
      defaultPrice && setData(defaultPrice.toFixed(5));
      cb && cb(0);
      return;
    } else {
      fetchRentPrice(normalisedLabel);
    }
  }, [label, duration, disabled, cb, defaultPrice]);

  return { data, isLoading, error };
};
