import React from "react";
import DomainStatusFilter from "./DomainStatusFilter";
import MarketStatusFilter from "./MarketStatusFilter";
import PriceFilter from "./PriceFilter";
import ProjectFilter from "./ProjectFilter";
import ChainFilter from "./ChainFilter";
import TldFilter from "./TldFilter";
import { useAppSelector } from "@/redux/store";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { queryDomainsSlice } from "@/redux/slices/queryDomainsSlice";
import FilterApplyBtn from "./FilterApplyBtn";

type Props = { id: string };

function SearchFilterModal({ id }: Props) {
  const dispatch = useDispatch();
  const domainList = useAppSelector((state) => state.domainQuery.domainsList);
  const appliedFilters = useAppSelector(
    (state) => state.domainQuery.appliedFilters
  );
  const filterDomainList = () => {
    if (_.isEmpty(appliedFilters)) {
      dispatch(queryDomainsSlice.actions.setFilteredList(domainList));
    } else {
      dispatch(queryDomainsSlice.actions.setFilteredList([domainList[0]]));
    }
    (document.getElementById(id) as HTMLDialogElement).close();
  };
  return (
    <div>
      <button
        className="  btn btn-sm btn-circle"
        onClick={() => {
          try {
            (document.getElementById(id) as HTMLDialogElement).showModal();
          } catch (error) {
            console.log(`🚀 ~ file: SearchFilterModal.tsx:22 ~ error:`, error);
          }
        }}
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
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      </button>

      <dialog id={id} className="modal">
        <div className="modal-box">
          <div className=" p-2 border  border-gray-500/20 rounded-xl space-y-2 ">
            <DomainStatusFilter />
            <MarketStatusFilter />
            <PriceFilter />
            <ProjectFilter />
            <ChainFilter />
            <TldFilter />
          </div>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() =>
                (document.getElementById(id) as HTMLDialogElement).close()
              }
            >
              {" "}
              Close
            </button>
            <FilterApplyBtn id={id} />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default SearchFilterModal;
