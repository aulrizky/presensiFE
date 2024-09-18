import React from 'react';
import { Modal, Box, Typography, IconButton, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from './CustomButton';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '732px',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const backdropStyle = {
  backdropFilter: 'blur(10px)', 
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
};

const CustomModal = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: backdropStyle,
      }}
    >
      <Box sx={modalStyle}>
        {children}
      </Box>
    </Modal>
  );
};

const HeaderModal = ({ children, onClose }) => {
  return (
    <Box sx={headerStyle}>
      <Typography sx={{ fontWeight: 'fontWeightBold', fontSize: 'fontSizeMedium' }}>{children}</Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

const FooterModal = ({ onClose, onSubmit, children, disableSubmit }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2, gap: 2 }}>
      <CustomButton variant="outlined" onClick={onClose} colorScheme="bgWhite">
        Cancel
      </CustomButton>
      <CustomButton 
        variant="contained" 
        onClick={onSubmit} 
        colorScheme="bgBlue"
        disabled={disableSubmit}  // Pastikan tombol Save dinonaktifkan jika disableSubmit adalah true
      >
        {children}
      </CustomButton>
    </Box>
  );
};

CustomModal.Header = HeaderModal;
CustomModal.Footer = FooterModal;

export default CustomModal;
