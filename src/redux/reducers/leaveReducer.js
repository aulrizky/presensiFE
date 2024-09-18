export const fetchLeavesPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchLeavesFulfilled = (state, action) => {
  state.data = action.payload.leaves;
  state.loading = false;
  state.totalData = action.payload.totalData;
  state.totalPage = action.payload.totalPage;
  state.pageSize = action.payload.pageSize;
};

export const fetchLeavesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchLeavesDetailPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchLeavesDetailFulfilled = (state, action) => {
  state.dataDetail = action.payload;
  state.loading = false;
};

export const fetchLeavesDetailRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const updateLeavesFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
};

export const updateLeavesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const updateLeavesPending = (state) => {
  state.loading = true;
  state.error = null;
};
