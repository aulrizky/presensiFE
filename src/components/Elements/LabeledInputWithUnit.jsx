import React from "react";
import { Box } from "@mui/material";
import { CustomInput, CustomTypography } from ".";

const LabeledInputWithUnit = ({
  label,
  type,
  value,
  onChange,
  unit,
  hideLabel,
  inputProps,
}) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <CustomInput
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        hideLabel={hideLabel}
        sx={{ width: "80px" }}
        {...inputProps}
      />
      <CustomTypography>{unit}</CustomTypography>
    </Box>
  );
};

export default LabeledInputWithUnit;
