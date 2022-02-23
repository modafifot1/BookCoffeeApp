import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { borrowedBookApi } from "../apis";

const initialState = {
  borrowedBooks: {
    data: [],
    loading: false,
    status: null,
    msg: "",
  },
  borrowedBook: {
    data: {},
    loading: false,
    status: null,
    msg: "",
  },
};

export const getBorrowedBooksPerPage = createAsyncThunk(
  "getBorrowedBooks",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await borrowedBookApi.getBorrowedBooksPerPage();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getBorrowdBookedById = createAsyncThunk(
  "getBorrowedBookById",
  async ({ borrowedBookId, resolve }, { rejectWithValue, dispatch }) => {
    try {
      const res = await borrowedBookApi.getBorrowdBookedById(borrowedBookId);
      resolve(res);
      return res;
    } catch (error) {
      resolve(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const createBorrowedBook = createAsyncThunk(
  "createBorrowedBook",
  async ({ borrowedBookItems, resolve }, { rejectWithValue, dispatch }) => {
    try {
      const res = await borrowedBookApi.createBorrowedBook({
        borrowedBookItems,
      });
      resolve(res);
      return res;
    } catch (error) {
      resolve(error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);

export const getBorrowedBooksByStatus = createAsyncThunk(
  "getBorrowedBookByStatus",
  async (status, { rejectWithValue, dispatch }) => {
    try {
      return await borrowedBookApi.getBorrowedBooksByStatus(status);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const borrowedBookSlice = createSlice({
  name: "borrowedBooks",
  initialState,
  reducers: {},
  extraReducers: {
    [createBorrowedBook.pending](state, action) {
      state.borrowedBooks.loading = true;
      state.borrowedBooks.msg = "";
      state.borrowedBooks.status = null;
    },
    [createBorrowedBook.fulfilled](state, action) {
      state.borrowedBooks.loading = false;
      state.borrowedBooks.msg = action.payload.msg;
      state.borrowedBooks.status = action.payload.status;
    },
    [createBorrowedBook.rejected](state, action) {
      state.borrowedBooks.loading = false;
      state.borrowedBooks.msg = action.payload.msg;
      state.borrowedBooks.status = action.payload.status;
    },
    [getBorrowedBooksByStatus.pending](state, action) {
      state.borrowedBooks.loading = true;
      state.borrowedBooks.msg = "";
      state.borrowedBooks.status = null;
    },
    [getBorrowedBooksByStatus.fulfilled](state, action) {
      state.borrowedBooks.loading = false;
      state.borrowedBooks.msg = action.payload.msg;
      state.borrowedBooks.status = action.payload.status;
      state.borrowedBooks.data = action.payload.borrowedBooks;
    },
    [getBorrowedBooksByStatus.rejected](state, action) {
      state.borrowedBooks.loading = false;
      state.borrowedBooks.msg = action.payload.msg;
      state.borrowedBooks.status = action.payload.status;
    },
    [getBorrowdBookedById.pending](state, action) {
      state.borrowedBook.loading = true;
      state.borrowedBook.msg = "";
      state.borrowedBook.status = null;
    },
    [getBorrowdBookedById.fulfilled](state, action) {
      state.borrowedBook.loading = false;
      state.borrowedBook.msg = action.payload.msg;
      state.borrowedBook.status = action.payload.status;
      state.borrowedBook.data = action.payload.borrowedBookItems;
    },
    [getBorrowdBookedById.rejected](state, action) {
      state.borrowedBook.loading = false;
      state.borrowedBook.msg = action.payload.msg;
      state.borrowedBook.status = action.payload.status;
    },
  },
});

const { reducer } = borrowedBookSlice;
export default reducer;
