import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "/assets/icons/edit-white.svg";
import { CustomTypography, CustomButton } from "../Elements";

const SectionAccordion = ({
  title,
  subtitle,
  children,
  editMode,
  onEditClick,
  onCancelClick,
  onSaveClick,
  sectionName,
  ...rest
}) => {

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box>
          <CustomTypography
            fontWeight="fontWeightMedium"
            fontSize="fontSizeSmall"
          >
            {title}
          </CustomTypography>
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
            sx={{
              color: (theme) => theme.palette.secondary.main,
            }}
          >
            {subtitle}
          </CustomTypography>
        </Box>
      </AccordionSummary>
      <Box sx={{ borderBottom: "1px solid #e0e0e0", mb: 1 }}></Box>
      <AccordionDetails>
        <Grid container spacing={2} alignItems="center">
          {/* First Row */}
          <Grid item xs={4}>
            {children[0]}
          </Grid>
          <Grid item xs={4}>
            {children[1]}
          </Grid>
          <Grid item xs={4} style={{ textAlign: "right" }}>
            {editMode ? (
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={1}
              >
                <CustomButton
                  colorScheme="bgWhite"
                  onClick={() => onCancelClick(sectionName)}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  colorScheme="bgBlue"
                  onClick={() => onSaveClick(sectionName)}
                >
                  Save
                </CustomButton>
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={1}
              >
                <CustomButton
                  colorScheme={"bgBlue"}
                  onClick={() => onEditClick(sectionName)}
                >
                  <img
                    src={EditIcon}
                    alt="Edit Icon"
                    style={{ width: "20px", height: "20px" }}
                  />
                </CustomButton>
              </Box>
            )}
          </Grid>
          {/* Second Row */}
          <Grid item xs={4}>
            {children[2]}
          </Grid>
          <Grid item xs={4}>
            {children[3]}
          </Grid>
          {/* Third Row */}
          <Grid item xs={4}>
            {children[4]}
          </Grid>
          <Grid item xs={4}>
            {children[5]}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default SectionAccordion;
