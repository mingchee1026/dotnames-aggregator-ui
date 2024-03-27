import { queryDomainsSlice } from "@/redux/slices/queryDomainsSlice";
import { useAppSelector } from "@/redux/store";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
type Props = {};

function PriceFilter({ }: Props) {
  const dispatch = useDispatch();
  const appliedFilters = useAppSelector(
    (state) => state.domainQuery.appliedFilters
  );
  const priceFilters = _.get(appliedFilters, 'priceFilter', {})
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();

  const handleMinPrice = (e: React.FormEvent<HTMLInputElement>) => {
    const min = _.get(e.target, "value", 0);
    setMinPrice(min)
  }

  const handleMaxPrice = (e: React.FormEvent<HTMLInputElement>) => {
    const max = _.get(e.target, "value", 0);
    setMaxPrice(max)
  }

  useEffect(() => {
    if (_.isEmpty(minPrice)) {
      dispatch(queryDomainsSlice.actions.setAppliedFilter({ key: "priceFilter.min", value: 0 }));
    } else {
      dispatch(queryDomainsSlice.actions.setAppliedFilter({ key: "priceFilter.min", value: minPrice }));
    }
  }, [minPrice])

  useEffect(() => {
    if (_.isEmpty(minPrice)) {
      dispatch(queryDomainsSlice.actions.setAppliedFilter({ key: "priceFilter.max", value: 0 }));
    } else {
      dispatch(queryDomainsSlice.actions.setAppliedFilter({ key: "priceFilter.max", value: maxPrice }));
    }
  }, [maxPrice])

  return (
    <div className="collapse collapse-arrow bg-base-200/50">
      <input type="checkbox" name="__market_status_accordion" />
      <div className="collapse-title text-sm">Price</div>
      <div className="collapse-content">
        <div className="form-control">
          <label className="cursor-pointer label items-center">
            {/* TODO : More than 100 */}
            <div className="form-control">
              <label className="cursor-pointer label items-center">
                <div className="flex justify-start gap-2 items-center">
                  <input
                    type="number"
                    placeholder="MIN Price"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleMinPrice(e)}
                    value={_.get(priceFilters, "min", undefined)}
                  />
                  <span className="label-text text-xs"> - </span>
                  <input
                    type="number"
                    placeholder="MAX Price"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleMaxPrice(e)}
                    value={_.get(priceFilters, "max", undefined)}
                  />
                </div>
              </label>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PriceFilter;
