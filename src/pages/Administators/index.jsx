import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddAdminForm from "./AddAdminForm";
import DateRangePicker from "../../components/Elements/DateRangePicker";
import EditIcon from "../../../public/assets/icons/edit.svg";
import TrashIcon from "../../../public/assets/icons/trash.svg";
import ViewIcon from "../../../public/assets/icons/view.svg";
import DateIcon from "../../../public/assets/icons/calendar.svg";
import AdminEditSuperAdmin from "../Administators/AdminEditSuperAdmin";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import {
  Card,
  IconButton,
  Avatar,
  CircularProgress,
  Box,
  Pagination,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  CustomButton,
  TableComponent,
  SearchBar,
  CustomTypography,
  CustomModal,
} from "../../components/Elements";
import {
  fetchAllAdmins,
  fetchAdminDetail,
  deleteAdministrator,
} from "../../redux/slices/adminSlice";
import AddCircleSvg from "/assets/icons/add-circle.svg";
import { fetchCompanies } from "../../redux/slices/companySlice";

const AdministratorsList = ({ userRole }) => {
  console.log("userRole index all administrators", userRole);
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    // Trigger the search action
    fetchTableData();
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const handlePaginationChange = (newModel) => {
    setPaginationModel(newModel);
  };
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  const [tableLoading, setTableLoading] = useState(false);
  const { data, loading, pagination } = useSelector((state) => state.admin);
  const [totalData, setTotalData] = useState(0);
  const companies = useSelector((state) => state.company.companies);
  // State management
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [sortBy, setSortBy] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [total, setTotal] = useState(0);
  const [transformData, setTransformData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const [page, setPage] = useState(paginationModel.page);
  const [pageSize, setPageSize] = useState(paginationModel.pageSize);

  const handleModalEditClose = () => {
    setOpenModalEdit(false);
    fetchTableData();
  };

  const handleCloseDate = () => setOpenDateFilter(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  //add new admin
  const [applyDate, setApplyDate] = useState({
    startDate: null,
    endDate: null,
  });
  //add new admin
  const [newAdminModal, setNewAdminModal] = useState(false);
  const handleOpenModalAdd = () => setNewAdminModal(true);
  const handleCloseModalAdd = () => setNewAdminModal(false);

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPage(1);
  };

  const fetchTableData = async () => {
    setTableLoading(true);
    setError(null);
    try {
      const responseData = await dispatch(
        fetchAllAdmins({
          sortBy,
          pageSize,
          page,
          startDateJoined: applyDate.startDate,
          endDateJoined: applyDate.endDate,
        })
      ).unwrap();
      console.log("responseData adminlist", responseData);
      setTransformData(
        responseData.data.map((admin) => ({
          id: admin.id_admin,
          company_name: admin.company.company_name,
          fullname: `${admin.first_name} ${admin.last_name}`,
          email: admin.email,
          profile_picture: admin.profile_picture,
          created_date: admin.created_day
            ? dayjs(admin.created_day).format("YYYY-MM-DD")
            : "N/A",
        }))
      );
      setTotalData(responseData.meta.total || 0);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [
    dispatch,
    sortBy,
    page,
    pageSize,
    applyDate.startDate,
    applyDate.endDate,
  ]);
  console.log("transformData", transformData);
  useEffect(() => {
    try {
      dispatch(fetchCompanies()).then((response) => {
        console.log("companies", response);
      });
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  }, []);
  const handleOpenModalEdit = (id) => {
    setOpenModalEdit(true);
    dispatch(fetchAdminDetail(id))
      .unwrap()
      .then((data) => {
        console.log("data admin", data);
        setSelectedData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch admin details:", error);
      });
  };
  console.log("companies", companies);
  const handleOpenDateFilter = () => {
    setOpenDateFilter(true);
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
      setApplyDate({
        startDate: dates.startDate
          ? dates.startDate.format("YYYY-MM-DD")
          : null,
        endDate: dates.endDate ? dates.endDate.format("YYYY-MM-DD") : null,
      });
    } else if (dates.startDate == null || dates.endDate == null) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Date Filter",
        text: "Both Start Date and End Date must be selected!",
        confirmButtonText: "OK",
      });
    } else {
      setApplyDate({
        startDate: dates.startDate
          ? dates.startDate.format("YYYY-MM-DD")
          : applyDate.startDate,
        endDate: dates.endDate
          ? dates.endDate.format("YYYY-MM-DD")
          : applyDate.endDate,
      });
    }
    setOpenDateFilter(false);
  };

  const handleDelete = async (id) => {
    const data = { is_delete: true };
    console.log("id handleDelete", id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // Replace deleteDataAdmin with the appropriate function to delete the admin
        await dispatch(deleteAdministrator({ id, data })).unwrap().then();
        Swal.fire({
          title: "Success",
          text: "Delete Administrator Success",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // Refresh data setelah berhasil menghapus
            window.location.reload();
          }
        });
        // Refresh data admin after successful deletion
        // dispatch(fetchAllAdmins(sortBy, pageSize, page, startDate, endDate));
      } catch (error) {
        console.error("Error deleting admin:", error);
        Swal.fire(
          "Error",
          "There was an error deleting the administrator.",
          "error"
        );
      }
    }
  };
  const AdministratorColumns = [
    { field: "company_name", headerName: "Company Name", flex: 1 },
    {
      field: "fullname",
      headerName: "Administrator Name",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}>
          <Avatar sx={{ mr: 2 }} src={params.row.profile_picture} />
          <CustomTypography>{params.value}</CustomTypography>
        </Box>
      ),
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "created_date", headerName: "Joining Date", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "stretch" }}>
          <IconButton
            aria-label="view"
            onClick={() => navigate(`/administrators/${params.row.id}`)}
          >
            <img
              src={ViewIcon}
              alt="Edit Icon"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => handleOpenModalEdit(params.row.id)}
          >
            <img
              src={EditIcon}
              alt="Edit Icon"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
          >
            <img
              src={TrashIcon}
              alt="Edit Icon"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>
        </Box>
      ),
    },
  ];

  // if (loading) {
  //   return <CustomTypography>Loading...</CustomTypography>;
  // }

  return (
    <Card variant="outlined" sx={{ p: 2, m: 2, mt: 4 }}>
      <Box
        direction="row"
        gap={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={classes.header}>
          <SearchBar
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            onSearchClick={handleSearchClick}
          />
        </Box>
        <Box sx={classes.actions}>
          <CustomButton
            colorScheme="bgWhite"
            icon={DateIcon}
            onClick={handleOpenDateFilter}
          >
            Date Filter
          </CustomButton>
          <CustomButton
            colorScheme="bgBlue"
            onClick={handleOpenModalAdd}
            icon={AddCircleSvg}
          >
            Add New Administrator
          </CustomButton>
        </Box>
      </Box>
      <Box sx={classes.tableContainer}>
        {tableLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px", // Adjust the height as necessary
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <CustomTypography sx={{ textAlign: "center" }}>
            No Rows
          </CustomTypography>
        ) : (
          <TableComponent
            columns={AdministratorColumns}
            rows={transformData}
            searchValue={searchValue}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationChange}
            totalData={totalData || 0}
            rowCount={totalData || 0}
            paginationMode="server"
            loading={tableLoading}
            paginationEnabled={false} // Prop untuk mengaktifkan/nonaktifkan pagination
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <TextField
          select
          value={pageSize}
          onChange={handleChangeRowsPerPage}
          sx={{ width: 100 }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </TextField>

        <Pagination
          count={Math.ceil(totalData / pageSize)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
      <AdminEditSuperAdmin
        open={openModalEdit}
        handleClose={handleModalEditClose}
        adminData={selectedData}
        companyData={companies}
        userRole={userRole}
      />
      <AddAdminForm open={newAdminModal} onClose={handleCloseModalAdd} />
      <CustomModal open={openDateFilter} onClose={handleCloseDate}>
        <CustomModal.Header onClose={handleCloseDate}>
          Date Filter
        </CustomModal.Header>
        <DateRangePicker
          onDateChange={handleDateChange}
          startDate={dates.startDate}
          endDate={dates.endDate}
        />
        <CustomModal.Footer
          onClose={handleCloseDate}
          onSubmit={handleDateApply}
        >
          Apply
        </CustomModal.Footer>
      </CustomModal>
    </Card>
  );
};

const useStyles = () => ({
  card: { p: 2, m: 2 },
  header: { display: "flex", justifyContent: "space-between" },
  actions: { display: "flex", alignItems: "center", gap: 2 },
  tableContainer: { mt: 2, width: "100%" },
  avatarCell: { display: "flex", alignItems: "center", gap: 1 },
  statusChip: {
    backgroundColor: "#e6f4ff",
    color: "#1890ff",
    borderRadius: "4px",
    padding: "0 8px",
  },
  actionButtons: {
    display: "flex",
    gap: 1,
    alignItems: "center",
    height: "100%",
  },
  iconButton: { p: 1 },
  iconImage: { width: "20px", height: "20px" },
});
export default AdministratorsList;
