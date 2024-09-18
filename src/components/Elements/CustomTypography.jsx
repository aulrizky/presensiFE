// components/Elements/CustomTypography.jsx
import React from "react";
import { Typography } from "@mui/material";

const CustomTypography = ({
  variant,
  fontWeight,
  fontSize,
  color,
  children,
  ...rest
}) => {
  return (
    <Typography
      variant={variant}
      sx={{
        fontWeight: (theme) =>
          theme.typography[fontWeight] || theme.typography.fontWeightRegular,
        fontSize: (theme) => theme.typography.fontSize[fontSize] || fontSize,
        color: color || "inherit",
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default CustomTypography;
