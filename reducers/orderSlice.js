import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApi } from "../apis/orderApi";

const initialState = {
  loading: false,
  status: null,
  msg: "",
  orders: [],
  newOrder: {},
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const purchase = createAsyncThunk(
  "orders/purchase",
  async (
    { cartItems, tableCode, total, paymentMethod, resolve },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await orderApi.purchase(
        cartItems,
        tableCode,
        total,
        paymentMethod
      );
      resolve(res);
      return res;
    } catch (error) {
      resolve(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const paymentMomo = createAsyncThunk(
  "/orders/payment-momo",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      return await orderApi.paymentMomo(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getOrdersByStatus = createAsyncThunk(
  "/orders/getByStatus",
  async (status, { rejectWithValue, dispatch }) => {
    try {
      return await orderApi.getOrdersByStatus(status);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getOrderById = createAsyncThunk(
  "/orders/getById",
  async ({ orderId, resolve }, { rejectWithValue, dispatch }) => {
    try {
      const res = await orderApi.getOrderById(orderId);
      resolve(res);
    } catch (error) {
      resolve(error.response.data);
      return rejectWithValue(error.response.data);
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
    [purchase.pending](state, action) {
      state.loading = true;
      state.msg = "";
      state.status = null;
      state.newOrder = {};
    },
    [purchase.fulfilled](state, action) {
      state.loading = false;
      state.msg = action.payload.msg;
      state.status = action.payload.status;
      state.newOrder = { ...action.payload };
    },
    [purchase.rejected](state, action) {
      state.loading = false;
      state.msg = action.payload.msg;
      state.status = action.payload.status;
      state.newOrder = {};
    },
    [getOrdersByStatus.pending](state, action) {
      state.loading = true;
      state.status = null;
      state.msg = "";
    },
    [getOrdersByStatus.fulfilled](state, action) {
      state.loading = false;
      state.msg = action.payload.msg;
      state.status = action.payload.status;
      state.orders = action.payload.oreders;
    },
    [getOrdersByStatus.rejected](state, action) {
      state.loading = false;
      state.status = null;
      state.msg = "";
    },
    [getOrderById.pending](state, action) {
      state.loading = true;
      state.status = null;
      state.msg = "";
    },
    [getOrderById.fulfilled](state, action) {
      state.loading = false;
      state.msg = action.payload.msg;
      state.status = action.payload.status;
    },
    [getOrderById.rejected](state, action) {
      state.loading = false;
      state.status = null;
      state.msg = "";
    },
  },
});

const { reducer: orderReducer } = orderSlice;
export default orderReducer;
