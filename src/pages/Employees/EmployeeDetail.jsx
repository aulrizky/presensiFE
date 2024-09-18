import {
  CalendarToday,
  ExitToApp,
  MailOutline,
  Person,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CustomButton,
  CustomInput,
  CustomLoader,
  CustomModal,
  CustomTabs,
  TableComponent,
} from "../../components/Elements";
import {
  fetchEmployeeAttendanceDetailsById,
  fetchEmployeeLeave,
  fetchEmployeePersonalInfoByUsername,
  fetchEmployeeProfessionalInfoByUsername,
  fetchEmployeeProfileByUsername,
} from "../../redux/slices/employeeSlice";
import ChangePasswordForm from "./ChangePasswordForm";
import EditPersonalInfoForm from "./EditPersonalInfoForm";
import EditProfessionalInfoForm from "./EditProfessionalInfoForm";
import EditProfileIcon from "/assets/icons/edit-profile.svg";
import ImportIcon from "/assets/icons/file-add-blue.svg";
import ChangesImageIcon from "/assets/icons/image-edit.svg";
import PenIcon from "/assets/icons/pen.svg";
import ProfessionalIcon from "/assets/icons/professional.svg";
import UserIcon from "/assets/icons/user.svg";

const EmployeeDetail = () => {
  const [tabSidebarValue, setTabSidebarValue] = useState(0);
  const [tabProfileValue, setTabProfileValue] = useState(0);
  const [modalChangePhotoOpen, setModalChangePhotoOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const { username } = useParams();

  const editPersonalInfoFormRef = useRef();
  const editProfessionalInfoFormRef = useRef();
  const changePasswordFormRef = useRef();
  
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.selectedEmployee);
  const professionalInfo = useSelector((state) => state.employees.professionalInfo);
  const personalInfo = useSelector((state) => state.employees.personalInfo);
  const attendanceDetails = useSelector((state) => state.employees.attendanceDetails) || [];
  const loading = useSelector((state) => state.employees.loading);
  const leaveRows = useSelector((state) => state.employees.leaves);

  const currentYear = new Date().getFullYear();
  const filteredAttendanceDetails = attendanceDetails.filter((attendance) => {
    const attendanceYear = new Date(attendance.date).getFullYear();
    return attendanceYear === currentYear;
  });

  useEffect(() => {
    if (username) {
      dispatch(fetchEmployeeProfileByUsername(username));
      dispatch(fetchEmployeeProfessionalInfoByUsername(username));
      dispatch(fetchEmployeePersonalInfoByUsername(username));
      dispatch(fetchEmployeeLeave(username));
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (username) {
      const fetchEmployeeData = async () => {
        try {
          const id_employee = await dispatch(
            fetchEmployeeProfileByUsername(username)
          ).unwrap();

          await dispatch(
            fetchEmployeeAttendanceDetailsById(id_employee.data.id_employee)
          ).unwrap();
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      };

      fetchEmployeeData();
    }
  }, [dispatch, username]);

  const handleTabSidebarChange = (event, newValue) => {
    setTabSidebarValue(newValue);
  };

  const handleTabProfileChange = (event, newValue) => {
    setTabProfileValue(newValue);
  };

  const handleOpenModalChangePhoto = () => setModalChangePhotoOpen(true);
  const handleCloseModalChangePhoto = () => setModalChangePhotoOpen(false);

  const handleOpenModalEdit = () => setModalEditOpen(true);
  const handleCloseModalEdit = () => setModalEditOpen(false);

  const handleSubmitChangePhoto = () => {
    console.log("Add form submitted");
    handleCloseModalChangePhoto();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabsChangePhoto = [{ icon: ImportIcon, label: "Choose Photo" }];

  const tabsSidebar = [
    { icon: <Person />, label: "Profile" },
    { icon: <CalendarToday />, label: "Attendance" },
    { icon: <ExitToApp />, label: "Leave" },
  ];

  const tabsProfile = [
    { icon: UserIcon, label: "Personal Information" },
    { icon: ProfessionalIcon, label: "Professional Information" },
  ];

  const attendanceColumns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "checkIn", headerName: "Check In", flex: 1 },
    { field: "checkOut", headerName: "Check Out", flex: 1 },
    { field: "workingHours", headerName: "Working Hours", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            backgroundColor: params.value === "On Time" ? "rgba(63, 194, 138, 0.1)" : "rgba(244, 91, 105, 0.1)",
            color: params.value === "On Time" ? "#3FC28A" : "#F45B69",
            borderRadius: "4px",
          }}
        />
      ),
    },
  ];

  const leaveColumns = [
    { field: "leaveType", headerName: "Leave Type", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "days", headerName: "Days", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      maxWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            backgroundColor: params.value === "Approved" ? "rgba(63, 194, 138, 0.1)" :
              params.value === "Pending" ? "rgba(239, 190, 18, 0.1)" : "rgba(244, 91, 105, 0.1)",
            color: params.value === "Approved" ? "#3FC28A" : params.value === "Pending" ? "#EFBE12" : "#F45B69",
            borderRadius: "4px",
          }}
        />
      ),
    },
  ];

  if (loading || !employee) {
    return <CustomLoader loading={loading} />;
  }

  const displayValue = (value) => value || "-";

  return (
    <Card elevation={0} sx={classes.card}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar
            alt={`${employee.data.first_name} ${employee.data.last_name}`}
            src={employee.data.profile_picture}
            sx={classes.avatar}
          />
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Typography variant="h6" fontWeight="bold">
                {`${employee.data.first_name} ${employee.data.last_name}`}
              </Typography>
              <Button sx={classes.tabButton} onClick={handleOpenModalChangePhoto}>
                <img src={ChangesImageIcon} alt="Edit icon" style={classes.icon} />
              </Button>
              <CustomModal
                open={modalChangePhotoOpen}
                onClose={handleCloseModalChangePhoto}
              >
                <CustomModal.Header onClose={handleCloseModalChangePhoto}>
                  Change Employee Photo
                </CustomModal.Header>
                <CustomTabs
                  value={tabValue}
                  onChange={handleTabChange}
                  tabs={tabsChangePhoto}
                />
                {tabValue === 0 && (
                  <Box mt={2}>
                    <CustomInput
                      type="file"
                      fileType="image"
                      name="fileField"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                    />
                  </Box>
                )}
                <CustomModal.Footer
                  onClose={handleCloseModalChangePhoto}
                  onSubmit={handleSubmitChangePhoto}
                >
                  Save
                </CustomModal.Footer>
              </CustomModal>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mt: '4px' }}>
              <Person />
              <Typography variant="body2" color="text.secondary">
                {displayValue(employee.data.role_current_company)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mt: '4px' }}>
              <MailOutline />
              <Typography variant="body2" color="text.secondary">
                {displayValue(employee.data.email)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <CustomButton colorScheme={"bgBlue"} icon={EditProfileIcon} onClick={handleOpenModalEdit}>
          Edit Profile
        </CustomButton>
      </Box>
      <Divider sx={{ marginY: '24px'}} />
      <Box sx={classes.tabRoot}>
        <Card elevation={0} sx={classes.cardBorder}>
          <Tabs
            orientation="vertical"
            value={tabSidebarValue}
            onChange={handleTabSidebarChange}
            sx={classes.tabs}
          >
            {tabsSidebar.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                sx={(theme) => ({
                  fontSize: theme.typography.fontSizeSmall,
                  fontWeight: tabSidebarValue === index ? theme.typography.fontWeightMedium : theme.typography.fontWeightLight,
                })}
              />
            ))}
          </Tabs>
        </Card>
        <Box sx={classes.tabContent}>
          {tabSidebarValue === 0 && (
            <Box>
              <CustomTabs
                value={tabProfileValue}
                onChange={handleTabProfileChange}
                tabs={tabsProfile}
              />
              {tabProfileValue === 0 && (
                <InformationDisplay
                  data={[
                    { label: "First Name", value: displayValue(personalInfo?.first_name) },
                    { label: "Last Name", value: displayValue(personalInfo?.last_name) },
                    { label: "Date of Birth", value: displayValue(personalInfo?.date_of_birth) },
                    { label: "Gender", value: displayValue(personalInfo?.gender) },
                    { label: "Marital Status", value: displayValue(personalInfo?.marital_status) },
                    { label: "Mobile Number", value: displayValue(personalInfo?.mobile_number) },
                    { label: "Nationality", value: displayValue(personalInfo?.nationality) },
                    { label: "Address", value: displayValue(personalInfo?.address) },
                    { label: "Province", value: displayValue(personalInfo?.province) },
                    { label: "City", value: displayValue(personalInfo?.city) },
                    { label: "District", value: displayValue(personalInfo?.district) },
                    { label: "Zip Code", value: displayValue(personalInfo?.zip_code) },
                  ]}
                  classes={classes}
                />
              )}
              {tabProfileValue === 1 && (
                <InformationDisplay
                  data={[
                    { label: "Employee Number", value: displayValue(professionalInfo?.employee_number) },
                    { label: "Username", value: displayValue(professionalInfo?.username) },
                    { label: "Email Address", value: displayValue(professionalInfo?.email) },
                    { label: "Department", value: displayValue(professionalInfo?.department_name) },
                    { label: "Role in Current Company", value: displayValue(professionalInfo?.role_current_company) },
                    { label: "Joining Date", value: displayValue(professionalInfo?.joining_date) },
                  ]}
                  classes={classes}
                />
              )}
            </Box>
          )}
          {tabSidebarValue === 1 && (
            <Box sx={classes.tableContainer}>
              <TableComponent
                paginationEnabled={false}
                columns={attendanceColumns}
                rows={filteredAttendanceDetails}
                loading={loading}
                getRowId={(row) => row.id}
              />
            </Box>
          )}
          {tabSidebarValue === 2 && (
            <Box sx={classes.tableContainer}>
              <TableComponent
                paginationEnabled={false}
                getRowId={(row) => row.id_leave}
                loading={loading}
                columns={leaveColumns}
                rows={leaveRows}
              />
            </Box>
          )}
        </Box>
      </Box>
      {/* Modal for Edit Employee */}
      <CustomModal open={modalEditOpen} onClose={handleCloseModalEdit}>
        <CustomModal.Header onClose={handleCloseModalEdit}>
          Edit Profile
        </CustomModal.Header>
        <CustomTabs
          value={tabValue}
          onChange={handleTabChange}
          tabs={[
            { icon: UserIcon, label: "Personal Information" },
            { icon: ProfessionalIcon, label: "Professional Information" },
            { icon: PenIcon, label: "Change Password" },
          ]}
        />
        {tabValue === 0 && (
          <EditPersonalInfoForm
            ref={editPersonalInfoFormRef}
            idEmployee={employee?.data.id_employee}
          />
        )}
        {tabValue === 1 && (
          <EditProfessionalInfoForm
            ref={editProfessionalInfoFormRef}
            idEmployee={employee?.data.id_employee}
          />
        )}
        {tabValue === 2 && (
          <ChangePasswordForm
            ref={changePasswordFormRef}
            idEmployee={employee?.data.id_employee}
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: "12px",
  },
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
    borderRadius: "10px",
    border: "1px solid #E5E5E5",
    marginTop: 4,
    padding: 2,
  },
  profileContainer: {
    display: "flex",
    justifyContent: "space-between",
    mb: 2,
  },
  profileDetails: {
    display: "flex",
    flexDirection: "column",
    ml: 2,
    gap: 1,
  },
  profileImage: {
    width: "100px",
    height: "100px",
  },
  icon: {
    width: "24px",
    height: "24px",
  },
  profileTextBold: {
    fontWeight: "fontWeightMedium",
    fontSize: "fontSizeSemiLarge",
  },
  profileTextLight: {
    display: "flex",
    alignItems: "center",
    fontWeight: "fontWeightLight",
    fontSize: "fontSizeSmall",
  },
  iconMargin: {
    marginRight: 1,
  },
  tabButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ml: 2,
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "secondary.lightGrayOpacity10",
    minWidth: 0,
  },
  tabRoot: {
    marginTop: 2,
    width: "100%",
    display: "flex",
  },
  tabContent: {
    ml: 3,
    width: "75%",
    flex: 1,
  },
  tabs: {
    "& .MuiTab-root": {
      textTransform: "none",
      justifyContent: "flex-start",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .Mui-selected": {
      backgroundColor: "primary.main",
      color: "white !important",
    },
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
  },
  flex: {
    display: "flex",
  },
  cardBorder: {
    border: "1px solid #E0E0E0",
    borderRadius: "10px",
    width: "20%",
    height: "217px",
  },
  tableContainer: {
    mt: 2,
  },
});

export default EmployeeDetail;
