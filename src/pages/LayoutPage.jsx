import { Box } from "@mui/joy";
import { Outlet } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";

export default function LayoutPage() {
    return (
        <Box sx={{ height: "100vh", display: "flex", bgcolor: "background.surface" }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Top Bar */}
                <TopBar />

                {/* Page Content */}
                <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Outlet /> {/* This will render child routes */}
                </Box>
            </Box>
        </Box>
    );
}
