import React, { forwardRef, useImperativeHandle } from "react";
import { Box } from "@mui/material";
import CustomInput from "../../components/Elements/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  editPassword,
  fetchAllEmployees,
} from "../../redux/slices/employeeSlice";
import Swal from "sweetalert2";

const ChangePasswordForm = forwardRef(({ idEmployee, page }, ref) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      new_password: "",
      retype_new_password: "",
    },
    validationSchema: Yup.object({
      new_password: Yup.string()
        .required("New Password is required")
        .min(7, "Password must be at least 7 characters")
        .max(50, "Password must be at most 50 characters"),
      retype_new_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .required("Please re-type the new password"),
    }),
    onSubmit: (values) => {
      console.log("Form Values password:", values);
      dispatch(
        editPassword({
          id_employee: idEmployee,
          formData: values,
        })
      )
        .unwrap()
        .then(() => {
          Swal.fire("Success", `Employee edited successfully`, "success");
          // Refresh data tabel setelah edit berhasil
          dispatch(fetchAllEmployees({ page: page.page, size: page.size }));
        })
        .catch((error) => {
          console.error("handleSubmitEdit: error editing employee", error);
          // Show error feedback
          Swal.fire(
            "Error",
            error.message || "Failed to edit employee",
            "error"
          );
        });
    },
  });

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
          label="Enter new Password"
          type="password"
          name="new_password"
          value={formik.values.new_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.new_password && Boolean(formik.errors.new_password)
          }
          helperText={formik.touched.new_password && formik.errors.new_password}
          fullWidth
        />
      </Box>
      <Box sx={classes.textField}>
        <CustomInput
          label="Re-type new Password"
          type="password"
          name="retype_new_password"
          value={formik.values.retype_new_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.retype_new_password &&
            Boolean(formik.errors.retype_new_password)
          }
          helperText={
            formik.touched.retype_new_password &&
            formik.errors.retype_new_password
          }
          fullWidth
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

export default ChangePasswordForm;
