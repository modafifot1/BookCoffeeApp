import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartsSlice";
import tableReducer from "./reducers/tableSlice";
import orderReducer from "./reducers/orderSlice";
const rootReducer = {
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  table: tableReducer,
  order: orderReducer,
};
export default configureStore({
  reducer: rootReducer,
});
