import { useQueryAllDomains } from "@/hooks/useQueryDomains";
import React, { useState } from "react";
import SearchFilterModal from "../SearchFilter/SearchFilterModal";
import SortBy from "./SortBy";
import OrderBy from "./OrderBy";
import { normalise } from "@/utils/namehash";

type Props = {
  defaultInput?: string;
};

function DomainListHead({ defaultInput }: Props) {
  const [query, setQuery] = useState(defaultInput || "");
  const { data: res, refetch } = useQueryAllDomains(query);

  return (
    <div className=" items-center gap-4 px-2 ">
      <div className="block lg:hidden w-full  my-5 items-center">
        <input
          type="text"
          placeholder="Type Domain Name"
          className="input input-bordered w-full input-md mb-5 "
          value={query}
          onChange={(e) => {
            const { value } = e.target;
            try {
              const normalisedInput = normalise(value).replace(" ", "").trim();

              if ((normalisedInput as string).match("~")) {
                return;
              }

              setQuery((normalisedInput as string).replace(" ", "").trim());
            } catch (error) {
              console.log(`🚀 ~ file: DomainListHead.tsx:35 ~ error:`, error);
            }
          }}
        />
        <div className="flex gap-2 items-center justify-between">
          <div className="flex items-center gap-2 my-2">
            <SearchFilterModal id="domain_search_filters_modal_mb" />
            <button className="btn  btn-circle btn-sm" onClick={refetch}>
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
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
            </button>
            {/* <button className="btn  btn-square btn-sm">
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
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
            </button> */}
            <SortBy />
            <OrderBy />
          </div>
        </div>
      </div>
      <div className="w-full flex  items-center hidden lg:flex gap-2">
        <div>
          <SearchFilterModal id="domain_search_filters_modal_lg" />
        </div>
        <button className="btn  btn-circle btn-sm" onClick={refetch}>
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
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </button>
        <SortBy />
        <OrderBy />

        <input
          type="text"
          placeholder="Type Domain Name"
          className="input input-bordered w-full input-sm "
          value={query}
          onChange={(e) => {
            const { value } = e.target;
            try {
              const normalisedInput = normalise(value).replace(" ", "").trim();

              if ((normalisedInput as string).match("~")) {
                return;
              }

              setQuery((normalisedInput as string).replace(" ", "").trim());
            } catch (error) {
              console.log(`🚀 ~ file: DomainListHead.tsx:121 ~ error:`, error);
            }
          }}
        />
        {/* <button className="btn  btn-square btn-sm">
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
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
        </button> */}
      </div>
    </div>
  );
}

export default DomainListHead;
