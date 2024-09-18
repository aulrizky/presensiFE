import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useCallback,
} from "react";
import { Box } from "@mui/material";
import CustomInput from "../../components/Elements/CustomInput";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editPersonalEmployee } from "../../redux/slices/employeeSlice";
import Swal from "sweetalert2";
import { fetchCountries, fetchProvinces, fetchCities, fetchDistricts, fetchPostalCodes } from "../../services/apis/utilService";


const EditPersonalInfoForm = forwardRef(({ idEmployee, page }, ref) => {
  const dispatch = useDispatch();
  const [locationData, setLocationData] = useState({
    provinces: [],
    cities: [],
    districts: [],
    postalCodes: [],
    countries: [],
  });
  const personalInfo = useSelector((state) => state.employees.personalInfo);

  const initialValues = useMemo(
    () => ({
      first_name: personalInfo?.first_name || "",
      last_name: personalInfo?.last_name || "",
      date_of_birth: personalInfo?.date_of_birth || "",
      mobile_number: personalInfo?.mobile_number || "",
      gender: personalInfo?.gender || "",
      marital_status: personalInfo?.marital_status || "",
      nationality: personalInfo?.nationality || "",
      address: personalInfo?.address || "",
      province: personalInfo?.province || "",
      city: personalInfo?.city || "",
      district: personalInfo?.district || "",
      zip_code: personalInfo?.zip_code || "",
    }),
    [personalInfo]
  );

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(2, "First Name must be at least 2 characters")
      .max(50, "First Name must be at most 50 characters")
      .required("First Name is required"),
    last_name: Yup.string()
      .min(2, "Last Name must be at least 2 characters")
      .max(50, "Last Name must be at most 50 characters")
      .required("Last Name is required"),
    date_of_birth: Yup.date(),
    mobile_number: Yup.string()
      .matches(/^[0-9]+$/, "Mobile Number must be only digits")
      .min(10, "Mobile Number must be at least 10 characters")
      .max(13, "Mobile Number must be at most 13 characters"),
    gender: Yup.string(),
    marital_status: Yup.string(),
    nationality: Yup.string(),
    address: Yup.string()
      .min(5, "Address must be at least 5 characters")
      .max(255, "Address must be at most 255 characters"),
    province: Yup.string(),
    city: Yup.string(),
    district: Yup.string(),
    zip_code: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log("Personal Info:", values);
      dispatch(
        editPersonalEmployee({
          id_employee: idEmployee,
          formData: values,
        })
      )
        .unwrap()
        .then(() => {
          setTimeout(() => {
            Swal.fire({
              title: "Success",
              text: "Employee edited successfully",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              window.location.reload();
            });
          }, 300);
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

  const fetchLocationData = useCallback(async () => {
    try {
      const countries = await fetchCountries();
      const provinces = await fetchProvinces();

      setLocationData((prevData) => ({
        ...prevData,
        countries,
        provinces,
      }));
    } catch (error) {
      console.error("Error fetching location data:", error);
      setError("Failed to fetch location data. Please try again.");
    }
  }, []);

  useEffect(() => {
    fetchLocationData();
  }, [fetchLocationData]);

  const fetchCitiesData = useCallback(async () => {
    if (formik.values.province && locationData.provinces.length > 0) {
      try {
        const selectedProvince = locationData.provinces.find(
          (province) => province.text === formik.values.province
        );
        if (selectedProvince) {
          const cities = await fetchCities(selectedProvince.id);
          setLocationData((prevData) => ({
            ...prevData,
            cities,
            districts: [],
            postalCodes: [],
          }));
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        setError("Failed to fetch cities. Please try again.");
      }
    }
  }, [formik.values.province, locationData.provinces]);

  useEffect(() => {
    fetchCitiesData();
  }, [fetchCitiesData]);

  const fetchDistrictsData = useCallback(async () => {
    if (formik.values.city && locationData.cities.length > 0) {
      try {
        const selectedCity = locationData.cities.find(
          (city) => city.text === formik.values.city
        );
        if (selectedCity) {
          const districts = await fetchDistricts(selectedCity.id);
          setLocationData((prevData) => ({
            ...prevData,
            districts,
            postalCodes: [],
          }));
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
        setError("Failed to fetch districts. Please try again.");
      }
    }
  }, [formik.values.city, locationData.cities]);

  useEffect(() => {
    fetchDistrictsData();
  }, [fetchDistrictsData]);

  const fetchPostalCodesData = useCallback(async () => {
    if (
      formik.values.district &&
      formik.values.city &&
      locationData.districts.length > 0
    ) {
      try {
        const selectedCity = locationData.cities.find(
          (city) => city.text === formik.values.city
        );
        const selectedDistrict = locationData.districts.find(
          (district) => district.text === formik.values.district
        );
        if (selectedCity && selectedDistrict) {
          const postalCodes = await fetchPostalCodes(selectedCity.id, selectedDistrict.id);
          setLocationData((prevData) => ({
            ...prevData,
            postalCodes,
          }));
        }
      } catch (error) {
        console.error("Error fetching postal codes:", error);
        setError("Failed to fetch postal codes. Please try again.");
      }
    }
  }, [
    formik.values.district,
    formik.values.city,
    locationData.districts,
    locationData.cities,
  ]);

  useEffect(() => {
    fetchPostalCodesData();
  }, [fetchPostalCodesData]);

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
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
          fullWidth
        />
        <CustomInput
          label="Last Name"
          type="text"
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
          fullWidth
        />
      </Box>
      <Box sx={classes.textField}>
        <CustomInput
          label="Date of Birth"
          type="date"
          name="date_of_birth"
          value={formik.values.date_of_birth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)
          }
          helperText={
            formik.touched.date_of_birth && formik.errors.date_of_birth
          }
          fullWidth
        />
        <CustomInput
          label="Mobile Number"
          type="text"
          name="mobile_number"
          value={formik.values.mobile_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.mobile_number && Boolean(formik.errors.mobile_number)
          }
          helperText={
            formik.touched.mobile_number && formik.errors.mobile_number
          }
          fullWidth
        />
      </Box>
      <Box sx={classes.textField}>
        <CustomInput
          label="Gender"
          type="select"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          helperText={formik.touched.gender && formik.errors.gender}
          fullWidth
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
          ]}
        />
        <CustomInput
          label="Marital Status"
          type="select"
          name="marital_status"
          value={formik.values.marital_status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.marital_status &&
            Boolean(formik.errors.marital_status)
          }
          helperText={
            formik.touched.marital_status && formik.errors.marital_status
          }
          fullWidth
          options={[
            { value: "Married", label: "Married" },
            { value: "Not Married", label: "Not Married" },
            { value: "Widowed", label: "Widowed" },
          ]}
        />
      </Box>
      <Box sx={classes.textField}>
        <CustomInput
          label="Nationality"
          type="select"
          name="nationality"
          value={formik.values.nationality}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.nationality && Boolean(formik.errors.nationality)
          }
          helperText={formik.touched.nationality && formik.errors.nationality}
          fullWidth
          options={locationData.countries}
        />
        <CustomInput
          label="Address"
          type="text"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          fullWidth
        />
      </Box>
      <Box sx={classes.textField}>
        <CustomInput
          label="Province"
          type="select"
          name="province"
          value={formik.values.province}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.province && Boolean(formik.errors.province)}
          helperText={formik.touched.province && formik.errors.province}
          fullWidth
          options={locationData.provinces.map((prov) => ({
            value: prov.text,
            label: prov.text,
          }))}
        />
        <CustomInput
          label="City"
          type="select"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          fullWidth
          options={locationData.cities.map((city) => ({
            value: city.text,
            label: city.text,
          }))}
          disabled={!formik.values.province}
        />
      </Box>
      <Box sx={classes.textField}>
        <CustomInput
          label="District"
          type="select"
          name="district"
          value={formik.values.district}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.district && Boolean(formik.errors.district)}
          helperText={formik.touched.district && formik.errors.district}
          fullWidth
          options={locationData.districts.map((dist) => ({
            value: dist.text,
            label: dist.text,
          }))}
          disabled={!formik.values.city}
        />
        <CustomInput
          label="Zip Code"
          type="select"
          name="zip_code"
          value={formik.values.zip_code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
          helperText={formik.touched.zip_code && formik.errors.zip_code}
          fullWidth
          options={locationData.postalCodes.map((code) => ({
            value: code.text,
            label: code.text,
          }))}
          disabled={!formik.values.district}
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

export default EditPersonalInfoForm;
