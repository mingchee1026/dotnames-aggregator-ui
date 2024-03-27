import { DOMAIN_STATUS } from "@/configs/constants";
import { queryDomainsSlice } from "@/redux/slices/queryDomainsSlice";
import { useAppSelector } from "@/redux/store";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {};

function DomainStatusFilter({}: Props) {
  const dispatch = useDispatch();
  const [domainStatus, setDomainStatus] = useState<string[]>([]);
  const appliedDomainFilters = useAppSelector(
    (state) => state.domainQuery.appliedFilters
  );
  const filterCounts = useAppSelector(
    (state) => state.domainQuery.domainStatusCount
  );

  const statusFilter = _.get(appliedDomainFilters, "domainStatus", []);
  const onClickDomainStatus = (e: React.FormEvent<HTMLInputElement>) => {
    const isChecked = _.get(e, "target.checked", false);
    const checkedValue = _.get(e, "target.value", "");
    if (isChecked) {
      setDomainStatus([...domainStatus, checkedValue]);
    } else {
      const filteredDomainStatus = _.filter(
        domainStatus,
        (status) => status !== checkedValue
      );
      setDomainStatus([...filteredDomainStatus]);
    }
  };

  useEffect(() => {
    dispatch(
      queryDomainsSlice.actions.setAppliedFilter({
        key: "domainStatus",
        value: domainStatus,
      })
    );
  }, [domainStatus]);

  useEffect(() => {
    if (_.isEmpty(appliedDomainFilters)) {
      setDomainStatus([]);
    }
  }, [appliedDomainFilters]);

  return (
    <div className="collapse collapse-arrow bg-base-200/50 ">
      <input type="checkbox" name="__domain_status_accordion" checked />
      <div className="collapse-title text-sm">Domain Status</div>
      <div className="collapse-content">
        {_.map(DOMAIN_STATUS, (domainStatusItem) => {
          const domainStatusValue = _.get(domainStatusItem, "value");
          return (
            <div className="form-control">
              <label className="cursor-pointer label items-center">
                <div className="flex justify-start gap-2 items-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    onClick={(e) => {
                      onClickDomainStatus(e);
                    }}
                    value={domainStatusValue}
                    checked={_.includes(statusFilter, domainStatusValue)}
                  />
                  <span className="label-text text-xs">
                    {_.get(domainStatusItem, "label")}
                  </span>
                </div>

                <span className=" text-xs">
                  {_.get(filterCounts, `${domainStatusValue}.count`)}[
                  {_.get(filterCounts, `${domainStatusValue}.count`)! > 0
                    ? _.get(filterCounts, `${domainStatusValue}.percentage`) +
                      `%`
                    : "0%"}
                  ]
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DomainStatusFilter;
