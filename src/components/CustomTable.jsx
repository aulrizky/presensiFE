import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Avatar, Chip } from "@mui/material";

const CustomTable = ({
  columnsConfig,
  rowsData,
  searchValue,
  handleEditClick,
  handleDeleteClick,
  handleViewClick,
  handleExportClick,
  handleAddNewClick,
}) => {
  const [filteredRows, setFilteredRows] = useState(rowsData);

  useEffect(() => {
    const handleSearchChange = () => {
      if (searchValue) {
        const filtered = rowsData.filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchValue.toLowerCase())
          )
        );
        setFilteredRows(filtered);
      } else {
        setFilteredRows(rowsData);
      }
    };

    handleSearchChange();
  }, [searchValue, rowsData]);

  const columns = columnsConfig.map((col) => {
    if (col.field === "action") {
      return {
        ...col,
        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              height: "100%",
            }}
          >
            {handleViewClick && (
              <IconButton
                sx={{ p: 1 }}
                onClick={() => handleViewClick(params.row)}
              >
                <img
                  src={col.viewIcon}
                  alt="View Icon"
                  style={{ width: "20px", height: "20px" }}
                />
              </IconButton>
            )}
            {handleEditClick && (
              <IconButton
                sx={{ p: 1 }}
                onClick={() => handleEditClick(params.row)}
              >
                <img
                  src={col.editIcon}
                  alt="Edit Icon"
                  style={{ width: "20px", height: "20px" }}
                />
              </IconButton>
            )}
            {handleDeleteClick && (
              <IconButton
                sx={{ p: 1 }}
                onClick={() => handleDeleteClick(params.row)}
              >
                <img
                  src={col.deleteIcon}
                  alt="Delete Icon"
                  style={{ width: "20px", height: "20px" }}
                />
              </IconButton>
            )}
          </Box>
        ),
      };
    }
    return col;
  });

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setFilteredRows(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <button
            onClick={handleAddNewClick}
            style={{
              padding: "8px 16px",
              borderRadius: "5px",
              backgroundColor: "#0078D7",
              color: "#fff",
            }}
          >
            Add New
          </button>
          <button
            onClick={handleExportClick}
            style={{
              padding: "8px 16px",
              borderRadius: "5px",
              backgroundColor: "#FFBB34",
              color: "#fff",
            }}
          >
            Export
          </button>
        </Box>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        disableColumnResize
        disableColumnMenu
        sx={{
          border: "none",
        }}
      />
    </Box>
  );
};

export default CustomTable;
