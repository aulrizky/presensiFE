import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTopEmployees, getDashboardSummary, getAttendanceOverview, getDataChartSuperadmin,
  getDataDashboardSuperadmin,} from '../../services/apis/dashboardService';
import {
  fetchTopEmployeesPending,
  fetchTopEmployeesFulfilled,
  fetchTopEmployeesRejected,
  fetchDashboardSummaryPending,
  fetchDashboardSummaryFulfilled,
  fetchDashboardSummaryRejected,
  fetchAttendanceOverviewPending,
  fetchAttendanceOverviewFulfilled,
  fetchAttendanceOverviewRejected,
  fetchDataChartSuperadminFulfilled,
  fetchDataChartSuperadminPending,
  fetchDataChartSuperadminRejected,
  fetchDataDashboardSuperadminFulfilled,
  fetchDataDashboardSuperadminPending,
  fetchDataDashboardSuperadminRejected,
} from '../reducers/dashboardReducer';

// Thunk untuk mendapatkan 7 employee teratas dari API
export const fetchTopEmployees = createAsyncThunk(
  'dashboard/fetchTopEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTopEmployees();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk untuk mendapatkan summary dashboard
export const fetchDashboardSummary = createAsyncThunk(
  'dashboard/fetchDashboardSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDashboardSummary();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk untuk mendapatkan attendance overview
export const fetchAttendanceOverview = createAsyncThunk(
  'dashboard/fetchAttendanceOverview',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAttendanceOverview();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDataDashboardSuperadmin = createAsyncThunk(
  "dashboard/fetchDataDashboardSuperadmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDataDashboardSuperadmin();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const fetchDataChartSuperadmin = createAsyncThunk(
  "dashboard/getDataChartSuperAdmin",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await getDataChartSuperadmin(startDate, endDate);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice untuk mengelola state dari dashboard
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: {}, // u/ data dashboard umum
  dataChart: [], // u/ data chart (diubah menjadi array)
    topEmployees: [],
    summary: null,
    attendanceOverview: null,
    loading: false,
    loadingAttendance: false,
    error: null,
    errorAttendance: null,
    message: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopEmployees.pending, fetchTopEmployeesPending)
      .addCase(fetchTopEmployees.fulfilled, fetchTopEmployeesFulfilled)
      .addCase(fetchTopEmployees.rejected, fetchTopEmployeesRejected)
      .addCase(fetchDashboardSummary.pending, fetchDashboardSummaryPending)
      .addCase(fetchDashboardSummary.fulfilled, fetchDashboardSummaryFulfilled)
      .addCase(fetchDashboardSummary.rejected, fetchDashboardSummaryRejected)
      .addCase(fetchAttendanceOverview.pending, fetchAttendanceOverviewPending)
      .addCase(fetchAttendanceOverview.fulfilled, fetchAttendanceOverviewFulfilled)
      .addCase(fetchAttendanceOverview.rejected, fetchAttendanceOverviewRejected)
      .addCase(
        fetchDataDashboardSuperadmin.pending,
        fetchDataDashboardSuperadminPending
      )
      .addCase(
        fetchDataDashboardSuperadmin.fulfilled,
        fetchDataDashboardSuperadminFulfilled
      )
      .addCase(
        fetchDataDashboardSuperadmin.rejected,
        fetchDataDashboardSuperadminRejected
      )
      .addCase(
        fetchDataChartSuperadmin.pending,
        fetchDataChartSuperadminPending
      )
      .addCase(
        fetchDataChartSuperadmin.fulfilled,
        fetchDataChartSuperadminFulfilled
      )
      .addCase(
        fetchDataChartSuperadmin.rejected,
        fetchDataChartSuperadminRejected
      );
  }
});

export default dashboardSlice.reducer;
