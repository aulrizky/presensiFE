import axiosInstance from "../axiosInstance";

// Fetch company profile
export const getCompanyProfile = async () => {
  try {
    const response = await axiosInstance.get("/company/company-profile");

    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

// Update company profile
export const updateCompanyProfileAPI = async (companyData) => {
  try {
    const response = await axiosInstance.patch(
      "/company/company-profile",
      companyData
    );

    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

// Fetch company config (already existing)
export const getCompanyConfig = async () => {
  try {
    const response = await axiosInstance.get("/company-config");

    if (response.data.statusCode === 200) {
      console.log("response get config: ", response.data.data)
      return response.data.data; // Return the data part of the response
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const updateCompanyConfig = async (configData) => {
  try {
    const response = await axiosInstance.patch("/admin/company/config", configData);

    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      console.log("response update config: ", response.data)
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};


export const updateCompanyLogo = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.patch("/company/logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const fetchMasterCompanies = async () => {
  try {
    const response = await axiosInstance.get(
      `/admin-management/master-company`
    );

    if (response.data.statusCode === 200) {
      console.log("Isi company di service:", response.data.data);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const changeCompanysLogo = async (idCompany, formData) => {
  try {
    const response = await axiosInstance.patch(
      `/company-management/companies/logo/${idCompany}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Change logo API response:", response.data);

    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      console.log("Failed to change logo:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error changing logo:", error);
    throw error;
  }
};

export const getDetailCompany = async (idAdmin) => {
  try {
    const response = await axiosInstance.get(
      `/company-management/companies/${idAdmin}`
    );

    console.log("Company Information API response:", response.data.data);

    if (response.data.statusCode === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const insertNewCompany = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/company-management/companies",
      data
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add company");
  }
};

export const getDataCompanies = async ({
  pageNumber,
  pageSize,
  sortBy,
  startDateJoined,
  endDateJoined,
}) => {
  try {
    const config = {
      params: {
        sortBy,
        pageSize,
        pageNumber,
        startDateJoined,
        endDateJoined,
      },
      validateStatus: (status) => status < 500,
    };

    const response = await axiosInstance.get(
      "/company-management/companies",
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch companies"
    );
  }
};

export const editDataCompany = async (idCompany, data) => {
  try {
    const response = await axiosInstance.patch(
      `/company-management/companies/${idCompany}`,
      data
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to edit company");
  }
};

export const deleteDataCompany = async (idCompany, data) => {
  try {
    const response = await axiosInstance.put(
      `/company-management/companies/delete/${idCompany}`,
      data
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete company"
    );
  }
};
