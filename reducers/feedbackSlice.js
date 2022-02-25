import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { feedbackApi } from "../apis";

const initialState = {
  feedbacks: {
    data: [],
    loading: false,
    status: null,
    msg: "",
  },
};

export const addFeedback = createAsyncThunk(
  "addFeedback",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      return feedbackApi.addFeedback(data);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbacks(state, action) {
      state.feedbacks.data = action.payload.feedbacks;
    },
  },
  extraReducers: {
    [addFeedback.pending](state, action) {
      state.feedbacks.loading = true;
      state.feedbacks.msg = "";
      state.feedbacks.status = null;
    },
    [addFeedback.fulfilled](state, action) {
      state.feedbacks.loading = false;
      state.feedbacks.status = action.payload.status;
      state.feedbacks.msg = action.payload.msg;
      state.feedbacks.data = [action.payload.feedback, ...state.feedbacks.data];
    },
    [addFeedback.rejected](state, action) {
      state.feedbacks.loading = false;
      state.feedbacks.status = action.payload.status;
      state.feedbacks.msg = action.payload.msg;
    },
  },
});

const { reducer, actions } = feedbackSlice;
export const { setFeedbacks } = actions;

export default reducer;
