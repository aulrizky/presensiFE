import axiosInstance from "../axiosInstance";

// Function to get departments by company
export const getDepartmentByCompany = async () => {
  try {
    const response = await axiosInstance.get("/company/department");
    if (response.data && response.data.statusCode === 200) {
      return response.data.data; // Return the list of departments
    } else {
      throw new Error("Failed to retrieve departments");
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

// Function to get department details by company ID
export const getDepartmentDetailsByCompanyId = async () => {
  try {
    const response = await axiosInstance.get("/company/department/details");
    if (response.data && response.data.statusCode === 200) {
      return response.data.data; // Return the department details
    } else {
      throw new Error("Failed to retrieve department details");
    }
  } catch (error) {
    console.error("Error fetching department details:", error);
    throw error;
  }
};

// Fungsi untuk menambah department
export const addDepartment = async (departmentName) => {
  const response = await axiosInstance.post("/admin/department/add", {
    department_name: departmentName,
  });
  return response.data;
};

// Fungsi untuk mengimpor department dari file
export const importDepartment = async (file) => {
  if (!file) {
    throw new Error("No file selected for import");
  }

  const formData = new FormData();
  formData.append("file", file);

  console.log("FormData to be sent:", formData.get("file")); // Pastikan file benar-benar ada di FormData

  const response = await axiosInstance.post(
    "/admin/department/import",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getEmployeesByDepartmentId = async (
  idDepartment,
  paginationModel = { page: 0, pageSize: 10 } // Berikan nilai default
) => {
  try {
    const { page, pageSize } = paginationModel;
    const response = await axiosInstance.get(
      `/admin/department/${idDepartment}/employees`,
      { params: { page, size: pageSize } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employees by department:", error);
    throw error;
  }
};

// Fungsi untuk mengedit department
export const editDepartment = async (idDepartment, departmentName) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/department/${idDepartment}/edit-department`,
      {
        department_name: departmentName,
      }
    );

    // Cetak respons untuk debugging
    console.log("editDepartmentAPI response:", response.data);

    // Tidak perlu validasi ID di sini
    return response.data; // Return the response data as it is
  } catch (error) {
    console.error("editDepartmentAPI error:", error);
    throw error;
  }
};

// Fungsi untuk menghapus department
export const deleteDepartment = async (idDepartment) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/department/${idDepartment}/delete-department`
    );

    // Cetak respons untuk debugging
    console.log("deleteDepartmentAPI response:", response.data);

    return response.data; // Return the response data as it is
  } catch (error) {
    console.error("deleteDepartmentAPI error:", error);
    throw error;
  }
};

// Function to export employees to CSV (or Excel)
export const exportEmployeesByDepartment = async (
  idDepartment,
  departmentName
) => {
  try {
    const response = await axiosInstance.get(
      `admin/company/department/${idDepartment}/employees/export`,
      {
        responseType: "blob", // Important for downloading files
      }
    );

    // Create a link element, use it to download the file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `employees-list-${departmentName}.xlsx`); // Specify the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting employees:", error);
    throw error;
  }
};
