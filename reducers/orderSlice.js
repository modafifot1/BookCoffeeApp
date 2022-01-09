import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApi } from "../apis/orderApi";

const initialState = {
  loading: false,
  status: null,
  msg: "",
  orders: [],
};

export const order = createAsyncThunk(
  "order/orders",
  async ({ cartItems, tableCode, resolve }, { rejectWithValue, dispatch }) => {
    try {
      console.log(cartItems);
      const res = await orderApi.order(cartItems, tableCode);
      resolve(res);
      return res;
    } catch (error) {
      resolve(error.response.data);
      rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: {
    [order.pending](state, action) {
      state.loading = true;
      state.msg = "";
      state.status = null;
    },
    [order.fulfilled](state, action) {
      state.loading = false;
      state.msg = action.payload.msg;
      state.status = action.payload.status;
    },
    [order.rejected](state, action) {
      state.loading = false;
      state.msg = action.payload.msg;
      state.status = action.payload.status;
    },
  },
});

const { reducer: orderReducer } = orderSlice;
export default orderReducer;
