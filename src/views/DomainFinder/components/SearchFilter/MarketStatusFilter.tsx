import { MARKET_STATUS } from "@/configs/constants";
import { queryDomainsSlice } from "@/redux/slices/queryDomainsSlice";
import { useAppSelector } from "@/redux/store";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {};

function MarketStatusFilter({ }: Props) {
  const dispatch = useDispatch();
  const [marketStatusFilter, setMarketStatusFilter] = useState<string[]>([]);
  const appliedDomainFilters = useAppSelector(
    (state) => state.domainQuery.appliedFilters
  );
  const appliedMarketStatusFilter = _.get(appliedDomainFilters, "marketStatusFilter", []);

  const onClickMarketStatus = (e: React.FormEvent<HTMLInputElement>) => {
    const isChecked = _.get(e, "target.checked", false);
    const checkedValue = _.get(e, "target.value", "");
    if (isChecked) {
      setMarketStatusFilter([...marketStatusFilter, checkedValue]);
    } else {
      const filteredDomainStatus = _.filter(
        marketStatusFilter,
        (status) => status !== checkedValue
      );
      setMarketStatusFilter([...filteredDomainStatus]);
    }
  };

  useEffect(() => {
    dispatch(
      queryDomainsSlice.actions.setAppliedFilter({
        key: "marketStatusFilter",
        value: marketStatusFilter,
      })
    );
  }, [marketStatusFilter]);

  useEffect(() => {
    if (_.isEmpty(appliedDomainFilters)) {
      setMarketStatusFilter([]);
    }
  }, [appliedDomainFilters]);
  return (
    <div className="collapse collapse-arrow bg-base-200/50">
      <input type="checkbox" name="__market_status_accordion" />
      <div className="collapse-title text-sm">Market Status</div>
      <div className="collapse-content">
        {_.map(MARKET_STATUS, (marketStatusItem) => {
          const marketStatusValue = _.get(marketStatusItem, "value");
          return (
            <>
              <div className="form-control">
                <label className="cursor-pointer label items-center">
                  <div className="flex justify-start gap-2 items-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      onClick={(e) => {
                        onClickMarketStatus(e);
                      }}
                      value={marketStatusValue}
                      checked={_.includes(
                        appliedMarketStatusFilter,
                        marketStatusValue
                      )}
                    />
                    <span className="label-text text-xs">
                      {_.get(marketStatusItem, "label")}
                    </span>
                  </div>

                  <span className=" text-xs">68 [5.6%]</span>
                </label>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default MarketStatusFilter;
