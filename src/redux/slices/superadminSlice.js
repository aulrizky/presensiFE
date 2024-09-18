import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSuperadminDetail } from "../../services/apis/superadminService";
import {
  fetchSuperadminDetailFulfilled,
  fetchSuperadminDetailPending,
  fetchSuperadminDetailRejected,
} from "../reducers/superadminReducer";

export const fetchSuperadminDetail = createAsyncThunk(
  "superadmin/fetchSuperadminDetail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSuperadminDetail();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const superadminSlice = createSlice({
  name: "superadmin",
  initialState: {
    superadminDetail: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuperadminDetail.pending, fetchSuperadminDetailPending)
      .addCase(fetchSuperadminDetail.fulfilled, fetchSuperadminDetailFulfilled)
      .addCase(fetchSuperadminDetail.rejected, fetchSuperadminDetailRejected);
  },
});

export default superadminSlice.reducer;
