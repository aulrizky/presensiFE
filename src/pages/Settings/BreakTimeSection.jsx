import React from "react";
import { Grid, Box, Switch, FormControlLabel } from "@mui/material";
import {
  CustomInput,
  CustomTypography,
} from "../../components/Elements";
import SectionAccordion from "../../components/Cards/SectionAccordion";

const BreakTimeSection = ({
  formData,
  editMode,
  handleInputChange,
  handleSwitchChange,
  handleEditClick,
  handleSaveClick,
}) => {
  return (
    <SectionAccordion
      title="Break Time Section"
      subtitle="Set break time duration and tolerance"
      editMode={editMode}
      onEditClick={() => handleEditClick("breakTimeSection")}
      onCancelClick={() => handleEditClick("breakTimeSection")}
      onSaveClick={() => handleSaveClick("breakTimeSection")}
    >
      <Grid item xs={12}>
        <CustomTypography
          fontWeight="fontWeightLight"
          fontSize="fontSizeSmall"
          sx={{
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          Break Time Duration
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.flexibleBreakTime
              ? "Flexible"
              : `${formData.breakTimeDuration} Minutes`}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <CustomInput
              fullWidth
              type="number"
              value={formData.breakTimeDuration}
              onChange={(e) =>
                handleInputChange("breakTimeDuration", e.target.value)
              }
              sx={{ width: "25%" }}
              disabled={formData.flexibleBreakTime}
            />
            <CustomTypography>Minutes</CustomTypography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.flexibleBreakTime}
                  onChange={() => handleSwitchChange("flexibleBreakTime")}
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
          Break Time Tolerance
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.flexibleBreakTimeTolerance
              ? "Flexible"
              : `${formData.breakTimeTolerance} Minutes`}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <CustomInput
              fullWidth
              type="number"
              value={formData.breakTimeTolerance}
              onChange={(e) =>
                handleInputChange("breakTimeTolerance", e.target.value)
              }
              sx={{ width: "25%" }}
              disabled={formData.flexibleBreakTimeTolerance}
            />
            <CustomTypography>Minutes</CustomTypography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.flexibleBreakTimeTolerance}
                  onChange={() =>
                    handleSwitchChange("flexibleBreakTimeTolerance")
                  }
                />
              }
              label="Flexible"
            />
          </Box>
        )}
      </Grid>
    </SectionAccordion>
  );
};

export default BreakTimeSection;
