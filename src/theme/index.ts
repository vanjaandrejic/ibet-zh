import { createTheme as createMuiTheme } from "@mui/material/styles";

export const createTheme = () => {
  return createMuiTheme({
    typography: {
      fontFamily: "Montserrat",
    },
    palette: {
      background: {
        default: "#08080f",
      },
      primary: {
        main: "#62646D",
      },
      mode: "dark",
    },
  });
};

const theme = createTheme();

export default theme;
