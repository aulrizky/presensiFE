import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAttendances } from "../../services/apis/attendanceService";

import {
  fetchAttendancesPending,
  fetchAttendancesFulfilled,
  fetchAttendancesRejected,
  importAttendancesPending,
  importAttendancesFulfilled,
  importAttendancesRejected,
} from "../reducers/attendanceReducer";

export const fetchAttendances = createAsyncThunk(
  "attendance/fetchAll",
  async ({ page, size, keyword }, { rejectWithValue }) => {
    try {
      const response = await getAttendances(page, size, keyword);
      console.log("hasil fetch slice", response);
      return {
        attendances: response.data,
        totalData: response.total_data,
        totalPage: response.total_page,
        pageSize: response.page_size,
      };
    } catch (error) {
      console.error("Error in getAttendances thunk:", error);
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const importAttendance = createAsyncThunk(
  "attendance/importAttendance",
  async (file, { rejectWithValue }) => {
    try {
      const response = await importEmployeeAPI(file);
      console.log("Attendance imported:", response);
      return response.data; // Pastikan data ini sesuai dengan yang Anda butuhkan
    } catch (error) {
      console.error("Error importing attendance:", error);
      return rejectWithValue(error.message);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendances",
  initialState: {
    data: [],
    loading: false,
    error: null,
    totalPage: 0,
    totalData: 0,
    pageSize: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendances.pending, fetchAttendancesPending)
      .addCase(fetchAttendances.fulfilled, fetchAttendancesFulfilled)
      .addCase(fetchAttendances.rejected, fetchAttendancesRejected);
  },
});

export default attendanceSlice.reducer;
