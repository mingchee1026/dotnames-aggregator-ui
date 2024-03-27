import React from "react";
import MarketStatusFilter from "./MarketStatusFilter";
import DomainStatusFilter from "./DomainStatusFilter";
import PriceFilter from "./PriceFilter";
import ProjectFilter from "./ProjectFilter";
import ChainFilter from "./ChainFilter";
import TldFilter from "./TldFilter";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import _ from "lodash";
import { queryDomainsSlice } from "@/redux/slices/queryDomainsSlice";
import FilterApplyBtn from "./FilterApplyBtn";

type Props = {
  defaultInput?: string;
};

function SearchFilters({ defaultInput }: Props) {
  const dispatch = useDispatch();
  const domainList = useAppSelector((state) => state.domainQuery.domainsList);

  const clearAllAppliedFilters = () => {
    dispatch(queryDomainsSlice.actions.setClearAppliedFilters({}));
    dispatch(queryDomainsSlice.actions.setFilteredList(domainList));
  };
  return (
    <div className=" p-2 border  border-gray-500/20 rounded-xl space-y-2 h-[80vh] overflow-scroll relative bottom-0">
      <DomainStatusFilter />
      {/* <MarketStatusFilter /> */}
      <PriceFilter />
      <ProjectFilter />
      <ChainFilter />
      <TldFilter />
      {/* <div className="modal-action sticky bottom-0 z-50">
        <button className="btn btn-outline btn-sm" onClick={clearAllAppliedFilters}>
          {" "}
          Clear
        </button>
        <FilterApplyBtn id="" />
      </div> */}
    </div>
  );
}

export default SearchFilters;
