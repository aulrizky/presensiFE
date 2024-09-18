import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLeaves,
  changeStatusLeave,
  getLeaveDetails,
} from "../../services/apis/leaveService";
import {
  fetchLeavesPending,
  fetchLeavesFulfilled,
  fetchLeavesRejected,
  updateLeavesPending,
  updateLeavesFulfilled,
  updateLeavesRejected,
  fetchLeavesDetailPending,
  fetchLeavesDetailFulfilled,
  fetchLeavesDetailRejected,
} from "../reducers/leaveReducer";

export const fetchAllLeaves = createAsyncThunk(
  "leaves/fetchAll",
  async ({ page, size, keyword, startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await getLeaves(page, size, keyword, startDate, endDate);

      // Check if response.data is undefined or null
      if (!response.data) {
        return {
          leaves: [],
          totalData: 0,
          totalPage: 0,
          pageSize: size,
        };
      }

      // If response.data is an empty array, return it as is
      if (Array.isArray(response.data) && response.data.length === 0) {
        return {
          leaves: [],
          totalData: 0,
          totalPage: 0,
          pageSize: size,
        };
      }

      const transformedResponse = response.data.map((leave) => ({
        id_leave: leave.id_leave,
        leaveType: leave.leave_type,
        leaveDuration: `${new Date(leave.start_date).toLocaleDateString(
          "en-US",
          { month: "long", day: "2-digit" }
        )} - ${new Date(leave.end_date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
        })}, ${new Date(leave.start_date).getFullYear()}`,
        status: leave.status,
        employeeName: leave.first_name + " " + leave.last_name,
        department: leave.department_name || "N/A",
        profilePicture: leave.profile_picture,
      }));

      return {
        leaves: transformedResponse,
        totalData: response.totalData,
        totalPage: response.totalPage,
        pageSize: response.pageSize,
      };
    } catch (error) {
      console.error("Error in getLeaves thunk:", error);
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchLeaveDetail = createAsyncThunk(
  "leaves/fetchLeaveDetail",
  async (idLeave, { rejectWithValue }) => {
    try {
      const response = await getLeaveDetails(idLeave);
      console.log("Leave Detail API response:", response.data);

      const transformedResponse = [
        {
          label: "Created At",
          value: response.data.created_date
            ? new Date(response.data.created_date).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })
            : "-",
        },
        {
          label: "Leave Duration",
          value: `${
            response.data.start_date
              ? new Date(response.data.start_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                })
              : "-"
          } - ${
            response.data.end_date
              ? new Date(response.data.end_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                })
              : "-"
          }, ${
            response.data.start_date
              ? new Date(response.data.start_date).getFullYear()
              : "-"
          }`,
        },
        {
          label: "Employee Number",
          value: response.data.employeeNumber || "-",
        },
        {
          label: "Status",
          value: response.data.status || "-",
        },
        {
          label: "Employee Name",
          value:
            response.data.first_name && response.data.last_name
              ? `${response.data.first_name} ${response.data.last_name}`
              : "-",
        },
        {
          label: "Reason",
          value: response.data.reason || "-",
        },
        {
          label: "Department",
          value: response.data.department_name || "-",
        },
        {
          label: "Attachment",
          value: response.data.attachment || "-",
        },
        {
          label: "Leave Type",
          value: response.data.leave_type || "-",
        },
      ];
      console.log(transformedResponse);
      return transformedResponse;
    } catch (error) {
      console.error("Error in getLeaveDetail thunk:", error);
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateLeaveStatus = createAsyncThunk(
  "leaves/updateLeaveStatus",
  async ({ idLeave, status }, { rejectWithValue }) => {
    try {
      const response = await changeStatusLeave(idLeave, status);
      console.log("Leave Detail API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in getLeaveDetail thunk:", error);
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const leaveSlice = createSlice({
  name: "leaves",
  initialState: {
    data: [],
    dataDetail: [],
    loading: false,
    error: null,
    totalData: 0,
    totalPage: 0,
    pageSize: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLeaves.pending, fetchLeavesPending)
      .addCase(fetchAllLeaves.fulfilled, fetchLeavesFulfilled)
      .addCase(fetchAllLeaves.rejected, fetchLeavesRejected)
      .addCase(fetchLeaveDetail.pending, fetchLeavesDetailPending)
      .addCase(fetchLeaveDetail.fulfilled, fetchLeavesDetailFulfilled)
      .addCase(fetchLeaveDetail.rejected, fetchLeavesDetailRejected)
      .addCase(updateLeaveStatus.pending, updateLeavesPending)
      .addCase(updateLeaveStatus.fulfilled, updateLeavesFulfilled)
      .addCase(updateLeaveStatus.rejected, updateLeavesRejected);
  },
});

export default leaveSlice.reducer;
