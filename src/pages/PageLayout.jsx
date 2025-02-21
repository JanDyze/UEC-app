import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import React from "react";
import { Box } from "@mui/joy";

function PageLayout() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TopBar />
            <Sidebar />
        </Box>
    );
}

export default PageLayout;
