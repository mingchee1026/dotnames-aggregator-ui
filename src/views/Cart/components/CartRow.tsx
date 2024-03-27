import { TLD_TO_PLATFORM_DETAILS } from "@/configs/constants";
import { cartSlice } from "@/redux/slices/cartSlice";
import { formatWrapedText, formatZetaName } from "@/utils";
import React from "react";
import { useDispatch } from "react-redux";

interface SearchResult {
  name: string;
  status: string;
  address: string;

  canRegister: boolean;
  isLoading?: boolean;
  platform: any;
  index: number;
  tld: string;
  price?: number;
}
function CartRow({
  name,
  status,
  address,
  canRegister,
  platform,
  isLoading,
  index,
  tld,
  price,
}: SearchResult) {
  console.log(`🚀 ~ file: CartRow.tsx:30 ~ price:`, price);
  // @ts-ignore
  const platformData = TLD_TO_PLATFORM_DETAILS[tld];

  const dispatch = useDispatch();
  const handleRemoveDomain = () => {
    dispatch(cartSlice.actions.removeFromCartByName(name));
    // dispatch(cartSlice.actions.removeFromCart(index));
  };
  return (
    <div className="p-3 rounded-xl items-center gap-2 shadow-sm border border-gray-400/40 space-y-3 w-full lg:w-[16em] h-fit ">
      <div className="flex justify-between items-center">
        <div className="border border-gray-400/30 w-fit p-3 rounded-[1em] bg-base-100">
          <img
            src={platformData?.icon ?? "/images/platforms/ens.png"}
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div className="flex gap-2">
          {
            <button
              className="btn  btn-square  btn-sm btn-error text-white opacity-75 "
              onClick={handleRemoveDomain}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
          }
        </div>
      </div>

      {isLoading ? (
        <p className="w-[60%] h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>
      ) : (
        <div className="tooltip" data-tip={name}>
          <p className="text-xl font-[500]">{formatWrapedText(name, 5, 6)}</p>
        </div>
      )}
      <div>
        {isLoading ? (
          <p className="w-full h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>
        ) : (
          <p className="text-sm">
            ${price} {platformData?.coin?.symbol} per year
          </p>
        )}
      </div>
    </div>
  );
}

export default CartRow;
