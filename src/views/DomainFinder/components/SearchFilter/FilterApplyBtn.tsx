import { CHAIN_FILTER, PROJECT_FILTER, TLD_FILTER } from "@/configs/constants";
import { queryDomainsSlice } from "@/redux/slices/queryDomainsSlice";
import { useAppSelector } from "@/redux/store";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const FilterApplyBtn = ({ id = "" }: { id?: string }) => {
  const dispatch = useDispatch();
  const domainList = useAppSelector((state) => state.domainQuery.domainsList);
  const appliedFilters = useAppSelector(
    (state) => state.domainQuery.appliedFilters
  );
  const excludedValuesFunc = (filter: string[], values: string[]) => {};
  const filterDomainList = () => {
    if (_.isEmpty(appliedFilters)) {
      dispatch(queryDomainsSlice.actions.setFilteredList(domainList));
    } else {
      const filteredByAppliedFilters = _.filter(
        domainList,
        (domainListItem) => {
          let filterIsApplicable = true;

          const domainStatusFilter = _.get(appliedFilters, "domainStatus", []);

          if (filterIsApplicable && !_.isEmpty(domainStatusFilter)) {
            filterIsApplicable = _.includes(
              domainStatusFilter,
              _.get(domainListItem, "status")
            );
          }

          const tldFilter = _.get(appliedFilters, "tldFilter", []);
          if (filterIsApplicable && !_.isEmpty(tldFilter)) {
            const othersValue = _.includes(tldFilter, "others")
              ? _.filter(_.map(TLD_FILTER, "value"), (tld) => tld !== "others")
              : [];
            const tldApplicable = _.includes(
              tldFilter,
              _.get(domainListItem, "tld")
            );

            filterIsApplicable = !_.isEmpty(othersValue)
              ? tldApplicable ||
                !_.includes(othersValue, _.get(domainListItem, "tld"))
              : tldApplicable;
          }

          const chainFilter = _.get(appliedFilters, "chainFilter", []);
          if (filterIsApplicable && !_.isEmpty(chainFilter)) {
            const othersValue = _.includes(chainFilter, "others")
              ? _.filter(
                  _.map(CHAIN_FILTER, "value"),
                  (chain) => chain !== "others"
                )
              : [];
            const chainApplicable = _.includes(
              chainFilter,
              _.get(domainListItem, "platform.network")
            );

            filterIsApplicable = !_.isEmpty(othersValue)
              ? chainApplicable ||
                !_.includes(
                  othersValue,
                  _.get(domainListItem, "platform.network")
                )
              : chainApplicable;
          }

          const projectFilters = _.get(appliedFilters, "projectFilter", []);
          if (filterIsApplicable && !_.isEmpty(projectFilters)) {
            const othersValue = _.includes(projectFilters, "others")
              ? _.filter(
                  _.map(PROJECT_FILTER, "value"),
                  (project) => project !== "others"
                )
              : [];
            const projectApplicable = _.includes(
              projectFilters,
              _.get(domainListItem, "platform.platform")
            );
            filterIsApplicable = !_.isEmpty(othersValue)
              ? projectApplicable ||
                !_.includes(
                  othersValue,
                  _.get(domainListItem, "platform.platform")
                )
              : projectApplicable;
          }

          const marketStatusFilter = _.get(
            appliedFilters,
            "marketStatusFilter",
            []
          );
          if (filterIsApplicable && !_.isEmpty(marketStatusFilter)) {
            const othersValue = _.includes(marketStatusFilter, "others")
              ? _.filter(
                  _.map(marketStatusFilter, "value"),
                  (marketStatus) => marketStatus !== "others"
                )
              : [];
            const marketStatusApplicable = _.includes(
              projectFilters,
              _.get(domainListItem, "platform.platform")
            );
            filterIsApplicable = !_.isEmpty(othersValue)
              ? marketStatusApplicable ||
                !_.includes(
                  othersValue,
                  _.get(domainListItem, "platform.platform")
                )
              : marketStatusApplicable;
          }

          const priceFilter = _.get(appliedFilters, "priceFilter", {});
          const maxPrice = _.get(priceFilter, "max", null);
          const minPrice = _.get(priceFilter, "min", null);
          if (maxPrice && filterIsApplicable) {
            filterIsApplicable =
              _.get(domainListItem, "price") <= Number(maxPrice);
          }

          if (minPrice && filterIsApplicable) {
            filterIsApplicable =
              _.get(domainListItem, "price") >= Number(minPrice);
          }

          return filterIsApplicable;
        }
      );

      dispatch(
        queryDomainsSlice.actions.setFilteredList(filteredByAppliedFilters)
      );
    }
    if (!_.isEmpty(id)) {
      (document.getElementById(id) as HTMLDialogElement).close();
    }
  };

  useEffect(() => {
    filterDomainList();
  }, [appliedFilters]);

  return <></>;
};

export default FilterApplyBtn;
