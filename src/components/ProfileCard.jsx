import React, { useState, useContext } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout"; // Icon untuk Logout
import PersonIcon from "@mui/icons-material/Person"; // Icon untuk Profile
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext untuk akses fungsi logout

const ProfileCard = ({ userName, userRole, userPicture }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuth(); // Ambil fungsi logout dari AuthContext
  const classes = useStyles();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/administrator/profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    logout(); // Panggil fungsi logout dari AuthContext
    handleMenuClose();
  };

  return (
    <Box sx={classes.profileCard}>
      <Avatar
        alt={userName} // Nama Admin dari props
        src={userPicture}
        sx={classes.avatar}
      />
      <Box sx={classes.userInfo}>
        <Typography
          sx={{ fontWeight: "fontWeightRegular", fontSize: "fontSizeSmall" }}
        >
          {userName} {/* Nama Admin dari props */}
        </Typography>
        <Typography
          sx={{
            fontWeight: "fontWeightRegular",
            fontSize: "fontSizeExtraSmall",
          }}
          color="text.secondary"
        >
          {userRole}
        </Typography>
      </Box>
      <IconButton size="small" onClick={handleMenuOpen}>
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: "red" }} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ sx: { color: "red" } }}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

const useStyles = () => {
  return {
    profileCard: {
      border: "2px solid #A2A1A833",
      display: "flex",
      alignItems: "center",
      padding: "6px",
      borderRadius: "12px",
      bgColor: "white",
      width: "auto",
      height: "50px",
      py: "25px",
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: "8px",
    },
    userInfo: {
      ml: 1.5,
      flexGrow: 1,
    },
  };
};

export default ProfileCard;
