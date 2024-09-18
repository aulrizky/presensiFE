import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { CustomInput } from '../../components/Elements';
import { fetchProvinces, fetchCities, fetchDistricts, fetchPostalCodes } from '../../services/apis/utilService';

const EditCompanyByAdminForm = ({ values, handleChange, handleBlur, touched, errors }) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [postalCodes, setPostalCodes] = useState([]);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const provincesData = await fetchProvinces();
        setProvinces(provincesData);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    loadProvinces();
  }, []);

  useEffect(() => {
    if (values.state) {
      const loadCities = async () => {
        try {
          const selectedProvince = provinces.find((prov) => prov.text === values.state);
          const citiesData = await fetchCities(selectedProvince.id);
          setCities(citiesData);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };
      loadCities();
    }
  }, [values.state, provinces]);

  useEffect(() => {
    if (values.city) {
      const loadDistricts = async () => {
        try {
          const selectedCity = cities.find((city) => city.text === values.city);
          const districtsData = await fetchDistricts(selectedCity.id);
          setDistricts(districtsData);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      };
      loadDistricts();
    }
  }, [values.city, cities]);

  useEffect(() => {
    if (values.district) {
      const loadPostalCodes = async () => {
        try {
          const selectedCity = cities.find((city) => city.text === values.city);
          const selectedDistrict = districts.find((district) => district.text === values.district);
          const postalCodesData = await fetchPostalCodes(selectedCity.id, selectedDistrict.id);
          setPostalCodes(postalCodesData);
        } catch (error) {
          console.error('Error fetching postal codes:', error);
        }
      };
      loadPostalCodes();
    }
  }, [values.district, cities, districts]);

  return (
    <Box component="form">
      <Box sx={styles.inputGroup}>
        <CustomInput 
          label="Company Name" 
          type="text"
          name="company_name"
          value={values.company_name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.company_name && Boolean(errors.company_name)}
          helperText={touched.company_name && errors.company_name}
          fullWidth
        />
        <CustomInput 
          label="Founder" 
          type="text"
          name="founder"
          value={values.founder}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.founder && Boolean(errors.founder)}
          helperText={touched.founder && errors.founder}
          fullWidth
        />
      </Box>

      <Box sx={styles.inputGroup}>
        <CustomInput 
          label="Founded At" 
          type="date"
          name="founded_at"
          value={values.founded_at}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.founded_at && Boolean(errors.founded_at)}
          helperText={touched.founded_at && errors.founded_at}
          fullWidth
        />
        <CustomInput 
          label="Phone" 
          type="text"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone}
          fullWidth
        />
      </Box>

      <Box sx={styles.inputGroup}>
        <CustomInput 
          label="Email Address" 
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          fullWidth
        />
        <CustomInput 
          label="Address" 
          type="text"
          name="address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address && Boolean(errors.address)}
          helperText={touched.address && errors.address}
          fullWidth
        />
      </Box>

      <Box sx={styles.inputGroup}>
        <CustomInput 
          label="Province" 
          type="select"
          name="state"
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.state && Boolean(errors.state)}
          helperText={touched.state && errors.state}
          fullWidth
          options={provinces.map((prov) => ({
            value: prov.text,
            label: prov.text,
          }))}
        />
        <CustomInput 
          label="City" 
          type="select"
          name="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.city && Boolean(errors.city)}
          helperText={touched.city && errors.city}
          fullWidth
          options={cities.map((city) => ({
            value: city.text,
            label: city.text,
          }))}
          disabled={!values.state}
        />
      </Box>

      <Box sx={styles.inputGroup}>
        <CustomInput 
          label="District" 
          type="select"
          name="district"
          value={values.district}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.district && Boolean(errors.district)}
          helperText={touched.district && errors.district}
          fullWidth
          options={districts.map((dist) => ({
            value: dist.text,
            label: dist.text,
          }))}
          disabled={!values.city}
        />
        <CustomInput 
          label="Zip Code" 
          type="select"
          name="zip_code"
          value={values.zip_code}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.zip_code && Boolean(errors.zip_code)}
          helperText={touched.zip_code && errors.zip_code}
          fullWidth
          options={postalCodes.map((code) => ({
            value: code.text,
            label: code.text,
          }))}
          disabled={!values.district}
        />
      </Box>

      <Box sx={styles.inputGroup}>
        <CustomInput 
          label="Joining Date" 
          type="date"
          name="joining_date"
          value={values.joining_date}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.joining_date && Boolean(errors.joining_date)}
          helperText={touched.joining_date && errors.joining_date}
          fullWidth
        />
      </Box>
    </Box>
  );
};

const styles = {
  inputGroup: {
    display: 'flex',
    gap: 2,
  },
};

export default EditCompanyByAdminForm;
