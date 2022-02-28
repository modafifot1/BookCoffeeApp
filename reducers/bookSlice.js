import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient, bookApi } from "../apis";
import { getData } from "../ultils";
import { setFeedbacks } from "./feedbackSlice";

const initialState = {
  loading: false,
  books: {
    status: null,
    msg: "",
    data: [],
    loading: false,
    nextPage: 1,
  },
  book: {
    status: null,
    msg: "",
    data: {},
    loading: false,
  },
  isLimited: false,
  relatedBooks: {
    data: [],
    status: null,
    msg: "",
    loading: false,
  },
};

export const getBooksPerPage = createAsyncThunk(
  "books",
  async ({ page, resolve }, { rejectWithValue, dispatch }) => {
    try {
      const token = await getData("token");
      const res = await bookApi.getBooksPerPage(page);
      resolve(res);
      return res;
    } catch (error) {
      resolve(error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);
export const getBookById = createAsyncThunk(
  "bookDetail",
  async ({ bookId, resolve }, { rejectWithValue, dispatch }) => {
    try {
      const res = await bookApi.getBookById(bookId);
      if (res.status < 300) dispatch(setFeedbacks(res));
      resolve(res);
      return res;
    } catch (error) {
      resolve(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getRelatedBooks = createAsyncThunk(
  "getRelatedBooks",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await bookApi.getBookForYou();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    resetPage(state, action) {
      state.isLimited = false;
      state.books.data = [];
    },
    resetDetailPage(state, action) {
      state.book.data = {};
    },
  },
  extraReducers: {
    [getBooksPerPage.pending](state) {
      state.books.status = null;
      state.books.msg = "";
      state.books.loading = true;
    },
    [getBooksPerPage.fulfilled](state, action) {
      // if(action.payload.currentPage)
      if (action.payload.books.length == 0) {
        state.isLimited = true;
      } else {
        if (action.payload.currentPage == 1) {
          state.books.data = action.payload.books;
        } else {
          state.books.data.push(...action.payload.books);
        }
      }
      state.books.loading = false;
      state.books.status = action.payload.status;
      state.books.msg = action.payload.msg;
      state.books.nextPage++;
    },
    [getBooksPerPage.rejected](state, action) {
      state.books.loading = false;
      state.books.status = action.payload.status;
      state.books.msg = action.payload.msg;
    },
    [getBookById.pending](state) {
      state.book.loading = true;
      state.book.status = null;
      state.book.msg = "";
    },
    [getBookById.fulfilled](state, action) {
      state.book.loading = false;
      state.book.data = action.payload.book;
      state.book.status = action.payload.status;
      state.book.msg = action.payload.msg;
    },
    [getBookById.rejected](state, action) {
      state.book.loading = false;
      state.book.status = action.payload.status;
      state.book.msg = action.payload.msg;
    },
    [getRelatedBooks.pending](state, action) {
      state.relatedBooks.loading = true;
      state.relatedBooks.msg = "";
      state.relatedBooks.status = null;
    },
    [getRelatedBooks.fulfilled](state, action) {
      state.relatedBooks.loading = false;
      state.relatedBooks.msg = action.payload.msg;
      state.relatedBooks.status = action.payload.status;
      state.relatedBooks.data = action.payload.relatedBooks;
    },
    [getRelatedBooks.rejected](state, action) {
      state.relatedBooks.loading = false;
      state.relatedBooks.msg = action.payload.msg;
      state.relatedBooks.status = action.payload.status;
    },
  },
});

const { reducer: bookReducer, actions } = bookSlice;
export const { resetPage, resetDetailPage } = actions;

export default bookReducer;
