import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient, productApi } from "../apis";
import { getData } from "../ultils";

const initialState = {
  loading: false,
  products: {
    status: null,
    msg: "",
    data:[]
  },
  product: {
    status: null,
    msg: "",
    data:{}
  },
  page: 0,
  isLimited: false,
};

export const getProductsPerPage = createAsyncThunk(
  "products",
  async (page, { rejectWithValue, dispatch }) => {
    try {
      const token = await getData("token");
      console.log("Axios Token: ", token);
      axiosClient.defaults.headers.authorization = `Bearer ${token}`;

      const res = await productApi.getProductsPerPage(page);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProductById = createAsyncThunk(
  "productDetail",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const res = await productApi.getProductById(productId);
      return res;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetPage(state, action) {
      state.page = 0;
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
        state.page = state.page + 1;
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
      state.products.status = null;
      state.products.msg = "";
    },
    [getProductById.fulfilled](state, action) {
      state.loading = false;
      state.product.data = action.payload;
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
export const { resetPage } = actions;

export default productReducer;
