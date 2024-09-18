import React, { useState, useEffect } from "react";
import { Box, Typography, Breadcrumbs } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import ProfileCardSuperadmin from "./ProfileCardSuperadmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminDetail } from "../redux/slices/adminSlice";
import { fetchDetailCompany } from "../redux/slices/companySlice";
import { fetchSuperadminDetail } from "../redux/slices/superadminSlice";

const SuperadminHeader = () => {
  const location = useLocation();
  const [greeting, setGreeting] = useState("");
  const [dateTime, setDateTime] = useState("");
  const adminDetail = useSelector((state) => state.admin.adminDetail);
  const companyDetail = useSelector((state) => state.company.detailCompany);
  const superadminDetail = useSelector(
    (state) => state.superadmin.superadminDetail
  );
  const adminName = adminDetail
    ? `${adminDetail.first_name} ${adminDetail.last_name}`
    : "Loading...";
  const companyName = companyDetail
    ? `${companyDetail.company_name}`
    : "Loading...";

  const dispatch = useDispatch();

  const isAdminDetail = location.pathname.startsWith("/administrators/");
  const isCompanyDetail = location.pathname.startsWith("/company/");
  const adminId = isAdminDetail ? location.pathname.split("/")[2] : null;
  const companyId = isCompanyDetail ? location.pathname.split("/")[2] : null;

  useEffect(() => {
    if (adminId) {
      dispatch(fetchAdminDetail(adminId));
    }
    if (companyId) {
      dispatch(fetchDetailCompany(companyId));
    }
    dispatch(fetchSuperadminDetail());
  }, [adminId, companyId, dispatch]);

  console.log("superadminDetails: ", superadminDetail);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getUTCHours() + 7; // WIB time (UTC +7)
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

  const getTitle = () => {
    if (isAdminDetail && adminId) {
      return `Admin Profile`;
    } else if (isCompanyDetail && companyId) {
      return `Company Profile`;
    } else {
      return titleMap[location.pathname] || "Dashboard";
    }
  };

  const getSubtitle = () => {
    if (isAdminDetail && adminId) {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/administrators"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            All Administrators
          </Link>
          <Typography color="textPrimary">{adminName}</Typography>
        </Breadcrumbs>
      );
    } else if (isCompanyDetail && companyId) {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/company"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            All Companies
          </Link>
          <Typography color="textPrimary">{companyName}</Typography>
        </Breadcrumbs>
      );
    } else {
      return subtitleMap[location.pathname] || "";
    }
  };

  const titleMap = {
    "/": superadminDetail ? `Hello ${superadminDetail.name} 👋` : "",
    "/administrators": "All Administrators",
    "/company": "All Companies",
    "/administrators/:idAdmin": "Admin Profile",
    "/company/:idCompany": "Company Profile",
  };

  const subtitleMap = {
    "/": `${greeting} ${dateTime}`,
    "/administrators": "All Administrators Information",
    "/company": "All Companies Information",
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
      <ProfileCardSuperadmin />
    </Box>
  );
};

export default SuperadminHeader;
