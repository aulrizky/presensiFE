import React, { useState, useEffect } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateRangePicker = ({
  onDateChange,
  startDate: initialStartDate,
  endDate: initialEndDate,
}) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [cleared, setCleared] = useState(false);

  const handleStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
    onDateChange(newStartDate, endDate);
  };

  const handleEndDateChange = (newEndDate) => {
    setEndDate(newEndDate);
    onDateChange(startDate, newEndDate);
  };

  const handleClear = (setter) => {
    setter(null);
    setCleared(true);
  };

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        sx={{
          "& .MuiTextField-root": { width: "100%", margin: "30px 8px" },
        }}
      >
        <DesktopDatePicker
          label="Start date"
          value={startDate}
          onChange={handleStartDateChange}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              sx: { "& .MuiOutlinedInput-root": { borderRadius: "8px" } },
            },
            field: {
              clearable: true,
              onClear: () => handleClear(setStartDate),
            },
          }}
        />
        <Typography variant="h6" sx={{ marginX: 2 }}>
          -
        </Typography>
        <DesktopDatePicker
          label="End date"
          value={endDate}
          minDate={startDate}
          onChange={handleEndDateChange}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              sx: { "& .MuiOutlinedInput-root": { borderRadius: "8px" } },
            },
            field: {
              clearable: true,
              onClear: () => handleClear(setEndDate),
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
