import { useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/joy";
import { Link, useLocation } from "react-router-dom";
import ChurchIcon from "@mui/icons-material/Church";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ChecklistIcon from "@mui/icons-material/Checklist";

const menuItems = [
    { icon: <ChurchIcon />, label: "Church", path: "/" },
    { icon: <ChecklistIcon />, label: "Attendance", path: "/attendance" },
    { icon: <CalendarMonthIcon />, label: "Services", path: "/services" },
    { icon: <Diversity3Icon />, label: "Members", path: "/persons" },
    { icon: <SettingsIcon />, label: "Settings", path: "/settings" },
];

export default function BottomBar() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                bgcolor: "background.surface",
                boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
                borderTop: "1px solid",
                borderColor: "divider",
                py: 1,
                zIndex: 1000,
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{
                    width: "100%",
                }}
            >
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        onClick={() => setActiveTab(item.path)}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                        }}
                    >
                        <IconButton
                            variant="solid"
                            sx={{
                                bgcolor: activeTab === item.path ? "primary.solidBg" : "transparent",
                                color: activeTab === item.path ? "primary.solidColor" : "text.secondary",
                                "&:hover": { bgcolor: "neutral.softBg" },
                                borderRadius: "50%",
                                width: 48,
                                height: 48,
                                transition: "all 0.3s ease-in-out",
                            }}
                        >
                            {item.icon}
                        </IconButton>
                        <Typography
                            level="body-xs"
                            sx={{
                                fontSize: "0.75rem",
                                fontWeight: activeTab === item.path ? "bold" : "normal",
                                color: activeTab === item.path ? "primary.solidColor" : "text.secondary",
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Link>
                ))}
            </Stack>
        </Box>
    );
}
