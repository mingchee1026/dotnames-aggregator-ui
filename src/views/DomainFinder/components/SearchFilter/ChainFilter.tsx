import { CHAIN_FILTER } from "@/configs/constants";
import { queryDomainsSlice } from "@/redux/slices/queryDomainsSlice";
import { useAppSelector } from "@/redux/store";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {};

function ChainFilter({ }: Props) {
  const dispatch = useDispatch();
  const [chainFilter, setChainFilter] = useState<string[]>([]);
  const appliedDomainFilters = useAppSelector(
    (state) => state.domainQuery.appliedFilters
  );
  const filterCounts = useAppSelector(
    (state) => state.domainQuery.chainFilterCount
  );
  const appliedChainFilter = _.get(appliedDomainFilters, "chainFilter", []);
  const onClickChainFilter = (e: React.FormEvent<HTMLInputElement>) => {
    const isChecked = _.get(e, "target.checked", false);
    const checkedValue = _.get(e, "target.value", "");
    if (isChecked) {
      setChainFilter([...chainFilter, checkedValue]);
    } else {
      const filteredDomainStatus = _.filter(
        chainFilter,
        (status) => status !== checkedValue
      );
      setChainFilter([...filteredDomainStatus]);
    }
  };

  useEffect(() => {
    dispatch(
      queryDomainsSlice.actions.setAppliedFilter({
        key: "chainFilter",
        value: chainFilter,
      })
    );
  }, [chainFilter]);

  useEffect(() => {
    if (_.isEmpty(appliedDomainFilters)) {
      setChainFilter([]);
    }
  }, [appliedDomainFilters]);
  return (
    <div className="collapse collapse-arrow bg-base-200/50">
      <input type="checkbox" name="__market_status_accordion" />
      <div className="collapse-title text-sm">Chains</div>
      <div className="collapse-content">
        {_.map(CHAIN_FILTER, (chainFilterItem) => {
          const chainFilterValue = _.get(chainFilterItem, "value");
          return (
            <div className="form-control">
              <label className="cursor-pointer label items-center">
                <div className="flex justify-start gap-2 items-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    onClick={(e) => {
                      onClickChainFilter(e);
                    }}
                    value={chainFilterValue}
                    checked={_.includes(appliedChainFilter, chainFilterValue)}
                  />
                  <span className="label-text text-xs">
                    {_.get(chainFilterItem, "label")}
                  </span>
                </div>

                <span className=" text-xs">
                  {_.get(filterCounts, `${chainFilterValue}.count`)}[
                  {_.get(filterCounts, `${chainFilterValue}.percentage`) + `%`}]
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChainFilter;
