import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, storeData, removeAlldata } from "../ultils";
import { authApi, axiosClient } from "../apis";

const initialState = {
  error: null,
  token: "",
  status: null,
  loading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.login(data);
      await storeData("token", res.token);
      const token = await getData("token");
      axiosClient.defaults.headers.authorization = `Bearer ${token}`;
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      data.roleId = 1;
      const res = await authApi.signup(data);

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.error = "";
      state.token = "";
      state.status = 200;
      removeAlldata();
    },
    setToken: (state, action) => {
      state.token = action.payload;
      axiosClient.defaults.headers.authorization = `Bearer ${action.payload}`;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    [login.pending](state) {
      state.loading = true;
      state.error = null;
      state.status = null;
    },
    [login.rejected](state, action) {
      state.loading = false;
      state.status = null;
      state.error = action.payload;
    },
    [login.fulfilled](state, action) {
      state.loading = false;
      state.token = action.payload.token;
      state.error = null;
      state.status = {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    },
    [signup.pending](state) {
      state.loading = true;
      state.error = null;
      state.status = null;
    },
    [signup.rejected](state, action) {
      state.loading = false;
      state.error = null;
      state.status = {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    },
    [signup.fulfilled](state, action) {
      state.loading = false;
      state.error = action.payload;
      state.status = null;
    },
  },
});

const { reducer: authReducer, actions } = authSlice;
export const { setToken, clearError, clearState } = actions;
export default authReducer;
