import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { borrowedBookCartApi } from "../apis/borrowedBookCartApi";

const initialState = {
  loading: true,
  status: null,
  msg: "",
  borrowedBookCartItems: [],
  numOfItems: 0,
  updateLoading: false,
};

export const addCartItem = createAsyncThunk(
  "add/borrowedBookCart",
  async ({ bookCartItems, resovle }, { rejectWithValue, dispatch }) => {
    try {
      const res = await borrowedBookCartApi.addItem({ bookCartItems });
      resovle(res);
      return res;
    } catch (error) {
      resovle(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCartItems = createAsyncThunk(
  "get/borrowedBookCarts",
  async (resolve, { rejectWithValue, dispatch }) => {
    try {
      const res = await borrowedBookCartApi.getCartItems();
      resolve(res);
      return res;
    } catch (error) {
      resolve(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCart = createAsyncThunk(
  "update/borrowedBookCart",
  async (
    { borrowedBookCartId, quantity, resolve },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await borrowedBookCartApi.updateCartItem(
        borrowedBookCartId,
        quantity
      );
      resolve(res);
      return res;
    } catch (error) {
      resolve(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteCartItems = createAsyncThunk(
  "delete/borrowedBookCarts",
  async ({ borrowedBookCartItems, resolve }, { rejectWithValue, dispatch }) => {
    try {
      const res = await borrowedBookCartApi.deleteCartItem(
        borrowedBookCartItems
      );
      resolve(res);
      return res;
    } catch (error) {
      console.log(error);
      resolve(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const borrowedBookCartSlice = createSlice({
  name: "borrowedBookCart",
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
      console.log("Vo1");
    },
    [getCartItems.fulfilled](state, action) {
      state.borrowedBookCartItems = action.payload.borrowedBookCartItems;
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
      state.updateLoading = true;
      state.msg = "";
      state.status = null;
    },
    [deleteCartItems.fulfilled](state, action) {
      state.updateLoading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
      state.borrowedBookCartItems = state.borrowedBookCartItems.filter(
        (item) => !action.payload.borrowedBookCartItems.includes(item._id)
      );
    },
    [deleteCartItems.rejected](state, action) {
      state.updateLoading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
  },
});

const { reducer: borrowedBookCartReducer } = borrowedBookCartSlice;
export default borrowedBookCartReducer;
