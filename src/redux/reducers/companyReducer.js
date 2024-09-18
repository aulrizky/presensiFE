export const fetchCompanyPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchCompanyFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
};

export const fetchCompanyRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const updateCompanyProfilePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const updateCompanyProfileFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
};

export const updateCompanyProfileRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const updateCompanyLogoPending = (state) => {
  state.loading = true;
  state.updateError = null;
  state.updateSuccess = false;
};

export const updateCompanyLogoFulfilled = (state, action) => {
  state.loading = false;
  state.data.data.company_logo = action.payload.data.company_logo;
  state.updateSuccess = true;
};

export const updateCompanyLogoRejected = (state, action) => {
  state.loading = false;
  state.updateError = action.payload;
};

export const fetchCompanyConfigPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchCompanyConfigFulfilled = (state, action) => {
  state.loading = false;
  state.config = action.payload;
};

export const fetchCompanyConfigRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const updateCompanyConfigPending = (state) => {
  state.loading = true;
  state.updateError = null;
  state.updateSuccess = false;
};

export const updateCompanyConfigFulfilled = (state, action) => {
  state.loading = false;
  state.config = {
    ...state.config,
    ...action.payload, // Hanya update bagian config yang dikembalikan oleh API
  };
  state.updateSuccess = true;
};

export const updateCompanyConfigRejected = (state, action) => {
  state.loading = false;
  state.updateError = action.payload;
};

export const fetchCompaniesPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchCompaniesFulfilled = (state, action) => {
  state.loading = false;
  state.companies = action.payload;
  console.log("action payload reducer : ", action.payload);
};

export const fetchCompaniesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const changeCompanyLogoPending = (state) => {
  state.loading = true;
  state.updateError = null;
  state.updateSuccess = false;
};

export const changeCompanyLogoFulfilled = (state) => {
  state.loading = false;
  state.updateSuccess = true;
  state.updateError = null;
};

export const changeCompanyLogoRejected = (state, action) => {
  state.loading = false;
  state.updateError = action.payload;
  state.updateSuccess = false;
  state.status = "failed";
  state.error = action.payload?.message || "Failed to change company logo";
};

export const fetchDetailCompanyPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchDetailCompanyFulfilled = (state, action) => {
  state.loading = false;
  state.detailCompany = action.payload;
};

export const fetchDetailCompanyRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const editCompaniesConfigPending = (state) => {
  state.loading = true;
};

export const editCompaniesConfigFulfilled = (state, action) => {
  state.loading = false;
  state.config = action.payload;
};

export const editCompaniesConfigRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const addCompaniesConfigPending = (state) => {
  state.loading = true;
};

export const addCompaniesConfigFulfilled = (state, action) => {
  state.loading = false;
  state.config = action.payload;
};

export const addCompaniesConfigRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const deleteCompanyPending = (state) => {
  state.loading = true;
};

export const deleteCompanyFulfilled = (state, action) => {
  state.loading = false;
  state.config = action.payload;
};

export const deleteCompanyRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchDataCompaniesPending = (state) => {
  state.loading = true;
};

export const fetchDataCompaniesFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
};

export const fetchDataCompaniesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const addNewCompanyPending = (state) => {
  state.loading = true;
};
export const addNewCompanyFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
};
export const addNewCompanyRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const editCompanyPending = (state) => {
  state.loading = true;
};
export const editCompanyFulfilled = (state, action) => {
  state.loading = false;
  state.updateSuccess = true;
};
export const editCompanyRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.updateSuccess = false;
};
