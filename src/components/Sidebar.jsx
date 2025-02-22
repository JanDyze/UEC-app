import { useState } from "react";
import { Box, IconButton, Avatar, Stack } from "@mui/joy";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChurchIcon from "@mui/icons-material/Church";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Typography from '@mui/material/Typography'
import { useSidebar } from "@/context/SidebarContext"; // Import context

const menuItems = [
    { icon: <ChurchIcon />, label: "Church", path: "/" },
    { icon: <CalendarMonthIcon />, label: "Attendance", path: "/services" },
    { icon: <Diversity3Icon />, label: "Members", path: "/persons" },
    { icon: <SettingsIcon />, label: "Settings", path: "/" },
];

export default function Sidebar() {
    const { sidebarOpen, setSidebarOpen } = useSidebar(); // Use context
    const sidebarWidth = sidebarOpen ? 220 : 80;

    return (
        <Box
            sx={{
                width: sidebarWidth,
                transition: "width 0.3s ease-in-out",
                p: 2,
                bgcolor: "background.cosmicLatte",
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                gap: 2,
            }}
        >
            {/* Logo */}
            <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{
                    borderRadius: "8px",
                    transition: "background 0.3s ease",
                    "&:hover": { bgcolor: "neutral.light" },
                }}
            >
                <Avatar
                    src="/logo.png" // Change to your logo path
                    alt="Logo"
                    sx={{
                        width: 40,
                        height: 40,
                        transition: "all 0.3s ease-in-out",
                        bgcolor: "transparent",
                    }}
                />
                <Typography
                    sx={{
                        fontSize: "1.3rem", // Equivalent to h4
                        fontWeight: "bold",
                        color: "primary.solidBg",
                        transition: "transform 0.3s ease, opacity 0.3s ease, max-width 0.3s ease",
                        transform: sidebarOpen ? "translateX(0)" : "translateX(-20px)",
                        opacity: sidebarOpen ? 1 : 0,
                        whiteSpace: 'nowrap',
                    }}
                >
                    Canubing II
                </Typography>
            </Stack>
            {/* Toggle Button */}
            <Box sx={{ position: "relative", display: "inline-block" }}>
                <IconButton
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    variant="solid"
                    sx={{
                        mt: 3,
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        bgcolor: "neutral.main",
                        transition: "transform 0.3s ease-in-out",
                        transform: sidebarOpen ? "translateX(180px)" : "translateX(0)",
                        color: "primary.main",
                        "&:hover": { bgcolor: "neutral.hover" },
                        zIndex: "100"
                    }}
                >
                    {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>

                {/* Text positioned relative to IconButton */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "20%",
                        p: 0.5,
                        borderRadius: "14px",
                        bgcolor: "neutral.light",
                        opacity: sidebarOpen ? 1 : 0,
                        whiteSpace: "nowrap", // Keep text in one line
                        transform: sidebarOpen ? "translateX(0)" : "translateX(-20px)",
                        opacity: sidebarOpen ? 1 : 0, fontSize: "1rem",
                        color: "primary.main",
                        userSelect: "none",
                        textAlign: "center",
                        overflow: 'hidden',
                    }}
                >
                    <Typography variant="h5" color="primary" sx={{
                        textAlign: "center",
                    }}>
                        MISSION
                    </Typography>
                    <Typography
                        variant="caption"
                        color="primary.dark"
                        sx={{
                            maxWidth: "200px", // Limit width
                            textAlign: "center",
                            transform: sidebarOpen ? "translateX(0)" : "translateX(-20px)",
                            opacity: sidebarOpen ? 1 : 0,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3, // Limits to 3 lines
                            overflow: "hidden", // Hides overflow text
                            whiteSpace: "normal",
                        }}
                    >
                        We are a Christ-centered community, loving and discipling people to worship God.
                    </Typography>


                </Box   >
            </Box>

            {/* Menu Items */}
            <Stack sx={{ mt: 10, justifyContent: "space-between", flex: 1 }}>
                <Stack gap={1.5}>
                    {menuItems.map((item, index) => (
                        <Link key={index} to={item.path} style={{ textDecoration: "none", width: "100%" }}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                gap={2}
                                sx={{
                                    borderRadius: "8px",
                                    transition: "background 0.3s ease",
                                    "&:hover": { bgcolor: "neutral.light" },
                                }}
                            >
                                <IconButton
                                    variant="solid"
                                    sx={{
                                        borderRadius: "50%",
                                        minWidth: 40,
                                        minHeight: 40,
                                        bgcolor: "neutral.main",
                                        color: "primary.main",
                                        "&:hover": { bgcolor: "neutral.hover" },
                                    }}
                                >
                                    {item.icon}
                                </IconButton>

                                <Typography
                                    level="body-md"
                                    color="primary"
                                    sx={{
                                        transition: "transform 0.3s ease, opacity 0.3s ease, max-width 0.3s ease",
                                        transform: sidebarOpen ? "translateX(0)" : "translateX(-20px)",
                                        opacity: sidebarOpen ? 1 : 0,
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        fontWeight: "bold" // Ensures single-line text
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Stack>
                        </Link>
                    ))}
                </Stack>


                {/* Logout Button */}
                < IconButton
                    variant="solid"
                    sx={{
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        bgcolor: "neutral.main",
                        color: "primary.main",
                        "&:hover": { bgcolor: "neutral.hover" },
                    }}
                >
                    <ExitToAppIcon />
                </IconButton>
            </Stack>
        </Box >
    );
}
