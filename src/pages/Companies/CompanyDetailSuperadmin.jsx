import { AddPhotoAlternateOutlined, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeCompanyLogo, fetchDetailCompany } from "../../redux/slices/companySlice";
import { CustomInput, CustomModal } from "../../components/Elements";
import { useFormik } from "formik";
import validationSchema from "../../validation/fileValidation";
import Swal from "sweetalert2";

const CompaniesDetailSuperadmin = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();
  const { idCompany } = useParams();
  const dispatch = useDispatch();
  const detailCompany = useSelector((state) => state.company.detailCompany);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("company_logo", values.file);
      try {
        const response = await dispatch(
          changeCompanyLogo({ idCompany, formData })
        ).unwrap();
        console.log("Dispatch response:", response);
        await dispatch(fetchDetailCompany(idCompany));
        Swal.fire({
          title: "Success",
          text: "Change Company Logo Success",
          icon: "success",
          confirmButtonText: "OK",
        });
        handleCloseModal();
      } catch (error) {
        console.error("Error updating logo:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to update logo. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  const handleIconClick = () => {
    console.log("Icon clicked"); // Tambahkan log untuk memastikan event terpanggil
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    formik.resetForm();
    setModalOpen(false);
  };

  const handleFileChange = (event) => {
    formik.setFieldValue("file", event.target.files[0]);
  };

  useEffect(() => {
    if (idCompany) {
      dispatch(fetchDetailCompany(idCompany));
    }
  }, [idCompany, dispatch]);

  console.log(detailCompany);

  if (!detailCompany) {
    return <div>No Data...</div>;
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
            alt=""
            // src={companyData.company_logo || "/assets/images/company-logo.png"}
            src={
              detailCompany.company_logo || "https://via.placeholder.com/300"
            }
            style={{
              width: 300,
              height: 150,
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IconButton sx={{ padding: "0" }} onClick={handleIconClick}>
                <AddPhotoAlternateOutlined fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ marginY: "24px" }} />
          
          <CustomModal open={modalOpen} onClose={handleCloseModal}>
            <CustomModal.Header onClose={handleCloseModal}>
              Change Company Logo
            </CustomModal.Header>
            <Box mt={2}>
              <CustomInput
                type="file"
                fileType="image"
                value={formik.values.file}
                onChange={handleFileChange}
                error={formik.touched.file && formik.errors.file}
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

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Company Name</Typography>
          <Typography sx={classes.infoValue}>
            {detailCompany.company_name}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Founder</Typography>
          <Typography sx={classes.infoValue}>
            {detailCompany.founder}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Founded at</Typography>
          <Typography sx={classes.infoValue}>
            {detailCompany.founded_at}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Phone</Typography>
          <Typography sx={classes.infoValue}>{detailCompany.phone}</Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Email Address</Typography>
          <Typography sx={classes.infoValue}>{detailCompany.email}</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Address</Typography>
          <Typography sx={classes.infoValue}>
            {detailCompany.address}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Province</Typography>
          <Typography sx={classes.infoValue}>{detailCompany.state}</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>City</Typography>
          <Typography sx={classes.infoValue}>{detailCompany.city}</Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Zip Code</Typography>
          <Typography sx={classes.infoValue}>
            {detailCompany.zip_code}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={classes.infoLabel}>Joining Date</Typography>
          <Typography sx={classes.infoValue}>
            {detailCompany.joining_date}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.section}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Edit />}
          sx={classes.button}
        >
          Edit Information
        </Button>
      </Box>
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
      variant: "body2",
      color: "text.secondary",
    },
    infoValue: {
      variant: "body1",
    },
  };
};
export default CompaniesDetailSuperadmin;

// page companies
