export const fetchAttendancesPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchAttendancesFulfilled = (state, action) => {
  state.loading = false;
  console.log("reducressssssss", action.payload.attendances);

  const transformedAttendances = action.payload.attendances.map(
    (attendance) => ({
      ...attendance,
      employee_name: attendance.first_name + " " + attendance.last_name, // Berikan default "-" jika status tidak ada
      id: `${attendance.first_name}_${attendance.last_name}_${attendance.date_attendance}`
    })
  );

  state.data = transformedAttendances;
  console.log("transpose", state.data);
  state.totalData = action.payload.totalData;
  console.log("total datasss: ", state.totalData);
  state.totalPage = action.payload.totalPage;
  state.pageSize = action.payload.pageSize;

  console.log("reducers after get all attendance: ", state.data);
};

export const fetchAttendancesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const importAttendancesPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const importAttendancesFulfilled = (state, action) => {
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

export const importAttendancesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
