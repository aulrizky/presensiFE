import axiosInstance from "../axiosInstance";

export const getLeaves = async (
  page = 0,
  size = 10,
  keyword,
  startDate,
  endDate
) => {
  try {
    const response = await axiosInstance.get(
      `/admin/company/leaves?page=${page}&size=${size}` +
        `&keyword=${keyword || ""}` +
        `&from=${startDate || ""}` +
        `&to=${endDate || ""}`
    );

    if (response.data && response.data.statusCode === 200) {
      return response.data;
    } else if (
      response.data &&
      response.data.statusCode === 404 &&
      response.data.message === "T-LEA-ERR-003"
    ) {
      // Return an object with an empty array and other necessary properties
      return {
        data: [],
        totalData: 0,
        totalPage: 0,
        pageSize: size,
      };
    } else {
      throw new Error("Failed to retrieve leaves");
    }
  } catch (error) {
    if (error.response && error.response.data) {
      const { statusCode, message } = error.response.data;
      if (statusCode === 404 && message === "T-LEA-ERR-003") {
        // Handle the specific error case
        return {
          data: [],
          totalData: 0,
          totalPage: 0,
          pageSize: size,
        };
      }
    }
    console.error("Error fetching leaves: ", error);
    throw error;
  }
};

export const getLeaveDetails = async (idLeave) => {
  try {
    const response = await axiosInstance.get(
      `/admin/company/leaves/${idLeave}/detail`
    );
    if (response.data && response.data.statusCode === 200) {
      return response.data;
    } else {
      throw new Error("Failed to retrieve leave details");
    }
  } catch (error) {
    console.error("Error fetching leave details:", error);
    throw error;
  }
};

export const changeStatusLeave = async (idLeave, status) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/company/leaves/${idLeave}/status`,
      { status }
    );
    if (response.data && response.data.statusCode === 200) {
      return response.data;
    } else {
      throw new Error("Failed to change leave status");
    }
  } catch (error) {
    console.error("Error changing leave status:", error);
    throw error;
  }
};

export const exportLeave = async () => {
  try {
    const response = await axiosInstance.get("/admin/export-leaves", {
      responseType: "blob", // Important for downloading files
    });

    // Create a link element, use it to download the file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "leave-list.xlsx"); // Specify the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting employees:", error);
    throw error;
  }
};
