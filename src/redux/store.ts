import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { queryDomainsSlice } from "./slices/queryDomainsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartSlice } from "./slices/cartSlice";
import { checkoutSlice } from "./slices/checkoutSlice";

const persistConfigCart = {
  key: "cart",
  storage,
};
const persistConfigCheckout = {
  key: "checkout",
  storage,
};

const persistedCartReducer = persistReducer(
  persistConfigCart,
  cartSlice.reducer
);
const persistedCheckoutReducer = persistReducer(
  persistConfigCheckout,
  checkoutSlice.reducer
);

const store = configureStore({
  reducer: combineReducers({
    login: loginReducer,
    domainQuery: queryDomainsSlice.reducer,
    cart: persistedCartReducer,
    checkout: checkoutSlice.reducer,
  }),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);

export default store;
