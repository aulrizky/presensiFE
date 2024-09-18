import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react"; // Pastikan useState dan useEffect diimpor di sini

const TableComponent = ({
  columns,
  rows,
  searchValue,
  paginationModel,
  onPaginationModelChange,
  totalData,
  loading,
  getRowId,
  rowCount,
  paginationEnabled = true,
}) => {
  const [filteredRows, setFilteredRows] = useState(rows);
  const classes = useStyles();

  useEffect(() => {
    const handleSearchChange = () => {
      if (searchValue) {
        const filtered = rows.filter((row) =>
          columns.some((col) => {
            const cellValue = row[col.field] || ""; // Default to empty string
            return String(cellValue)
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          })
        );
        setFilteredRows(filtered);
      } else {
        setFilteredRows(rows);
      }
    };

    handleSearchChange();
  }, [searchValue, rows, columns]);

  return (
    <Box sx={classes.boxTable}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        paginationMode="server"
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        disableColumnResize
        disableColumnMenu
        getRowId={getRowId}
        sx={classes.table}
        slots={{
          pagination: paginationEnabled ? CustomPagination : null,
        }}
        slotProps={{
          pagination: {
            paginationModel,
            onPaginationModelChange,
            rowCount,
          },
        }}
      />
    </Box>
  );
};

const CustomPagination = ({
  paginationModel = { pageSize: 10, page: 0 },
  onPaginationModelChange,
  rowCount,
}) => {
  const pageSize = paginationModel.pageSize || 10;
  const pageCount = Math.ceil(rowCount / pageSize);
  const startRecord = paginationModel.page * pageSize + 1;
  const endRecord = Math.min((paginationModel.page + 1) * pageSize, rowCount);

  const handlePageChange = (newPage) => {
    onPaginationModelChange({ ...paginationModel, page: newPage });
  };

  const handlePageSizeChange = (event) => {
    onPaginationModelChange({
      ...paginationModel,
      pageSize: event.target.value,
      page: 0,
    });
  };

  const renderPageNumbers = () => {
    const currentPage = paginationModel.page;
    const pageNumbers = [];
    const maxVisiblePages = 4;

    if (pageCount <= maxVisiblePages) {
      for (let i = 0; i < pageCount; i++) {
        pageNumbers.push(
          <PageNumber
            key={i}
            pageNum={i}
            currentPage={currentPage}
            onClick={() => handlePageChange(i)}
          />
        );
      }
    } else {
      pageNumbers.push(
        <PageNumber
          key={0}
          pageNum={0}
          currentPage={currentPage}
          onClick={() => handlePageChange(0)}
        />
      );

      if (currentPage > 1) {
        pageNumbers.push(<Ellipsis key="ellipsis-start" />);
      }

      const start = Math.max(1, currentPage - 1);
      const end = Math.min(pageCount - 2, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(
          <PageNumber
            key={i}
            pageNum={i}
            currentPage={currentPage}
            onClick={() => handlePageChange(i)}
          />
        );
      }

      if (currentPage < pageCount - 2) {
        pageNumbers.push(<Ellipsis key="ellipsis-end" />);
      }

      pageNumbers.push(
        <PageNumber
          key={pageCount - 1}
          pageNum={pageCount - 1}
          currentPage={currentPage}
          onClick={() => handlePageChange(pageCount - 1)}
        />
      );
    }

    return pageNumbers;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Showing
        </Typography>
        <Select
          value={pageSize}
          onChange={handlePageSizeChange}
          size="small"
          sx={{ mr: 2, minWidth: 70 }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2">
          Showing {startRecord} to {endRecord} out of {rowCount} records
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={() => handlePageChange(paginationModel.page - 1)}
          disabled={paginationModel.page === 0}
          sx={{ mx: 1 }}
        >
          <ChevronLeftIcon />
        </IconButton>
        {renderPageNumbers()}
        <IconButton
          onClick={() => handlePageChange(paginationModel.page + 1)}
          disabled={paginationModel.page === pageCount - 1}
          sx={{ mx: 1 }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const PageNumber = ({ pageNum, currentPage, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      width: 30,
      height: 30,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      borderRadius: "4px",
      mx: 0.5,
      border: currentPage === pageNum ? "2px solid #1976d2" : "none",
      color: currentPage === pageNum ? "#1976d2" : "inherit",
      "&:hover": {
        backgroundColor: "rgba(25, 118, 210, 0.04)",
      },
    }}
  >
    {pageNum + 1}
  </Box>
);

const Ellipsis = () => (
  <Box
    sx={{
      width: 30,
      height: 30,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mx: 0.5,
    }}
  >
    ...
  </Box>
);

const useStyles = () => ({
  boxTable: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    border: "none",
    minWidth: 900,
  },
});

export default TableComponent;
