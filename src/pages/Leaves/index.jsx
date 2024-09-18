import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Card,
  Avatar,
  Divider,
  IconButton,
  Chip,
  Tooltip,
  Grid,
  Typography,
} from "@mui/material";
import {
  CustomButton,
  TableComponent,
  SearchBar,
  CustomModal,
  CustomLoader,
  DateRangePicker,
} from "../../components/Elements";
import ExportIcon from "/assets/icons/export.svg";
import ViewIcon from "/assets/icons/view.svg";
import TickIcon from "/assets/icons/tick.svg";
import RemoveIcon from "/assets/icons/remove.svg";
import DateIcon from "/assets/icons/calendar.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllLeaves,
  fetchLeaveDetail,
  updateLeaveStatus,
} from "../../redux/slices/leaveSlice";
import { exportLeave } from "../../services/apis/leaveService";
import Swal from "sweetalert2";

const LeavesList = () => {
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [searchValue, setSearchValue] = useState("");
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [modalDateOpen, setModalDateOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const fetchLeaves = useCallback(() => {
    dispatch(
      fetchAllLeaves({
        page: paginationModel.page,
        size: paginationModel.pageSize,
        keyword: searchValue,
      })
    );
    console.log("Leaves", leaves);
  }, [dispatch, paginationModel, searchValue]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleDateChange = (startDate, endDate) => {
    setDates({ startDate, endDate });
    console.log(
      "Start Date:",
      startDate ? startDate.format("YYYY-MM-DD") : "Not set"
    );
    console.log(
      "End Date:",
      endDate ? endDate.format("YYYY-MM-DD") : "Not set"
    );
  };

  const handleDateApply = () => {
    if (dates.startDate == null && dates.endDate == null) {
      fetchLeaves();
    } else if (dates.startDate == null || dates.endDate == null) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Date Filter",
        text: "Both Start Date and End Date must be selected!",
        confirmButtonText: "OK",
      });
    } else {
      dispatch(
        fetchAllLeaves({
          page: paginationModel.page,
          size: paginationModel.pageSize,
          keyword: searchValue,
          startDate: dates.startDate
            ? dates.startDate.format("YYYY-MM-DD")
            : null,
          endDate: dates.endDate ? dates.endDate.format("YYYY-MM-DD") : null,
        })
      );
    }
    setModalDateOpen(false);
  };

  const leaves = useSelector((state) => state.leaves.data) || [];
  const dataDetail = useSelector((state) => state.leaves.dataDetail) || [];
  const loading = useSelector((state) => state.leaves.loading);
  const totalData = useSelector((state) => state.leaves.totalData);

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const handleOpenModalView = (idLeave) => {
    console.log("id leave", idLeave);
    setModalViewOpen(true);
    dispatch(fetchLeaveDetail(idLeave)).then((response) => {
      console.log("Leave Detail setelah fetch:", response.payload);
    });
  };

  const handleOpenModalDate = () => {
    console.log("berhasil click");
    setModalDateOpen(true);
  };

  const handleCloseModalView = () => setModalViewOpen(false);
  const handleDateClose = () => setModalDateOpen(false);

  const handleReject = (idLeave) => {
    console.log(idLeave);
    dispatch(
      updateLeaveStatus({
        idLeave: idLeave,
        status: "Rejected",
      })
    )
      .then(() => {
        Swal.fire("Success", "Leaves rejected successfully", "success");
        fetchLeaves();
      })
      .catch((error) => {
        Swal.fire("Error", error.message || "Failed to Reject Leaves", "error");
      });
  };

  const handleApproved = (idLeave) => {
    console.log(idLeave);
    dispatch(
      updateLeaveStatus({
        idLeave: idLeave,
        status: "Approved",
      })
    )
      .then(() => {
        Swal.fire("Success", "Leaves approved successfully", "success");
        fetchLeaves();
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          error.message || "Failed to Approved Leaves",
          "error"
        );
      });
  };

  const handleExportClick = async () => {
    try {
      await exportLeave();
    } catch (error) {
      console.error("Error exporting leave:", error);
    }
  };

  const columns = [
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      editTable: true,
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      flex: 2,
      editTable: true,
      renderCell: (params) => (
        <Box sx={classes.employeeName}>
          <Avatar
            src={params.row.profilePicture}
            alt={params.row.employeeName}
          />
          {params.row.employeeName}
        </Box>
      ),
    },
    {
      field: "leaveType",
      headerName: "Leave Type",
      flex: 1,
      editTable: true,
    },
    {
      field: "leaveDuration",
      headerName: "Leave Duration",
      flex: 1.7,
      editTable: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editTable: true,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={
            params.value === "Approved"
              ? classes.chipApproved
              : params.value === "Pending"
              ? classes.chipPending
              : classes.chipRejected
          }
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={classes.actionCell}>
          <IconButton
            sx={classes.iconButton}
            onClick={() => handleOpenModalView(params.row.id_leave)}
          >
            <Tooltip title="View Details">
              <img src={ViewIcon} alt="View Icon" style={classes.iconStyle} />
            </Tooltip>
          </IconButton>
          <IconButton
            sx={{
              ...classes.iconButton,
              ...(params.row.status === "Approved" ||
              params.row.status === "Rejected"
                ? classes.iconButtonDisabled
                : {}),
            }}
            onClick={() => {
              handleApproved(params.row.id_leave);
            }}
            disabled={
              params.row.status === "Approved" ||
              params.row.status === "Rejected"
            }
          >
            <Tooltip title="Approved Leave">
              <img
                src={TickIcon}
                alt="Approved Icon"
                style={{
                  ...classes.iconStyle,
                  ...(params.row.status === "Approved" ||
                  params.row.status === "Rejected"
                    ? classes.iconSvgDisabled
                    : {}),
                }}
              />
            </Tooltip>
          </IconButton>
          <IconButton
            sx={{
              ...classes.iconButton,
              ...(params.row.status === "Approved" ||
              params.row.status === "Rejected"
                ? classes.iconButtonDisabled
                : {}),
            }}
            onClick={() => {
              handleReject(params.row.id_leave);
            }}
            disabled={
              params.row.status === "Approved" ||
              params.row.status === "Rejected"
            }
          >
            <Tooltip title="Reject Leave">
              <img
                src={RemoveIcon}
                alt="Reject Icon"
                style={{
                  ...classes.iconStyle,
                  ...(params.row.status === "Approved" ||
                  params.row.status === "Rejected"
                    ? classes.iconSvgDisabled
                    : {}),
                }}
              />
            </Tooltip>
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Card variant="outlined" sx={classes.card}>
      <Box sx={classes.header}>
        <SearchBar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />
        <Box sx={classes.buttonGroup}>
          <CustomButton
            colorScheme="bgWhite"
            icon={DateIcon}
            onClick={handleOpenModalDate}
          >
            Date Filter
          </CustomButton>
          <CustomModal open={modalDateOpen} onClose={handleDateClose}>
            <CustomModal.Header onClose={handleDateClose}>
              Date Filter
            </CustomModal.Header>
            <Divider />
            <DateRangePicker
              onDateChange={handleDateChange}
              startDate={dates.startDate}
              endDate={dates.endDate}
            />
            <CustomModal.Footer
              onClose={handleDateClose}
              onSubmit={handleDateApply}
            >
              Apply
            </CustomModal.Footer>
          </CustomModal>
          <CustomButton
            colorScheme="bgOrange"
            icon={ExportIcon}
            onClick={handleExportClick}
          >
            Export
          </CustomButton>
        </Box>
      </Box>
      <Box sx={classes.tableContainer}>
        {loading ? (
          <CustomLoader loading={loading} />
        ) : (
          <TableComponent
            columns={columns}
            rows={leaves}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            rowCount={totalData}
            loading={loading}
            getRowId={(row) => row.id_leave}
          />
        )}
        <CustomModal open={modalViewOpen} onClose={handleCloseModalView}>
          <CustomModal.Header onClose={handleCloseModalView}>
            Leave Details
          </CustomModal.Header>
          <Divider />
          <InformationDisplay data={dataDetail} classes={classes} />
          <Box sx={classes.modalFooter}>
            <CustomButton
              variant="outlined"
              onClick={handleCloseModalView}
              colorScheme="bgWhite"
            >
              Close
            </CustomButton>
          </Box>
        </CustomModal>
      </Box>
    </Card>
  );
};

