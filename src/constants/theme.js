import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  // @dev use https://in-your-saas.github.io/material-ui-theme-editor/
  palette: {
    common: { "black": "#000", "white": "rgba(255, 255, 255, 1)" },
    background: {
      paper: "rgba(32, 33, 35, 1)",
      default: "rgba(0, 0, 0, 1)"
    },
    primary: {
      light: "rgba(51, 183, 146, 1)",
      main: "rgba(0, 165, 119, 1)",
      dark: "rgba(0, 115, 83, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "rgba(170, 144, 215, 1)",
      main: "rgba(149, 117, 205, 1)",
      dark: "rgba(104, 81, 143, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "rgba(208, 2, 27, 1)",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(255, 255, 255, 1)",
      secondary: "rgba(155, 155, 155, 1)",
      disabled: "rgba(255, 255, 255, 1)",
      hint: "rgba(184, 233, 134, 1)"
    }
  }
});

export default theme;
