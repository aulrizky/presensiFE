import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

export default function StatCard({
  icon,
  title,
  value,
  hasDropdown,
  timePeriod,
  onTimePeriodChange,
  dropdownOptions,
  hasDate,
  date,
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box
            sx={{
              mr: 1,
              width: "36px",
              height: "36px",
              backgroundColor: "rgba(113, 82, 243, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <img
              src={icon}
              alt={`${title} icon`}
              style={{ width: "24px", height: "24px" }}
            />
          </Box>
          <Typography variant="body1" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">{value}</Typography>
          {hasDropdown && (
            <FormControl size="small">
              <Select
                value={timePeriod}
                onChange={(e) => onTimePeriodChange(e.target.value)}
                sx={{ minWidth: 80 }}
              >
                {dropdownOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Box sx={{ mt: 2 }}>
          {hasDate && (
            <Typography variant="body2" color="text.secondary">
              Updated: {date}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
