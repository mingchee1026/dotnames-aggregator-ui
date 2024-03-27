import { ChainId } from "@/configs/chainIds";
import { contracts } from "@/configs/contracts";
import { normalise } from "@/utils/namehash";
import { seiProvider } from "@/utils/providers/seiProvider";
import { SEI_CHAIN_ID } from "@/views/Cart/components/Adapters/SeiCart/config";
import { useEffect, useState } from "react";

export const useSeiDomainRentPrice = (
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
        const cosmWasmClient = await seiProvider(SEI_CHAIN_ID);

        // Get price
        const queryMsg = {
          rent_price: {
            name: domainName,
            duration,
          },
        };

        // Query a smart contract state
        const queryResponse = await cosmWasmClient.queryContractSmart(
          contracts.Controller[ChainId.SEI],
          queryMsg
        );
        const price = queryResponse.price / 10e5;
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
