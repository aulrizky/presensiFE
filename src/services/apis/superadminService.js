import axiosInstance from "../axiosInstance";

export const getSuperadminDetail = async () => {
  try {
    const response = await axiosInstance.get(`/superadmin/superadmin`);

    console.log("Superadmin Information API response:", response.data.data);

    if (response.data.statusCode === 200) {
      return response.data.data;
    } else {
      console.log("Failed to fetch admin information:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching admin information:", error);
    return null;
  }
};
