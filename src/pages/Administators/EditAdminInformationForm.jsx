import React from 'react';
import { Box } from '@mui/material';
import { CustomInput } from '../../components/Elements';

const EditAdminInformationForm = ({ values, handleChange, handleBlur, touched, errors }) => {
  return (
    <Box component="form">
      <Box sx={{ display: 'flex', gap: 2 }}>
        <CustomInput 
          label="First Name" 
          type="text"
          name="first_name"
          value={values.first_name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.first_name && Boolean(errors.first_name)}
          helperText={touched.first_name && errors.first_name}
          fullWidth
        />
        <CustomInput 
          label="Last Name" 
          type="text"
          name="last_name"
          value={values.last_name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.last_name && Boolean(errors.last_name)}
          helperText={touched.last_name && errors.last_name}
          fullWidth
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <CustomInput 
          label="Username" 
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
          fullWidth
        />
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
      </Box>
    </Box>
  );
};

export default EditAdminInformationForm;
