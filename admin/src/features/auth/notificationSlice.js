import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationAPI from "../../api/notificationAPI";

export const fetchNotification = createAsyncThunk("/notification/fetchNotification", async () => {
  const response = await notificationAPI.getAllNotification();
  return response.data;
});

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default notificationSlice.reducer;
