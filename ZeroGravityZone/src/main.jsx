import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import theme from "./Animation/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <App />

    </ThemeProvider>
  </StrictMode>
);
