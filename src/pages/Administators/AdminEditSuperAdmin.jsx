import React, { useState, useEffect } from "react";
import CustomModal from "../../components/Elements/CustomModal";
import CustomTabs from "../../components/Elements/CustomTabs";
import EditInformationFormSuperadmin from "./EditAdminInformationFormSuperadmin";
import ChangePasswordAdminForm from "./ChangePasswordAdminForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEditAdminData,
  fetchEditPassword,
} from "../../redux/slices/adminSlice";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const AdminEditSuperAdmin = ({
  open,
  handleClose,
  adminData,
  companyData,
  userRole,
}) => {
  console.log("userRole : admin edit", userRole);

  const [tabValue, setTabValue] = useState(0);
  const [idAdmin, setIdAdmin] = useState("");
  const dispatch = useDispatch();
  // const adminData = useSelector((state) => state.admin.data);

  const loading = useSelector((state) => state.admin.loading);

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    setInitialValues({
      first_name: adminData?.first_name || "",
      last_name: adminData?.last_name || "",
      email: adminData?.email || "",
      username: adminData?.username || "",
      id_company: adminData?.company?.id_company || "",
      company_name: adminData?.company?.company_name || "",
    });
    setIdAdmin(adminData.id_admin);
  }, [open, adminData]);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters")
      .required("First name is required"),
    last_name: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters")
      .required("Last name is required"),
    username: Yup.string()
      .min(7, "Username must be at least 7 characters")
      .max(20, "Username must be less than 20 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const passwordValidationSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(7, "Password must be at least 7 characters")
      .max(50, "Password must be less than 50 characters")
      .required("New password is required"),
    retype_new_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Retype new password is required"),
  });

  const handleSaveAdmin = async (event, values) => {
    // Logic to save admin data
    event.preventDefault();
    try {
      const payload = {
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: values.email,
        id_company: values.id_company,
      };
      await dispatch(fetchEditAdminData({ id: idAdmin, adminData: payload }));
      Swal.fire({
        title: "Success",
        text: "Edit Admin Success",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleClose();
    } catch (error) {
      console.log("error", error);
      Swal.fire("Error", "There was an error updating the admin", "error");
    }
  };

  const handlEditPassword = async (event, values) => {
    // Logic to edit
    event.preventDefault();
    try {
      await dispatch(
        fetchEditPassword({ id: idAdmin, password: values.new_password })
      );
      Swal.fire({
        title: "Success",
        text: "Edit Password Success",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleClose();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "There was an error updating the password", "error");
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabs = [
    { icon: "/assets/icons/user.svg", label: "Admin Information" },
    { icon: "/assets/icons/pen.svg", label: "Change Password" },
  ];

  return (
    <CustomModal open={open} onClose={handleClose}>
      <CustomModal.Header onClose={handleClose}>
        Edit Administrator
      </CustomModal.Header>
      <CustomTabs value={tabValue} onChange={handleTabChange} tabs={tabs} />
      {tabValue === 0 &&
        (userRole === "Superadmin" ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            // onSubmit={handleSaveAdmin}
            dataCompanyMaster={companyData}
            enableReinitialize={true}
            validateOnBlur={true} // Validate when a field loses focus
            validateOnChange={true} // Validate when a field value changes
          >
            {({
              values,
              handleChange,
              handleBlur,
              touched,
              errors,
              isValid,
            }) => (
              <Form>
                <EditInformationFormSuperadmin
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched}
                  errors={errors}
                  dataCompanyMaster={companyData}
                />
                <CustomModal.Footer
                  onClose={handleClose}
                  onSubmit={(e) => handleSaveAdmin(e, values)}
                  disableSubmit={!isValid}
                >
                  Save
                </CustomModal.Footer>
              </Form>
            )}
          </Formik>
        ) : (
          <p>This user is not a superadmin</p>
        ))}
      {tabValue === 1 && (
        <Formik
          initialValues={{ new_password: "", retype_new_password: "" }}
          validationSchema={passwordValidationSchema}
          // onSubmit={handlEditPassword}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            isValid,
            dirty,
          }) => (
            <Form>
              <ChangePasswordAdminForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
              />
              <CustomModal.Footer
                onClose={handleClose}
                onSubmit={(e) => handlEditPassword(e, values)}
                disableSubmit={!isValid || !dirty}
              >
                Save
              </CustomModal.Footer>
            </Form>
          )}
        </Formik>
      )}
    </CustomModal>
  );
};

export default AdminEditSuperAdmin;
