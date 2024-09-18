import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addEmployee as addEmployeeAPI,
  changePassword,
  deleteEmployee as deleteEmployeeAPI,
  editPersonalEmployee as editPersonalEmployeeAPI,
  editProfessionalEmployee as editProfessionalEmployeeAPI,
  getEmployeeAttendanceDetails,
  getEmployeeIdByUsername,
  getEmployeeLeave,
  getEmployeePersonalInfo,
  getEmployeeProfessionalInfo,
  getEmployeeProfileById,
  getEmployees,
  importEmployee as importEmployeeAPI,
} from "../../services/apis/employeeService";
import {
  addEmployeeFulfilled,
  addEmployeePending,
  addEmployeeRejected,
  deleteEmployeeFulfilled,
  deleteEmployeePending,
  deleteEmployeeRejected,
  editPasswordFulfilled,
  editPasswordPending,
  editPasswordRejected,
  editPersonalEmployeeFulfilled,
  editPersonalEmployeePending,
  editPersonalEmployeeRejected,
  editProfessionalEmployeeFulfilled,
  editProfessionalEmployeePending,
  editProfessionalEmployeeRejected,
  fetchEmployeeLeaveFulfilled,
  fetchEmployeeLeavePending,
  fetchEmployeeLeaveRejected,
  fetchEmployeePersonalInfoFulfilled,
  fetchEmployeePersonalInfoPending,
  fetchEmployeePersonalInfoRejected,
  fetchEmployeeProfessionalInfoFulfilled,
  fetchEmployeeProfessionalInfoPending,
  fetchEmployeeProfessionalInfoRejected,
  fetchEmployeeProfileByUsernameFulfilled,
  fetchEmployeeProfileByUsernamePending,
  fetchEmployeeProfileByUsernameRejected,
  fetchEmployeesFulfilled,
  fetchEmployeesPending,
  fetchEmployeesRejected,
  importEmployeeFulfilled,
  importEmployeePending,
  importEmployeeRejected,
} from "../reducers/employeeReducer";

// Thunk untuk mengambil profil karyawan berdasarkan username
export const fetchEmployeeProfileByUsername = createAsyncThunk(
  "employees/fetchProfileByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const id_employee = await getEmployeeIdByUsername(username);
      const profileResponse = await getEmployeeProfileById(id_employee);
      console.log("Profile Response: ", profileResponse);
      return profileResponse;
    } catch (error) {
      console.error("Error in fetchEmployeeProfileByUsername thunk:", error);
      return rejectWithValue(
        error.message || "Failed to fetch employee profile"
      );
    }
  }
);

// Thunk untuk mengambil professional information berdasarkan username
export const fetchEmployeeProfessionalInfoByUsername = createAsyncThunk(
  "employees/fetchProfessionalInfoByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const id_employee = await getEmployeeIdByUsername(username);
      const professionalInfoResponse = await getEmployeeProfessionalInfo(id_employee);
      return professionalInfoResponse;
    } catch (error) {
      console.error(
        "Error in fetchEmployeeProfessionalInfoByUsername thunk:",
        error
      );
      return rejectWithValue(
        error.message || "Failed to fetch professional information"
      );
    }
  }
);

// Thunk untuk mengambil personal information berdasarkan username
export const fetchEmployeePersonalInfoByUsername = createAsyncThunk(
  "employees/fetchPersonalInfoByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const id_employee = await getEmployeeIdByUsername(username);
      const personalInfoResponse = await getEmployeePersonalInfo(id_employee);
      return personalInfoResponse;
    } catch (error) {
      console.error(
        "Error in fetchEmployeePersonalInfoByUsername thunk:",
        error
      );
      return rejectWithValue(
        error.message || "Failed to fetch personal information"
      );
    }
  }
);

// Thunk untuk mengambil leave employee berdasarkan username
export const fetchEmployeeLeave = createAsyncThunk(
  "employees/fetchEmployeeLeave",
  async (username, { rejectWithValue }) => {
    try {
      const id_employee = await getEmployeeIdByUsername(username);
      const leaveResponse = await getEmployeeLeave(id_employee);
      if (!leaveResponse?.length) return [];
      console.log("Leave Response: ", leaveResponse);
      return leaveResponse;
    } catch (error) {
      if (error.response?.status === 404) {
        return [];
      }
      return rejectWithValue(
        error.message || "Failed to fetch leave information"
      );
    }
  }
);

// Async action to fetch all employees
export const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAll",
  async ({ page, size, keyword }, { rejectWithValue }) => {
    try {
      const response = await getEmployees(page, size, keyword);
      return {
        employees: response.data,
        totalData: response.totalData,
        totalPage: response.totalPage,
        pageSize: response.pageSize,
      };
    } catch (error) {
      console.error("Error in getEmployees thunk:", error);
      return rejectWithValue(error.message || "Unknown error");
    }
  }
);

