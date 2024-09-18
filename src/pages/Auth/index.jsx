import React, { useContext } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { FormControlLabel, Checkbox } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CustomButton,
  CustomInput,
  CustomTypography,
  CustomLoader,
} from "../../components/Elements";
import { useAuth } from "../../context/AuthContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.primary.lightPrimary5
      : theme.palette.primary.lightPrimary5,
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 30,
  height: "100%",
}));

const LoginForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
}));

const validationSchema = Yup.object({
  username: Yup.string()
    .min(7, "Username must be at least 7 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .max(50, "Password must be at most 50 characters")
    .required("Password is required"),
});

const Login = () => {
  const { login, loading } = useAuth(); // Ambil login dan loading dari AuthContext

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await login(values.username, values.password);
    },
  });

  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
      {/* Tampilkan CustomLoader jika loading true */}
      <CustomLoader loading={loading} />

      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Item>
            <img
              src="/assets/images/login-bg.png"
              alt="login-bg"
              style={{ width: "80%", height: "auto", margin: 0 }}
            />
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <LoginForm component="form" onSubmit={formik.handleSubmit}>
            <img
              src="/assets/images/company-logo.png"
              alt="company-logo"
              style={{ width: "50%", marginBottom: "20px" }}
            />
            <CustomTypography
              variant="h5"
              fontWeight="fontWeightBold"
              fontSize="medium"
              gutterBottom
            >
              Presensi 79
            </CustomTypography>
            <CustomTypography
              variant="subtitle1"
              fontWeight="fontWeightLight"
              fontSize="small"
              color="secondary.main"
              gutterBottom
            >
              Please login here
            </CustomTypography>
            <CustomInput
              label="Username"
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <CustomInput
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Remember Me"
              sx={{
                alignSelf: "flex-start",
                marginTop: "8px",
                fontSize: (theme) => theme.typography.fontSize.small,
                fontWeight: (theme) => theme.typography.fontWeightLight,
              }}
            />
            <CustomButton colorScheme="bgBlue" type="submit">
              Login
            </CustomButton>
          </LoginForm>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
