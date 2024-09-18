import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, Avatar, Typography, Button, Divider, Tabs, Tab } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AdminEdit from './AdminEdit';
import ImportIcon from "/assets/icons/file-add-blue.svg";
import EditProfileIcon from "/assets/icons/edit-profile.svg";
import ChangesImageIcon from "/assets/icons/image-edit.svg";
import { fetchAdmin, updateAdminProfilePicture } from '../../redux/slices/adminSlice';
import { CustomLoader, CustomModal, CustomInput, CustomTabs, CustomButton } from '../../components/Elements';
import Swal from 'sweetalert2';

const AdminProfile = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.admin.data);
  const loading = useSelector((state) => state.admin.loading);

  const tabsChangePhoto = [{ icon: ImportIcon, label: "Choose Photo" }];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const adminId = user?.id_admin;

    if (adminId) {
      dispatch(fetchAdmin(adminId));
    } else {
      console.error("Admin ID not found in local storage.");
    }
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleIconClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };  

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log('Selected file:', file);
        setSelectedFile(file);
    }
  };

  const handleSavePhoto = () => {
    if (selectedFile) {
        dispatch(updateAdminProfilePicture(selectedFile))
            .unwrap()
            .then((response) => {
              const { message } = response;
              handleCloseModal();
              setTimeout(() => {
                Swal.fire({
                    title: "Success",
                    text: message,
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    dispatch({ type: 'admin/updateReset' });
                    window.location.reload();
                });
              }, 100);
            })
            .catch((error) => {
              const errorMessage = error.response?.data?.message || "Failed to update profile picture. Please try again.";
              Swal.fire({
                  title: "Update Failed",
                  text: errorMessage,
                  icon: "error",
                  confirmButtonText: "OK"
              });
              console.error("Failed to update profile picture:", error);
            });
    } else {
        Swal.fire({
            title: "Error",
            text: "Please select a file to upload.",
            icon: "error",
            confirmButtonText: "OK"
        });
    }
  };


  // Display loading message if data is not yet fetched
  if (!adminData) {
    return <CustomLoader loading={loading} />;
  }

  return (
    <Card variant="outlined" sx={classes.card}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar
            alt={`${adminData.data.first_name} ${adminData.data.last_name}`}
            src={adminData.data.profile_picture}
            sx={classes.avatar}
          />
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Typography variant="h6" fontWeight="bold">
                {`${adminData.data.first_name} ${adminData.data.last_name}`}
              </Typography>
              <Button sx={classes.tabButton} onClick={handleIconClick}>
                <img src={ChangesImageIcon} alt="Edit icon" style={classes.icon} />
              </Button>
              <CustomModal open={modalOpen} onClose={handleCloseModal}>
                <CustomModal.Header onClose={handleCloseModal}>
                  Change Admin Photo
                </CustomModal.Header>
                <CustomTabs
                  value={tabValue}
                  onChange={handleTabChange}
                  tabs={tabsChangePhoto}
                />
                {tabValue === 0 && (
                  <Box mt={2}>
                    <CustomInput
                      type="file"
                      fileType="image" 
                      name="fileField"
                      onChange={handleFileChange}
                      error={formik.touched.file && formik.errors.file}
                    />
                  </Box>
                )}
                <CustomModal.Footer onClose={handleCloseModal} onSubmit={handleSavePhoto}>
                  Save
                </CustomModal.Footer>
              </CustomModal>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mt: '4px' }}>
              <WorkOutlineOutlinedIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {adminData.data.company.companyName}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mt: '4px' }}>
              <EmailOutlinedIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {adminData.data.email}
              </Typography>
            </Box>
          </Box>
        </Box>
        <CustomButton colorScheme={"bgBlue"} icon={EditProfileIcon} onClick={handleOpen}>
          Edit Profile
        </CustomButton>
      </Box>

      <Divider sx={{ marginY: '24px'}} />

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Admin Information Tab"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab 
          icon={<PersonOutlineOutlinedIcon />} 
          iconPosition="start" 
          label="Admin Information" 
          sx={{ 
            paddingX: '8px',
            paddingY: '0px',
            minHeight: '46px'
          }} 
        />
      </Tabs>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            First Name
          </Typography>
          <Typography sx={classes.infoValue}>
            {adminData.data.first_name}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            Last Name
          </Typography>
          <Typography sx={classes.infoValue}>
            {adminData.data.last_name}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            Username
          </Typography>
          <Typography sx={classes.infoValue}>
            {adminData.data.username}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            Email Address
          </Typography>
          <Typography sx={classes.infoValue}>
            {adminData.data.email}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>
            Company Origin
          </Typography>
          <Typography sx={classes.infoValue}>
            {adminData.data.company.companyName}
          </Typography>
        </Box>
      </Box>

      {/* Import Modal */}
      <AdminEdit open={open} handleClose={handleClose} />
    </Card>
  );
};

const useStyles = () => {
  return {
    card: {
      p: 2,
      m: 2,
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: '12px',
    },
    button: {
      textTransform: 'none',
      borderRadius: '8px',
      height: '40px',
    },
    section: {
      display: 'flex',
      gap: '24px',
      marginTop: '25px',
    },
    infoLabel: {
      fontWeight: "fontWeightLight",
      fontSize: "fontSizeMediumSmall",
      color: "secondary.main",
    },
    infoValue: {
      fontWeight: "fontWeightLight",
      fontSize: "fontSizeSmall",
    },
    icon: {
      width: "20px",
      height: "20px",
    },
    tabButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ml: 2,
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "secondary.lightGrayOpacity10",
      minWidth: 0,
    },
  };
};

export default AdminProfile;
