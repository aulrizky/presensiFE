export const fetchHolidaysPending = (state) => {
    state.loading = true;
    state.error = null;
  };
  
  export const fetchHolidaysFulfilled = (state, action) => {
    state.loading = false;
    state.holidays = action.payload.holidays || [];
    state.totalElements = action.payload.totalElements || 0;
  };
  
  
  export const fetchHolidaysRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
  };
  
  export const createHolidayPending = (state) => {
    state.loading = true;
    state.error = null;
  };
  
  export const createHolidayFulfilled = (state, action) => {
    state.loading = false;
    state.holidays.push(action.payload);
  };
  
  export const createHolidayRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
  };
  