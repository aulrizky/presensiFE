import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createHolidayAPI, fetchHolidaysAPI } from "../../services/apis/holidayService";
import {
  createHolidayFulfilled,
  createHolidayPending,
  createHolidayRejected,
  fetchHolidaysFulfilled,
  fetchHolidaysPending,
  fetchHolidaysRejected
} from "../reducers/holidayReducer";

export const fetchHolidays = createAsyncThunk(
  "holidays/fetchHolidays",
  async ({ year, page, size }, { rejectWithValue }) => {
    try {
      const response = await fetchHolidaysAPI(year, page, size);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createHoliday = createAsyncThunk(
  "holidays/createHoliday",
  async (holidayData, { rejectWithValue }) => {
    try {
      const response = await createHolidayAPI(holidayData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const holidaySlice = createSlice({
  name: "holidays",
  initialState: {
    holidays: [],   
    loading: false,
    error: null,
    totalElements: 0,   
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHolidays.pending, fetchHolidaysPending)
      .addCase(fetchHolidays.fulfilled, fetchHolidaysFulfilled)
      .addCase(fetchHolidays.rejected, fetchHolidaysRejected)
      .addCase(createHoliday.pending, createHolidayPending)
      .addCase(createHoliday.fulfilled, createHolidayFulfilled)
      .addCase(createHoliday.rejected, createHolidayRejected);
  },
});

export default holidaySlice.reducer;
