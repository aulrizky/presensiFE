export const fetchSuperadminDetailPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchSuperadminDetailFulfilled = (state, action) => {
  state.superadminDetail = action.payload;
  state.loading = false;
};

export const fetchSuperadminDetailRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
