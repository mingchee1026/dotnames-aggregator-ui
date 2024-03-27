import { TLD_FILTER } from "@/configs/constants";
import { queryDomainsSlice } from "@/redux/slices/queryDomainsSlice";
import { useAppSelector } from "@/redux/store";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {};

function TldFilter({ }: Props) {
  const dispatch = useDispatch();
  const [tldFilter, setTldFilter] = useState<string[]>([]);
  const appliedDomainFilters = useAppSelector(
    (state) => state.domainQuery.appliedFilters
  );
  const filterCounts = useAppSelector(
    (state) => state.domainQuery.tldFilterCount
  );
  const appliedTldFilters = _.get(appliedDomainFilters, 'tldFilter', [])
  const onClickTldFilter = (e: React.FormEvent<HTMLInputElement>) => {
    const isChecked = _.get(e, "target.checked", false);
    const checkedValue = _.get(e, "target.value", "");
    if (isChecked) {
      setTldFilter([...tldFilter, checkedValue]);
    } else {
      const filteredDomainStatus = _.filter(
        tldFilter,
        (status) => status !== checkedValue
      );
      setTldFilter([...filteredDomainStatus]);
    }
  };

  useEffect(() => {
    dispatch(
      queryDomainsSlice.actions.setAppliedFilter({
        key: "tldFilter",
        value: tldFilter,
      })
    );
  }, [tldFilter]);

  useEffect(() => {
    if (_.isEmpty(appliedDomainFilters)) {
      setTldFilter([]);
    }
  }, [appliedDomainFilters]);

  return (
    <div className="collapse collapse-arrow bg-base-200/50">
      <input type="checkbox" name="__market_status_accordion" />
      <div className="collapse-title text-sm">TLDs</div>
      <div className="collapse-content">
        {_.map(TLD_FILTER, (tldFilterItem) => {
          const value = _.get(tldFilterItem, "value");
          return (
            <div className="form-control">
              <label className="cursor-pointer label items-center">
                <div className="flex justify-start gap-2 items-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    onClick={(e) => {
                      onClickTldFilter(e);
                    }}
                    value={value}
                    checked={_.includes(appliedTldFilters, value)}
                  />
                  <span className="label-text text-xs">
                    {_.get(tldFilterItem, "label")}
                  </span>
                </div>

                <span className=" text-xs">
                  {_.get(filterCounts, `${value}.count`)}[
                  {_.get(filterCounts, `${value}.percentage`) + `%`}]
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TldFilter;
