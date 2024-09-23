import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from 'notistack';
import { baseTheme } from './admin/assets/global/Theme-variable';
import Themeroutes from "./routes/Router";

const App = () => {
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        {routing}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;