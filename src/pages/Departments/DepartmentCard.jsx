import React from "react";
import {
  Card,
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DepartmentCard = ({
  departmentId,
  departmentName,
  members,
  onView,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleMemberClick = (username) => {
    navigate(`/employees/${username}`);
  };

  return (
    <Card variant="outlined" sx={{ padding: 2, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.5,
        }}
      >
        <Typography variant="h6" component="div">
          {departmentName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="View Details">
            <IconButton
              onClick={() => onView({ id: departmentId, name: departmentName })}
            >
              <img src="/assets/icons/view.svg" alt="View" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Department">
            <IconButton
              onClick={() => onEdit({ id: departmentId, name: departmentName })}
            >
              <img src="/assets/icons/edit.svg" alt="Edit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Department">
            <IconButton onClick={onDelete}>
              <img src="/assets/icons/trash.svg" alt="Delete" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
        {members.length} Members
      </Typography>
      <Box sx={{ borderBottom: "1px solid #e0e0e0", mb: 1 }}></Box>
      <Box>
        {members.map((member, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 1,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={member.profilePicture || "/default-avatar.png"}
                alt={member.name}
              />
              <Box>
                <Typography variant="body2" component="div">
                  {member.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {member.position}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => handleMemberClick(member.username)}>
              <img src="/assets/icons/direction-right.svg" alt="Arrow Right" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default DepartmentCard;
