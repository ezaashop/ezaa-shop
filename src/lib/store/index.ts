// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import favoriteReducer from "./slices/favoriteSlice";
import cartReducer from "./slices/cartSlice";
import appDataReducer from "./slices/appDataSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    favorite: favoriteReducer,
    cart: cartReducer,
    appData: appDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
