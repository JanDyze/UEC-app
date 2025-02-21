import { CssBaseline, CssVarsProvider, Box } from "@mui/joy";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // Import the new routes file
import theme from "./theme";

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </CssVarsProvider>
  );
}

export default App;
