import axios from "axios";

// Fungsi untuk mengambil data negara
export const fetchCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data.map((country) => ({
      value: country.name.common,
      label: country.name.common,
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw new Error("Failed to fetch countries");
  }
};

// Fungsi untuk mengambil data provinsi
export const fetchProvinces = async () => {
  try {
    const response = await axios.get("https://alamat.thecloudalert.com/api/provinsi/get/");
    return response.data.result;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw new Error("Failed to fetch provinces");
  }
};

// Fungsi untuk mengambil data kota berdasarkan provinsi
export const fetchCities = async (provinceId) => {
  try {
    const response = await axios.get(
      `https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${provinceId}`
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Failed to fetch cities");
  }
};

// Fungsi untuk mengambil data kecamatan berdasarkan kota
export const fetchDistricts = async (cityId) => {
  try {
    const response = await axios.get(
      `https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${cityId}`
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching districts:", error);
    throw new Error("Failed to fetch districts");
  }
};

// Fungsi untuk mengambil data kode pos berdasarkan kecamatan
export const fetchPostalCodes = async (cityId, districtId) => {
  try {
    const response = await axios.get(
      `https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${cityId}&d_kecamatan_id=${districtId}`
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching postal codes:", error);
    throw new Error("Failed to fetch postal codes");
  }
};
