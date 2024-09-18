import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDepartment as addDepartmentAPI,
  editDepartment as editDepartmentAPI,
  importDepartment as importDepartmentAPI,
  deleteDepartment as deleteDepartmentAPI,
  getEmployeesByDepartmentId,
  getDepartmentDetailsByCompanyId,
} from "../../services/apis/departmentService";
import {
  addDepartmentFulfilled,
  addDepartmentPending,
  addDepartmentRejected,
  deleteDepartmentFulfilled,
  deleteDepartmentPending,
  deleteDepartmentRejected,
  editDepartmentFulfilled,
  editDepartmentPending,
  editDepartmentRejected,
  fetchDepartmentsFulfilled,
  fetchDepartmentsPending,
  fetchDepartmentsRejected,
  importDepartmentFulfilled,
  importDepartmentPending,
  importDepartmentRejected,
  fetchEmployeesByDepartmentPending,
  fetchEmployeesByDepartmentFulfilled,
  fetchEmployeesByDepartmentRejected,
} from "../reducers/departmentReducer";

// Async action to fetch department details
export const fetchAllDepartments = createAsyncThunk(
  "departments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDepartmentDetailsByCompanyId();
      console.log("Fetched department details", response);

      if (!response || !Array.isArray(response)) {
        throw new Error("Expected an array of departments in response");
      }

      // Transform data if necessary
      const transformedResponse = response.map((department) => ({
        id: department.idDepartment,
        name: department.departmentName,
        topEmployees: department.topEmployees,
        totalEmployees: department.totalEmployees,
      }));

      return {
        departments: transformedResponse,
      };
    } catch (error) {
      console.error("Error in fetchAllDepartments thunk:", error);
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchEmployeesByDepartment = createAsyncThunk(
  "departments/fetchEmployeesByDepartment",
  async ({ idDepartment, paginationModel }, { rejectWithValue }) => {
    try {
      const response = await getEmployeesByDepartmentId(
        idDepartment,
        paginationModel
      );
      console.log("Fetched employees by department response:", response);
      return response.data; // Pastikan API mengembalikan objek yang benar
    } catch (error) {
      console.error("Error in fetchEmployeesByDepartment thunk:", error);
      return rejectWithValue(error.message);
    }
  }
);



// Async action to add a department
export const addDepartment = createAsyncThunk(
  "departments/addDepartment",
  async (departmentName, { rejectWithValue }) => {
    try {
      const response = await addDepartmentAPI(departmentName);
      console.log("Department added:", response);
      return response.data; // Pastikan data ini sesuai dengan yang Anda butuhkan
    } catch (error) {
      console.error("Error adding department:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const editDepartment = createAsyncThunk(
  "departments/editDepartment",
  async ({ idDepartment, departmentName }, { rejectWithValue }) => {
    try {
      const response = await editDepartmentAPI(idDepartment, departmentName);
      console.log("Department edited response:", response);

      return {
        id: idDepartment, // ID yang kita kirim
        department_name: departmentName, // Nama yang kita update
        message: response.message, // Pesan dari respons
        statusCode: response.statusCode, // Status kode dari respons
        status: response.status, // Status dari respons
      };
    } catch (error) {
      console.error("Error editing department:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDepartment = createAsyncThunk(
  "departments/deleteDepartment",
  async (idDepartment, { rejectWithValue }) => {
    try {
      const response = await deleteDepartmentAPI(idDepartment);
      console.log("Department deleted response:", response);

      return {
        id: idDepartment, // ID yang dihapus
        message: response.message, // Pesan dari respons
        statusCode: response.statusCode, // Status kode dari respons
        status: response.status, // Status dari respons
      };
    } catch (error) {
      console.error("Error deleting department:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Async action to import departments
export const importDepartment = createAsyncThunk(
  "departments/importDepartment",
  async (file, { rejectWithValue }) => {
    try {
      const response = await importDepartmentAPI(file);
      console.log("Departments imported:", response);
      return response.data; // Pastikan data ini sesuai dengan yang Anda butuhkan
    } catch (error) {
      console.error("Error importing departments:", error);
      return rejectWithValue(error.message);
    }
  }
);


const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    data: [],
    employees: [],
    totalData: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetEmployees(state) {
      state.employees = [];
      state.totalData = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDepartments.pending, fetchDepartmentsPending)
      .addCase(fetchAllDepartments.fulfilled, fetchDepartmentsFulfilled)
      .addCase(fetchAllDepartments.rejected, fetchDepartmentsRejected)
      .addCase(addDepartment.pending, addDepartmentPending)
      .addCase(addDepartment.fulfilled, addDepartmentFulfilled)
      .addCase(addDepartment.rejected, addDepartmentRejected)
      .addCase(editDepartment.pending, editDepartmentPending)
      .addCase(editDepartment.fulfilled, editDepartmentFulfilled)
      .addCase(editDepartment.rejected, editDepartmentRejected)
      .addCase(importDepartment.pending, importDepartmentPending)
      .addCase(importDepartment.fulfilled, importDepartmentFulfilled)
      .addCase(importDepartment.rejected, importDepartmentRejected)
      .addCase(deleteDepartment.pending, deleteDepartmentPending)
      .addCase(deleteDepartment.fulfilled, deleteDepartmentFulfilled)
      .addCase(deleteDepartment.rejected, deleteDepartmentRejected)
      .addCase(
        fetchEmployeesByDepartment.pending,
        fetchEmployeesByDepartmentPending
      )
      .addCase(
        fetchEmployeesByDepartment.fulfilled,
        fetchEmployeesByDepartmentFulfilled
      )
      .addCase(
        fetchEmployeesByDepartment.rejected,
        fetchEmployeesByDepartmentRejected
      );
  },
});

export default departmentSlice.reducer;

export const { resetEmployees } = departmentSlice.actions;