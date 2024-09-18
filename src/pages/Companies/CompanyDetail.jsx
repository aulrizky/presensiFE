import ImportIcon from "/assets/icons/file-add-blue.svg";
import EditProfileIcon from "/assets/icons/edit-profile.svg";
import ChangesImageIcon from "/assets/icons/image-edit.svg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, Typography, Button, Divider } from '@mui/material';
import CompanyEdit from './CompanyEdit';
import { fetchCompany, updateCompanyLogo } from '../../redux/slices/companySlice';
import { CustomLoader, CustomModal, CustomInput, CustomTabs, CustomButton } from '../../components/Elements';
import Swal from 'sweetalert2';

const CompanyDetail = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.company.data);
  const loading = useSelector((state) => state.company.loading);

  const tabsChangePhoto = [{ icon: ImportIcon, label: "Choose Logo" }];

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

  const handleSaveLogo = () => {
    if (selectedFile) {
      dispatch(updateCompanyLogo(selectedFile))
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
              dispatch({ type: 'company/updateReset' });
              window.location.reload();
            });
          }, 100);
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "Failed to update company logo. Please try again.";
          Swal.fire({
            title: "Update Failed",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "OK"
          });
          console.error("Failed to update company logo:", error);
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

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  if (!companyData) {
    return <CustomLoader loading={loading} />;
  }

  return (
    <Card variant="outlined" sx={classes.card}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            alt={companyData.data.company_name}
            src={companyData.data.company_logo || "/assets/images/company-logo.png"}
            // src={"/assets/images/company-logo.png"}
            style={{ width: 200 }}
          />
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Button sx={classes.tabButton} onClick={handleIconClick}>
                <img src={ChangesImageIcon} alt="Edit icon" style={classes.icon} />
              </Button>
              <CustomModal open={modalOpen} onClose={handleCloseModal}>
                <CustomModal.Header onClose={handleCloseModal}>
                  Change Company Logo
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
                    />
                  </Box>
                )}
                <CustomModal.Footer onClose={handleCloseModal} onSubmit={handleSaveLogo}>
                  Save
                </CustomModal.Footer>
              </CustomModal>
            </Box>
          </Box>
        </Box>
        <CustomButton colorScheme={"bgBlue"} icon={EditProfileIcon} onClick={handleOpen}>
          Edit Profile
        </CustomButton>
      </Box>

      <Divider sx={{ marginY: "24px" }} />

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Company Name</Typography>
          <Typography sx={classes.infoValue}>
            {companyData.data.company_name}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Founder</Typography>
          <Typography sx={classes.infoValue}>
            {companyData.data.founder}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Founded at</Typography>
          <Typography sx={classes.infoValue}>
            {companyData.data.founded_at}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Phone</Typography>
          <Typography sx={classes.infoValue}>
            {companyData.data.phone}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Email Address</Typography>
          <Typography sx={classes.infoValue}>
            {companyData.data.email}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Address</Typography>
          <Typography sx={classes.infoValue}>
            {companyData.data.address}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Province</Typography>
          <Typography sx={classes.infoValue}>
            {companyData.data.province}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>City</Typography>
          <Typography sx={classes.infoValue}>
            {companyData.data.city}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>District</Typography>
          <Typography sx={classes.infoValue}>
            {companyData.data.district}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Zip Code</Typography>
          <Typography sx={classes.infoValue}>
            {companyData.data.zip_code}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Joining Date</Typography>
          <Typography sx={classes.infoValue}>
            {companyData.data.joining_date}
          </Typography>
        </Box>
      </Box>

      {/* Edit Information Modal */}
      <CompanyEdit open={open} handleClose={handleClose} />
    </Card>
  );
};

const useStyles = () => {
  return {
    card: {
      p: 2,
      m: 2,
    },
    button: {
      textTransform: "none",
      borderRadius: "8px",
      height: "40px",
    },
    section: {
      display: "flex",
      gap: "24px",
      marginTop: "25px",
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

export default CompanyDetail;
