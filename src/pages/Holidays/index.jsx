import { Box, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import CustomButton from "../../components/Elements/CustomButton";
import CustomInput from "../../components/Elements/CustomInput";
import CustomModal from "../../components/Elements/CustomModal";
import SearchBar from "../../components/Elements/CustomSearchBar";
import TableComponentCombined from "../../components/Elements/TableComponentCombined";
import { createHoliday, fetchHolidays } from "../../redux/slices/holidaySlice";
import AddCircle from "/assets/icons/add-circle.svg";

const HolidaysList = () => {
  const dispatch = useDispatch();
  const { holidays, loading, totalElements } = useSelector(
    (state) => state.holidays || {}
  );
  const [searchValue, setSearchValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newHolidayName, setNewHolidayName] = useState("");
  const [newHolidayDate, setNewHolidayDate] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(
      fetchHolidays({ year: new Date().getFullYear(), page, size: pageSize })
    );
  }, [dispatch, page, pageSize]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewHolidayName("");
    setNewHolidayDate("");
  };

  const handleAddHoliday = () => {
    const formattedDate = new Date(newHolidayDate).toISOString().split("T")[0];
    const newHoliday = {
      holiday_name: newHolidayName,
      date: formattedDate,
    };

    dispatch(createHoliday(newHoliday))
      .then(() => {
        handleCloseModal();
        setTimeout(() => {
          Swal.fire({
            title: "Success",
            text: "Holiday added successfully!",
            icon: "success",
            confirmButtonText: "OK"
          }).then(() => {
            window.location.reload();
          });
        }, 100);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Failed to add holiday. Please try again.";
        Swal.fire({
          title: "Add Failed",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK"
        });
        console.error("Failed to add holiday:", error);
      });
  };

  const handlePaginationModelChange = (model) => {
    setPage(model.page + 1);
    setPageSize(model.pageSize);
  };

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "day", headerName: "Day", flex: 1 },
    { field: "holidayName", headerName: "Holiday Name", flex: 2 },
  ];

  const today = new Date();
  const formattedRows = holidays
    .map((row) => {
      const holidayDate = new Date(row.date);
      const isDateValid = !isNaN(holidayDate.getTime());
      const isPastHoliday = isDateValid && holidayDate < today;

      return {
        id: row.id_holiday || `${row.holiday_name}-${row.date}`,
        date: isDateValid
          ? holidayDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "Invalid Date",
        day: isDateValid
          ? holidayDate.toLocaleDateString("en-US", { weekday: "long" })
          : "Invalid Date",
        holidayName: row.holiday_name,
        isPastHoliday,
      };
    })
    .sort((a, b) => {
      if (a.isPastHoliday === b.isPastHoliday) {
        return a.isPastHoliday
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      } else {
        return a.isPastHoliday ? 1 : -1;
      }
    });

  return (
    <Card sx={styles.card}>
      <Box sx={styles.header}>
        <SearchBar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />
        <Box sx={styles.buttonGroup}>
          <CustomButton
            colorScheme="bgBlue"
            icon={AddCircle}
            onClick={handleOpenModal}
          >
            Add New Holiday
          </CustomButton>
        </Box>
      </Box>
      <Box sx={styles.tableContainer}>
        <TableComponentCombined
          columns={columns}
          rows={formattedRows}
          searchValue={searchValue}
          paginationModel={{ page: page - 1, pageSize }}
          onPaginationModelChange={handlePaginationModelChange}
          rowCount={totalElements}
          loading={loading}
          getRowId={(row) => row.id}
        />
      </Box>
      <Box sx={styles.legend}>
        <Box sx={styles.legendItem}>
          <Box sx={styles.upcomingDot} />
          <Typography>Upcoming</Typography>
        </Box>
        <Box sx={styles.legendItem}>
          <Box sx={styles.pastDot} />
          <Typography>Past Holidays</Typography>
        </Box>
      </Box>

      {/* Modal untuk menambahkan holiday */}
      <CustomModal open={openModal} onClose={handleCloseModal}>
        <CustomModal.Header onClose={handleCloseModal}>
          Add New Holiday
        </CustomModal.Header>
        <Box sx={styles.modalContent}>
          <CustomInput
            label="Holiday Name"
            value={newHolidayName}
            onChange={(e) => setNewHolidayName(e.target.value)}
            fullWidth
          />
          <CustomInput
            label="Select Date"
            type="date"
            value={newHolidayDate}
            onChange={(e) => setNewHolidayDate(e.target.value)}
            fullWidth
          />
        </Box>
        <CustomModal.Footer
          onClose={handleCloseModal}
          onSubmit={handleAddHoliday}
        >
          Add
        </CustomModal.Footer>
      </CustomModal>
    </Card>
  );
};

const styles = {
  card: {
    p: 2,
    m: 2,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 2,
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 2,
  },
  tableContainer: {
    mt: 2,
    mb: 1,
  },
  modalContent: {
    mt: 2,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  legend: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    mt: 0,
    mb: 2,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    mr: 2,
  },
  upcomingDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "#007bff",
    mr: 0.5,
  },
  pastDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "#e0e0e0",
    mr: 0.5,
  },
};

export default HolidaysList;
