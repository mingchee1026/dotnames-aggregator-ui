import { PROJECT_FILTER } from "@/configs/constants";
import { queryDomainsSlice } from "@/redux/slices/queryDomainsSlice";
import { useAppSelector } from "@/redux/store";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {};

function ProjectFilter({ }: Props) {
  const dispatch = useDispatch();
  const [projectFilter, setProjectFilter] = useState<string[]>([]);
  const appliedDomainFilters = useAppSelector(
    (state) => state.domainQuery.appliedFilters
  );
  const filterCounts = useAppSelector(
    (state) => state.domainQuery.projectFilterCount
  );
  const appliedProjectFilters = _.get(appliedDomainFilters, 'projectFilter', "")
  const onClickProjectFilter = (e: React.FormEvent<HTMLInputElement>) => {
    const isChecked = _.get(e, "target.checked", false);
    const checkedValue = _.get(e, "target.value", "");
    if (isChecked) {
      setProjectFilter([...projectFilter, checkedValue]);
    } else {
      const filteredDomainStatus = _.filter(
        projectFilter,
        (status) => status !== checkedValue
      );
      setProjectFilter([...filteredDomainStatus]);
    }
  };

  useEffect(() => {
    dispatch(
      queryDomainsSlice.actions.setAppliedFilter({
        key: "projectFilter",
        value: projectFilter,
      })
    );
  }, [projectFilter]);

  useEffect(() => {
    if (_.isEmpty(appliedDomainFilters)) {
      setProjectFilter([]);
    }
  }, [appliedDomainFilters]);

  return (
    <div className="collapse collapse-arrow bg-base-200/50">
      <input type="checkbox" name="__market_status_accordion" />
      <div className="collapse-title text-sm">Project</div>
      <div className="collapse-content">
        {_.map(PROJECT_FILTER, (projectFilterItem) => {
          const projectFilterValue = _.get(projectFilterItem, "value");
          return (
            <>
              <div className="form-control">
                <label className="cursor-pointer label items-center">
                  <div className="flex justify-start gap-2 items-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      onClick={(e) => {
                        onClickProjectFilter(e);
                      }}
                      value={projectFilterValue}
                      checked={_.includes(
                        appliedProjectFilters,
                        projectFilterValue
                      )}
                    />
                    <span className="label-text text-xs">
                      {_.get(projectFilterItem, "label")}
                    </span>
                  </div>

                  <span className=" text-xs">
                    {_.get(filterCounts, `${projectFilterValue}.count`)}[
                    {_.get(filterCounts, `${projectFilterValue}.percentage`) +
                      `%`}
                    ]
                  </span>
                </label>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectFilter;
