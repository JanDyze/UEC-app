import React from "react";
import { IconButton, Input, Stack, Table, Sheet, Typography, Button, Box, Card, Grid, Avatar } from "@mui/joy";
import { Link } from "react-router-dom";
import CalendarComponent from "@/components/Calendar";
import persons from "@/data/persons.json";
import services from "@/data/services.json";
import attendance from "@/data/attendance.json";
import IconSwitch from "@/components/IconSwitch";
import CloseIcon from "@mui/icons-material/Close"
import CheckIcon from "@mui/icons-material/Check"
import SearchIcon from "@mui/icons-material/Search"
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd"
const AttendanceSheet = () => {
    const [attendance, setAttendance] = useState(false);

    return (
        <>
            <Grid container spacing={2} columns={16} sx={{ flexGrow: 1, width: "100%", }}>
                <Grid xs={16} lg={9} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                        <Stack gap={1}>
                            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>

                                <Typography level="h1" color="primary.main">
                                    February 21
                                </Typography>

                            </Stack>
                            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 2 }}>

                                <Stack direction="row" sx={{ alignItems: "center", gap: 1, flex: 1 }}>
                                    <Input
                                        placeholder="Search..."
                                        size="sm"
                                        sx={{
                                            width: "100%",
                                            height: "20px   ", // Adjust height as needed
                                            borderRadius: "24px",
                                            "--Input-placeholderColor": "rgba(0, 0, 0, 0.5)", // Adjust color for better visibility
                                            color: "primary.solidBg", // Text color when typing
                                        }}
                                        endDecorator={
                                            <IconButton size="sm" variant="plain">
                                                <SearchIcon color="primary" />
                                            </IconButton>
                                        }
                                    />
                                </Stack>

                                <Button
                                    sx={{
                                        bgcolor: "primary.main",
                                        borderRadius: "24px",
                                        color: "white", // Ensures text is visible
                                        "&:hover": { bgcolor: "primary.dark" }, // Slightly darken on hover
                                    }}
                                    startDecorator={<PersonAddIcon />} // Adds an icon before the text
                                >
                                    Add attendee
                                </Button>


                            </Stack>

                        </Stack>

                    </Box>
                    <Card>
                        <Table aria-label="basic table">
                            <thead>
                                <tr>
                                    <th>Attendee</th>
                                    <th>
                                        <Stack direction="row" sx={{ justifyContent: "end", gap: 2 }}>
                                            Status
                                        </Stack>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {persons.map((person) => (
                                    <tr key={person.id}>
                                        <td>
                                            <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>         <Avatar
                                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${Math.random()}`}
                                                alt="Random Avatar"
                                            />
                                                {person.firstname} {" "} {person.lastname}
                                            </Stack></td>
                                        <td>
                                            <Stack direction="row" sx={{ justifyContent: "end", gap: 2 }}>
                                                <IconSwitch
                                                    checkedBgColor="success.500"
                                                    uncheckedBgColor="secondary.main"
                                                    checked={attendance}
                                                    onChange={(e) => setAttendance(e.target.checked)}
                                                    uncheckedIcon={<CloseIcon sx={{ color: "primary" }} />} // Sun color
                                                    checkedIcon={<CheckIcon sx={{ color: "success.500" }} />} // Moon color
                                                />
                                            </Stack>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </Grid>
                <Grid xs={16} lg={7} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Card>
                        <CalendarComponent />
                    </Card>
                    <Card>
                        Sample
                    </Card>
                </Grid>
            </Grid >
        </>
    );
};

export default AttendanceSheet;