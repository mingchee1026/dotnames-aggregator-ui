import { CHAIN_FILTER, DOMAIN_STATUS, PROJECT_FILTER, TLD_FILTER } from "@/configs/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

interface SearchResult {
  name: string;
  status: string;
  address: string;
  price: number;
  canRegister: boolean;
}

interface IAppliedFilters {
  domainStatus?: string[];
  chainFilter?: string[];
  tldFilter?: string[];
  marketStatusFilter?: string[];
  projectFilter?: string[];
  priceFilter?: {
    max?: number | null;
    min?: number | null;
  }
}

interface filterCount {
  count?:number;
  percentage?: number;
}
interface DomainsList {
  domainsList: SearchResult[];
  filteredList: SearchResult[];
  label: string;
  appliedFilters?: IAppliedFilters;
  domainStatusCount: filterCount,
  projectFilterCount: filterCount,
  tldFilterCount: filterCount,
  chainFilterCount: filterCount
}

const initialState: DomainsList = {
  domainsList: [],
  filteredList: [],
  label: "",
  appliedFilters: {},
  domainStatusCount: {},
  projectFilterCount: {},
  tldFilterCount: {},
  chainFilterCount: {}
};

function getTheCountAndPercentage(domainList: SearchResult[], value: string, path: string, filterConstant: { value: string, label: string }[]) {
  let filteredList: any = [];
  if (value === "others") {
    const filteredValue = _.filter(_.map(filterConstant, 'value'), (item) => item !== "others");
    filteredList = _.filter(domainList, (list) => !_.includes(filteredValue, _.get(list, path)));
  } else {
    filteredList = _.filter(domainList, (list) => _.get(list, path) === value);
  }
  return {
    count: filteredList.length,
    percentage: ((100 * filteredList.length) / domainList.length).toFixed(1)
  }
}

export const queryDomainsSlice = createSlice({
  name: "queryDomains",
  initialState,
  reducers: {
    setDomainsList(state, action) {
      state.domainsList = action.payload;
      state.filteredList = action.payload;

     state.domainStatusCount = _.fromPairs(_.map(DOMAIN_STATUS, ({ value, label }) => {
        return [value, getTheCountAndPercentage(_.get(action, 'payload', []), value, "status", DOMAIN_STATUS)]
      }));

      state.projectFilterCount = _.fromPairs(_.map(PROJECT_FILTER, ({ value, label }) => {
        return [value, getTheCountAndPercentage(_.get(action, 'payload', []), value, "platform.platform", PROJECT_FILTER)]
      }));

      state.tldFilterCount = _.fromPairs(_.map(TLD_FILTER, ({ value, label }) => {
        return [value, getTheCountAndPercentage(_.get(action, 'payload', []), value, "tld", TLD_FILTER)]
      }));

      state.chainFilterCount = _.fromPairs(_.map(CHAIN_FILTER, ({ value, label }) => {
        return [value, getTheCountAndPercentage(_.get(action, 'payload', []), value, "platform.network", CHAIN_FILTER)]
      }));

    },
    setQueryLabel(state, action) {
      state.label = action.payload;
    },
    setFilteredList(state, action) {
      state.filteredList = action.payload;
    },
    setAppliedFilter(state, action) {
      const { key, value } = action.payload;
      if (_.isEmpty(value)) {
        _.unset(state, `appliedFilters.${key}`);
      } else {
        _.set(state, `appliedFilters.${key}`, value);
      }
    },
    setClearAppliedFilters(state, action) {
      state.appliedFilters = {};
    }
  },
});
