import { useState } from "react";
import { Box, IconButton, List, ListItem, ListDivider } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const sidebarWidth = sidebarOpen ? 250 : 60;

    return (
        <Box
            sx={{
                width: sidebarWidth,
                transition: "width 0.3s ease-in-out",
                p: 2,
                bgcolor: "background.level1",
            }}
        >
            <IconButton
                onClick={() => setSidebarOpen(!sidebarOpen)}
                sx={{
                    mb: 2,
                    bgcolor: "neutral.main",
                    "&:hover": { bgcolor: "neutral.hover" },
                }}
            >
                {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>

        </Box>
    );
}
