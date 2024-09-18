export const fetchTopEmployeesPending = (state) => {
    state.loading = true;
    state.error = null;
};
  
export const fetchTopEmployeesFulfilled = (state, action) => {
    state.loading = false;
    state.topEmployees = action.payload;
};
  
export const fetchTopEmployeesRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

export const fetchDashboardSummaryPending = (state) => {
    state.loading = true;
    state.error = null;
};
  
export const fetchDashboardSummaryFulfilled = (state, action) => {
    state.loading = false;
    state.summary = action.payload;
};
  
export const fetchDashboardSummaryRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

export const fetchAttendanceOverviewPending = (state) => {
    state.loadingAttendance = true;
    state.errorAttendance = null;
};
  
export const fetchAttendanceOverviewFulfilled = (state, action) => {
    state.loadingAttendance = false;
    state.attendanceOverview = action.payload;
};
  
export const fetchAttendanceOverviewRejected = (state, action) => {
    state.loadingAttendance = false;
    state.errorAttendance = action.payload;
};
export const fetchDataDashboardSuperadminPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchDataDashboardSuperadminFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload.data;
};

export const fetchDataDashboardSuperadminRejected = (state, action) => {
  state.loading = false;
  state.error = action.error;
};

export const fetchDataChartSuperadminPending = (state) => {
  state.loading = true;
};

export const fetchDataChartSuperadminFulfilled = (state, action) => {
  state.loading = false;
  state.dataChart = action.payload.data;
};

export const fetchDataChartSuperadminRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};
