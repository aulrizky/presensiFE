import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeesByDepartment } from "../../redux/slices/departmentSlice";
import { Card, Box, Avatar, CircularProgress } from "@mui/material";
import {
  CustomButton,
  TableComponent,
  SearchBar,
} from "../../components/Elements";
import ExportIcon from "/assets/icons/export.svg";
import { exportEmployeesByDepartment } from "../../services/apis/departmentService";

const DepartmentDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const idDepartment = location.state?.idDepartment;
  const departmentName = location.state?.departmentName;

  const [searchValue, setSearchValue] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [tableLoading, setTableLoading] = useState(false);

  const { employees, totalData } = useSelector((state) => state.departments);

  useEffect(() => {
    fetchTableData();
  }, [dispatch, idDepartment, paginationModel]);

  const fetchTableData = () => {
    setTableLoading(true);
    dispatch(
      fetchEmployeesByDepartment({
        idDepartment,
        paginationModel: {
          page: paginationModel.page,
          pageSize: paginationModel.pageSize,
        },
        searchValue,
      })
    );
    setTableLoading(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    // Trigger the search action
    fetchTableData();
  };

  const handlePaginationChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const handleExportClick = async () => {
    try {
      if (idDepartment) {
        await exportEmployeesByDepartment(idDepartment, departmentName); // Pass the idDepartment to the export function
      } else {
        console.error("Department ID is not available for export.");
      }
    } catch (error) {
      console.error("Error exporting employees:", error);
    }
  };

  const rows =
    employees?.map((emp) => ({
      id: emp.idEmployee,
      employeeNumber: emp.employeeNumber,
      employeeName: emp.employeeName,
      roleCurrentCompany: emp.roleCurrentCompany || "N/A",
      roleInClient: emp.roleInClient || "N/A",
      status: emp.status || "N/A",
      profilePicture: emp.profilePicture || null,
    })) || [];

  const departmentColumns = [
    { field: "employeeNumber", headerName: "Employee Number", width: 150 },
    {
      field: "employeeName",
      headerName: "Employee Name",
      width: 200,
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
      field: "roleCurrentCompany",
      headerName: "Role in Current Company",
      width: 200,
    },
    { field: "roleInClient", headerName: "Role in Client", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
  ];

  return (
    <Card variant="outlined" sx={{ p: 2, m: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchClick={handleSearchClick}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <CustomButton
            colorScheme="bgOrange"
            icon={ExportIcon}
            onClick={handleExportClick}
          >
            Export
          </CustomButton>
        </Box>
      </Box>
      <Box sx={{ mt: 2, overflowX: "auto", width: "100%" }}>
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
        ) : (
          <TableComponent
            columns={departmentColumns}
            rows={rows}
            searchValue={searchValue}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationChange}
            totalData={totalData || 0}
            rowCount={totalData || 0}
            paginationMode="server"
            loading={tableLoading}
          />
        )}
      </Box>
    </Card>
  );
};

export default DepartmentDetails;
