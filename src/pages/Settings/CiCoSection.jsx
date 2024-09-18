import React from "react";
import { Grid, Box, Switch, FormControlLabel } from "@mui/material";
import {
  CustomInput,
  CustomTypography
} from "../../components/Elements";
import SectionAccordion from "../../components/Cards/SectionAccordion";

const CiCoSection = ({
  formData,
  editMode,
  handleInputChange,
  handleSwitchChange,
  handleEditClick,
  handleSaveClick,
}) => {
  return (
    <SectionAccordion
      title="CI/CO Section"
      subtitle="Set check in/check out tolerance time, auto check out time, and selfie mode"
      editMode={editMode}
      onEditClick={() => handleEditClick("ciCoSection")}
      onCancelClick={() => handleEditClick("ciCoSection")}
      onSaveClick={() => handleSaveClick("ciCoSection")}
    >
      <Grid item xs={12}>
        <CustomTypography
          fontWeight="fontWeightLight"
          fontSize="fontSizeSmall"
          sx={{
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          Check In Tolerance Duration (Before/After)
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.flexibleCiTolerance
              ? "Flexible"
              : `${formData.checkInTolerance} Minutes`}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <CustomInput
              fullWidth
              type="number"
              value={formData.checkInTolerance}
              onChange={(e) =>
                handleInputChange("checkInTolerance", e.target.value)
              }
              sx={{ width: "25%" }}
              disabled={formData.flexibleCiTolerance}
            />
            <CustomTypography>Minutes</CustomTypography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.flexibleCiTolerance}
                  onChange={() => handleSwitchChange("flexibleCiTolerance")}
                />
              }
              label="Flexible"
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
          Check Out Tolerance Duration (Before/After)
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.flexibleCoTolerance
              ? "Flexible"
              : `${formData.checkOutTolerance} Minutes`}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <CustomInput
              fullWidth
              type="number"
              value={formData.checkOutTolerance}
              onChange={(e) =>
                handleInputChange("checkOutTolerance", e.target.value)
              }
              sx={{ width: "25%" }}
              disabled={formData.flexibleCoTolerance}
            />
            <CustomTypography>Minutes</CustomTypography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.flexibleCoTolerance}
                  onChange={() => handleSwitchChange("flexibleCoTolerance")}
                />
              }
              label="Flexible"
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
          Auto Check Out Time
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.autoCheckOut}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <CustomInput
              fullWidth
              type="text"
              value={formData.autoCheckOut}
              onChange={(e) =>
                handleInputChange("autoCheckOut", e.target.value)
              }
              sx={{ width: "25%" }}
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
          Selfie Mode
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.selfieMode ? "On" : "Off"}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.selfieMode}
                  onChange={() => handleSwitchChange("selfieMode")}
                />
              }
            />
          </Box>
        )}
      </Grid>
    </SectionAccordion>
  );
};

export default CiCoSection;
