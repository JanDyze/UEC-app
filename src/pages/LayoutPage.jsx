import { Box } from "@mui/joy";
import { Outlet } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";

export default function LayoutPage() {
    return (
        <SidebarProvider> {/* ✅ Wraps everything */}
            <Box sx={{ height: "100vh", display: "flex", bgcolor: "background.solidHoverBg" }}>
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Top Bar */}
                    <TopBar />

                    {/* Page Content */}
                    <Box sx={{ p: 2, mt: 3 }}>
                        <Outlet /> {/* This will render child routes */}
                    </Box>
                </Box>
            </Box>
        </SidebarProvider>
    );
}
