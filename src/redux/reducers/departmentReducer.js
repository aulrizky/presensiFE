export const fetchDepartmentsPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchDepartmentsFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload.departments;
};

export const fetchDepartmentsRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

// Reducer untuk addDepartment
export const addDepartmentPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const addDepartmentFulfilled = (state, action) => {
  state.loading = false;
  state.data.push(action.payload); // Tambahkan department baru ke state
};

export const addDepartmentRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

// Reducer untuk editDepartment
export const editDepartmentPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const editDepartmentFulfilled = (state, action) => {
  state.loading = false;

  const { id, department_name } = action.payload;

  const index = state.data.findIndex(
    (department) => department.id === id // Cari department berdasarkan ID yang sudah kita miliki
  );

  if (index !== -1) {
    // Perbarui nama departemen di state
    state.data[index].name = department_name;
  } else {
    console.warn("editDepartmentFulfilled: Department not found in state", id);
  }
};

export const editDepartmentRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload || "Unknown error occurred";
  console.error("editDepartmentRejected:", state.error);
};

// Reducer untuk deleteDepartment
export const deleteDepartmentPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const deleteDepartmentFulfilled = (state, action) => {
  state.loading = false;

  const { id } = action.payload;

  state.data = state.data.filter(
    (department) => department.id !== id // Filter untuk menghapus department dari state
  );
};

export const deleteDepartmentRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload || "Unknown error occurred";
  console.error("deleteDepartmentRejected:", state.error);
};

// Reducer untuk importDepartment
export const importDepartmentPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const importDepartmentFulfilled = (state, action) => {
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

export const importDepartmentRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};


// Reducer untuk fetchEmployeesByDepartment
export const fetchEmployeesByDepartmentPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchEmployeesByDepartmentFulfilled = (state, action) => {
  state.loading = false;

  const payload = action.payload;
  const payloadData = payload.data; // Akses ke objek utama data

  console.log("payload on reducer: ", payload);
  console.log("payload data on reducer: ", payloadData);
  console.log("total data: ", payload.total_data);

  if (payloadData && Array.isArray(payloadData)) {
    state.employees = payloadData; // Menyimpan data karyawan di state
    state.totalData = payload.total_data !== undefined ? payload.total_data : 0; // Menyimpan total data karyawan untuk pagination
    console.log("Total Data in Reducer:", state.totalData);
  } else {
    console.error("Total Data is undefined in payload:", payload);
    state.totalData = 0;
  }
};

export const fetchEmployeesByDepartmentRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
