import React, { useState, useEffect } from 'react';
import CustomModal from '../../components/Elements/CustomModal';
import CustomTabs from '../../components/Elements/CustomTabs';
import EditAdminInformationForm from './EditAdminInformationForm';
import ChangePasswordAdminForm from './ChangePasswordAdminForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmin, saveAdminInformation, saveAdminPassword } from '../../redux/slices/adminSlice';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const AdminEdit = ({ open, handleClose }) => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.admin.data);  
  const loading = useSelector((state) => state.admin.loading);

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (open) {
      dispatch(fetchAdmin());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (adminData) {
      setInitialValues({
        first_name: adminData.data.first_name,
        last_name: adminData.data.last_name,
        username: adminData.data.username,
        email: adminData.data.email,
      });
    }
  }, [adminData]);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be less than 50 characters')
      .required('First name is required'),
    last_name: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be less than 50 characters')
      .required('Last name is required'),
    username: Yup.string()
      .min(7, 'Username must be at least 7 characters')
      .max(20, 'Username must be less than 20 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const passwordValidationSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(7, 'Password must be at least 7 characters')
      .max(50, 'Password must be less than 50 characters')
      .required('New password is required'),
    retype_new_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
      .required('Retype new password is required')
  });

  const handleSaveAdminInfo = (values) => {
    console.log("Current Form Data:", values); // Log current form data before dispatching
    dispatch(saveAdminInformation(values))
      .unwrap()
      .then((response) => {
        const { message } = response;
        handleClose();
        setTimeout(() => {
          Swal.fire({
            title: "Update Successful",
            text: message,
            icon: "success",
            confirmButtonText: "OK"
          }).then(() => {
            dispatch({ type: 'admin/updateReset' });
            window.location.reload();
          });
        }, 300);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Failed to update admin information. Please try again.";
        Swal.fire({
          title: "Update Failed",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK"
        });
        console.error("Failed to update admin information:", error);
      });
  };

  const handleSavePassword = (values) => {
    console.log("Password Change Data:", values);
    dispatch(saveAdminPassword(values))
      .unwrap()
      .then((response) => {
        const { message } = response;
        handleClose();
        setTimeout(() => {
          Swal.fire({
            title: "Password Changed Successfully",
            text: message,
            icon: "success",
            confirmButtonText: "OK"
          }).then(() => {
            dispatch({ type: 'admin/updateReset' });
          });
        }, 300);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Failed to change password. Please try again.";
        Swal.fire({
          title: "Change Password Failed",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK"
        });
        console.error("Failed to change password:", error);
      });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabs = [
    { icon: '/assets/icons/user.svg', label: 'Admin Information' },
    { icon: '/assets/icons/pen.svg', label: 'Change Password' },
  ];

  if (loading) {
    return <p>Loading...</p>;  // Menampilkan loading jika data sedang diambil
  }

  return (
    <CustomModal open={open} onClose={handleClose}>
      <CustomModal.Header onClose={handleClose}>
        Edit Administrator
      </CustomModal.Header>
      <CustomTabs value={tabValue} onChange={handleTabChange} tabs={tabs} />
      {tabValue === 0 && adminData && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSaveAdminInfo}
          enableReinitialize={true}
        >
          {({ values, handleChange, handleBlur, touched, errors, isValid }) => (
            <Form>
              <EditAdminInformationForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
              />
              <CustomModal.Footer
                onClose={handleClose}
                onSubmit={() => handleSaveAdminInfo(values)}
                disableSubmit={!isValid}
              >
                Save
              </CustomModal.Footer>
            </Form>
          )}
        </Formik>
      )}
      {tabValue === 1 && (
        <Formik
          initialValues={{ new_password: '', retype_new_password: '' }}
          validationSchema={passwordValidationSchema}
          onSubmit={handleSavePassword}
        >
          {({ values, handleChange, handleBlur, touched, errors, isValid, dirty }) => (
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
                onSubmit={() => handleSavePassword(values)}
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

export default AdminEdit;
