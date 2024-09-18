import React from "react";
import { Grid, Box, Switch, FormControlLabel } from "@mui/material";
import {
  CustomInput,
  CustomTypography
} from "../../components/Elements";
import SectionAccordion from "../../components/Cards/SectionAccordion";

const GeolocationSection = ({
  formData,
  editMode,
  handleInputChange,
  handleSwitchChange,
  handleEditClick,
  handleSaveClick,
}) => {
  return (
    <SectionAccordion
      title="Geolocation Section"
      subtitle="Set geolocation mode and distance radius"
      editMode={editMode}
      onEditClick={() => handleEditClick("geolocationSection")}
      onCancelClick={() => handleEditClick("geolocationSection")}
      onSaveClick={() => handleSaveClick("geolocationSection")}
    >
      <Grid item xs={12}>
        <CustomTypography
          fontWeight="fontWeightLight"
          fontSize="fontSizeSmall"
          sx={{
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          Geolocation Mode
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.flexibleGeolocationMode
              ? "Flexible"
              : formData.geolocationMode
              ? "On"
              : "Off"}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.geolocationMode}
                  onChange={() => handleSwitchChange("geolocationMode")}
                />
              }
            />
          </Box>
        )}
      </Grid>

      <Grid item xs={12}>
        <CustomTypography
          fontWeight="fontWeightLight"
          fontSize="fontSizeSmall"
          sx={{
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          Distance Radius
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.distanceRadius} Meter(s)
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <CustomInput
              fullWidth
              type="number"
              value={formData.distanceRadius}
              onChange={(e) =>
                handleInputChange("distanceRadius", e.target.value)
              }
              sx={{ width: "25%" }}
              disabled={!formData.geolocationMode} // Disable if geolocationMode is off
            />
            <CustomTypography>Meter(s)</CustomTypography>
          </Box>
        )}
      </Grid>
    </SectionAccordion>
  );
};

export default GeolocationSection;
