import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchValue, onSearchChange }) => {
  return (
    <Box
      sx={{
        height: '50px',
      }}
    >
      <TextField
        placeholder="Search"
        value={searchValue}
        onChange={onSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
