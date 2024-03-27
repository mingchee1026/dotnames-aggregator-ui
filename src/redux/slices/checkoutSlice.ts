import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
interface SearchResult {
  name: string;
  status: string;
  address: string;
  price: number;
  canRegister: boolean;
}

const initialState = {
  checkoutGroupWithPrice: {},
};

export const checkoutSlice = createSlice({
  name: "checkoutSlice",
  initialState,
  reducers: {
    setCheckoutGroup(state, action) {
      // @ts-ignore
      state.checkoutGroupWithPrice[action?.payload?.key] = action.payload.data;
    },
    setCheckoutGroupitem(state, action) {
      console.log(
        `🚀 ~ file: action?.payload?.grpIndex checkoutSlice.ts:23 ~ action:`,
        action,
        action?.payload?.grpIndex
      );
      // @ts-ignore
      if (!state.checkoutGroupWithPrice[action?.payload?.key]?.length) {
        // @ts-ignore
        state.checkoutGroupWithPrice[action?.payload?.key] = [];
      }
      // @ts-ignore
      state.checkoutGroupWithPrice[action?.payload?.key][
        action?.payload?.grpIndex
      ] = action.payload.data;
    },
  },
});
