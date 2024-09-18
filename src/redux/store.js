import { configureStore } from "@reduxjs/toolkit";
import admin from "./slices/adminSlice";
import company from "./slices/companySlice";
import departments from "./slices/departmentSlice";
import employees from "./slices/employeeSlice";
import holidayReducer from "./slices/holidaySlice";
import leaves from "./slices/leaveSlice";
import dashboard from "./slices/dashboardSlice";
import superadmin from "./slices/superadminSlice";
import attendances from "./slices/attendanceSlice";

export const store = configureStore({
  reducer: {
    employees: employees,
    leaves: leaves,
    departments: departments,
    holidays: holidayReducer,
    attendances: attendances,
    admin: admin,
    company: company,
    dashboard: dashboard,
    superadmin: superadmin,
  },
});

export default store;
