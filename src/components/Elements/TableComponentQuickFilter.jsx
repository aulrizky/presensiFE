import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";

const TableComponentQuickFilter = ({
  columns,
  rows,
  paginationModel,
  onPaginationModelChange,
  totalData,
  loading,
  getRowId,
  rowCount, // Tambahkan rowCount
}) => {
  const classes = useStyles();

  return (
    <Box sx={classes.boxTable}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationMode="server"
        rowCount={rowCount} // Pastikan rowCount di sini berasal dari props
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        disableColumnResize
        disableColumnMenu
        getRowId={getRowId} // Pastikan ini ditambahkan
        components={{ Toolbar: GridToolbarQuickFilter }} // Mengaktifkan QuickFilter di Toolbar
        sx={classes.table}
      />
    </Box>
  );
};

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

export default TableComponentQuickFilter;
