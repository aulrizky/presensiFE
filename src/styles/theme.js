import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: ['"Lexend"', '"Mulish"', "Arial", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#0078D7",
      lightPrimary5: "rgba(0, 120, 215, 0.05)",
    },
    secondary: {
      main: "#A2A1A8",
      lightGrayOpacity5: "rgba(162, 161, 168, 0.05)",
      lightGrayOpacity10: "rgba(162, 161, 168, 0.10)",
      lightGrayOpacity20: "rgba(162, 161, 168, 0.20)",
    },
    error: {
      main: red.A400,
    },
    custom: {
      lightGray: "#A2A1A8",
    },
    white: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    fontWeightLight: 300, // Inter Light
    fontWeightRegular: 400, // Inter Regular
    fontWeightMedium: 600, // Inter Semi-Bold
    fontWeightBold: 700, // Inter Bold
    fontSizeExtraSmall: "12px",
    fontSizeMediumSmall: "14px",
    fontSizeSmall: "16px",
    fontSizeMedium: "20px",
    fontSizeSemiLarge: "24px",
    fontSizeLarge: "30px",
  },
});

export default theme;
