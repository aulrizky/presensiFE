import React, { useState, useRef } from "react";
import {
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "/assets/icons/file-upload.svg";
import FileDocIcon from "/assets/icons/file-doc.svg";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const styleField = () => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
  },
});

const CustomInput = (props) => {
  const {
    label,
    type,
    options = [],
    value,
    onChange,
    fileType,
    hideLabel = false,
    ...rest
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (file) => {
    let validFormats;

    if (fileType === "image") {
      // Validasi untuk file gambar hanya .jpg, .jpeg, atau .png
      validFormats = ["image/png", "image/jpeg", "image/jpg"];
    } else {
      // Validasi untuk file .xlsx atau .csv
      validFormats = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
    }

    if (file && validFormats.includes(file.type)) {
      setSelectedFile(file);
      setError("");
      if (onChange) {
        onChange({ target: { name: "fileField", files: [file] } }); // Simulasikan event dengan files array
      }
    } else {
      setSelectedFile(null);
      setError(
        fileType === "image"
          ? "Please upload a valid image file (.jpg, .jpeg, .png)."
          : "Please upload a valid .xlsx or .csv file."
      );
    }
  };

  const handleInputFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleFileClick = (event) => {
    event.stopPropagation();
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = selectedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleRemoveFile = (event) => {
    event.stopPropagation();
    setSelectedFile(null);
    setError("");
    if (onChange) {
      onChange({ target: { name: "fileField", files: [] } });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {type === "select" ? (
        <TextField
          select
          label={hideLabel ? "" : label}
          variant="outlined"
          margin="normal"
          sx={styleField}
          value={value}
          onChange={onChange}
          {...rest}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      ) : type === "password" ? (
        <TextField
          label={hideLabel ? "" : label}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          sx={styleField}
          value={value}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...rest}
        />
      ) : type === "date" ? (
        <TextField
          label={hideLabel ? "" : label}
          type="date"
          variant="outlined"
          margin="normal"
          sx={styleField}
          value={value}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
          {...rest}
        />
      ) : type === "time" ? (
        <TimePicker
          label={hideLabel ? "" : label}
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} {...rest} />}
        />
      ) : type === "file" ? (
        <Box
          sx={{
            border: `2px dashed ${error ? "red" : "#CFD0DA"}`, // Default warna abu-abu, merah jika ada error
            borderRadius: "10px",
            padding: 2,
            display: "flex",
            width: "100%",
            height: "200px",
            cursor: "pointer",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s ease",
            backgroundColor: isDragging ? "#F0F0F0" : "#FFF", // Warna background berubah saat drag
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleFileUploadClick}
        >
          {!selectedFile && ( // Tampilkan hanya jika tidak ada file yang diupload
            <>
              <Typography sx={{ textAlign: "center", color: "#A2A1A8" }}>
                Drag 'n' drop{" "}
                {fileType === "image" ? ".jpg or .png" : ".xlsx or .csv"} file
                here, or click to select file
              </Typography>
              <Box mt={2}>
                <img src={FileUploadIcon} alt="File Upload" />
              </Box>
            </>
          )}

          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            accept={fileType === "image" ? ".jpg,.png" : ".xlsx,.csv"}
            onChange={handleInputFileChange}
          />
          {selectedFile && (
            <Box
              sx={{
                mt: 2,
                borderRadius: "20px",
                bgcolor: "#CFD0DA",
                p: 1,
                display: "flex",
                alignItems: "center",
                position: "relative",
                cursor: "pointer",
                padding: "8px",
              }}
              onClick={handleFileClick}
            >
              <img
                src={fileType === "image" ? FileDocIcon : FileDocIcon}
                alt="File Icon"
                style={{ marginRight: "8px" }}
              />
              <Typography sx={{ flexGrow: 1 }}>{selectedFile.name}</Typography>
              <IconButton onClick={handleRemoveFile}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      ) : (
        <TextField
          label={hideLabel ? "" : label}
          type={type}
          variant="outlined"
          margin="normal"
          sx={styleField}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
    </>
  );
};

export default CustomInput;
