import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { borrowedBookApi } from "../apis";

const initialState = {
  borrowedBooks: {
    data: [],
    loading: false,
    status: null,
    msg: "",
  },
  borrowedBooks: {
    data: {},
    loading: false,
    status: null,
    msg: "",
  },
};

const getBorrowedBooksPerPage = createAsyncThunk(
  "getBorrowedBooks",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await borrowedBookApi.getBorrowedBooks();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const getBorrowdBookedById = createAsyncThunk;
"getBorrowedBookById",
  async (borrowedBookId, { rejectWithValue, dispatch }) => {
    try {
      return await borrowedBookApi.getBorrowdBookedById(borrowedBookId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  };
const createBorrowedBook = createAsyncThunk(
  "createBorrowedBook",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      return await borrowedBookApi.createBorrowedBook(data);
    } catch (error) {
      return rejectWithValue(error.response.error);
    }
  }
);
const borrowedBookSlice = createSlice({
  name: "borrowedBooks",
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = borrowedBookSlice;
export default reducer;
