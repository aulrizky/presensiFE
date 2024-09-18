export const fetchEmployeesPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchEmployeesFulfilled = (state, action) => {
  state.loading = false;
  const transformedEmployees = action.payload.employees.map((employee) => ({
    ...employee,
    status: employee.status || "-", // Berikan default "-" jika status tidak ada
  }));

  state.data = transformedEmployees;
  state.totalData = action.payload.totalData;
  console.log("total datasssssssssssss: ", state.totalData);
  state.totalPage = action.payload.totalPage;
  state.pageSize = action.payload.pageSize;

  console.log("reducers after get all employees: ", state.data);
};

export const fetchEmployeesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const addEmployeePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const addEmployeeFulfilled = (state, action) => {
  state.loading = false;
  const employee = action.payload;
  const {
    role_current_company, // Ambil field yang lama
    id_employee,
    id_department,
    id_company,
    employee_number,
    first_name,
    last_name,
    status,
    id_account,
    ...rest // Ambil field lainnya
  } = employee;

  const transformedEmployee = {
    ...rest,
    company: {
      ...rest.company,
      idCompany: id_company,
    },
    department: {
      ...rest.department,
      idDepartment: id_department,
    },
    idEmployee: id_employee,
    employeeName: `${employee.first_name} ${employee.last_name}`,
    employeeNumber: employee_number,
    roleCurrentCompany: role_current_company,
    status: status || "-",
  };
  console.log("reducers transpose before add employee: ", transformedEmployee);
  state.data.push(transformedEmployee);
  state.pageSize = (state.pageSize || 0) + 1;
  console.log("reducers after add employee: ", state.data);
};

export const addEmployeeRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const importEmployeePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const importEmployeeFulfilled = (state, action) => {
  state.loading = false;

  // Jika payload hanya berupa pesan sukses, kita tidak perlu mengubah state.data
  if (action.payload && action.payload.message) {
    console.log("Import successful:", action.payload.message);
    // Anda bisa menambahkan logika lain di sini jika perlu, misalnya notifikasi atau logging
  } else {
    // Jika payload mengandung array (misalnya dalam kasus lain), kita bisa menggabungkannya
    if (Array.isArray(action.payload)) {
      state.data = [...state.data, ...action.payload];
    }
  }
};

export const importEmployeeRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchEmployeeProfileByUsernamePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchEmployeeProfileByUsernameFulfilled = (state, action) => {
  state.loading = false;
  state.selectedEmployee = action.payload;
};

export const fetchEmployeeProfileByUsernameRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchEmployeeProfessionalInfoPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchEmployeeProfessionalInfoFulfilled = (state, action) => {
  state.loading = false;
  state.professionalInfo = action.payload.data;
};

export const fetchEmployeeProfessionalInfoRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchEmployeePersonalInfoPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchEmployeePersonalInfoFulfilled = (state, action) => {
  state.loading = false;
  state.personalInfo = action.payload.data;
};

export const fetchEmployeePersonalInfoRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchEmployeeLeavePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchEmployeeLeaveFulfilled = (state, action) => {
  state.loading = false;
  const transformedLeaves = action.payload.map((leave) => ({
    ...leave,
    date: leave.created_date
      ? new Date(leave.created_date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "-", // Harusnya created at
    leave_duration: `${
      leave.start_date
        ? new Date(leave.start_date).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
          })
        : "-"
    } - ${
      leave.end_date
        ? new Date(leave.end_date).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
          })
        : "-"
    }, ${leave.start_date ? new Date(leave.start_date).getFullYear() : "-"}`,
    leave_days:
      Math.ceil(
        (new Date(leave.end_date) - new Date(leave.start_date) + 86400000) /
          (1000 * 60 * 60 * 24)
      ) + " Days",
  }));

  state.leaves = transformedLeaves;
};

export const fetchEmployeeLeaveRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const editPersonalEmployeePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const editPersonalEmployeeFulfilled = (state, action) => {
  state.loading = false;
};

export const editPersonalEmployeeRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const editProfessionalEmployeePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const editProfessionalEmployeeFulfilled = (state, action) => {
  state.loading = false;
};

export const editProfessionalEmployeeRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const deleteEmployeePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const deleteEmployeeFulfilled = (state, action) => {
  state.loading = false;

  const deletedEmployee = action.payload;
  console.log("Deleted reducers employee:", deletedEmployee);
  state.data = state.data.filter(
    (employee) => employee.idEmployee !== deletedEmployee.id_employee
  );
};

export const deleteEmployeeRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const editPasswordPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const editPasswordFulfilled = (state) => {
  state.loading = false;
};

export const editPasswordRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
