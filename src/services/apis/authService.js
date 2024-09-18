import axiosInstance from "../axiosInstance";

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });

    console.log("Login API response:", response.data); // Log seluruh respons untuk debugging

    if (response.data.statusCode === 200) {
      return response.data.data; // Mengambil data yang relevan dari respons
    } else {
      console.log("Login failed:", response.data.message);
      return null; // Return null jika login gagal
    }
  } catch (error) {
    console.error("Error during login:", error);
    return null; // Return null jika terjadi error
  }
};

// export const login = async (username, password) => {
//   try {
//     const response = await axiosInstance.post("/admin/login", {
//       username,
//       password,
//     });

//     console.log("Login API response:", response.data); // Log seluruh respons untuk debugging

//     if (response.data.statusCode === 200) {
//       return response.data.data; // Mengambil data yang relevan dari respons
//     } else {
//       console.log("Login failed:", response.data.message);
//       return null; // Return null jika login gagal
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     return null; // Return null jika terjadi error
//   }
// };
