import { useAppSelector } from "@/redux/store";
import React from "react";

type Props = {};
const DUMMY_LIST = [
  "111",
  "abc",
  "11111",
  "xyz",
  "3000",
  "9999",
  "999",
  "111",
  "abc",
  "11111",
  "xyz",
  "3000",
  "9999",
  "999",

  "111",
  "abc",
  "11111",
  "xyz",
  "3000",
  "9999",
  "999",
  "xyz",
  "3000",

  "3000",
];

function OtherDomains({}: Props) {

  return (
    <div className=" p-2 border  border-gray-500/20 rounded-xl space-y-5 overflow-hidden">
      <div className="flex justify-between items-center">
        <div role="tablist" className="tabs tabs-bordered">
          <a role="tab" className="tab  tab-active">
            Hot Names
          </a>
        </div>
      </div>
      <div className="space-y-2 px-2 overflow-scroll  max-h-[70vh]">
        {DUMMY_LIST?.map((v: string, idx: number) => {
          return (
            <div
              className="flex justify-between w-full p-3 bg-base-200/50 rounded-lg"
              key={`${idx}__HOT_NAMES_LIST__${v}`}
            >
              <p className="text-sm">{v}</p>
              <p className="text-xs">22</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OtherDomains;
