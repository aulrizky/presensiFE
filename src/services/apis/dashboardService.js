import axiosInstance from "../axiosInstance";

export const getTopEmployees = async () => {
  try {
    const response = await axiosInstance.get('/admin/dashboard/attendance-list');
    if (response.data.statusCode === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getDashboardSummary = async () => {
  try {
    const response = await axiosInstance.get('/admin/dashboard/summary');
    if (response.data.statusCode === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getAttendanceOverview = async () => {
  try {
    const response = await axiosInstance.get('/admin/dashboard/attendance-overview');
    if (response.data.statusCode === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

// Dashboard Superadmin

export const getDataChartSuperadmin = async (startDate, endDate) => {
  try {
    const response = await axiosInstance.get(`/superadmin/company-overview`, {
      params: {
        start_date_filter: startDate,
        end_date_filter: endDate,
      },
    });

    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getDataDashboardSuperadmin = async () => {
  try {
    const response = await axiosInstance.get("/superadmin/overview-data");

    console.log("Response Data: ", response.data);
    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
