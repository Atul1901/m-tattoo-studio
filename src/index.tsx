import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
  StyledEngineProvider,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./utils/redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  palette: {},
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router basename="/">
            <App />
          </Router>
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  </QueryClientProvider>
);
