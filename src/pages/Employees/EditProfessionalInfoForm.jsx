import React, {
  forwardRef,
  useMemo,
  useEffect,
  useImperativeHandle,
} from "react";
import { Box } from "@mui/material";
import CustomInput from "../../components/Elements/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  editProfessionalEmployee,
  fetchAllEmployees,
} from "../../redux/slices/employeeSlice";
import { fetchAllDepartments } from "../../redux/slices/departmentSlice";
import Swal from "sweetalert2";

const EditProfessionalInfoForm = forwardRef(({ idEmployee, page }, ref) => {
  const professionalInfo = useSelector(
    (state) => state.employees.professionalInfo
  );
  const departments = useSelector((state) => state.departments.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (departments.length === 0) {
      dispatch(fetchAllDepartments());
    }
    console.log(departments);
  }, [dispatch, departments.length]);

  const initialValues = useMemo(
    () => ({
      employee_number: professionalInfo?.employee_number || "",
      username: professionalInfo?.username || "",
      status: professionalInfo?.status || "",
      id_department: professionalInfo?.id_department || "",
      email: professionalInfo?.email || "",
      role_current_company: professionalInfo?.role_current_company || "",
      role_in_client: professionalInfo?.role || "",
      joining_date: professionalInfo?.joining_date || "",
    }),
    [professionalInfo]
  );

  const validationSchema = Yup.object({
    employee_number: Yup.string()
      .required("Employee Number is required")
      .matches(/^[0-9]+$/, "Employee Number must be only digits")
      .min(7, "Employee Number must be at least 7 characters")
      .max(20, "Employee Number must be at most 20 characters"),
    username: Yup.string()
      .min(7, "Username must be at least 7 characters")
      .max(20, "Username must be at most 20 characters")
      .required("Username is required"),
    status: Yup.string().required("Status is required"),
    id_department: Yup.string().required("Department is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    role_current_company: Yup.string(),
    role_in_client: Yup.string(),
    joining_date: Yup.date().required("Joining Date is required"),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log("Professional Info:", values);
      dispatch(
        editProfessionalEmployee({
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
    innerRef: ref,
  });

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      console.log("submitForm called");
      if (formik.dirty) {
        console.log("Form is dirty, submitting...");
        formik.handleSubmit();
      } else {
        console.log("No changes detected");
        Swal.fire("Info", "No changes detected", "info");
        if (onSuccess) onSuccess();
      }
    },
  }));

  const classes = useStyles();

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={classes.textField}>
        <CustomInput
          label="Employee Number"
          type="text"
          name="employee_number"
          value={formik.values.employee_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.employee_number &&
            Boolean(formik.errors.employee_number)
          }
          helperText={
            formik.touched.employee_number && formik.errors.employee_number
          }
          fullWidth
        />
        <CustomInput
          label="Username"
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          fullWidth
        />
      </Box>
      <Box sx={classes.textField}>
        <CustomInput
          label="Status"
          type="select"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.status && Boolean(formik.errors.status)}
          helperText={formik.touched.status && formik.errors.status}
          fullWidth
          options={[
            { value: "Contract", label: "Contract" },
            { value: "OJT", label: "OJT" },
            { value: "Permanent", label: "Permanent" },
            { value: "Freelance", label: "Freelance" },
          ]}
        />
        <CustomInput
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
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
          error={
            formik.touched.id_department && Boolean(formik.errors.id_department)
          }
          helperText={
            formik.touched.id_department && formik.errors.id_department
          }
          fullWidth
          options={departments.map((dept) => ({
            value: dept.id,
            label: dept.name,
          }))}
        />
        <CustomInput
          label="Role in Current Company"
          type="text"
          name="role_current_company"
          value={formik.values.role_current_company}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.role_current_company &&
            Boolean(formik.errors.role_current_company)
          }
          helperText={
            formik.touched.role_current_company &&
            formik.errors.role_current_company
          }
          fullWidth
        />
      </Box>
      <Box sx={classes.textField}>
        <CustomInput
          label="Role in Client"
          type="text"
          name="role_in_client"
          value={formik.values.role_in_client}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.role_in_client &&
            Boolean(formik.errors.role_in_client)
          }
          helperText={
            formik.touched.role_in_client && formik.errors.role_in_client
          }
          fullWidth
        />
        <CustomInput
          label="Joining Date"
          type="date"
          name="joining_date"
          value={formik.values.joining_date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.joining_date && Boolean(formik.errors.joining_date)
          }
          helperText={formik.touched.joining_date && formik.errors.joining_date}
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

export default EditProfessionalInfoForm;
