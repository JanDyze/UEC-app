import React from "react";
import { Box, Stack, Grid, Card, Typography, Button } from "@mui/joy";

export function TopBar({ }) {
  return <Box sx={{
    backgroundColor: "primary.solidBg",
    padding: 1,
    color: "white"
  }}>
    <Typography level="h4">UEC Page</Typography>
  </Box>;
}
