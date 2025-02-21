import { CssBaseline, CssVarsProvider, Box } from "@mui/joy";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"; // Import the new routes file
import theme from "./theme";

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ justifyContent: "center", display: "flex", alignItems: "center", height: "100vh" }}>
          <AppRoutes />
        </Box>
      </Router>
    </CssVarsProvider>
  );
}

export default App;
