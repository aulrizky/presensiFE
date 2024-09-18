import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataChartSuperadmin } from "../../redux/slices/dashboardSlice";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

// Register the necessary components for ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CompanyOverview = () => {
  const dispatch = useDispatch();
  const { dataChart, loading, error } = useSelector((state) => state.dashboard);

  const [dateRange, setDateRange] = useState("today");

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  useEffect(() => {
    let startDate = dayjs().format("YYYY-MM-DD");
    let endDate = dayjs().format("YYYY-MM-DD");

    if (dateRange === "this_week") {
      startDate = dayjs().subtract(7, "day").format("YYYY-MM-DD");
    } else if (dateRange === "this_month") {
      startDate = dayjs().subtract(30, "day").format("YYYY-MM-DD");
    }

    dispatch(fetchDataChartSuperadmin({ startDate, endDate }));
  }, [dispatch, dateRange]);

  // Prepare chart data
  const chartData = {
    labels: Array.isArray(dataChart)
      ? dataChart.map((item) => item.company_name)
      : [],
    datasets: [
      {
        label: "Percentage",
        data: Array.isArray(dataChart)
          ? dataChart.map((item) => item.percentage)
          : [],
        backgroundColor: [
          "#FFC107",
          "#2196F3",
          "#F44336",
          "#4CAF50",
          "#8BC34A",
        ],
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
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
          <Typography variant="h5">Company Overview</Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={dateRange}
              onChange={handleDateRangeChange}
              label="Date Range"
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="this_week">This Week</MenuItem>
              <MenuItem value="this_month">This Month</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Bar
          data={chartData}
          options={options}
          height={100}
          style={{ marginTop: "20px" }}
        />
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
