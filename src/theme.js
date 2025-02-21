// src/theme.js
import { extendTheme } from "@mui/joy";

    const theme = extendTheme({
      colorSchemes: {
        light: {
      palette: {
        primary: {
          solidBg: "#5471a1",
          solidHoverBg: "#0056b3",
        },
        neutral: {
          solidBg: "#f4f4f4", // Custom background color
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: "#1e88e5",
        },
        background: {
          surface: "#121212", // Dark mode background
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded corners for all buttons
        },
      },
    },
  },
});

export default theme;
