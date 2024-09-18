import React from "react";
import { Grid } from "@mui/material";
import CustomInput from "../../components/Elements/CustomInput";

const EditAdminInformationFormSuperadmin = ({
  values,
  dataCompanyMaster,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
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
      </Grid>
      <Grid item xs={6}>
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
      </Grid>
      <Grid item xs={6}>
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
      </Grid>
      <Grid item xs={6}>
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
      </Grid>
      <Grid item xs={12}>
        <CustomInput
          label="Company Origin"
          type="select"
          name="id_company"
          value={values.id_company}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.id_company && Boolean(errors.id_company)}
          helperText={touched.id_company && errors.id_company}
          fullWidth
          options={dataCompanyMaster?.map((company) => ({
            value: company.id_company,
            label: company.company_name,
          }))}
        />
      </Grid>
    </Grid>
  );
};

export default EditAdminInformationFormSuperadmin;
