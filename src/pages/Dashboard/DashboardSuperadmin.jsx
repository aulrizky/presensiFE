import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataDashboardSuperadmin } from "../../redux/slices/dashboardSlice";
import TotalEmployeeIcon from "/assets/icons/total_employee_superadmin.svg"; // Placeholder icon, replace as needed
import TotalAdminIcon from "/assets/icons/total_admin_superadmin.svg";
import TotalCompanyIcon from "/assets/icons/total_company_superadmin.svg";
import dayjs from "dayjs";
import StatCard from "../../components/Cards/StatCard";
import CompanyOverview from "../../components/Cards/CompanyOverview";

const DashboardSuperadmin = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.data);

  useEffect(() => {
    console.log("Dispatching action to fetch dashboard data...");
    dispatch(fetchDataDashboardSuperadmin());
  }, [dispatch]);

  console.log("Response: ", data);

  // Create an array for the stat cards
  const statCards = [
    {
      title: "Total Company",
      value: data?.company?.total_company || "N/A",
      date: data?.company?.last_update
        ? dayjs(data?.company?.last_update).format("DD-MM-YYYY")
        : "N/A",
      icon: TotalCompanyIcon, // Replace with the appropriate icon for each card
    },
    {
      title: "Total Admin",
      value: data?.admin?.total_admin || "N/A",
      date: data?.admin?.last_update
        ? dayjs(data?.admin?.last_update).format("DD-MM-YYYY")
        : "N/A",
      icon: TotalAdminIcon, // Replace as needed
    },
    {
      title: "Total Employee",
      value: data?.employee?.total_employee || "N/A",
      date: data?.employee?.last_update
        ? dayjs(data?.employee?.last_update).format("DD-MM-YYYY")
        : "N/A",
      icon: TotalEmployeeIcon, // Replace as needed
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard
              icon={card.icon}
              title={card.title}
              value={card.value}
              date={card.date}
            />
          </Grid>
        ))}
      </Grid>
      <CompanyOverview />
    </Box>
  );
};

export default DashboardSuperadmin;
