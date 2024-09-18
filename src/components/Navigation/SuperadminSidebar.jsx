// AdminSidebar.jsx
import React from "react";
import { Sidebar, Menu } from "react-pro-sidebar";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomNavLink from "./NavItem";
import LogoP79 from "/assets/images/company-logo.png";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: "/assets/icons/dashboard.svg",
    activeIcon: "/assets/icons/dashboard-active.svg",
  },
  {
    name: "All Administrators",
    path: "/administrators",
    icon: "/assets/icons/all-administrators-icon.svg",
    activeIcon: "/assets/icons/all-departments-active.svg",
  },
  {
    name: "All Companies",
    path: "/company",
    icon: "/assets/icons/all-departments.svg",
    activeIcon: "/assets/icons/all-departments-active.svg",
  }, // Perbarui path tanpa wildcard
];

const StyleSidebar = (theme) => ({
  width: "100%",
  height: "100vh",
  backgroundColor: theme.palette.secondary.lightGrayOpacity5,
  borderRadius: "20px",
  padding: "10px",
});

const StyleImg = (theme) => ({
  display: "flex",
  justifyContent: "center",
  m: 2,
  pr: 8,
});

const SuperadminSidebar = () => {
  const theme = useTheme();

  const handleMouseEnter = (e) => {
    if (!e.currentTarget.classList.contains("active")) {
      e.currentTarget.style.backgroundColor =
        theme.palette.secondary.lightGrayOpacity20;
    }
  };

  const handleMouseLeave = (e) => {
    if (!e.currentTarget.classList.contains("active")) {
      e.currentTarget.style.backgroundColor = "transparent";
    }
  };

  return (
    <Sidebar style={{ border: "none" }}>
      <Box sx={StyleSidebar}>
        <Box sx={StyleImg}>
          <img
            src={LogoP79}
            alt="Logo"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
        <Menu>
          {menuItems.map((item) => (
            <CustomNavLink
              key={item.name}
              name={item.name}
              path={item.path}
              icon={item.icon}
              activeIcon={item.activeIcon}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          ))}
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SuperadminSidebar;
