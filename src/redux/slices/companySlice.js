import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  changeCompanysLogo,
  deleteDataCompany,
  editDataCompany,
  fetchMasterCompanies,
  getCompanyConfig as getCompanyConfigAPI,
  getCompanyProfile as getCompanyProfileAPI,
  getDataCompanies,
  getDetailCompany,
  insertNewCompany,
  updateCompanyLogo as updateCompanyLogoAPI,
  updateCompanyProfileAPI,
  updateCompanyConfig as updateCompanyConfigAPI,
} from "../../services/apis/companyService";

import {
  addNewCompanyFulfilled,
  addNewCompanyPending,
  addNewCompanyRejected,
  changeCompanyLogoFulfilled,
  changeCompanyLogoPending,
  changeCompanyLogoRejected,
  deleteCompanyFulfilled,
  deleteCompanyPending,
  deleteCompanyRejected,
  editCompanyFulfilled,
  editCompanyPending,
  editCompanyRejected,
  fetchCompaniesFulfilled,
  fetchCompaniesPending,
  fetchCompaniesRejected,
  fetchCompanyConfigFulfilled,
  fetchCompanyConfigPending,
  fetchCompanyConfigRejected,
  fetchCompanyFulfilled,
  fetchCompanyPending,
  fetchCompanyRejected,
  fetchDataCompaniesFulfilled,
  fetchDataCompaniesPending,
  fetchDataCompaniesRejected,
  fetchDetailCompanyFulfilled,
  fetchDetailCompanyPending,
  fetchDetailCompanyRejected,
  updateCompanyLogoFulfilled,
  updateCompanyLogoPending,
  updateCompanyLogoRejected,
  updateCompanyProfileFulfilled,
  updateCompanyProfilePending,
  updateCompanyProfileRejected,
  updateCompanyConfigPending,
  updateCompanyConfigFulfilled,
  updateCompanyConfigRejected,
} from "../reducers/companyReducer";

export const fetchCompany = createAsyncThunk(
  "company/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCompanyProfileAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to update company profile
export const updateCompanyProfile = createAsyncThunk(
  "company/updateProfile",
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await updateCompanyProfileAPI(companyData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to fetch company config
export const fetchCompanyConfig = createAsyncThunk(
  "company/fetchConfig",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCompanyConfigAPI();
      return response;
    } catch (error) {
      console.error("Error fetching company config:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateCompanyConfig = createAsyncThunk(
  "company/updateConfig",
  async (configData, { rejectWithValue }) => {
    try {
      const response = await updateCompanyConfigAPI(configData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCompanyLogo = createAsyncThunk(
  "company/updateLogo",
  async (file, { rejectWithValue }) => {
    try {
      const response = await updateCompanyLogoAPI(file);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//superadmin
//async ambil master perusahaan
export const fetchCompanies = createAsyncThunk(
  "admin/fetchCompanies",
  async () => {
    try {
      const response = await fetchMasterCompanies();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to change company logo
export const changeCompanyLogo = createAsyncThunk(
  "company/changeCompanyLogo",
  async ({ idCompany, formData }, { rejectWithValue }) => {
    try {
      const response = await changeCompanysLogo(idCompany, formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDetailCompany = createAsyncThunk(
  "company/fetchDetailCompany",
  async (idCompany, { rejectWithValue }) => {
    try {
      const response = await getDetailCompany(idCompany);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addNewCompany = createAsyncThunk(
  "company/addNewCompany",
  async (data, { rejectWithValue }) => {
    try {
      const response = insertNewCompany(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchDataCompanies = createAsyncThunk(
  "company/companies",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getDataCompanies(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editCompany = createAsyncThunk(
  "company/editCompany",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await editDataCompany(id, data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await deleteDataCompany(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    data: null,
    config: null,
    loading: false,
    error: null,
    updateSuccess: false,
    updateError: null,
    detailCompany: null,
    companies: [],
  },
  reducers: {
    resetCompanyConfig(state) {
      state.config = null;
    },

    updateReset: (state) => {
      state.updateSuccess = false;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, fetchCompanyPending)
      .addCase(fetchCompany.fulfilled, fetchCompanyFulfilled)
      .addCase(fetchCompany.rejected, fetchCompanyRejected)
      .addCase(fetchCompanyConfig.pending, fetchCompanyConfigPending)
      .addCase(fetchCompanyConfig.fulfilled, fetchCompanyConfigFulfilled)
      .addCase(fetchCompanyConfig.rejected, fetchCompanyConfigRejected)
      .addCase(updateCompanyProfile.pending, updateCompanyProfilePending)
      .addCase(updateCompanyProfile.fulfilled, updateCompanyProfileFulfilled)
      .addCase(updateCompanyProfile.rejected, updateCompanyProfileRejected)
      .addCase(updateCompanyLogo.pending, updateCompanyLogoPending)
      .addCase(updateCompanyLogo.fulfilled, updateCompanyLogoFulfilled)
      .addCase(updateCompanyLogo.rejected, updateCompanyLogoRejected)
      .addCase(updateCompanyConfig.pending, updateCompanyConfigPending)
      .addCase(updateCompanyConfig.fulfilled, updateCompanyConfigFulfilled)
      .addCase(updateCompanyConfig.rejected, updateCompanyConfigRejected)
      .addCase(fetchCompanies.pending, fetchCompaniesPending)
      .addCase(fetchCompanies.fulfilled, fetchCompaniesFulfilled)
      .addCase(fetchCompanies.rejected, fetchCompaniesRejected)
      .addCase(changeCompanyLogo.pending, changeCompanyLogoPending)
      .addCase(changeCompanyLogo.fulfilled, changeCompanyLogoFulfilled)
      .addCase(changeCompanyLogo.rejected, changeCompanyLogoRejected)
      .addCase(fetchDetailCompany.pending, fetchDetailCompanyPending)
      .addCase(fetchDetailCompany.fulfilled, fetchDetailCompanyFulfilled)
      .addCase(fetchDetailCompany.rejected, fetchDetailCompanyRejected)
      .addCase(fetchDataCompanies.pending, fetchDataCompaniesPending)
      .addCase(fetchDataCompanies.fulfilled, fetchDataCompaniesFulfilled)
      .addCase(fetchDataCompanies.rejected, fetchDataCompaniesRejected)
      .addCase(deleteCompany.pending, deleteCompanyPending)
      .addCase(deleteCompany.fulfilled, deleteCompanyFulfilled)
      .addCase(deleteCompany.rejected, deleteCompanyRejected)
      .addCase(editCompany.pending, editCompanyPending)
      .addCase(editCompany.fulfilled, editCompanyFulfilled)
      .addCase(editCompany.rejected, editCompanyRejected)
      .addCase(addNewCompany.pending, addNewCompanyPending)
      .addCase(addNewCompany.fulfilled, addNewCompanyFulfilled)
      .addCase(addNewCompany.rejected, addNewCompanyRejected);
  },
});

export default companySlice.reducer;

export const { resetCompanyConfig } = companySlice.actions;
