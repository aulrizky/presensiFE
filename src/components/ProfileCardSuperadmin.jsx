import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { fetchSuperadminDetail } from "../redux/slices/superadminSlice";

const ProfileCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const superadminDetail = useSelector(
    (state) => state.superadmin.superadminDetail
  );

  useEffect(() => {
    dispatch(fetchSuperadminDetail());
  }, [dispatch]);

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
    logout();
  };
  return (
    <Box sx={classes.profileCard}>
      <Avatar
        alt="Robert Allen"
        src="/path-to-image/avatar.jpg"
        sx={classes.avatar}
      />
      <Box sx={classes.userInfo}>
        <Typography
          sx={{ fontWeight: "fontWeightRegular", fontSize: "fontSizeSmall" }}
        >
          {superadminDetail ? superadminDetail.name : "Loading..."}
        </Typography>
        <Typography
          sx={{
            fontWeight: "fontWeightRegular",
            fontSize: "fontSizeExtraSmall",
          }}
          color="text.secondary"
        >
          Super Admin
        </Typography>
      </Box>
      <IconButton size="small" onClick={handleMenuOpen}>
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
