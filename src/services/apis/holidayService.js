import axiosInstance from "../axiosInstance";

export const fetchHolidaysAPI = (year, page, size) => {
  return axiosInstance.get(`/company/holidays`, {
    params: {
      year,
      page,
      size,
    },
  });
};

export const createHolidayAPI = (holidayData) => {
  return axiosInstance.post(`/company/holidays`, holidayData);
};
