import { Box, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material"; // ✅ Import from MUI Material
import { Outlet } from "react-router-dom";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";

export default function LayoutPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md")); // ✅ Now works correctly

    return (
        <SidebarProvider>
            <Box sx={{ height: "100vh", display: "flex", bgcolor: "background.solidHoverBg" }}>
                {/* Show Sidebar on Large Screens, Hide on Mobile */}
                {!isMobile && <Sidebar />}

                {/* Main Content Area */}
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Top Bar */}
                    <TopBar />

                    {/* Page Content */}
                    <Box
                        sx={{
                            p: { xs: 1, sm: 2 }, // No padding on small screens, 2 on medium+
                            mt: { xs: 1, sm: 3 }, // No margin on small screens, 3 on medium+
                            mb: { xs: 15, sm: 0 }, // No margin on small screens, 3 on medium+
                            maxHeight: "100vh",
                            overflow: "auto",
                        }}
                    >
                        <Outlet /> {/* This will render child routes */}
                    </Box>

                    {/* Show BottomBar on Mobile, Hide on Large Screens */}
                    {isMobile && <BottomBar />}
                </Box>
            </Box>
        </SidebarProvider>
    );
}
