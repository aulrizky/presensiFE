import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/axiosInstance";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  userRole: localStorage.getItem("userRole") || null,
  token: localStorage.getItem("token") || null,
  superadminDetails: null,
  loading: false,
  error: null,
};

// Async Thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await instance.post("/superadmin/login", {
        username,
        password,
      });

      const data = response.data;

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userRole", data.data.role);
      console.log(data);

      return data.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const getSuperadminDetails = createAsyncThunk(
  "auth/getSuperadminDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/superadmin/superadmin");
      const data = response.data;
      console.log("API Called: superadmin/superadmin", data);
      return data.data; // Access the nested data object directly
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.userRole = null;
      state.token = null;
      state.superadminDetails = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
    },
    setCredentials(state, action) {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userRole = action.payload.role;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSuperadminDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSuperadminDetails.fulfilled, (state, action) => {
        console.log("Fulfilled payload:", action.payload);
        state.superadminDetails = action.payload; // Directly assign the payload to superadminDetails
        state.loading = false;
      })
      .addCase(getSuperadminDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
