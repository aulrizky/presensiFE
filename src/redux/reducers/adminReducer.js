export const fetchAdminPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchAdminFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
};

export const fetchAdminRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const updateAdminPending = (state) => {
  state.loading = true;
  state.updateError = null;
  state.updateSuccess = false;
};

export const updateAdminFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
  state.updateSuccess = true;
  state.updateError = null;
};

export const updateAdminRejected = (state, action) => {
  state.loading = false;
  state.updateError = action.payload;
  state.updateSuccess = false;
};

export const changePasswordPending = (state) => {
  state.loading = true;
  state.passwordChangeError = null;
  state.passwordChangeSuccess = false;
};

export const changePasswordFulfilled = (state, action) => {
  state.loading = false;
  state.passwordChangeSuccess = true;
  state.passwordChangeError = null;
};

export const changePasswordRejected = (state, action) => {
  state.loading = false;
  state.passwordChangeError = action.payload;
  state.passwordChangeSuccess = false;
};

export const updateAdminProfilePicturePending = (state) => {
  state.loading = true;
  state.updateError = null;
  state.updateSuccess = false;
};

export const updateAdminProfilePictureFulfilled = (state) => {
  state.loading = false;
  state.updateSuccess = true;
  state.updateError = null;
};

export const updateAdminProfilePictureRejected = (state, action) => {
  state.loading = false;
  state.updateError = action.payload;
  state.updateSuccess = false;
};

export const fetchAdminDetailPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchAdminDetailFulfilled = (state, action) => {
  state.loading = false;
  state.adminDetail = action.payload;
};

export const fetchAdminDetailRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchAllAdminsPending = (state) => {
  state.loading = true;
  state.error = null;
};
export const fetchAllAdminsFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
  state.pagination = action.payload.meta;
};
export const fetchAllAdminsRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const changeAdminPhotoPending = (state) => {
  state.loading = true;
  state.error = null;
  state.validationErrors = {};
};

export const changeAdminPhotoFulfilled = (state) => {
  state.loading = false;
  state.updateSuccess = true;
  state.updateError = null;
};

export const changeAdminPhotoRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.validationErrors = action.payload.errors;
};

export const addAdminPending = (state) => {
  state.loading = true;
  state.error = null;
  state.validationErrors = {};
};

export const addAdminFulfilled = (state, action) => {
  state.loading = false;
  state.admins.push(action.payload);
};

export const addAdminRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.validationErrors = action.payload.errors;
};

export const editAdminSuperadminPending = (state, action) => {
  state.loading = true;
  state.updateError = null;
  state.updateSuccess = false;
};

export const editAdminSuperadminFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
  state.updateSuccess = true;
  state.updateError = null;
};

export const editAdminSuperadminRejected = (state, action) => {
  state.loading = false;
  state.updateError = action.payload;
  state.updateSuccess = false;
};

export const editPasswordSuperadminPending = (state, action) => {
  state.loading = true;
  state.updateError = null;
  state.updateSuccess = false;
};

export const editPasswordSuperadminFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
  state.updateSuccess = true;
  state.updateError = null;
};

export const editPasswordSuperadminRejected = (state, action) => {
  state.loading = false;
  state.updateError = action.payload;
  state.updateSuccess = false;
};

export const deleteAdministratorPending = (state) => {
  state.status = "loading";
};
export const deleteAdministratorFulfilled = (state, action) => {
  state.status = "succeeded";
  state.message = action.payload.message;
};
export const deleteAdministratorRejected = (state, action) => {
  state.status = "failed";
  state.error = action.error.message;
};
