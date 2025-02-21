import { Box, Typography, Stack, Avatar, IconButton } from "@mui/joy";
import IconSwitch from "@/components/IconSwitch"
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from "@mui/icons-material/LightMode"
import SearchIcon from "@mui/icons-material/Search"
export default function TopBar() {
  return (
    <Box sx={{ width: "100%", p: 2, bgcolor: "background.surface", textAlign: "center", display: "flex" }}>
      <Stack direction="row" sx={{
        justifyContent: "start",
        alignItems: "center",
        flexGrow: 1,
      }}>

      </Stack>
      <Stack direction="row" sx={{
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}>
        <IconSwitch
          uncheckedIcon={<LightModeIcon />}
          checkedIcon={<DarkModeIcon />} />
      </Stack>
      <Stack direction="row" sx={{
        justifyContent: "end",
        alignItems: "center",
        flexGrow: 1,
      }}
        gap={1}>
        <IconButton aria-label="" >
          <SearchIcon />
        </IconButton>
        <Avatar src="https://i.pravatar.cc/150?img=3" alt="Profile" />

      </Stack>
    </Box>
  );
}
