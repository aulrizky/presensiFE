import React, { useState, useEffect, useRef } from "react";
import { Card, Box, Chip, IconButton, Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  SearchBar,
  CustomModal,
  CustomTabs,
  TableComponent,
  CustomButton,
  CustomInput,
  CustomLoader,
} from "../../components/Elements";
import AddEmployeeForm from "./AddEmployeeForm";
import EditProfessionalInfoForm from "./EditProfessionalInfoForm";
import EditPersonalInfoForm from "./EditPersonalInfoForm";
import ChangePasswordForm from "./ChangePasswordForm";
import {
  fetchAllEmployees,
  addEmployee,
  importEmployee,
  fetchEmployeePersonalInfoByUsername,
  fetchEmployeeProfessionalInfoByUsername,
  deleteEmployee,
} from "../../redux/slices/employeeSlice";
import ExportIcon from "/assets/icons/export.svg";
import AddCircle from "/assets/icons/add-circle.svg";
import AddIcon from "/assets/icons/user.svg";
import ImportIcon from "/assets/icons/file-add-black.svg";
import ViewIcon from "/assets/icons/view.svg";
import EditIcon from "/assets/icons/edit.svg";
import DeleteIcon from "/assets/icons/trash.svg";
import DownloadTemplate from "/assets/icons/download-template.svg";
import UserIcon from "/assets/icons/user.svg";
import PenIcon from "/assets/icons/pen.svg";
import ProfessionalIcon from "/assets/icons/professional.svg";
import { exportEmployeesByCompany } from "../../services/apis/employeeService";