const InformationDisplay = ({ data, classes }) => (
  <Grid container spacing={2} py={2}>
    {data.map((item, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <Typography sx={classes.label}>{item.label}</Typography>
        <Typography sx={classes.value}>{item.value}</Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
    ))}
  </Grid>
);

const useStyles = () => ({
  label: {
    fontWeight: "fontWeightLight",
    fontSize: "fontSizeMediumSmall",
    color: "secondary.main",
    mb: 1,
  },
  value: {
    fontWeight: "fontWeightLight",
    fontSize: "fontSizeSmall",
    mb: 1,
  },
  card: {
    p: 2,
    m: 2,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: 2,
    "@media (min-width: 600px)": {
      flexDirection: "row",
    },
  },
  buttonGroup: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  tableContainer: {
    mt: 4,
  },
  employeeName: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  actionCell: {
    gap: 1,
  },
  chipApproved: {
    backgroundColor: "rgba(63, 194, 138, 0.1)",
    color: "#3FC28A",
    borderRadius: "4px",
  },
  chipPending: {
    backgroundColor: "rgba(239, 190, 18, 0.1)",
    color: "#EFBE12",
    borderRadius: "4px",
  },
  chipRejected: {
    backgroundColor: "rgba(244, 91, 105, 0.1)",
    color: "#F45B69",
    borderRadius: "4px",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "right",
    mt: 2,
    gap: 2,
  },
  iconButton: {
    padding: 1,
  },
  iconButtonDisabled: {
    pointerEvents: "none", // Nonaktifkan event pointer
  },
  iconSvgDisabled: {
    color: "blue",
    filter: "grayscale(100%)", // Mengubah ikon menjadi abu-abu
    opacity: 0.5, // Mengurangi opacity agar ikon terlihat disabled
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default LeavesList;
