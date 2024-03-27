import { SUPPORTED_TLDS } from "@/configs/constants";
import { normalise } from "@/utils/namehash";
import { hasSpecialCharacters } from "@/utils/validators";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import SearchDomainResult from "./SearchDomainResult";
import { Average } from "next/font/google";

type Props = {
  subActionOnSelect?: () => void;
};

const SearchDomainInput = ({ subActionOnSelect }: Props) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [isAvaiable, setAvailable] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const placeholderText = 'Search your domain here...';
  let charIndex = 0;

  const typeWriter = () => {
    if (charIndex < placeholderText.length) {
      setPlaceholder(placeholderText.substring(0, charIndex + 1) + '|');
      charIndex++;
      setTimeout(typeWriter, 200); // Adjust the typing speed by changing the timeout value
    } else {
      setPlaceholder(placeholderText);
      charIndex = 0; // Reset the index for continuous typing
      setTimeout(typeWriter, 1000); // Wait for a second before restarting the typing effect
    }
  };

  useEffect(() => {
    typeWriter();
  }, []);
  const handleChange = (event: any) => {
    try {
      const { value } = event.target;

      const normalisedInput = normalise(value).replace(" ", "").trim();

      if ((normalisedInput as string).match("~")) {
        return;
      }
      setSearchInput((normalisedInput as string).replace(" ", "").trim());

      setAvailable(false);
    } catch (error) {
      toast.error("Please avoid special characters", {
        style: {
          background: "#363636",
          color: "lightgray",
        },
      });
      return;
    }
  };
  const handleSearch = () => {
    try {
      const value = searchInput;

      const normalisedInput = normalise(value).replace(" ", "").trim();

      if ((normalisedInput as string).length < 3) {
        toast.error("Require domain length larger than 3", {
          style: {
            background: "#363636",
            color: "lightgray",
          },
        });
        return;
      }

      if ((normalisedInput as string).length >= 65) {
        toast.error("Require domain length less than 65", {
          style: {
            background: "#363636",
            color: "lightgray",
          },
        });
        return;
      }

      if ((value as string).match("~")) {
        toast.error("Require domain length less than 65", {
          style: {
            background: "#363636",
            color: "lightgray",
          },
        });
        return;
      }
      router.push(`/domains/${searchInput?.trim()}`);
    } catch (error) {
      toast.error("Please avoid special characters", {
        style: {
          background: "#363636",
          color: "lightgray",
        },
      });
      return;
    }
  };

  // const { data, isLoading, isFetched } = useAvailabilityQuery(searchInput);
  const handleDomainSelect = (domain: string) => {
    subActionOnSelect && subActionOnSelect();
    const isInvalid = hasSpecialCharacters(searchInput);

    if (isInvalid || (searchInput as string).length >= 65) {
      toast.error("Invalid domain name", {
        style: {
          background: "#363636",
          color: "lightgray",
        },
      });
      return;
    }

    router.push(`/domain/${domain?.trim()}`);
  };
  return (
    <div className="w-full dropdown dropdown-bottom">
      <div className="flex items-center justify-around gap-2">
        <div className="flex items-stretch w-full bg-neutral-100   overflow-hidden rounded-full border border-gray-400/50 shadow-2xl">

          <div className="relative w-full">
            <input
              type="text"
              placeholder={placeholder}
              className="w-full rounded-full input focus:outline-none font-[400] bg-neutral-100 text-sm text-zinc-800 placeholder:text-zinc-700 focus:border-none"
              value={searchInput}
              onChange={handleChange}
              id="domain-search-input"
            />
          </div>
          <button
            className="text-white font-[500] btn btn-info rounded-none h-fu"
            onClick={() => {
              handleSearch();
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.16665 14.5631C11.8486 14.5631 14.8334 11.5783 14.8334 7.89636C14.8334 4.21443 11.8486 1.22964 8.16665 1.22964C4.48473 1.22964 1.49994 4.21443 1.49994 7.89636C1.49994 11.5783 4.48473 14.5631 8.16665 14.5631Z"
                stroke="white"
                stroke-width="1.50001"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.5003 16.2297L12.8752 12.6047"
                stroke="white"
                stroke-width="1.50001"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span>Search</span>
          </button>
        </div>
      </div>

      {/* {searchInput?.trim() == "" && (
        <ul className="w-full p-2 mt-2 shadow text-sm font-[400] menu bg-[#5e57573c]/5 border-[1px] border-[#3F3E41]/5 backdrop-blur-sm rounded-box">
          <p className="p-3 ">Type domain name to search </p>
        </ul>
      )} */}
      {/* {isAvaiable &&
        SUPPORTED_TLDS.map((prefix: string) => (
          <SearchDomainResult
            key={prefix}
            prefix={prefix}
            query={searchInput}
            onSelect={handleDomainSelect}
          />
        ))} */}
      <Toaster />
    </div>
  );
};

export default SearchDomainInput;