const EmployeesList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addEmployeeFormRef = useRef();
  const editProfessionalInfoFormRef = useRef();
  const editPersonalInfoFormRef = useRef();
  const changePasswordFormRef = useRef();

  const employees = useSelector((state) => state.employees.data) || [];
  const loading = useSelector((state) => state.employees.loading);
  const totalData = useSelector((state) => state.employees.totalData);

  useEffect(() => {
    console.log("Page: ", paginationModel.page);
    console.log("Size:", paginationModel.pageSize);
    dispatch(
      fetchAllEmployees({
        page: paginationModel.page,
        size: paginationModel.pageSize,
        keyword: searchValue,
      })
    ).then((response) => {
      console.log("Employees Response:", response);
    });
  }, [dispatch, paginationModel, searchValue]);

  const handleSearchChange = (event) => setSearchValue(event.target.value);
  const handleOpenModalEdit = (employee) => {
    setSelectedEmployee(employee);
    setModalEditOpen(true);
    dispatch(fetchEmployeePersonalInfoByUsername(employee.username));
    dispatch(fetchEmployeeProfessionalInfoByUsername(employee.username));
  };
  const handleOpenModalAdd = () => setModalAddOpen(true);
  const handleCloseModalAdd = () => setModalAddOpen(false);
  const handleCloseModalEdit = () => setModalEditOpen(false);
  const handleSubmitAdd = (formData) => {
    console.log("handleSubmitAdd: submitting form =", formData);
    console.log("paginasionModel page:", paginationModel.page);
    console.log("paginasionModel pageSize:", paginationModel.pageSize);
    dispatch(addEmployee(formData))
      .unwrap()
      .then(() => {
        Swal.fire("Success", "Employee added successfully", "success");
        dispatch(
          fetchAllEmployees({
            page: paginationModel.page,
            size: paginationModel.pageSize,
          })
        );
      })
      .catch((error) => {
        Swal.fire("Error", error.message || "Failed to add employee", "error");
      });
    handleCloseModalAdd();
  };
  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file); // Perbarui state selectedFile di Departments
  };
  const handleImportEmployee = (file) => {
    if (!file) {
      Swal.fire("Error", "Please select a file to import", "error");
      return;
    }

    console.log("handleImportEmployee: importing file =", file);
    handleCloseModalAdd();

    dispatch(importEmployee(file))
      .unwrap()
      .then(() => {
        Swal.fire("Success", "Employee imported successfully", "success");
        dispatch(
          fetchAllEmployees({
            page: paginationModel.page,
            size: paginationModel.pageSize,
          })
        );
      })
      .catch((error) => {
        console.error("handleImportEmployee: error importing employee", error);
        Swal.fire(
          "Error",
          error.message || "Failed to import empployee",
          "error"
        );
      });
  };

  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleViewEmployee = (username) => {
    navigate(`/employees/${username}`);
  };
  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const handleExportClick = async () => {
    try {
      await exportEmployeesByCompany(); // Call the export function
    } catch (error) {
      console.error("Error exporting employees:", error);
    }
  };

  const handleDeleteEmployee = (id_employee) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEmployee(id_employee))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "The employee has been deleted.", "success");
            dispatch(
              fetchAllEmployees({
                page: paginationModel.page,
                size: paginationModel.pageSize,
              })
            );
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              error.message || "Failed to delete employee",
              "error"
            );
          });
      }
    });
  };

  const templateUrl = "/docs/import-employee.xlsx";

  const columns = [
    {
      field: "departmentName",
      headerName: "Department",
      flex: 1.5,
      editable: true,
      renderCell: (params) => {
        return params.row.department
          ? params.row.department.departmentName
          : "-";
      },
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      flex: 2,
      editable: true,
      renderCell: (params) => (
        <Box sx={classes.avatarCell}>
          <Avatar
            src={params.row.profilePicture || params.row.employeeName}
            alt={params.row.employeeName}
          />
          {params.row.employeeName}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      editable: true,
      renderCell: (params) => (
        <Chip label={params.value} sx={classes.statusChip} />
      ),
    },
    {
      field: "roleCurrentCompany",
      headerName: "Role",
      flex: 1.2,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 0.8,
      renderCell: (params) => (
        <Box sx={classes.actionButtons}>
          <IconButton
            sx={classes.iconButton}
            onClick={() => handleViewEmployee(params.row.username)}
          >
            <Tooltip title="View Details">
              <img src={ViewIcon} alt="View Icon" style={classes.iconImage} />
            </Tooltip>
          </IconButton>
          <IconButton
            sx={classes.iconButton}
            onClick={() => handleOpenModalEdit(params.row)}
          >
            <Tooltip title="Edit Employee">
              <img src={EditIcon} alt="Edit Icon" style={classes.iconImage} />
            </Tooltip>
          </IconButton>
          <IconButton
            sx={classes.iconButton}
            onClick={() => {
              handleDeleteEmployee(params.row.idEmployee);
            }}
          >
            <Tooltip title="Delete Employee">
              <img
                src={DeleteIcon}
                alt="Trash Icon"
                style={classes.iconImage}
              />
            </Tooltip>
          </IconButton>
        </Box>
      ),
    },
  ];

  const tabsAdd = [
    { icon: AddIcon, label: "Add One" },
    { icon: ImportIcon, label: "Import from Document" },
  ];

  const tabsEdit = [
    { icon: UserIcon, label: "Personal Information" },
    { icon: ProfessionalIcon, label: "Professional Information" },
    { icon: PenIcon, label: "Change Password" },
  ];

  return (
    <Card variant="outlined" sx={classes.card}>
      <Box sx={classes.header}>
        <SearchBar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />
        <Box sx={classes.actions}>
          <CustomButton
            colorScheme="bgBlue"
            onClick={handleOpenModalAdd}
            icon={AddCircle}
          >
            Add New Employee
          </CustomButton>
          <CustomModal open={modalAddOpen} onClose={handleCloseModalAdd}>
            <CustomModal.Header onClose={handleCloseModalAdd}>
              Add New Employee
            </CustomModal.Header>
            <CustomTabs
              value={tabValue}
              onChange={handleTabChange}
              tabs={tabsAdd}
            />
            {tabValue === 0 && (
              <AddEmployeeForm
                ref={addEmployeeFormRef}
                onSubmit={handleSubmitAdd}
              />
            )}
            {tabValue === 1 && (
              <Box mt={2}>
                <CustomInput
                  type="file"
                  fileType="document"
                  name="fileField"
                  onChange={handleFileSelection}
                />
                <Box mt={2}>
                  <a
                    href={templateUrl}
                    download="import-employee.xlsx"
                    style={{ textDecoration: "none" }}
                  >
                    <CustomButton
                      variant="outlined"
                      colorScheme="bgOrange"
                      icon={DownloadTemplate}
                    >
                      Download Template
                    </CustomButton>
                  </a>
                </Box>
              </Box>
            )}
            <CustomModal.Footer
              onClose={handleCloseModalAdd}
              onSubmit={() => {
                if (tabValue === 0) {
                  if (addEmployeeFormRef.current) {
                    addEmployeeFormRef.current.submitForm();
                  }
                } else if (tabValue === 1) {
                  console.log("Submitting file:", selectedFile);
                  handleImportEmployee(selectedFile);
                }
              }}
            >
              Save
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
            rows={employees}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            rowCount={totalData}
            loading={loading}
            getRowId={(row) => row.idEmployee}
          />
        )}
      </Box>
      <CustomModal open={modalEditOpen} onClose={handleCloseModalEdit}>
        <CustomModal.Header onClose={handleCloseModalEdit}>
          Edit Employee
        </CustomModal.Header>
        <CustomTabs
          value={tabValue}
          onChange={handleTabChange}
          tabs={tabsEdit}
        />
        {tabValue === 0 && (
          <EditPersonalInfoForm
            ref={editPersonalInfoFormRef}
            idEmployee={selectedEmployee?.idEmployee}
            page={paginationModel}
          />
        )}
        {tabValue === 1 && (
          <EditProfessionalInfoForm
            ref={editProfessionalInfoFormRef}
            idEmployee={selectedEmployee?.idEmployee}
            page={paginationModel}
          />
        )}
        {tabValue === 2 && (
          <ChangePasswordForm
            ref={changePasswordFormRef}
            idEmployee={selectedEmployee?.idEmployee}
            page={paginationModel}
          />
        )}
        <CustomModal.Footer
          onClose={handleCloseModalEdit}
          onSubmit={() => {
            if (tabValue === 0) {
              if (editPersonalInfoFormRef.current) {
                editPersonalInfoFormRef.current.submitForm();
                handleCloseModalEdit();
              }
            } else if (tabValue === 1) {
              if (editProfessionalInfoFormRef.current) {
                editProfessionalInfoFormRef.current.submitForm();
                handleCloseModalEdit();
              }
            } else if (tabValue === 2) {
              if (changePasswordFormRef.current) {
                changePasswordFormRef.current.submitForm();
                handleCloseModalEdit();
              }
            }
          }}
        >
          Save
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

export default EmployeesList;
