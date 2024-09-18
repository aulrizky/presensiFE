import axiosInstance from "../../services/axiosInstance"; // Import thunks

// Fungsi untuk mengambil seluruh data karyawan
export const getEmployees = async (page = 0, size = 10, keyword) => {
  try {
    const response = await axiosInstance.get(
      `/admin/employee?page=${page}&size=${size}&keyword=${keyword || ""}`
    );
    if (response.data && response.data.statusCode === 200) {
      console.log("getEmployees API response:", response.data);
      return response.data;
    } else {
      throw new Error("Failed to retrieve employees");
    }
  } catch (error) {
    console.error("Error fetching employees: ", error);
    throw error;
  }
};

// Fungsi untuk menambahkan karyawan
export const addEmployee = async (formEmployee) => {
  try {
    const response = await axiosInstance.post("/admin/create-employee", {
      first_name: formEmployee.first_name,
      last_name: formEmployee.last_name,
      username: formEmployee.username,
      password: formEmployee.password,
      email: formEmployee.email,
      employee_number: formEmployee.employee_number,
      id_department: formEmployee.id_department,
      role_current_company: formEmployee.role_current_company,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating employee: ", error);
  }
};

// Fungsi untuk mengimport karyawan
export const importEmployee = async (file) => {
  if (!file) {
    throw new Error("No file selected for import");
  }

  const formData = new FormData();
  formData.append("file", file);

  console.log("FormData to be sent:", formData.get("file")); // Pastikan file benar-benar ada di FormData

  const response = await axiosInstance.post(
    "/admin/import-employees",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Fungsi untuk mengambil id_employee berdasarkan username
export const getEmployeeIdByUsername = async (username) => {
  try {
    const response = await axiosInstance.get(
      `/admin/employee/username/${username}`
    );
    if (response.data && response.data.statusCode === 200) {
      return response.data.data; // Mengembalikan id_employee
    } else {
      throw new Error("Failed to retrieve employee ID");
    }
  } catch (error) {
    console.error("Error fetching employee ID by username: ", error);
    throw error;
  }
};

// Fungsi untuk mengambil profil karyawan berdasarkan id_employee
export const getEmployeeProfileById = async (id_employee) => {
  try {
    const response = await axiosInstance.get(
      `/admin/employee/${id_employee}/profile`
    );
    if (response.data && response.data.statusCode === 200) {
      return response.data;
    } else {
      throw new Error("Failed to retrieve employee profile");
    }
  } catch (error) {
    console.error("Error fetching employee profile: ", error);
    throw error;
  }
};

// Fungsi untuk mengambil professional information
export const getEmployeeProfessionalInfo = async (id_employee) => {
  try {
    const response = await axiosInstance.get(
      `/admin/employee/${id_employee}/professional-info`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching professional information: ", error);
    throw error;
  }
};

// Fungsi untuk mengambil personal information
export const getEmployeePersonalInfo = async (id_employee) => {
  try {
    const response = await axiosInstance.get(
      `/admin/employee/${id_employee}/personal-info`
    );
    console.log("personal info", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching personal information: ", error);
    throw error;
  }
};

// Fungsi untuk mengambil leave berdasarkan id_employee
export const getEmployeeLeave = async (id_employee) => {
  try {
    const { data } = await axiosInstance.get(
      `/admin/employee/${id_employee}/leaves`
    );

    // Return an empty array if the response indicates no data
    return data?.statusCode === 404 || data?.message === "Leaves not found"
      ? []
      : data.data;
  } catch (error) {
    if (error.response?.status !== 404) {
      console.error("Error fetching leave: ", error);
      throw error;
    }
    return []; // Return an empty array for 404 errors without logging a warning
  }
};

export const deleteEmployee = async (id_employee) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/employee/${id_employee}/delete-employee`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting employee: ", error);
    throw error;
  }
};

export const editPersonalEmployee = async (id_employee, formData) => {
  try {
    // Membuat objek baru hanya dengan data yang tidak kosong
    const filteredData = Object.keys(formData).reduce((acc, key) => {
      if (
        formData[key] !== null &&
        formData[key] !== undefined &&
        formData[key] !== ""
      ) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});
    // Melakukan request PATCH dengan data yang telah difilter
    const response = await axiosInstance.patch(
      `/admin/employee/${id_employee}/personal-info`,
      filteredData
    );
    return response.data;
  } catch (error) {
    console.error("Error editing employee: ", error);
    throw error;
  }
};

export const editProfessionalEmployee = async (id_employee, formData) => {
  try {
    const filteredData = Object.keys(formData).reduce((acc, key) => {
      if (
        formData[key] !== null &&
        formData[key] !== undefined &&
        formData[key] !== ""
      ) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    const response = await axiosInstance.patch(
      `/admin/employee/${id_employee}/professional-info`,
      filteredData
    );
    return response.data;
  } catch (error) {
    console.error("Error editing employee: ", error);
    throw error;
  }
};

export const changePassword = async (id_employee, formData) => {
  try {
    console.log("api formdata password", formData);
    const response = await axiosInstance.patch(
      `/admin/employee/${id_employee}/change-password`,
      {
        new_password: formData.new_password,
        retype_new_password: formData.retype_new_password,
      }
    );
    console.log("editPassword response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error editing employee: ", error);
    throw error;
  }
};


export const getEmployeeAttendanceDetails = async (id_employee) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not available. Please log in as admin.");
    }
    const response = await axiosInstance.get(`/admin/employee/${id_employee}/attendances`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data && response.data.statusCode === 200) {
      return response.data;
    } else {
      throw new Error("Failed to retrieve employee attendance details");
    }
  } catch (error) {
    console.error("Error fetching employee attendance details: ", error);
    throw error;
  }
};

// Function to export employees to CSV (or Excel)
export const exportEmployeesByCompany = async () => {
  try {
    const response = await axiosInstance.get(
      "/admin/company/employees/export",
      {
        responseType: "blob", // Important for downloading files
      }
    );

    // Create a link element, use it to download the file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "employees-list-by-company.xlsx"); // Specify the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting employees:", error);
    throw error;
  }
};
