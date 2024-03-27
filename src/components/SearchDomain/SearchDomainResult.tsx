import React, { useState, useEffect } from "react";

import { formatZetaName } from "@/utils";
import { normalise } from "@/utils/namehash";
import { hasSpecialCharacters } from "@/utils/validators";

interface SearchResult {
  name: string;
  status: string;
  address: string;
  price: number;
  canRegister: boolean;
}

const SearchDomainResult = ({
  prefix,
  query,
  onSelect,
}: {
  prefix: string;
  query: string;
  onSelect: any;
}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<SearchResult | null>(null);

  const handleSearch = async () => {
    try {
      setData({
        name: `${query}.${prefix}`,
        status: "",
        address: "",
        price: 0,
        canRegister: false,
      });

      setLoading(true);

      const res = await fetch(`/api/lookup?prefix=${prefix}&name=${query}`);
      const result = (await res.json()) as SearchResult;
      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  if (!data || !data.name) {
    return <div></div>;
  }

  return (
    <ul
      tabIndex={0}
      className="w-full p-2 mt-2 shadow text-sm font-[400] menu bg-[#5e57573c]/5 border-[1px] border-[#3F3E41]/5 backdrop-blur-sm rounded-box"
    >
      <div
        onClick={() => onSelect(`${query}.${prefix}`)}
        className="md:p-2 p-1 cursor-pointer active:bg-[#5e575726]"
      >
        <div className="flex items-center w-full gap-2 md:space-x-4">
          <span className="w-7 h-7 rounded-full bg-gradient-to-b from-[#c9cef5] via-[#7a8de6] to-[#6e80e3]"></span>
          <div className="flex-none block w-5 h-5 rounded-full bg-gradient-to-br from-custom-red to-custom-purple order-0 md:hidden"></div>
          <div className="flex-1 block py-1 space-y-6">
            {formatZetaName(query)}.{prefix}
          </div>
          {isLoading && (
            <div>
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-black animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
          {(hasSpecialCharacters(query) ||
            query?.length >= 65 ||
            query?.length < 3) && (
            <div className="text-[0.7em] badge badge-error md:badge-md px-[2px]">
              Invalid
            </div>
          )}
          {!isLoading && data && !data.address && (
            <div className="text-[0.7em] badge badge-success md:badge-md px-[2px]">
              Available
            </div>
          )}

          {!isLoading && data && data.address && (
            <div className="badge badge-error text-[0.7em] md:badge-md px-[2px]">
              Registered
            </div>
          )}
        </div>
      </div>
    </ul>
  );
};

export default SearchDomainResult;
