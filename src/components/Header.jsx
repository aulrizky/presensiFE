import React, { useState, useEffect } from "react";
import { Box, Typography, Breadcrumbs } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux"; // Ambil data admin dari Redux

const Header = () => {
  const location = useLocation();
  const [greeting, setGreeting] = useState("");
  const [dateTime, setDateTime] = useState("");

  // Ambil data admin dari Redux
  const userData = useSelector((state) => state.admin.data);
  const userName = userData
    ? `${userData.data.first_name} ${userData.data.last_name}`
    : "Admin...";
  const userPicture = userData.data.profile_picture

  // Ambil role dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "Unknown Role";

  // Ambil data employee yang dipilih
  const employee = useSelector((state) => state.employees.selectedEmployee);
  const employeeName = employee ? `${employee.data.first_name} ${employee.data.last_name}` : "Loading...";

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getUTCHours() + 7; // WIB time (UTC +7)

      // Handling time wrapping around midnight
      const adjustedHours = hours >= 24 ? hours - 24 : hours;

      let greetingMessage;
      if (adjustedHours >= 0 && adjustedHours < 11) {
        greetingMessage = "Good Morning!";
      } else if (adjustedHours >= 11 && adjustedHours < 14) {
        greetingMessage = "Good Afternoon!";
      } else if (adjustedHours >= 14 && adjustedHours < 18) {
        greetingMessage = "Good Evening!";
      } else {
        greetingMessage = "Good Night!";
      }
      setGreeting(greetingMessage);

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = now.toLocaleDateString("en-US", options);
      setDateTime(`Now it's ${formattedDate}.`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isDepartmentDetail = location.pathname.startsWith("/departments/");
  const isEmployeeDetail = location.pathname.startsWith("/employees/");
  const departmentName = isDepartmentDetail
    ? location.pathname.split("/")[2]
    : null;

  const getTitle = () => {
    if (isDepartmentDetail && departmentName) {
      return `${departmentName.replace("-", " ")} Department`;
    } else if (isEmployeeDetail && employeeName) {
      return employeeName;
    } else {
      return titleMap[location.pathname] || "Dashboard";
    }
  };

  const getSubtitle = () => {
    if (isDepartmentDetail && departmentName) {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/departments"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            All Departments
          </Link>
          <Typography color="textPrimary">
            {departmentName.replace("-", " ")}
          </Typography>
        </Breadcrumbs>
      );
    } else if (isEmployeeDetail && userName) {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/employees"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            All Employees
          </Link>
          <Typography color="textPrimary">{employeeName}</Typography>
        </Breadcrumbs>
      );
    } else {
      return subtitleMap[location.pathname] || "";
    }
  };

  const titleMap = {
    "/": `Hello ${userName} 👋`, // Sesuaikan dengan nama admin
    "/company/profile": "Company Profile",
    "/departments": "All Departments",
    "/employees": "All Employees",
    "/attendances": "Attendance",
    "/leaves": "Leaves",
    "/holidays": "Holidays",
    "/settings": "Settings",
    "/administrator/profile": "My Profile",
  };

  const subtitleMap = {
    "/": `${greeting} ${dateTime}`,
    "/companies": "",
    "/departments": "All Departments Information",
    "/employees": "All Employees Information",
    "/attendances": "All Employee Attendance",
    "/leaves": "Leaves Information",
    "/holidays": "All Holiday Lists",
    "/settings": "Company Settings",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "white",
        px: "16px",
      }}
    >
      {/* Section for dynamic title and breadcrumbs */}
      <Box>
        <Typography
          sx={{ fontWeight: "fontWeightMedium", fontSize: "fontSizeMedium" }}
        >
          {getTitle()}
        </Typography>
        <Typography
          sx={{
            color: "secondary.main",
            fontWeight: "fontWeightLight",
            fontSize: "fontSizeSmall",
          }}
        >
          {getSubtitle()}
        </Typography>
      </Box>

      {/* Section for user info */}
      <ProfileCard userName={userName} userRole={userRole} userPicture={userPicture} />
    </Box>
  );
};

export default Header;
