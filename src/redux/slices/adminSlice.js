import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAdminInformation,
  updateAdminInformation,
  changeAdminPassword,
  changeAdminProfilePicture,
  getAdminDetail,
  changeAdminProfilePhoto,
  addNewAdmin,
  getAllAdmin,
  editDataAdmin,
  editPassword,
  deleteDataAdministrator,
} from "../../services/apis/adminService";
import {
  fetchAdminPending,
  fetchAdminFulfilled,
  fetchAdminRejected,
  updateAdminPending,
  updateAdminFulfilled,
  updateAdminRejected,
  changePasswordPending,
  changePasswordFulfilled,
  changePasswordRejected,
  updateAdminProfilePicturePending,
  updateAdminProfilePictureFulfilled,
  updateAdminProfilePictureRejected,
  fetchAdminDetailPending,
  fetchAdminDetailFulfilled,
  fetchAdminDetailRejected,
  fetchAllAdminsPending,
  fetchAllAdminsFulfilled,
  fetchAllAdminsRejected,
  changeAdminPhotoPending,
  changeAdminPhotoFulfilled,
  changeAdminPhotoRejected,
  addAdminPending,
  addAdminFulfilled,
  addAdminRejected,
  editAdminSuperadminPending,
  editAdminSuperadminFulfilled,
  editAdminSuperadminRejected,
  deleteAdministratorPending,
  deleteAdministratorFulfilled,
  deleteAdministratorRejected,
} from "../reducers/adminReducer";

// Async action to fetch admin data
export const fetchAdmin = createAsyncThunk(
  "admin/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAdminInformation();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to update admin data
export const saveAdminInformation = createAsyncThunk(
  "admin/update",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await updateAdminInformation(adminData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to update admin password
export const saveAdminPassword = createAsyncThunk(
  "admin/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await changeAdminPassword(passwordData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to update admin profile picture
export const updateAdminProfilePicture = createAsyncThunk(
  "admin/changeProfilePicture",
  async (file, { rejectWithValue }) => {
    try {
      const response = await changeAdminProfilePicture(file);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// superadmin
// Async action to get detail admin
export const fetchAdminDetail = createAsyncThunk(
  "admin/fetchAdminDetail",
  async (idAdmin, { rejectWithValue }) => {
    try {
      const response = await getAdminDetail(idAdmin);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Async action to get all admin
export const fetchAllAdmins = createAsyncThunk(
  "admin/fetchAllAdmins",
  async (params, { rejectWithValue }) => {
    try {
      console.log("All Admin API params:", params);
      const response = await getAllAdmin(
        params.sortBy,
        params.pageSize,
        params.page,
        params.startDateJoined,
        params.endDateJoined
      );
      console.log("All Admin API response response:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to change admin profile picture
export const changeAdminPhoto = createAsyncThunk(
  "admin/changeAdminPhoto",
  async ({ idAdmin, formData }, { rejectWithValue }) => {
    try {
      const response = await changeAdminProfilePhoto(idAdmin, formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to add new admin
export const addAdmin = createAsyncThunk(
  "admin/addAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await addNewAdmin(adminData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to edit admin
export const fetchEditAdminData = createAsyncThunk(
  "admin/editAdmin",
  async ({ id, adminData }, { rejectWithValue }) => {
    try {
      console.log("Admindata fetchEditAdminData", adminData);
      const response = await editDataAdmin(id, adminData);
      console.log("response", response);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// edit password
export const fetchEditPassword = createAsyncThunk(
  "admin/editPassword",
  async ({ id, password }, { rejectWithValue }) => {
    try {
      console.log("fetchEditPassword", password);
      const response = await editPassword(id, password);
      return response.data; // or response depending on what you need
    } catch (error) {
      console(error);
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Async action to delete admin
export const deleteAdministrator = createAsyncThunk(
  "admin/deleteAdmin",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("id delete slice", id);
      const response = await deleteDataAdministrator(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    data: null,
    loading: false,
    error: null,
    updateSuccess: false,
    updateError: null,
    passwordChangeSuccess: false,
    passwordChangeError: null,
    adminDetail: null,
    admins: [],
  },
  reducers: {
    updateReset: (state) => {
      state.updateSuccess = false;
      state.passwordChangeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmin.pending, fetchAdminPending)
      .addCase(fetchAdmin.fulfilled, fetchAdminFulfilled)
      .addCase(fetchAdmin.rejected, fetchAdminRejected)
      .addCase(saveAdminInformation.pending, updateAdminPending)
      .addCase(saveAdminInformation.fulfilled, updateAdminFulfilled)
      .addCase(saveAdminInformation.rejected, updateAdminRejected)
      .addCase(saveAdminPassword.pending, changePasswordPending)
      .addCase(saveAdminPassword.fulfilled, changePasswordFulfilled)
      .addCase(saveAdminPassword.rejected, changePasswordRejected)
      .addCase(
        updateAdminProfilePicture.pending,
        updateAdminProfilePicturePending
      )
      .addCase(
        updateAdminProfilePicture.fulfilled,
        updateAdminProfilePictureFulfilled
      )
      .addCase(
        updateAdminProfilePicture.rejected,
        updateAdminProfilePictureRejected
      )
      .addCase(fetchAdminDetail.pending, fetchAdminDetailPending)
      .addCase(fetchAdminDetail.fulfilled, fetchAdminDetailFulfilled)
      .addCase(fetchAdminDetail.rejected, fetchAdminDetailRejected)
      .addCase(fetchAllAdmins.pending, fetchAllAdminsPending)
      .addCase(fetchAllAdmins.fulfilled, fetchAllAdminsFulfilled)
      .addCase(fetchAllAdmins.rejected, fetchAllAdminsRejected)
      .addCase(changeAdminPhoto.pending, changeAdminPhotoPending)
      .addCase(changeAdminPhoto.fulfilled, changeAdminPhotoFulfilled)
      .addCase(changeAdminPhoto.rejected, changeAdminPhotoRejected)
      .addCase(addAdmin.pending, addAdminPending)
      .addCase(addAdmin.fulfilled, addAdminFulfilled)
      .addCase(addAdmin.rejected, addAdminRejected)
      .addCase(fetchEditAdminData.pending, editAdminSuperadminPending)
      .addCase(fetchEditAdminData.fulfilled, editAdminSuperadminFulfilled)
      .addCase(fetchEditAdminData.rejected, editAdminSuperadminRejected)
      .addCase(fetchEditPassword.pending, editAdminSuperadminRejected)
      .addCase(fetchEditPassword.fulfilled, editAdminSuperadminFulfilled)
      .addCase(fetchEditPassword.rejected, editAdminSuperadminRejected)
      .addCase(deleteAdministrator.pending, deleteAdministratorPending)
      .addCase(deleteAdministrator.fulfilled, deleteAdministratorFulfilled)
      .addCase(deleteAdministrator.rejected, deleteAdministratorRejected);
  },
});

export const { updateReset } = adminSlice.actions;
export default adminSlice.reducer;
