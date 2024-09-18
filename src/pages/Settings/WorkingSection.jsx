import React from "react";
import { Grid, Switch, FormControlLabel } from "@mui/material";
import { CustomInput, CustomTypography } from "../../components/Elements";
import SectionAccordion from "../../components/Cards/SectionAccordion";

const WorkingSection = ({
  formData,
  editMode,
  handleInputChange,
  handleSwitchChange,
  handleEditClick,
  handleSaveClick,
}) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  return (
    <SectionAccordion
      title="Working Section"
      subtitle="Set working days, working hours, and default holiday"
      editMode={editMode}
      onEditClick={() => handleEditClick("workingSection")}
      onCancelClick={() => handleEditClick("workingSection")}
      onSaveClick={() => handleSaveClick("workingSection")}
    >
      {/* Working Days */}
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
            sx={{
              color: (theme) => theme.palette.secondary.main,
              marginBottom: 0,
            }}
          >
            Working Days
          </CustomTypography>
        </Grid>

        {!editMode ? (
          <Grid item xs={12}>
            <CustomTypography>
              {formData.flexibleWorkingDays
                ? "Flexible"
                : `${formData.workingDayStart} - ${formData.workingDayEnd}`}
            </CustomTypography>
          </Grid>
        ) : (
          <>
            <Grid item xs={5}>
              <CustomInput
                type="select"
                options={daysOfWeek.map((day) => ({
                  value: day,
                  label: day,
                }))}
                value={formData.workingDayStart}
                onChange={(e) =>
                  handleInputChange("workingDayStart", e.target.value)
                }
                fullWidth
                disabled={formData.flexibleWorkingDays}
              />
            </Grid>

            <Grid item xs={1}>
              <CustomTypography align="center">-</CustomTypography>
            </Grid>

            <Grid item xs={5}>
              <CustomInput
                type="select"
                options={daysOfWeek.map((day) => ({
                  value: day,
                  label: day,
                }))}
                value={formData.workingDayEnd}
                onChange={(e) =>
                  handleInputChange("workingDayEnd", e.target.value)
                }
                fullWidth
                disabled={formData.flexibleWorkingDays}
              />
            </Grid>
          </>
        )}

        {/* Kondisi ini memastikan Switch hanya muncul saat editMode */}
        {editMode && (
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.flexibleWorkingDays}
                  onChange={() => handleSwitchChange("flexibleWorkingDays")}
                />
              }
              label="Flexible"
              sx={{ marginTop: 0, marginBottom: 0 }}
            />
          </Grid>
        )}
      </Grid>

      {/* Working Hours */}
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
            sx={{
              color: (theme) => theme.palette.secondary.main,
              marginBottom: 0,
            }}
          >
            Working Hours
          </CustomTypography>
        </Grid>

        {!editMode ? (
          <Grid item xs={12}>
            <CustomTypography>
              {formData.flexibleWorkingHours
                ? "Flexible"
                : `${formData.workingHourStart} - ${formData.workingHourEnd}`}
            </CustomTypography>
          </Grid>
        ) : (
          <>
            <Grid item xs={5}>
              <CustomInput
                type="select"
                options={hours.map((hour) => ({
                  value: hour,
                  label: hour,
                }))}
                value={formData.workingHourStart}
                onChange={(e) =>
                  handleInputChange("workingHourStart", e.target.value)
                }
                fullWidth
                disabled={formData.flexibleWorkingHours}
                sx={{ minWidth: "80px" }}
              />
            </Grid>

            <Grid item xs={1}>
              <CustomTypography align="center">-</CustomTypography>
            </Grid>

            <Grid item xs={5}>
              <CustomInput
                type="select"
                options={hours.map((hour) => ({
                  value: hour,
                  label: hour,
                }))}
                value={formData.workingHourEnd}
                onChange={(e) =>
                  handleInputChange("workingHourEnd", e.target.value)
                }
                fullWidth
                disabled={formData.flexibleWorkingHours}
                sx={{ minWidth: "80px" }}
              />
            </Grid>
          </>
        )}

        {/* Kondisi ini memastikan Switch hanya muncul saat editMode */}
        {editMode && (
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.flexibleWorkingHours}
                  onChange={() => handleSwitchChange("flexibleWorkingHours")}
                />
              }
              label="Flexible"
              sx={{ marginTop: 0, marginBottom: 0 }}
            />
          </Grid>
        )}
      </Grid>

      {/* Working Duration */}
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
            sx={{
              color: (theme) => theme.palette.secondary.main,
              marginBottom: 0,
            }}
          >
            Working Duration
          </CustomTypography>
        </Grid>

        {!editMode ? (
          <Grid item xs={12}>
            <CustomTypography>
              {formData.flexibleWorkingDuration
                ? "Flexible"
                : `${formData.workingDuration} Hour(s)`}
            </CustomTypography>
          </Grid>
        ) : (
          <>
            <Grid item xs={5}>
              <CustomInput
                type="number"
                value={formData.workingDuration}
                onChange={(e) =>
                  handleInputChange("workingDuration", e.target.value)
                }
                fullWidth
                disabled={formData.flexibleWorkingDuration}
              />
            </Grid>

            {/* Kondisi ini memastikan Switch hanya muncul saat editMode */}
            {editMode && (
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  spacing: 2,
                }}
              >
                <CustomTypography>Hour(s)</CustomTypography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.flexibleWorkingDuration}
                      onChange={() =>
                        handleSwitchChange("flexibleWorkingDuration")
                      }
                    />
                  }
                  label="Flexible"
                  sx={{ marginTop: 0, marginBottom: 0, marginLeft: 2 }}
                />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </SectionAccordion>
  );
};

export default WorkingSection;
