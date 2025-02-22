import { Box, Typography, Stack, Avatar, IconButton, Tooltip } from "@mui/joy";
import IconSwitch from "@/components/IconSwitch";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState } from "react";
import { useSidebar } from "@/context/SidebarContext"; // Import context

const TopBar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { sidebarOpen } = useSidebar(); // ✅ Get sidebar state

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        bgcolor: "background.solidHoverBg",
        display: "flex",
        alignItems: "center",
        borderRadius: "0 0 12px 12px", // Rounded bottom
      }}
    >
      {/* Left Side (Logo/Title Placeholder) */}
      <Stack direction="row" sx={{ flexGrow: 1, alignItems: "center" }}>
        <Typography
          level="h4"
          sx={{
            fontWeight: "bold",
            color: "primary.solidBg",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: sidebarOpen ? 0 : 1, // Hide when sidebar is open
            transform: sidebarOpen ? "translateX(-20px)" : "translateX(0)",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          UEC Canubing II
        </Typography>
      </Stack>

      {/* Middle (Theme Toggle) */}
      <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
        <IconSwitch
          checkedBgColor="primary"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
          uncheckedIcon={<LightModeIcon sx={{ color: "background.cosmicLatte" }} />} // Sun color
          checkedIcon={<DarkModeIcon sx={{ color: "primary.dark" }} />} // Moon color
        />
      </Stack>

      {/* Right Side (Search & Profile) */}
      <Stack direction="row" sx={{ justifyContent: "end", alignItems: "center", flexGrow: 1 }} gap={1}>
        <Tooltip title="Search">
          <IconButton variant="solid" sx={{ borderRadius: "50%", width: 40, height: 40 }}>
            <NotificationsIcon sx={{ color: "primary.main" }} />
          </IconButton>

        </Tooltip>
        <Tooltip title="Profile">
          <Avatar
            src="https://i.pravatar.cc/150?img=3"
            alt="Profile"
            sx={{ cursor: "pointer", border: "2px solid", borderColor: "primary.solidBg" }}
          />
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default TopBar;
