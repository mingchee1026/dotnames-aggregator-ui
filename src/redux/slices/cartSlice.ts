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
  cart: [],
  cartGroupWithPrice: {},
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    addToCart(state, action) {
      if (action?.payload) {
        const newCart = state.cart.filter((d) => {
          // @ts-ignore

          return d?.name !== action.payload?.name;
        });
        // @ts-ignore
        state.cart = [action.payload, ...newCart];
      }
    },
    removeFromCart(state, action) {
      // action.payload; : INDEX

      const newCart = state.cart;
      newCart?.splice(action.payload, 1);
      state.cart = newCart;
    },
    removeFromCartByName(state, action) {
      // action.payload; : INDEX
      const index = _.findIndex(
        state.cart,
        (e: any) => {
          return e?.name === action.payload;
        },
        0
      );
      const newCart = state.cart;
      newCart?.splice(index, 1);
      if (newCart?.length <= 0) {
        state.cart = [...newCart];
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    setCartGroup(state, action) {
      // @ts-ignore
      state.cartGroupWithPrice[action?.payload?.key] = action.payload.data;
    },
  },
});
