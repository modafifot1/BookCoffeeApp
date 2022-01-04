import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../apis/cartApi";

const initialState = {
  loading: true,
  status: null,
  msg: "",
  cartItems: [],
  numOfItems: 0,
  updateLoading: false,
};

export const addCartItem = createAsyncThunk(
  "add/cart",
  async ({ cartItems, resovle }, { rejectWithValue, dispatch }) => {
    try {
      const res = await cartApi.addItem({ cartItems });
      resovle(res);
      return res;
    } catch (error) {
      resovle(error.response.data);
      rejectWithValue(error.response.data);
    }
  }
);
export const getCartItems = createAsyncThunk(
  "get/carts",
  async (resolve, { rejectWithValue, dispatch }) => {
    try {
      const res = await cartApi.getCartItems();
      resolve(res);
      return res;
    } catch (error) {
      resolve(error.response.data);

      rejectWithValue(error.response.data);
    }
  }
);

export const updateCart = createAsyncThunk(
  "update/cart",
  async ({ cartId, quantity, resolve }, { rejectWithValue, dispatch }) => {
    try {
      const res = await cartApi.updateCartItem(cartId, quantity);
      resolve(res);
      return res;
    } catch (error) {
      resolve(error.response.data);
      rejectWithValue(error.response.data);
    }
  }
);
export const deleteCartItems = createAsyncThunk(
  "delete/carts",
  async ({ cartItems, resolve }, { rejectWithValue, dispatch }) => {
    try {
      const res = await cartApi.deleteCartItem(cartItems);
      resolve(res);
      return res;
    } catch (error) {
      resolve(error.response.data);
      rejectWithValue(error.response.data);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: {
    [addCartItem.pending](state, action) {
      state.loading = true;
      state.msg = "";
      state.status = null;
    },
    [addCartItem.fulfilled](state, action) {
      state.loading = false;
      state.msg = action.payload.msg;
      state.status = action.payload.status;
      state.numOfItems += action.payload.numOfAddedItems;
    },
    [addCartItem.rejected](state, action) {
      state.loading = false;
      state.msg = action.payload.msg;
      state.status = action.payload.status;
    },
    [getCartItems.pending](state, action) {
      state.loading = true;
      state.msg = "";
      state.status = null;
    },
    [getCartItems.fulfilled](state, action) {
      state.cartItems = action.payload.cartItems;
      state.numOfItems = action.payload.numOfAddedItems;
      state.loading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
    [getCartItems.rejected](state, action) {
      state.loading = false;
      state.msg = action.payload.msg;
      state.status = action.payload.status;
    },
    [updateCart.pending](state, action) {
      state.updateLoading = true;
      state.msg = "";
      state.status = null;
    },
    [updateCart.fulfilled](state, action) {
      state.updateLoading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
    [updateCart.rejected](state, action) {
      state.updateLoading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
    [deleteCartItems.pending](state, action) {
      console.log("statuspeding: ", action);

      state.updateLoading = true;
      state.msg = "";
      state.status = null;
    },
    [deleteCartItems.fulfilled](state, action) {
      state.updateLoading = false;
      console.log("statusfull: ", action);
      state.status = action.payload.status;
      state.msg = action.payload.msg;
      state.cartItems = state.cartItems.filter(
        (item) => !action.payload.cartItems.includes(item._id)
      );
    },
    [deleteCartItems.rejected](state, action) {
      console.log("statusreject: ", action);

      state.updateLoading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
  },
});

const { reducer: cartReducer } = cartSlice;
export default cartReducer;
