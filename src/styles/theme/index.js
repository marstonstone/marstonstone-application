import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { TEAL_GREEN, DARK_GRAY, WHITE, LIGHT_GRAY, BROWN } from "../colors";

export const applicationTheme = createTheme({
  palette: {
    primary: {
      main: "#598372",
    },
    secondary: {
      main: "#dcc4a5",
    },
    customGrey: {
      light: LIGHT_GRAY,
      dark: DARK_GRAY,
    },
  },
});

export const responsiveAppTheme = responsiveFontSizes(applicationTheme);
export { ThemeProvider };
