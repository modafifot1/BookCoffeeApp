import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient, productApi } from "../apis";
import { getData } from "../ultils";
import { setFeedbacks } from "./feedbackSlice";

const initialState = {
  loading: false,
  products: {
    status: null,
    msg: "",
    data: [],
  },
  product: {
    status: null,
    msg: "",
    data: {},
  },
  nextPage: 1,
  isLimited: false,
};

export const getProductsPerPage = createAsyncThunk(
  "products",
  async (page, { rejectWithValue, dispatch }) => {
    try {
      const token = await getData("token");
      const res = await productApi.getProductsPerPage(page);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProductById = createAsyncThunk(
  "productDetail",
  async ({ productId, resolve }, { rejectWithValue, dispatch }) => {
    try {
      const res = await productApi.getProductById(productId);
      if (res.status < 300) dispatch(setFeedbacks(res));
      resolve(res);
      return res;
    } catch (error) {
      resolve(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetPage(state, action) {
      state.isLimited = false;
      state.nextPage = 1;
      state.products.data = [];
    },
    resetDetailPage(state, action) {
      state.product.data = {};
    },
  },
  extraReducers: {
    [getProductsPerPage.pending](state) {
      state.products.status = null;
      state.products.msg = "";
      state.loading = true;
    },
    [getProductsPerPage.fulfilled](state, action) {
      if (action.payload.foods.length == 0) {
        state.isLimited = true;
      } else {
        state.nextPage = state.nextPage + 1;
        if (state.page == 1) {
          state.products.data = action.payload.foods;
        } else {
          state.products.data.push(...action.payload.foods);
        }
      }
      state.loading = false;
      state.products.status = action.payload.status;
      state.products.msg = action.payload.msg;
    },
    [getProductsPerPage.rejected](state, action) {
      state.loading = false;
      state.products.status = action.payload.status;
      state.products.msg = action.payload.msg;
    },
    [getProductById.pending](state) {
      state.loading = true;
      state.product.status = null;
      state.product.msg = "";
    },
    [getProductById.fulfilled](state, action) {
      state.loading = false;
      state.product.data = action.payload.food;
      state.product.status = action.payload.status;
      state.product.msg = action.payload.msg;
    },
    [getProductById.rejected](state, action) {
      state.loading = false;
      state.product.status = action.payload.status;
      state.product.msg = action.payload.msg;
    },
  },
});

const { reducer: productReducer, actions } = productSlice;
export const { resetPage, resetDetailPage } = actions;

export default productReducer;
