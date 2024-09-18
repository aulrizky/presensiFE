// import axiosInstance from "../axiosInstance";
import axiosInstance from "../../services/axiosInstance";

export const getAttendances = async (page = 0, size = 10, keyword) => {
  try {
    const response = await axiosInstance.get(
      `/admin/attendance?page=${page}&size=${size}&keyword=${keyword}`
    );
    if (response.data && response.data.statusCode === 200) {
      console.log("getEmployees API response:", response.data);
      return response.data.data;
    } else {
      throw new Error("Failed to retrieve attendance");
    }
  } catch (error) {
    console.error("Error fetching employees: ", error);
    throw error;
  }
};

export const importAttendance = async (file) => {
  if (!file) {
    throw new Error("No file selected for import");
  }

  const formData = new FormData();
  formData.append("file", file);

  console.log("FormData to be sent:", formData.get("file")); // Pastikan file benar-benar ada di FormData

  const response = await axiosInstance.post(
    "/admin/company/attendance/import",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
export const exportAttendance = async () => {
  try {
    const response = await axiosInstance.get("/admin/company/attendance/export", {
      responseType: "blob", // Important for downloading files
    });

    // Create a link element, use it to download the file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attendance-list.xlsx"); // Specify the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting employees:", error);
    throw error;
  }
};
