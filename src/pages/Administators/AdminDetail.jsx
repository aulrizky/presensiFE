import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Button,
  Grid,
  Tab,
} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Email, Business } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAdminDetail,
  changeAdminPhoto,
} from "../../redux/slices/adminSlice";
import Swal from "sweetalert2";
import InfoDisplay from "../../components/Elements/InfoDisplay";
import theme from "../../styles/theme";
import CustomModal from "../../components/Elements/CustomModal";
import CustomInput from "../../components/Elements/CustomInput";
import { useFormik } from "formik";
import validationSchema from "../../validation/fileValidation";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AdminEditSuperAdmin from "./AdminEditSuperAdmin";
import { fetchCompanies } from "../../redux/slices/companySlice";

const AdminDetail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { idAdmin } = useParams();
  const adminDetail = useSelector((state) => state.admin.adminDetail);
  const companies = useSelector((state) => state.company.companies);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("profile_picture", values.file);
      try {
        const response = await dispatch(
          changeAdminPhoto({ idAdmin, formData })
        ).unwrap();
        console.log("Dispatch response:", response);
        await dispatch(fetchAdminDetail(idAdmin));
        Swal.fire({
          title: "Success",
          text: "Change Admin Photo Success",
          icon: "success",
          confirmButtonText: "OK",
        });
        handleCloseModal();
      } catch (error) {
        console.error("Error updating photo:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to update profile picture. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  //add fetch when the modal is applied
  useEffect(() => {
    if (idAdmin || editModalOpen == false) {
      dispatch(fetchAdminDetail(idAdmin));
    }
  }, [dispatch, idAdmin, editModalOpen]);

  useEffect(() => {
    if (open) {
      dispatch(fetchCompanies());
    }
  }, [open, dispatch]);

  const handleIconClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    formik.resetForm();
    setModalOpen(false);
  };

  const handleFileChange = (event) => {
    formik.setFieldValue("file", event.target.files[0]);
    formik.setFieldTouched("file", true, true); // Set field as touched
  };

  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  if (!adminDetail) {
    return <div>No Data...</div>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid
        border={`1px solid ${theme.palette.grey[300]}`}
        borderRadius={"10px"}
        padding={2.5}
      >
        <Box>
          <Card
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              width: "100%",
            }}
          >
            <CardMedia
              component="img"
              alt="Profile Picture"
              image={
                adminDetail.profile_picture || "https://via.placeholder.com/100"
              }
              sx={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            <CardContent style={{ flex: "1" }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography component="div" variant="h6">
                  {`${adminDetail.first_name} ${adminDetail.last_name}`}
                  <IconButton onClick={handleIconClick}>
                    <AddPhotoAlternateOutlinedIcon fontSize="small" />
                  </IconButton>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1} gap={1}>
                <Business />
                <Typography variant="body2">
                  {adminDetail.company?.company_name}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1} gap={1}>
                <Email />
                <Typography variant="body2">{adminDetail.email}</Typography>
              </Box>
            </CardContent>
            <CardActions style={{ marginRight: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleOpenEditModal}
              >
                Edit Profile
              </Button>
            </CardActions>
          </Card>

          <CustomModal open={modalOpen} onClose={handleCloseModal}>
            <CustomModal.Header onClose={handleCloseModal}>
              Change Admin Photo
            </CustomModal.Header>
            <Box mt={2}>
              <CustomInput
                type="file"
                fileType="image"
                value={formik.values.file}
                onChange={handleFileChange}
                error={formik.touched.file && Boolean(formik.errors.file)}
                helperText={formik.touched.file && formik.errors.file}
              />
            </Box>
            <CustomModal.Footer
              onClose={handleCloseModal}
              onSubmit={formik.handleSubmit}
            >
              Save
            </CustomModal.Footer>
          </CustomModal>

          <AdminEditSuperAdmin
            open={editModalOpen}
            handleClose={handleCloseEditModal}
            adminData={adminDetail}
            companyData={companies}
          />

          <Box sx={{ width: "100%", typography: "h6", mt: 3 }}>
            <TabContext value="1">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList aria-label="lab API tabs example">
                  <Tab label="Data Administrator" value="1" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  <InfoDisplay
                    label="First Name"
                    value={adminDetail.first_name}
                    underline
                  />
                  <InfoDisplay
                    label="Last Name"
                    value={adminDetail.last_name}
                    underline
                  />
                  <InfoDisplay
                    label="Username"
                    value={adminDetail.username}
                    underline
                  />
                  <InfoDisplay
                    label="Email Address"
                    value={adminDetail.email}
                    underline
                  />
                  <InfoDisplay
                    label="Company Origin"
                    value={adminDetail.company?.company_name}
                    underline
                  />
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default AdminDetail;
