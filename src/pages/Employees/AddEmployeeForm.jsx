import React, { useImperativeHandle, forwardRef, useEffect } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/Elements/CustomInput";
import { fetchAllDepartments } from "../../redux/slices/departmentSlice";
import { useSelector, useDispatch } from "react-redux";

const AddEmployeeForm = forwardRef(({ onSubmit }, ref) => {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      email: "",
      employee_number: "",
      id_department: "",
      role_current_company: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .required("First Name is required")
        .min(3, "First Name must be at least 3 characters")
        .max(50, "First Name must be at most 50 characters"),
      last_name: Yup.string()
        .required("Last Name is required")
        .min(3, "Last Name must be at least 3 characters")
        .max(50, "Last Name must be at most 50 characters"),
      username: Yup.string()
        .required("Username is required")
        .min(7, "Username must be at least 7 characters")
        .max(20, "Username must be at most 20 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Address is required")
        .min(5, "Email must be at least 5 characters")
        .max(50, "Email must be at most 50 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(7, "Password must be at least 7 characters")
        .max(50, "First Name must be at most 50 characters"),
      id_department: Yup.string().required("Department is required"),
      role_current_company: Yup.string()
        .required("Role is required")
        .min(3, "Role must be at least 3 characters")
        .max(50, "Role must be at most 50 characters"),
      employee_number: Yup.string()
        .required("Employee Number is required")
        .matches(/^[0-9]+$/, "Employee Number must be only digits")
        .min(7, "Employee Number must be at least 7 characters")
        .max(20, "Employee Number must be at most 20 characters"),
    }),
    onSubmit: (values) => {
      if (onSubmit) {
        onSubmit(values);
      }
    },
  });

  const departments = useSelector((state) => state.departments.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (departments.length === 0) {
      dispatch(fetchAllDepartments());
    }
    console.log(departments);
  }, [dispatch, departments.length]);

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formik.handleSubmit();
    },
  }));

  const classes = useStyles();

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={classes.textField}>
        <CustomInput
          label="First Name"
          type="text"
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
        />
        <CustomInput
          label="Last Name"
          type="text"
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
        />
      </Box>
      <Box sx={classes.textField}>
        <CustomInput
          label="Username"
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <CustomInput
          label="Email Address"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Box>
      <Box sx={classes.textField}>
        <CustomInput
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <CustomInput
          label="Employee Number"
          type="text"
          name="employee_number"
          value={formik.values.employee_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={
            formik.touched.employee_number &&
            Boolean(formik.errors.employee_number)
          }
          helperText={
            formik.touched.employee_number && formik.errors.employee_number
          }
        />
      </Box>
      <Box sx={classes.textField}>
        <CustomInput
          label="Department"
          type="select"
          name="id_department"
          value={formik.values.id_department}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          options={departments.map((dept) => ({
            value: dept.id,
            label: dept.name,
          }))}
          fullWidth
          error={
            formik.touched.id_department && Boolean(formik.errors.id_department)
          }
          helperText={
            formik.touched.id_department && formik.errors.id_department
          }
        />
        <CustomInput
          label="Role"
          type="text"
          name="role_current_company"
          value={formik.values.role_current_company}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={
            formik.touched.role_current_company &&
            Boolean(formik.errors.role_current_company)
          }
          helperText={
            formik.touched.role_current_company &&
            formik.errors.role_current_company
          }
        />
      </Box>
    </form>
  );
});

const useStyles = () => {
  return {
    textField: {
      display: "flex",
      gap: 2,
    },
  };
};

export default AddEmployeeForm;