// Async action to create a new employee
export const addEmployee = createAsyncThunk(
  "employees/add",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await addEmployeeAPI(employeeData);
      console.log("Employee added:", response);
      return response.data;
    } catch (error) {
      console.error("Error adding employee:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to import employees
export const importEmployee = createAsyncThunk(
  "employees/importEmployee",
  async (file, { rejectWithValue }) => {
    try {
      const response = await importEmployeeAPI(file);
      console.log("Employees imported:", response);
      return response.data;
    } catch (error) {
      console.error("Error importing employees:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Async action to edit personal employee information
export const editPersonalEmployee = createAsyncThunk(
  "employees/editPersonalEmployee",
  async ({ id_employee, formData }, { rejectWithValue }) => {
    console.log("Form Data: ", formData);
    console.log("Id Employee: ", id_employee);
    try {
      const response = await editPersonalEmployeeAPI(id_employee, formData);
      console.log("Employee edited:", response);
      return response.data;
    } catch (error) {
      console.error("Error editing employee:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to edit professional employee information
export const editProfessionalEmployee = createAsyncThunk(
  "employees/editProfessionalEmployee",
  async ({ id_employee, formData }, { rejectWithValue }) => {
    try {
      const response = await editProfessionalEmployeeAPI(id_employee, formData);
      console.log("Employee edited:", response);
      return response.data;
    } catch (error) {
      console.error("Error editing employee:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to delete an employee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id_employee, { rejectWithValue }) => {
    try {
      await deleteEmployeeAPI(id_employee);
      console.log("Employee deleted:", id_employee);
      return id_employee;
    } catch (error) {
      console.error("Error deleting employee:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to change employee password
export const editPassword = createAsyncThunk(
  "employees/editPassword",
  async ({ id_employee, formData }, { rejectWithValue }) => {
    try {
      const response = await changePassword(id_employee, formData);
      console.log("Password edited:", response);
      return response.data;
    } catch (error) {
      console.error("Error editing password:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk untuk mengambil detail kehadiran berdasarkan id_employee
export const fetchEmployeeAttendanceDetailsById = createAsyncThunk(
  "employees/fetchAttendanceDetailsById",
  async (id_employee, { rejectWithValue }) => {
    try {
      const attendanceResponse = await getEmployeeAttendanceDetails(id_employee);
      return attendanceResponse;
    } catch (error) {
      console.error("Error in fetchEmployeeAttendanceDetailsById thunk:", error);
      return rejectWithValue(
        error.message || "Failed to fetch employee attendance details"
      );
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    selectedEmployee: null,
    professionalInfo: null,
    personalInfo: null,
    leave: null,
    attendanceDetails: [],
    loading: false,
    error: null,
    totalData: 0,
    totalPage: 0,
    pageSize: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.pending, fetchEmployeesPending)
      .addCase(fetchAllEmployees.fulfilled, fetchEmployeesFulfilled)
      .addCase(fetchAllEmployees.rejected, fetchEmployeesRejected)
      .addCase(addEmployee.pending, addEmployeePending)
      .addCase(addEmployee.fulfilled, addEmployeeFulfilled)
      .addCase(addEmployee.rejected, addEmployeeRejected)
      .addCase(importEmployee.pending, importEmployeePending)
      .addCase(importEmployee.fulfilled, importEmployeeFulfilled)
      .addCase(importEmployee.rejected, importEmployeeRejected)
      .addCase(fetchEmployeeProfileByUsername.pending, fetchEmployeeProfileByUsernamePending)
      .addCase(fetchEmployeeProfileByUsername.fulfilled, fetchEmployeeProfileByUsernameFulfilled)
      .addCase(fetchEmployeeProfileByUsername.rejected, fetchEmployeeProfileByUsernameRejected)
      .addCase(fetchEmployeeProfessionalInfoByUsername.pending, fetchEmployeeProfessionalInfoPending)
      .addCase(fetchEmployeeProfessionalInfoByUsername.fulfilled, fetchEmployeeProfessionalInfoFulfilled)
      .addCase(fetchEmployeeProfessionalInfoByUsername.rejected, fetchEmployeeProfessionalInfoRejected)
      .addCase(fetchEmployeePersonalInfoByUsername.pending, fetchEmployeePersonalInfoPending)
      .addCase(fetchEmployeePersonalInfoByUsername.fulfilled, fetchEmployeePersonalInfoFulfilled)
      .addCase(fetchEmployeePersonalInfoByUsername.rejected, fetchEmployeePersonalInfoRejected)
      .addCase(fetchEmployeeLeave.pending, fetchEmployeeLeavePending)
      .addCase(fetchEmployeeLeave.fulfilled, fetchEmployeeLeaveFulfilled)
      .addCase(fetchEmployeeLeave.rejected, fetchEmployeeLeaveRejected)
      .addCase(editPersonalEmployee.pending, editPersonalEmployeePending)
      .addCase(editPersonalEmployee.fulfilled, editPersonalEmployeeFulfilled)
      .addCase(editPersonalEmployee.rejected, editPersonalEmployeeRejected)
      .addCase(editProfessionalEmployee.pending, editProfessionalEmployeePending)
      .addCase(editProfessionalEmployee.fulfilled, editProfessionalEmployeeFulfilled)
      .addCase(editProfessionalEmployee.rejected, editProfessionalEmployeeRejected)
      .addCase(deleteEmployee.pending, deleteEmployeePending)
      .addCase(deleteEmployee.fulfilled, deleteEmployeeFulfilled)
      .addCase(deleteEmployee.rejected, deleteEmployeeRejected)
      .addCase(editPassword.pending, editPasswordPending)
      .addCase(editPassword.fulfilled, editPasswordFulfilled)
      .addCase(editPassword.rejected, editPasswordRejected)
      .addCase(fetchEmployeeAttendanceDetailsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeAttendanceDetailsById.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceDetails = action.payload.data.map((attendance) => {
          const checkIn = new Date(attendance.check_in).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          const checkOut = attendance.check_out ? new Date(attendance.check_out).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }) : "-";

          const totalWorkingHours = attendance.total_working_hours
            ? `${attendance.total_working_hours.substring(0, 5)} Hrs`
            : "-";

          return {
            id: attendance.id_attendance,
            date: new Date(attendance.date_attendance).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
            checkIn,
            checkOut,
            workingHours: totalWorkingHours,
            status: attendance.status,
          };
        });
      })
      .addCase(fetchEmployeeAttendanceDetailsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
