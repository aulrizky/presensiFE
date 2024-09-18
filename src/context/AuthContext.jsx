import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as authServiceLogin } from "../services/apis/authService";
import Swal from "sweetalert2"; // Import SweetAlert2
import { jwtDecode } from "jwt-decode"; // Menggunakan destructuring import sesuai dokumentasi

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fungsi untuk mengecek apakah token sudah expired
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token); // Decode JWT
      if (decodedToken.exp * 1000 < Date.now()) {
        // Jika token sudah expired
        return true;
      }
      return false;
    } catch (error) {
      return true; // Jika ada kesalahan, kita anggap token tidak valid
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      // Cek apakah token sudah expired
      if (isTokenExpired(token)) {
        // Jika expired, hapus token dan user dari localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
      } else {
        // Jika tidak expired, set user dan isAuthenticated
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authServiceLogin(username, password);

      if (response) {
        const {
          message,
          token,
          username: responseUsername,
          role,
          id_superadmin,
          id_admin,
          id_company,
          id_employee, // Check if this is null
        } = response;

        // Deny access if the user is an employee
        if (id_employee !== null) {
          Swal.fire({
            title: "Access Denied",
            text: "Employees are not allowed to log in here.",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }

        // Save token and user details in localStorage for superadmin/admin
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: responseUsername,
            role,
            id_superadmin,
            id_admin,
            id_company,
          })
        );
        setIsAuthenticated(true);
        setUser({
          username: responseUsername,
          role,
          id_superadmin,
          id_admin,
          id_company,
        });

        Swal.fire({
          title: "Login Successful",
          text: message || "Welcome back!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/"); // Redirect to home or dashboard after successful login
        });
      } else {
        Swal.fire({
          title: "Login Failed",
          text:
            response.message || "Please check your credentials and try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again later.";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Fungsi logout dengan SweetAlert2 konfirmasi
  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
        Swal.fire(
          "Logged out",
          "You have been logged out successfully.",
          "success"
        ).then(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
