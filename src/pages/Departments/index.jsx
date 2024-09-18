import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Box, Grid, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DepartmentCard from "./DepartmentCard";
import FilterIcon from "/assets/icons/filter.svg";
import AddIcon from "/assets/icons/add-circle.svg";
import AddDepartmentIcon from "/assets/icons/professional.svg";
import ImportIcon from "/assets/icons/file-add-black.svg";
import DownloadTemplate from "/assets/icons/download-template.svg";
import Swal from "sweetalert2";
import {
  CustomModal,
  CustomTabs,
  CustomButton,
  CustomInput,
  CustomLoader
} from "../../components/Elements";
import {
  fetchAllDepartments,
  addDepartment,
  importDepartment,
  editDepartment,
  deleteDepartment,
} from "../../redux/slices/departmentSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const Departments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // This will be passed to CustomLoader
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data: departments } = useSelector((state) => state.departments);

  useEffect(() => {
    console.log("useEffect: fetching all departments");
    dispatch(fetchAllDepartments());
    if (selectedDepartment) {
      console.log("useEffect: selectedDepartment changed, updating formikEdit");
      formikEdit.setFieldValue("department_name", selectedDepartment.name);
    }
  }, [dispatch, selectedDepartment]);

  const tabsAdd = [
    { icon: AddDepartmentIcon, label: "Add One" },
    { icon: ImportIcon, label: "Import from Document" },
  ];

  const totalDepartments = departments.length;
  const indexOfLastDepartment = page * size;
  const indexOfFirstDepartment = indexOfLastDepartment - size;
  const currentDepartments = departments.slice(
    indexOfFirstDepartment,
    indexOfLastDepartment
  );

  const handleOpenModalAdd = () => {
    console.log("handleOpenModalAdd: opening add modal");
    setModalAddOpen(true);
  };

  const handleCloseModalAdd = () => {
    console.log("handleCloseModalAdd: closing add modal");
    setModalAddOpen(false);
  };

  const handleFileSelection = (event) => {
    const file = event.target.files[0]; // Ambil file dari input
    console.log("Selected file:", file);
    setSelectedFile(file);
  };

  const handleSubmitAdd = (form) => {
    console.log("handleSubmitAdd: submitting form =", form);
    setLoading(true);
    handleCloseModalAdd();

    dispatch(addDepartment(form.department_name))
      .unwrap()
      .then(() => {
        console.log("handleSubmitAdd: department added successfully");
        setLoading(false);
        Swal.fire("Success", "Department added successfully", "success");
        dispatch(fetchAllDepartments());
      })
      .catch((error) => {
        console.error("handleSubmitAdd: error adding department", error);
        setLoading(false);
        Swal.fire(
          "Error",
          error.message || "Failed to add department",
          "error"
        );
      });
  };

  const handleImportDepartment = (file) => {
    if (!file) {
      Swal.fire("Error", "Please select a file to import", "error");
      return;
    }

    console.log("handleImportDepartment: importing file =", file);
    setLoading(true);
    handleCloseModalAdd();

    dispatch(importDepartment(file))
      .unwrap()
      .then(() => {
        console.log(
          "handleImportDepartment: departments imported successfully"
        );
        setLoading(false);
        Swal.fire("Success", "Departments imported successfully", "success");
        dispatch(fetchAllDepartments());
      })
      .catch((error) => {
        console.error(
          "handleImportDepartment: error importing departments",
          error
        );
        setLoading(false);
        Swal.fire(
          "Error",
          error.message || "Failed to import departments",
          "error"
        );
      });
  };

  const handleOpenModalEdit = (department) => {
    if (department && department.id) {
      console.log(
        "handleOpenModalEdit: opening edit modal for department =",
        department
      );
      setSelectedDepartment(department);

      if (formikEdit) {
        console.log("handleOpenModalEdit: setting formikEdit value");
        formikEdit.setFieldValue("department_name", department.name);
      } else {
        console.error(
          "handleOpenModalEdit: Formik edit form is not initialized yet."
        );
      }

      setModalEditOpen(true);
    } else {
      console.error(
        "handleOpenModalEdit: Invalid department data or missing id",
        department
      );
      Swal.fire(
        "Error",
        "Failed to open department edit form. Please try again.",
        "error"
      );
    }
  };

  const handleCloseModalEdit = () => {
    console.log("handleCloseModalEdit: closing edit modal");
    setModalEditOpen(false);
    setTimeout(() => {
      console.log("handleCloseModalEdit: resetting selectedDepartment to null");
      setSelectedDepartment(null); // Reset selectedDepartment setelah modal ditutup
    }, 300); // 300ms adalah contoh; sesuaikan sesuai kebutuhan
  };

  const handleSubmitEdit = (form) => {
    if (!selectedDepartment || !selectedDepartment.id) {
      console.error(
        "handleSubmitEdit: Selected department is undefined or missing id"
      );
      Swal.fire(
        "Error",
        "There was an issue with the selected department. Please try again.",
        "error"
      );
      return;
    }

    console.log("handleSubmitEdit: submitting edit form =", form);
    console.log(
      "handleSubmitEdit: selected department on submit =",
      selectedDepartment
    );

    setLoading(true);

    dispatch(
      editDepartment({
        idDepartment: selectedDepartment.id,
        departmentName: form.department_name,
      })
    )
      .unwrap()
      .then((response) => {
        console.log("handleSubmitEdit: department edited successfully");
        handleCloseModalEdit();
        Swal.fire(
          "Success",
          response.message || "Department edited successfully",
          "success"
        );
      })
      .catch((error) => {
        console.error("handleSubmitEdit: error editing department", error);
        Swal.fire(
          "Error",
          error.message || "Failed to edit department",
          "error"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteDepartment = (idDepartment) => {
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
        setLoading(true);
        dispatch(deleteDepartment(idDepartment))
          .unwrap()
          .then(() => {
            Swal.fire(
              "Deleted!",
              "The department has been deleted.",
              "success"
            );
            dispatch(fetchAllDepartments()); // Fetch updated list after deletion
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              error.message || "Failed to delete department",
              "error"
            );
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  const handleTabChange = (event, newValue) => {
    console.log("handleTabChange: tab changed to =", newValue);
    setTabValue(newValue);
  };

  const handleViewDepartment = (department) => {
    console.log("Navigating to department details:", department.name);
    navigate(`/departments/${department.name}`, {
      state: { idDepartment: department.id, departmentName: department.name },
    });
  };

  const handlePageChange = (event, newPage) => {
    console.log("handlePageChange: page changed to =", newPage);
    setPage(newPage);
  };

  const templateUrl = "/docs/import-department.xlsx";

  const formikAdd = useFormik({
    initialValues: {
      department: "",
    },
    validationSchema: Yup.object({
      department: Yup.string()
        .required("Department name is required")
        .min(1, "Department name must be at least 1 character")
        .max(100, "Department name cannot be more than 100 characters"),
    }),
    onSubmit: (values) => {
      console.log("formikAdd: form submitted with values =", values);
      if (handleSubmitAdd) {
        handleSubmitAdd({ department_name: values.department });
      }
    },
  });

  const formikEdit = useFormik({
    initialValues: {
      department_name: selectedDepartment ? selectedDepartment.name : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      department_name: Yup.string()
        .required("Department name is required")
        .min(1, "Department name must be at least 1 character")
        .max(100, "Department name cannot be more than 100 characters"),
    }),
    onSubmit: (values) => {
      console.log("formikEdit: form submitted with values =", values);
      if (handleSubmitEdit) {
        handleSubmitEdit({ department_name: values.department_name });
      }
    },
  });

  return (
    <>
      <CustomLoader loading={loading} /> {/* Use CustomLoader here */}
      <Card variant="outlined" sx={classes.card}>
        <Box sx={classes.header}>
          <Box sx={classes.buttonGroup}>
            <CustomButton
              colorScheme="bgBlue"
              onClick={handleOpenModalAdd}
              icon={AddIcon}
            >
              Add New Department
            </CustomButton>
          </Box>
        </Box>
        <Box sx={classes.tableContainer}>
          <Grid container spacing={2}>
            {currentDepartments.map((department, index) => {
              return (
                <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                  <DepartmentCard
                    departmentId={department.id} // tambahkan departmentId
                    departmentName={department.name} // tambahkan departmentName
                    members={department.topEmployees}
                    onView={() => handleViewDepartment(department)} // kirim seluruh object department
                    onEdit={() => handleOpenModalEdit(department)} // kirim seluruh object department
                    onDelete={() => handleDeleteDepartment(department.id)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(totalDepartments / size)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>

        <CustomModal open={modalAddOpen} onClose={handleCloseModalAdd}>
          <CustomModal.Header onClose={handleCloseModalAdd}>
            Add New Department
          </CustomModal.Header>

          <CustomTabs
            value={tabValue}
            onChange={handleTabChange}
            tabs={tabsAdd}
          />
          {tabValue === 0 && (
            <form onSubmit={formikAdd.handleSubmit}>
              <Box sx={classes.textField}>
                <CustomInput
                  label={"Department Name"}
                  type="text"
                  name="department"
                  value={formikAdd.values.department}
                  onChange={formikAdd.handleChange}
                  onBlur={formikAdd.handleBlur}
                  fullWidth
                  error={
                    formikAdd.touched.department &&
                    Boolean(formikAdd.errors.department)
                  }
                  helperText={
                    formikAdd.touched.department && formikAdd.errors.department
                  }
                />
              </Box>
            </form>
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
                  download="import-department.xlsx"
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
                formikAdd.handleSubmit();
              } else if (tabValue === 1) {
                console.log("Submitting file:", selectedFile);
                handleImportDepartment(selectedFile);
              }
            }}
          >
            Add
          </CustomModal.Footer>
        </CustomModal>

        <CustomModal open={modalEditOpen} onClose={handleCloseModalEdit}>
          <CustomModal.Header onClose={handleCloseModalEdit}>
            Edit Department
          </CustomModal.Header>

          <form onSubmit={formikEdit.handleSubmit}>
            <Box sx={classes.textField}>
              <CustomInput
                label={"Department Name"}
                type="text"
                name="department_name"
                value={formikEdit.values.department_name}
                onChange={formikEdit.handleChange}
                onBlur={formikEdit.handleBlur}
                fullWidth
                error={
                  formikEdit.touched.department_name &&
                  Boolean(formikEdit.errors.department_name)
                }
                helperText={
                  formikEdit.touched.department_name &&
                  formikEdit.errors.department_name
                }
              />
            </Box>
          </form>
          <CustomModal.Footer
            onClose={handleCloseModalEdit}
            onSubmit={formikEdit.handleSubmit}
          >
            Save
          </CustomModal.Footer>
        </CustomModal>
      </Card>
    </>
  );
};

const useStyles = () => {
  return {
    card: {
      p: 2,
      m: 2,
    },
    header: {
      display: "flex",
      justifyContent: "flex-end", // Sesuaikan justifyContent di sini
      flexDirection: "row",
      gap: 2,
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "flex-end", // Menambahkan justifyContent: "flex-end"
      alignItems: "center",
      gap: 2,
    },
    tableContainer: {
      mt: 4,
    },
    textField: {
      display: "flex",
      gap: 2,
    },
  };
};

export default Departments;
