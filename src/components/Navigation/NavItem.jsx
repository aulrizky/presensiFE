// CustomNavLink.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";
import { useTheme } from "@mui/material/styles";

const CustomNavLink = ({
  name,
  path,
  icon,
  activeIcon,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const theme = useTheme();

  return (
    <NavLink to={path} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <MenuItem
          icon={
            <img
              src={isActive ? activeIcon : icon}
              alt={name}
              style={{
                height: "24px",
                width: "24px",
              }}
            />
          }
          style={{
            backgroundColor: isActive
              ? theme.palette.primary.lightPrimary5
              : "transparent",
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.primary,
            borderLeft: isActive
              ? `4px solid ${theme.palette.primary.main}`
              : "none",
            borderRadius: "0 12px 12px 0",
            fontWeight: isActive
              ? theme.typography.fontWeightMedium
              : theme.typography.fontWeightLight,
            transition: "all 0.15s ease",
            "&:hover": {
              backgroundColor: theme.palette.secondary.lightGrayOpacity20,
              color: theme.palette.primary.main,
            },
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {name}
        </MenuItem>
      )}
    </NavLink>
  );
};

export default CustomNavLink;
