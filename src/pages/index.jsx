import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin } from "../redux/slices/adminSlice"; // Import action untuk fetch admin data
import { Box } from "@mui/material";
import { CustomLoader } from "../components/Elements";
// Import action fetchSuperAdmin (nanti dibuat)
import Administrators from "./Administators";
import AdminProfile from "./Administators/AdminProfile";
import Attendances from "./Attendances";
import Auth from "./Auth";
import Companies from "./Companies";
import CompanyProfile from "./Companies/CompanyDetail";
import CompanyDetailSuperadmin from "./Companies/CompanyDetailSuperadmin";
import Dashboard from "./Dashboard";
import Departments from "./Departments";
import DepartmentDetails from "./Departments/DepartmentDetails";
import Employees from "./Employees";
import EmployeeDetails from "./Employees/EmployeeDetail";
import Holidays from "./Holidays";
import Leaves from "./Leaves";
import Settings from "./Settings";
import PrivateRoute from "./PrivateRoute";
import { AdminSidebar, SuperadminSidebar } from "../components/Navigation";
import Header from "../components/Header";
import CompaniesList from "./Companies";
import AdminDetail from "./Administators/AdminDetail";
import DashboardSuperadmin from "./Dashboard/DashboardSuperadmin";
import SuperadminHeader from "../components/SuperadminHeader";

const Pages = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const [userRole, setUserRole] = React.useState("");
  const [adminId, setAdminId] = React.useState("");
  const [storedUser, setStoredUser] = React.useState();
  const location = useLocation();
  const dispatch = useDispatch();

  const adminData = useSelector((state) => state.admin.data);
  const isPublicRoute = location.pathname === "/login";

  // Fetch admin or superadmin data based on role
  useEffect(() => {
    // const storedUser = JSON.parse(localStorage.getItem("user"));
    setStoredUser(JSON.parse(localStorage.getItem("user")));
    // const adminId = storedUser?.id_admin;
    setAdminId(storedUser?.id_admin);
    // const role = storedUser?.role;
    setUserRole(storedUser?.role);

    if (isAuthenticated && adminId) {
      if (role === "Admin") {
        dispatch(fetchAdmin(adminId));
      } else if (role === "Superadmin") {
        // Logic for fetching superadmin (you will implement fetchSuperAdmin)
        // dispatch(fetchSuperAdmin());
      }
    }
  }, [dispatch, isAuthenticated, userRole]);

  console.log("UserRole pages", userRole);

  // Jika masih dalam proses loading, tampilkan spinner
  if (loading || (!adminData && user?.role === "Admin")) {
    return <CustomLoader loading={loading} />;
  }

  // Redirect ke dashboard jika pengguna sudah login dan mencoba mengakses halaman login
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box sx={{ padding: "16px" }}>
      {/* Sidebar */}
      {isAuthenticated && user?.role === "Superadmin" && (
        <Box sx={{ position: "fixed", width: "280px" }}>
          <SuperadminSidebar />{" "}
        </Box>
      )}
      {isAuthenticated && user?.role === "Admin" && !isPublicRoute && (
        <Box sx={{ position: "fixed", width: "280px" }}>
          <AdminSidebar />
        </Box>
      )}

      <Box sx={{ flexGrow: 1, ml: !isPublicRoute ? "280px" : 0 }}>
        {/* Header */}
        {isAuthenticated && !isPublicRoute && (
          <>
            {user?.role === "Superadmin" && <SuperadminHeader />}
            {user?.role === "Admin" && <Header />}
          </>
        )}

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Auth />} />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                {user?.role === "Superadmin" ? (
                  <DashboardSuperadmin />
                ) : (
                  <Dashboard />
                )}
              </PrivateRoute>
            }
          />
          <Route
            path="/administrators"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                <Administrators userRole={userRole} />
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/profile"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AdminProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/attendances"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                <Attendances />
              </PrivateRoute>
            }
          />
          <Route
            path="/company/profile"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                <CompanyProfile />
              </PrivateRoute>
            }
          />
          {/* Nested Routes for Departments */}
          <Route
            path="/departments/*"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                <Routes>
                  <Route path="" element={<Departments />} />
                  <Route path=":name" element={<DepartmentDetails />} />
                  <Route
                    path="*"
                    element={<Navigate to="/departments" replace />}
                  />
                </Routes>
              </PrivateRoute>
            }
          />
          {/* Nested Routes for Employees */}
          <Route
            path="/employees/*"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                <Routes>
                  <Route path="" element={<Employees />} />
                  <Route path=":username" element={<EmployeeDetails />} />
                  <Route
                    path="*"
                    element={<Navigate to="/employees" replace />}
                  />
                </Routes>
              </PrivateRoute>
            }
          />
          <Route
            path="/holidays"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                <Holidays />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaves"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                <Leaves />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                <Settings />
              </PrivateRoute>
            }
          />

          <Route
            path="/administrators/:idAdmin"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                <AdminDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/company/:idCompany"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                <CompanyDetailSuperadmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/company"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                <CompaniesList />
              </PrivateRoute>
            }
          />
          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Pages;
