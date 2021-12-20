import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import productReducer from "./reducers/productSlice";
const rootReducer = {
  auth: authReducer,
  product: productReducer,
};
export default configureStore({
  reducer: rootReducer,
});
