import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const TypographyHead = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  fontFamily: "Inter, sans-serif",
  color: "#A2A1A8",
}));

const TypographyBody = styled(Typography)(({ underline }) => ({
  fontWeight: 300,
  fontFamily: "Inter, sans-serif",
  ...(underline === "true" && {
    borderBottom: `1px solid #A2A1A8`,
    paddingBottom: "4px",
  }),
}));

const InfoDisplay = ({ label, value, underline = false }) => {
  return (
    <Grid item xs={12} sm={6}>
      <TypographyHead variant="body2">{label}</TypographyHead>
      <Box sx={{ width: '100%' }}>
        <TypographyBody variant="body1" underline={underline.toString()}>
          {value || "N/A"}
        </TypographyBody>
      </Box>
    </Grid>
  );
};

export default InfoDisplay;
