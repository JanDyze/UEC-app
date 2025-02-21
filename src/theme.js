// src/theme.js
import { extendTheme } from "@mui/joy";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#00779b", // Cerulean
          dark: "#005f7d", // Darker shade for hover effect
          light: "#92bac1", // Light Blue
          hover: "#005f7d",
          solidBg: "#00779b",
          solidHoverBg: "#005f7d",
          solidActiveBg: "#004866",
          outlinedColor: "#00779b",
          outlinedBorder: "#00779b",
          outlinedHoverBorder: "#005f7d",
          softBg: "#92bac1",
          softHoverBg: "#7ea3ab",
          softActiveBg: "#6a8c95",
        },
        secondary: {
          main: "#bf2d19", // Engineering Orange
          dark: "#9f2414",
          light: "#e5533f",
          hover: "#9f2414",
          solidBg: "#bf2d19",
          solidHoverBg: "#9f2414",
          solidActiveBg: "#7d1a0e",
          outlinedColor: "#bf2d19",
          outlinedBorder: "#bf2d19",
          outlinedHoverBorder: "#9f2414",
          softBg: "#e5533f",
          softHoverBg: "#d0452d",
          softActiveBg: "#b73620",
        },
        neutral: {
          main: "#e1dcd1", // Bone
          dark: "#c9c4b8",
          light: "#f5f3ed",
          hover: "#c9c4b8",
          solidBg: "#e1dcd1",
          solidHoverBg: "#c9c4b8",
          solidActiveBg: "#b0a89d",
          outlinedColor: "#e1dcd1",
          outlinedBorder: "#e1dcd1",
          outlinedHoverBorder: "#c9c4b8",
          softBg: "#f5f3ed",
          softHoverBg: "#e9e6df",
          softActiveBg: "#dcd7cd",
        },
        background: {
          surface: "#f4f4f4", // General background
          level1: "#ffffff", // Default surface color
          level2: "#e1dcd1", // Slightly darker background for cards/sections
        },
        text: {
          primary: "#010100", // Black
          secondary: "#00779b", // Cerulean
          tertiary: "#bf2d19", // Engineering Orange for contrast
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#00779b", // Cerulean
          dark: "#005f7d",
          light: "#92bac1",
          hover: "#005f7d",
          solidBg: "#00779b",
          solidHoverBg: "#005f7d",
          solidActiveBg: "#004866",
          outlinedColor: "#00779b",
          outlinedBorder: "#00779b",
          outlinedHoverBorder: "#005f7d",
          softBg: "#92bac1",
          softHoverBg: "#7ea3ab",
          softActiveBg: "#6a8c95",
        },
        secondary: {
          main: "#bf2d19", // Engineering Orange
          dark: "#9f2414",
          light: "#e5533f",
          hover: "#9f2414",
          solidBg: "#bf2d19",
          solidHoverBg: "#9f2414",
          solidActiveBg: "#7d1a0e",
          outlinedColor: "#bf2d19",
          outlinedBorder: "#bf2d19",
          outlinedHoverBorder: "#9f2414",
          softBg: "#e5533f",
          softHoverBg: "#d0452d",
          softActiveBg: "#b73620",
        },
        neutral: {
          main: "#010100", // Black
          dark: "#1a1a1a",
          light: "#3a3a3a",
          hover: "#1a1a1a",
          solidBg: "#010100",
          solidHoverBg: "#1a1a1a",
          solidActiveBg: "#333333",
          outlinedColor: "#010100",
          outlinedBorder: "#1a1a1a",
          outlinedHoverBorder: "#333333",
          softBg: "#3a3a3a",
          softHoverBg: "#292929",
          softActiveBg: "#1a1a1a",
        },
        background: {
          surface: "#010100", // Dark mode background
          level1: "#1a1a1a",
          level2: "#3a3a3a",
        },
        text: {
          primary: "#e1dcd1", // Bone for contrast
          secondary: "#92bac1", // Light Blue
          tertiary: "#bf2d19", // Engineering Orange
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: "600",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.7,
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded corners for all buttons
          fontWeight: "bold",
          textTransform: "uppercase",
        },
      },
    },
    JoyCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // More rounded edges
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    JoyInput: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          padding: "8px 12px",
          fontSize: "1rem",
        },
      },
    },
  },
});

export default theme;
