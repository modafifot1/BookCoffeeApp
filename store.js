import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartsSlice";
const rootReducer = {
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
};
export default configureStore({
  reducer: rootReducer,
});
