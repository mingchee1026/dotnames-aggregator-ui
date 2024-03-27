import { queryDomainsSlice } from "@/redux/slices/queryDomainsSlice";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {};

function SortBy({}: Props) {
  const dispatch = useDispatch();
  const filteredList = useAppSelector((s) => s.domainQuery.filteredList);
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1 btn-square btn-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li
          onClick={() => {
            const sortedList = [...filteredList]?.sort(
              (a, b) => a.price - b.price
            );
            dispatch(queryDomainsSlice.actions.setFilteredList(sortedList));
          }}
        >
          <p className="p-3">Price </p>
        </li>
        <li
          onClick={() => {
            const sortedList = [...filteredList]?.sort(
              (a, b) => a.name.length - b.name.length
            );
            dispatch(queryDomainsSlice.actions.setFilteredList(sortedList));
          }}
        >
          <p className=" p-3">Length </p>
        </li>
      </ul>
    </div>
  );
}

export default SortBy;
