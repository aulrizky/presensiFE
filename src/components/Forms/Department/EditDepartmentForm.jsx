import React, { useState } from "react";
import { Box } from "@mui/material";
import CustomInput from "../../Elements/CustomInput";

const EditDepartmentForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    department: "",
  });
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(form);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={classes.textField}>
          <CustomInput
            label={"Department Name"}
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
          />
        </Box>
      </form>
    </>
  );
};

const useStyles = () => {
  return {
    textField: {
      display: "flex",
      gap: 2,
    },
  };
};

export default EditDepartmentForm;
