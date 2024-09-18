import React, { useState, useEffect } from "react";
import { Box, Grid, Switch, FormControlLabel } from "@mui/material";
import Swal from "sweetalert2";
import {
  CustomLoader,
} from "../../components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompanyConfig,
  updateCompanyConfig,
} from "../../redux/slices/companySlice";
import WorkingSection from "./WorkingSection";
import CiCoSection from "./CiCoSection";
import BreakTimeSection from "./BreakTimeSection";
import GeolocationSection from "./GeolocationSection";

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

const Settings = () => {
  const dispatch = useDispatch();
  const { config, loading, updateSuccess, updateError } = useSelector(
    (state) => state.company
  );

  const [formData, setFormData] = useState(null);
  const [updating, setUpdating] = useState(false); // Tambahkan state updating
  const [editModes, setEditModes] = useState({
    workingSection: false,
    ciCoSection: false,
    breakTimeSection: false,
    geolocationSection: false,
  });

  useEffect(() => {
    dispatch(fetchCompanyConfig());
  }, [dispatch]);

  useEffect(() => {
    if (updating && updateSuccess) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Company configuration updated successfully!",
      });
      setUpdating(false); // Set updating menjadi false setelah sukses
    }
  }, [updating, updateSuccess]);

  useEffect(() => {
    if (updating && updateError) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update company configuration.",
      });
      setUpdating(false); // Set updating menjadi false setelah error
    }
  }, [updating, updateError]);

  useEffect(() => {
    if (config) {
      setFormData({
        workingDayStart: config.working_day_start || "",
        workingDayEnd: config.working_day_end || "",
        workingHourStart: config.working_hours_start?.slice(0, 5) || "",
        workingHourEnd: config.working_hours_end?.slice(0, 5) || "",
        workingDuration: (config.working_duration / 60).toString() || "0",
        flexibleWorkingDays: config.working_day_flexible || false,
        flexibleWorkingHours: config.working_hours_flexible || false,
        flexibleWorkingDuration: config.working_duration_flexible || false,
        checkInTolerance: config.check_in_tolerance?.toString() || "0",
        flexibleCiTolerance: config.check_in_tolerance_flexible || false,
        checkOutTolerance: config.check_out_tolerance?.toString() || "0",
        flexibleCoTolerance: config.check_out_tolerance_flexible || false,
        autoCheckOut: config.auto_check_out_time?.slice(0, 5) || "",
        selfieMode: config.selfie_mode || false,
        breakTimeDuration: config.break_time?.toString() || "0",
        flexibleBreakTime: config.break_time_flexible || false,
        breakTimeTolerance: config.after_break_tolerance?.toString() || "0",
        flexibleBreakTimeTolerance:
          config.after_break_tolerance_flexible || false,
        geolocationMode: config.geolocation || false,
        distanceRadius: config.geolocation_radius?.toString() || "",
        flexibleGeolocationMode: config.flexible_geolocation_mode || false,
      });
    }
  }, [config]);

  const handleEditClick = (section) => {
    setEditModes((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleSaveClick = (section) => {
    if (formData) {
      const requestData = {
        working_day_start: formData.workingDayStart,
        working_day_end: formData.workingDayEnd,
        working_hours_start: `${formData.workingHourStart}:00`,
        working_hours_end: `${formData.workingHourEnd}:00`,
        working_duration: parseInt(formData.workingDuration) * 60,
        working_day_flexible: formData.flexibleWorkingDays,
        working_hours_flexible: formData.flexibleWorkingHours,
        working_duration_flexible: formData.flexibleWorkingDuration,
        check_in_tolerance: parseInt(formData.checkInTolerance),
        check_in_tolerance_flexible: formData.flexibleCiTolerance,
        check_out_tolerance: parseInt(formData.checkOutTolerance),
        check_out_tolerance_flexible: formData.flexibleCoTolerance,
        auto_check_out_time: `${formData.autoCheckOut}:00`,
        selfie_mode: formData.selfieMode,
        break_time: parseInt(formData.breakTimeDuration),
        break_time_flexible: formData.flexibleBreakTime,
        after_break_tolerance: parseInt(formData.breakTimeTolerance),
        after_break_tolerance_flexible: formData.flexibleBreakTimeTolerance,
        geolocation: formData.geolocationMode,
        geolocation_radius: formData.distanceRadius
          ? parseInt(formData.distanceRadius)
          : null,
      };

      setUpdating(true); // Set updating menjadi true saat mulai proses update
      dispatch(updateCompanyConfig(requestData))
        .unwrap()
        .then(() => {
          dispatch(fetchCompanyConfig())
            .unwrap()
            .then(() => {
              setEditModes((prevState) => ({
                ...prevState,
                [section]: false,
              }));
            })
            .catch((error) => {
              console.error("Error fetching updated config:", error);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch updated configuration.",
              });
            });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update company configuration.",
          });
          console.error("Failed to update section:", error);
        });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSwitchChange = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  if (loading || !formData) {
    return <CustomLoader loading={loading} />;
  }

  return (
    <Box sx={{ padding: 2, margin: 2 }}>
      <WorkingSection
        formData={formData}
        editMode={editModes.workingSection}
        handleInputChange={handleInputChange}
        handleSwitchChange={handleSwitchChange}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
      />

      <CiCoSection
        formData={formData}
        editMode={editModes.ciCoSection}
        handleInputChange={handleInputChange}
        handleSwitchChange={handleSwitchChange}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
      />

      <BreakTimeSection
        formData={formData}
        editMode={editModes.breakTimeSection}
        handleInputChange={handleInputChange}
        handleSwitchChange={handleSwitchChange}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
      />

      <GeolocationSection
        formData={formData}
        editMode={editModes.geolocationSection}
        handleInputChange={handleInputChange}
        handleSwitchChange={handleSwitchChange}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
      />
    </Box>
  );
};

export default Settings;
