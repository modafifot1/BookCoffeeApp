import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tableApi } from "../apis/tableApi";

const initialState = {
  loading: false,
  status: null,
  msg: "",
  tables: [],
};

export const getListTable = createAsyncThunk(
  "get/tables",
  async (resovle, { rejectWithValue, dispatch }) => {
    try {
      const res = await tableApi.getTableLst();
      resovle(res);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const subcribeTable = createAsyncThunk(
  "follow/tables",
  async (tableIds, { rejectWithValue, dispatch }) => {
    try {
      const res = await tableApi.subcribeTable(tableIds);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  extraReducers: {
    [getListTable.pending](state, aciton) {
      state.loading = true;
      state.staus = null;
      state.msg = "";
    },
    [getListTable](state, action) {
      state.loading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
      state.tables = action.payload.tables;
    },
    [getListTable.rejected](state, ation) {
      state.loading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
    [subcribeTable.pending](state, action) {
      state.loading = true;
      state.staus = null;
      state.msg = "";
    },
    [subcribeTable.fulfilled](state, action) {
      state.loading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
    [subcribeTable.rejected](state, action) {
      state.loading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
  },
});

const { reducer: tableReducer } = tableSlice;
export default tableReducer;
