import axiosInstance from "../axiosInstance";

export const getAdminInformation = async () => {
  try {
    const response = await axiosInstance.get(`/admin/information`);

    console.log("Admin Information API response:", response.data);

    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      console.log("Failed to fetch admin information:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching admin information:", error);
    return null;
  }
};

export const updateAdminInformation = async (adminData) => {
  try {
    const response = await axiosInstance.patch(`/admin/information`, adminData);

    console.log("Admin Update API response:", response.data);

    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      console.log("Failed to update admin information:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating admin information:", error);
    throw error;
  }
};

export const changeAdminPassword = async (passwordData) => {
  try {
    const response = await axiosInstance.patch(
      "/admin/change-password",
      passwordData
    );

    console.log("Change Password API response:", response.data);

    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      console.log("Failed to change password:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

export const changeAdminProfilePicture = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.patch(
      `/admin/change-profile-picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Change Profile Picture API response:", response.data);

    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      console.log("Failed to change profile picture:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error changing profile picture:", error);
    throw error;
  }
};

//superadmin
export const getAdminDetail = async (idAdmin) => {
  try {
    const response = await axiosInstance.get(
      `/admin-management/admins/${idAdmin}`
    );

    console.log("Admin Information API response:", response.data.data);

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

//superadmin getAllAdmin
export const getAllAdmin = async (
  sortBy,
  pageSize,
  pageNumber,
  startDateJoined,
  endDateJoined
) => {
  try {
    const url = `/admin-management/admins`;
    const build = buildUrl(url, {
      sortBy,
      pageSize,
      pageNumber,
      startDateJoined,
      endDateJoined,
    });
    console.log("All Admin API URL:", build);
    const response = await axiosInstance.get(build);
    console.log("All Admin API response slice:", response.data);

    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      console.log("Failed to fetch admin information:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching admin information:", error);
    return null;
  }
};

// build url all admin
export const buildUrl = (base, params) => {
  let url = base + "?";
  for (const key in params) {
    if (params[key]) {
      url += `${key}=${params[key]}&`;
    }
  }
  // Remove the trailing '&'
  url = url.slice(0, -1);
  return url;
};
export const changeAdminProfilePhoto = async (idAdmin, formData) => {
  try {
    const response = await axiosInstance.patch(
      `/admin-management/admins/photo/${idAdmin}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Change Profile Picture API response:", response.data);

    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      console.log("Failed to change profile picture:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error changing profile picture:", error);
    throw error;
  }
};

export const addNewAdmin = async (adminData) => {
  try {
    const response = await axiosInstance.post(
      `/admin-management/admins`,
      adminData
    );
    return response.data;
  } catch (error) {
    console.error("Error add new admin:", error);
    return null;
  }
};

//edit admin
export const editDataAdmin = async (id, data) => {
  console.log("data axios", data);
  console.log("id axios", id);
  const apiUrl = `/admin-management/admins/${id}`;
  console.log("apiUrl", apiUrl);
  try {
    const response = await axiosInstance.patch(apiUrl, data);
    console.log("response axios", response.data);
    return response.data;
  } catch (error) {
    console.error("Error add new admin:", error);
    return null;
  }
};

//change password
export const editPassword = async (id, password) => {
  const apiUrl = `/account/superadmin/change-password-admin/${id}`;
  // return instance
  //   .patch(apiUrl, { password: password })
  //   .then((response) => {
  //     return response;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     throw error;
  //   });
  try {
    console.log("axios password", password);
    const response = await axiosInstance.patch(apiUrl, { password: password });
    console.log("response axios", response.data);
    return response.data;
  } catch (error) {
    console.error("Error add new admin:", error);
    return null;
  }
};

// delete admininistrator
export const deleteDataAdministrator = async (id, data) => {
  console.log("id axios", id);
  console.log("data axios", data);
  const apiUrl = `/admin-management/admins/${id}/delete`;
  try {
    const response = await axiosInstance.patch(apiUrl, data);
    console.log("response axios", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete company"
    );
  }
};
