import { UD_SUPPORTED_TLDS } from "@/configs/constants";
import { cartSlice } from "@/redux/slices/cartSlice";
import { useAppSelector } from "@/redux/store";
import { DomainInterFace } from "@/types/domain";
import { formatWrapedText } from "@/utils";
import BigNumber from "bignumber.js";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type Props = {};
interface SearchResult {
  name: string;
  status: string;
  address: string;
  price: number;
  canRegister: boolean;
  isLoading: boolean;
  platform: any;
  tld: string;
}

function DomainRow({
  name,
  status,
  address,
  price,
  canRegister,
  platform,
  isLoading,
  tld,
  expiry,
  isRefetching,
}: DomainInterFace) {
  if (UD_SUPPORTED_TLDS.includes(tld)) {
  }
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  // @ts-ignore
  const isInCart = cart.find((d) => d?.name === name);

  const handleAddToCart = () => {
    dispatch(
      cartSlice.actions.addToCart({
        name,
        status,
        address,
        price,
        canRegister,
        platform,
        tld,
      })
    );
    toast.success(`${name} Added to the cart`);
  };
  if (isLoading) {
    return (
      <tr className="hover:bg-base-200/20 bg-base-200/50 animate-pulse gap-0">
        <td className="lg:px-2 px-0">
          <div className="flex items-center gap-1 lg:gap-3 px-0  w-fit">
            <div className="avatar">
              <div className="mask mask-squircle w-9 h-9 lg:w-12 lg:h-12 p-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-b bg-primary animate-pulse"></div>
              </div>
            </div>
            <div className="h-full w-full space-y-2">
              <div className="h-5 bg-base-300 rounded col-span-2 w-14 lg:w-20"></div>

              <div className="h-5 bg-base-300 rounded col-span-2 w-14 lg:w-20"></div>
            </div>
          </div>
        </td>
        <td className="lg:block hidden">
          <div className="h-5 bg-base-300 rounded col-span-2 w-14 lg:w-20"></div>
        </td>
        <td className="px-2">
          <div className="h-5 bg-base-300 rounded col-span-2 w-14 lg:w-20"></div>
        </td>
        <td className="px-2">
          <div className="flex gap-2">
            <button className="btn  btn-square btn-sm animate-pulse btn-disabled"></button>
            <button className="btn  btn-square btn-sm animate-pulse btn-disabled"></button>
          </div>
        </td>
      </tr>
    );
  }
  return (
    <tr className="hover:bg-base-200/20 h-full gap-0 ">
      <td className="px-2">
        <div className="flex items-center w-fit md:gap-3 gap-0">
          <div className="avatar">
            <div className="mask mask-squircle w-7 h-7 lg:w-12 lg:h-12 lg:p-2">
              {platform?.icon ? (
                <img
                  src={platform?.icon}
                  alt="Ens"
                  className="w-5 h-5 !object-contain p-1"
                />
              ) : (
                <div className="w-5 h-5 lg:w-7 lg:h-7 rounded-full bg-gradient-to-b bg-primary"></div>
              )}
            </div>
          </div>
          <div>
            <p className="lg:block hidden">{formatWrapedText(name, 5, 10)}</p>
            <p className="block lg:hidden">{formatWrapedText(name, 5, 5)}</p>
            <div
              className={`text-xs ${
                status === "Available"
                  ? "text-green-500"
                  : "opacity-50 text-error"
              }`}
            >
              {status}
            </div>
          </div>
        </div>
      </td>
      <td className="px-2">
        <div className="flex items-center">
          {canRegister ? (
            <p>
              {" "}
              {new BigNumber(price!)?.toFixed(4)} {platform?.coin?.symbol}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
      </td>
      <td className="lg:block hidden px-2">
        <div className="h-full flex items-center">
          <p>
            {Number(expiry) > 0 ? new Date(Number(expiry)).toDateString() : "-"}
          </p>
        </div>
      </td>
      <td className="px-2">
        <div className="flex gap-2">
          {!isInCart && canRegister ? (
            <button
              className="btn  btn-square btn-sm btn-primary text-white"
              onClick={handleAddToCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
            </button>
          ) : (
            <div
              className="tooltip font-normal before:text-[12px]"
              data-tip={
                !canRegister
                  ? "Already registered domain"
                  : "Already added to cart"
              }
            >
              <button
                className="btn  btn-square btn-sm btn-primary text-white btn-disabled"
                title="Already added to cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
              </button>
            </div>
          )}
          <button className="btn  btn-square btn-sm">
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
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <line x1="12" x2="12" y1="16" y2="12" />
              <line x1="12" x2="12.01" y1="8" y2="8" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default DomainRow;
