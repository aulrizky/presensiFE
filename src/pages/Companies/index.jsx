import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DateIcon from "../../../public/assets/icons/calendar.svg";
import {
  CustomButton,
  CustomModal,
  SearchBar,
  TableComponent,
} from "../../components/Elements";
import {
  deleteCompany,
  fetchDataCompanies,
} from "../../redux/slices/companySlice";
import theme from "../../styles/theme";
import { formatCreatedDate } from "../../utils/formatDate";
import AddCompanyForm from "./AddCompanyForm";
import EditCompanyForm from "./EditCompanyForm";
import AddCircleSvg from "/assets/icons/add-circle.svg";
import DateRangePicker from "../../components/Elements/DateRangePicker";

const CompaniesList = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.company);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [totalPage, setTotalPage] = useState(0);

  const [editCompanyModal, setEditCompanyModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [applyDate, setApplyDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePaginationChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const handleEditOpen = (id) => {
    setSelectedCompanyId(id);
    setEditCompanyModal(true);
  };
  const handleEditClose = () => setEditCompanyModal(false);

  const navigate = useNavigate();

  const handleViewClick = (id_company) => {
    navigate(`/company/${id_company}`);
  };

  const fetchCompanies = useCallback(() => {
    dispatch(
      fetchDataCompanies({
        page: paginationModel.page,
        size: paginationModel.pageSize,
      })
    );
  }, [dispatch, paginationModel]);

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

  const handleOpenDateFilter = () => {
    setOpenDateFilter(true);
  };

  // const handleDateApply = () => {
  //   setApplyDate({
  //     startDate: dates.startDate ? dates.startDate.format("YYYY-MM-DD") : null,
  //     endDate: dates.endDate ? dates.endDate.format("YYYY-MM-DD") : null,
  //   });
  //   dispatch(
  //     fetchDataCompanies({
  //       sortBy,
  //       pageSize,
  //       pageNumber: page,
  //       startDateJoined: dates.startDate
  //         ? dates.startDate.format("YYYY-MM-DD")
  //         : undefined,
  //       endDateJoined: dates.endDate
  //         ? dates.endDate.format("YYYY-MM-DD")
  //         : undefined,
  //     })
  //   );

  //   setOpenDateFilter(false);
  // };

  const handleDateApply = () => {
    if (dates.startDate == null && dates.endDate == null) {
      fetchCompanies();
    } else if (dates.startDate == null || dates.endDate == null) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Date Filter",
        text: "Both Start Date and End Date must be selected!",
        confirmButtonText: "OK",
      });
    } else {
      dispatch(
        fetchDataCompanies({
          sortBy,
          pageSize,
          pageNumber: page,
          startDateJoined: dates.startDate
            ? dates.startDate.format("YYYY-MM-DD")
            : null,
          endDateJoined: dates.endDate
            ? dates.endDate.format("YYYY-MM-DD")
            : null,
        })
      );
    }
    setOpenDateFilter(false);
  };

  const handleCloseDate = () => setOpenDateFilter(false);

  const handleDeleteCompany = async (id_company) => {
    console.log("id company : ", id_company);
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
        const data = { is_delete: true };
        await dispatch(deleteCompany({ id: id_company, data })); // Gunakan dispatch untuk memanggil deleteCompany

        Swal.fire({
          title: "Success",
          text: "Delete Company Success",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // Refresh data setelah berhasil menghapus
            window.location.reload();
          }
        });
      } catch (error) {
        if (error) {
          Swal.fire(
            "Error",
            "There was an error deleting the company.",
            "error"
          );
        }
        console.error("Error deleting company:", error);
      }
    }
  };

  const columns = [
    { field: "companyName", headerName: "Company Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "totalAdmin", headerName: "Total Admin", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "joiningDate", headerName: "Joining Date", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "stretch" }}>
          <IconButton
            aria-label="view"
            onClick={() => handleViewClick(params.row.id)}
          >
            <Visibility />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => handleEditOpen(params.row.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteCompany(params.row.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const params = {
      sortBy: sortBy,
      pageSize: pageSize,
      pageNumber: page,
      startDateJoined: applyDate.startDate || undefined,
      endDateJoined: applyDate.endDate || undefined,
    };
    dispatch(fetchDataCompanies(params));
  }, [
    dispatch,
    sortBy,
    pageSize,
    page,
    applyDate.startDate,
    applyDate.endDate,
  ]);

  useEffect(() => {
    if (data) {
      setTotalPage(data?.meta?.total);
    }
  }, [data]);

  const transformedData = Array.isArray(data?.data)
    ? data.data.map((company) => ({
        id: company.id_company || "N/A",
        companyName: String(company.company_name || "Unknown"),
        email: String(company.email || "No email"),
        totalAdmin: company.total_admin ?? 0,
        phone: String(company.phone || "No phone"),
        joiningDate: company.joining_date
          ? formatCreatedDate(company.joining_date)
          : "N/A",
      }))
    : [];

  const [newCompanyModal, setNewCompanyModal] = useState(false);

  const handleOpen = () => setNewCompanyModal(true);
  const handleClose = () => setNewCompanyModal(false);

  if (status) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={"10px"}
      padding={2.5}
    >
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          {/* Filter and Search */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SearchBar
              searchValue={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <CustomButton
              icon={DateIcon}
              colorScheme="bgWhite"
              onClick={handleOpenDateFilter}
            >
              Date Filter
            </CustomButton>

            <CustomButton
              colorScheme="bgBlue"
              icon={AddCircleSvg}
              onClick={handleOpen}
            >
              Add New Company
            </CustomButton>
          </Stack>
        </Box>
        {transformedData.length === 0 ? (
          <Typography sx={{ textAlign: "center" }}>No Rows</Typography>
        ) : (
          <TableComponent
            columns={columns}
            rows={transformedData}
            searchValue={searchQuery}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationChange}
            totalData={data?.meta?.total || 0}
            rowCount={data?.meta?.total || 0}
            paginationMode="server"
            paginationEnabled={false}
          />
        )}
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
            onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
            sx={{ width: 100 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </TextField>

          <Pagination
            count={Math.ceil(totalPage / pageSize)}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </Box>
      </Box>
      <AddCompanyForm open={newCompanyModal} onClose={handleClose} />
      <EditCompanyForm
        open={editCompanyModal}
        onClose={handleEditClose}
        companyId={selectedCompanyId}
      />

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
    </Grid>
  );
};

export default CompaniesList;
