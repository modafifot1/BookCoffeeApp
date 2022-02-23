import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartsSlice";
import tableReducer from "./reducers/tableSlice";
import orderReducer from "./reducers/orderSlice";
import bookReducer from "./reducers/bookSlice";
import borrowedBookCartReducer from "./reducers/borrowedBookCartSlice";
import borrowedBookReducer from "./reducers/borrowedBookSlice";
const rootReducer = {
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  table: tableReducer,
  order: orderReducer,
  book: bookReducer,
  borrowedBook: borrowedBookReducer,
  borrowedBookCart: borrowedBookCartReducer,
};
export default configureStore({
  reducer: rootReducer,
});
