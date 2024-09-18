import React from 'react';
import { Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';

const CustomTabs = ({ value, onChange, tabs }) => {
    const classes = useStyles();
    return (
      <Tabs
        value={value}
        onChange={onChange}
        indicatorColor="primary"
        textColor="primary"
        sx={classes.tabs} 
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            icon={<img src={tab.icon} alt={`${tab.label} Icon`} style={classes.icon} />}
            iconPosition="start"
            label={tab.label}
            sx={(theme) => ({
              textTransform: 'none',
              fontSize: theme.typography.fontSizeSmall,
              fontWeight: value === index ? theme.typography.fontWeightMedium : theme.typography.fontWeightLight
            })}
          />
        ))}
      </Tabs>
    );
  };

CustomTabs.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
        icon: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        })
    ).isRequired,
}; 

const useStyles = () => {
  return {
    tabs: {
      borderBottom: '1px solid #ddd',
      height: "60px",
      display: "flex",
      
    },
    icon: {
      width: '20px',
      height: '20px',
      alignItems: "center",
    },
  }
}

export default CustomTabs;
