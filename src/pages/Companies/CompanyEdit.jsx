import React, { useState, useEffect } from 'react';
import CustomModal from '../../components/Elements/CustomModal';
import { CustomLoader } from '../../components/Elements';
import EditCompanyByAdminForm from './EditCompanyByAdminForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompany, updateCompanyProfile } from '../../redux/slices/companySlice';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const CompanyEdit = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.company.data);
  const loading = useSelector((state) => state.company.loading);

  const [initialValues, setInitialValues] = useState({
    company_name: "",
    founder: "",
    founded_at: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    city: "",
    district: "",
    zip_code: "",
    joining_date: "",
  });

  useEffect(() => {
    if (open) {
      dispatch(fetchCompany());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (companyData) {
      setInitialValues({
        company_name: companyData.data.company_name || "",
        founder: companyData.data.founder || "",
        founded_at: companyData.data.founded_at || "",
        phone: companyData.data.phone || "",
        email: companyData.data.email || "",
        address: companyData.data.address || "",
        state: companyData.data.province || "",
        city: companyData.data.city || "",
        district: companyData.data.district || "",
        zip_code: companyData.data.zip_code || "",
        joining_date: companyData.data.joining_date || "",
      });
    }
  }, [companyData]);

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required('Company Name is required'),
    founder: Yup.string().required('Founder is required'),
    founded_at: Yup.string().required('Founded At is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('Province is required'),
    city: Yup.string().required('City is required'),
    district: Yup.string().required('District is required'),
    zip_code: Yup.string().required('Zip Code is required'),
    joining_date: Yup.date().required('Joining Date is required'),
  });

  const handleSaveCompanyInfo = (values) => {
    dispatch(updateCompanyProfile(values))
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
            dispatch({ type: 'company/updateReset' });
            window.location.reload();
          });
        }, 100);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Failed to update company information. Please try again.";
        Swal.fire({
          title: "Update Failed",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK"
        });
        console.error("Failed to update company information:", error);
      });
  };

  if (loading) {
    return <CustomLoader loading={loading} />;
  }

  return (
    <CustomModal open={open} onClose={handleClose}>
      <CustomModal.Header onClose={handleClose}>
        Edit Company Information
      </CustomModal.Header>

      {companyData && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSaveCompanyInfo}
          enableReinitialize={true}
        >
          {({ values, handleChange, handleBlur, touched, errors, isValid }) => (
            <Form>
              <EditCompanyByAdminForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
              />
              <CustomModal.Footer
                onClose={handleClose}
                onSubmit={() => handleSaveCompanyInfo(values)}
                disableSubmit={!isValid}
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

export default CompanyEdit;
