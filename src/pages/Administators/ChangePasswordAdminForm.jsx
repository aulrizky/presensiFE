import React from "react";
import { Box } from "@mui/material";
import { CustomInput } from "../../components/Elements";

const ChangePasswordAdminForm = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  return (
    <Box component="form">
      <Box sx={{ display: "flex", gap: 2 }}>
        <CustomInput
          label="New Password"
          type="password"
          name="new_password"
          value={values.new_password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.new_password && Boolean(errors.new_password)}
          helperText={touched.new_password && errors.new_password}
          fullWidth
        />
        <CustomInput
          label="Retype New Password"
          type="password"
          name="retype_new_password"
          value={values.retype_new_password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.retype_new_password && Boolean(errors.retype_new_password)
          }
          helperText={touched.retype_new_password && errors.retype_new_password}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default ChangePasswordAdminForm;
