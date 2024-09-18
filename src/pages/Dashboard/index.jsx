import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/Cards/StatCard";
import { TableComponent, CustomLoader } from "../../components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopEmployees,
  fetchDashboardSummary,
  fetchAttendanceOverview,
} from "../../redux/slices/dashboardSlice";
import TotalEmployeeIcon from "/assets/icons/total-employee.svg";
import TodayAttendanceIcon from "/assets/icons/today-attendance.svg";
import TotalLeaveIcon from "/assets/icons/total-leave.svg";
import TotalOnTimeIcon from "/assets/icons/total-ontime.svg";
import TotalLateIcon from "/assets/icons/total-late.svg";
import TotalAbsenceIcon from "/assets/icons/total-absence.svg";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    topEmployees,
    loading,
    summary,
    attendanceOverview,
    loadingAttendance,
  } = useSelector((state) => state.dashboard);

  // Separate state for each card dropdown
  const [leaveTimePeriod, setLeaveTimePeriod] = useState("today");
  const [onTimePeriod, setOnTimePeriod] = useState("today");
  const [lateTimePeriod, setLateTimePeriod] = useState("today");
  const [absenceTimePeriod, setAbsenceTimePeriod] = useState("today");

  // State for the Attendance Overview chart dropdown
  const [attendanceTimePeriod, setAttendanceTimePeriod] = useState("this_week");

  // State for the Department Attendance Overview chart dropdown
  const [departmentTimePeriod, setDepartmentTimePeriod] = useState("today");

  const attendanceOverviewData = attendanceOverview
    ? attendanceOverview[attendanceTimePeriod]?.attendance_overview || []
    : [];
  const departmentAttendanceData = attendanceOverview
    ? attendanceOverview[departmentTimePeriod]
        ?.department_attendance_overview || []
    : [];

  const calculatePercentages = (data) => {
    if (!Array.isArray(data)) return [];

    return data.map((item) => {
      const total = item.on_time + item.late + item.leave + item.absent;

      if (total === 0) {
        return {
          ...item,
          on_time: 0,
          late: 0,
          leave: 0,
          absent: 0,
        };
      }

      const formatPercentage = (value) => {
        const percentage = (value / total) * 100;
        return percentage % 1 === 0 ? percentage : percentage.toFixed(2);
      };

      return {
        ...item,
        on_time: formatPercentage(item.on_time),
        late: formatPercentage(item.late),
        leave: formatPercentage(item.leave),
        absent: formatPercentage(item.absent),
      };
    });
  };

  const valueFormatter = (value) => `${value}%`;

  const attendanceOverviewPercentages = attendanceOverviewData.length
    ? calculatePercentages(attendanceOverviewData)
    : [];
  const departmentAttendancePercentages = departmentAttendanceData.length
    ? calculatePercentages(departmentAttendanceData)
    : [];

  useEffect(() => {
    dispatch(fetchDashboardSummary());
    dispatch(fetchAttendanceOverview());
    dispatch(fetchTopEmployees());
  }, [dispatch]);

  const cardData = [
    {
      title: "Total Employee",
      value: summary?.total_employee || 0,
      icon: TotalEmployeeIcon,
    },
    {
      title: "Today Attendance",
      value: summary?.today_attendance || 0,
      icon: TodayAttendanceIcon,
    },
    {
      title: "Total Leave",
      icon: TotalLeaveIcon,
      hasDropdown: true,
      values: {
        today: summary?.total_leave?.today || 0,
        this_week: summary?.total_leave?.this_week || 0,
        this_month: summary?.total_leave?.this_month || 0,
      },
    },
    {
      title: "Total On Time",
      icon: TotalOnTimeIcon,
      hasDropdown: true,
      values: {
        today: summary?.total_on_time?.today || 0,
        this_week: summary?.total_on_time?.this_week || 0,
        this_month: summary?.total_on_time?.this_month || 0,
      },
    },
    {
      title: "Total Late",
      icon: TotalLateIcon,
      hasDropdown: true,
      values: {
        today: summary?.total_late?.today || 0,
        this_week: summary?.total_late?.this_week || 0,
        this_month: summary?.total_late?.this_month || 0,
      },
    },
    {
      title: "Total Absence",
      icon: TotalAbsenceIcon,
      hasDropdown: true,
      values: {
        today: summary?.total_absence?.today || 0,
        this_week: summary?.total_absence?.this_week || 0,
        this_month: summary?.total_absence?.this_month || 0,
      },
    },
  ];

  const employeeColumns = [
    {
      field: "departmentName",
      headerName: "Department",
      flex: 1.5,
      renderCell: (params) => params.row.department.departmentName,
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src={params.row.profilePicture}
            alt={params.row.employeeName}
          />
          {params.row.employeeName}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            backgroundColor:
              params.value === "On Time"
                ? "rgba(63, 194, 138, 0.1)"
                : "rgba(244, 91, 105, 0.1)",
            color: params.value === "On Time" ? "#3FC28A" : "#F45B69",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      field: "checkIn",
      headerName: "Check In Time",
      flex: 1,
      renderCell: (params) => {
        const checkInTime = new Date(params.value);
        const hours = checkInTime.getHours().toString().padStart(2, "0");
        const minutes = checkInTime.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      },
    },
    {
      field: "totalWorkingHours",
      headerName: "Work Hours",
      flex: 1,
      renderCell: (params) => (params.value === "N/A" ? "-" : params.value),
    },
  ];

  if (loading || loadingAttendance) {
    return <CustomLoader loading={loading || loadingAttendance} />;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {cardData.map((card, index) => {
          const timePeriodState = {
            "Total Leave": leaveTimePeriod,
            "Total On Time": onTimePeriod,
            "Total Late": lateTimePeriod,
            "Total Absence": absenceTimePeriod,
          }[card.title];

          const setTimePeriodState = {
            "Total Leave": setLeaveTimePeriod,
            "Total On Time": setOnTimePeriod,
            "Total Late": setLateTimePeriod,
            "Total Absence": setAbsenceTimePeriod,
          }[card.title];

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StatCard
                icon={card.icon}
                title={card.title}
                value={
                  card.hasDropdown ? card.values[timePeriodState] : card.value
                }
                hasDropdown={card.hasDropdown}
                timePeriod={timePeriodState}
                onTimePeriodChange={setTimePeriodState}
                dropdownOptions={[
                  { value: "today", label: "Today" },
                  { value: "this_week", label: "This Week" },
                  { value: "this_month", label: "This Month" },
                ]}
              />
            </Grid>
          );
        })}
      </Grid>

      {/* Separate Card for Attendance Overview */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5">Attendance Overview</Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={attendanceTimePeriod}
                onChange={(e) => setAttendanceTimePeriod(e.target.value)}
              >
                <MenuItem value="this_week">This Week</MenuItem>
                <MenuItem value="this_month">This Month</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <BarChart
            series={[
              {
                data: attendanceOverviewPercentages.map((item) => item.on_time),
                label: "On Time",
                valueFormatter,
              },
              {
                data: attendanceOverviewPercentages.map((item) => item.late),
                label: "Late",
                valueFormatter,
              },
              {
                data: attendanceOverviewPercentages.map((item) => item.leave),
                label: "Leave",
                valueFormatter,
              },
              {
                data: attendanceOverviewPercentages.map((item) => item.absent),
                label: "Absent",
                valueFormatter,
              },
            ]}
            xAxis={[
              {
                data: attendanceOverviewPercentages.map(
                  (item) => item.time_period
                ),
                scaleType: "band",
              },
            ]}
            yAxis={[{ scaleType: "linear", label: "Attendance (%)" }]}
            height={300}
            margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
            barPadding={0.3}
            barWidth={30}
          />
        </CardContent>
      </Card>

      {/* Separate Card for Department Attendance Overview */}
      <Card variant="outlined">
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5">Department Attendance Overview</Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={departmentTimePeriod}
                onChange={(e) => setDepartmentTimePeriod(e.target.value)}
              >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="this_week">This Week</MenuItem>
                <MenuItem value="this_month">This Month</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <BarChart
            series={[
              {
                data: departmentAttendancePercentages.map(
                  (item) => item.on_time
                ),
                label: "On Time",
                valueFormatter,
              },
              {
                data: departmentAttendancePercentages.map((item) => item.late),
                label: "Late",
                valueFormatter,
              },
              {
                data: departmentAttendancePercentages.map((item) => item.leave),
                label: "Leave",
                valueFormatter,
              },
              {
                data: departmentAttendancePercentages.map(
                  (item) => item.absent
                ),
                label: "Absent",
                valueFormatter,
              },
            ]}
            xAxis={[
              {
                data: departmentAttendancePercentages.map(
                  (item) => item.department_name
                ),
                scaleType: "band",
              },
            ]}
            yAxis={[
              {
                scaleType: "linear",
                label: "Attendance (%)",
                min: 0, // Set a minimum Y-axis value
                max: 100, // Set a maximum Y-axis value
              },
            ]}
            height={300}
            margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
            barPadding={0.3}
            barWidth={30}
          />
        </CardContent>
      </Card>

      {/* Card for Attendance Overview (Top 7 Employees) */}
      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5">Attendance Overview</Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate("/employees")}
            >
              View All
            </Button>
          </Box>

          {loading ? (
            <CustomLoader loading={loading} />
          ) : (
            <TableComponent
              columns={employeeColumns}
              rows={topEmployees}
              searchValue={""}
              getRowId={(row) => row.idEmployee}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
