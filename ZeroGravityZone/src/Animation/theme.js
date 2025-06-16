
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00BFFF",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#FEFAF7",
      paper: "#12122c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#7fdbff",
    },
    error: {
      main: "#ff1744",
    },
    warning: {
      main: "#ff9100",
    },
    success: {
      main: "#00e676",
    },
  },
  typography: {
    fontFamily: `'Orbitron', 'Roboto', sans-serif`,
    h1: {
      fontWeight: 800,
      fontSize: "3rem",
    },
    h2: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      letterSpacing: "0.5px",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(145deg, #0f0f3a, #12122c)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#12122c",
          border: "1px solid #1a1a3d",
          color: "#ffffff",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#7fdbff",
          },
          "& .MuiInputBase-root": {
            color: "#ffffff",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00BFFF",
          },
        },
      },
    },
  },
});

export default theme;
