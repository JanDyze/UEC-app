import React from 'react'
import { useState } from "react";
import { IconButton, Input, Stack, Table, Sheet, Typography, Button, Box, Card, Grid, Avatar } from "@mui/joy";
import LockOpenIcon from "@mui/icons-material/LockOpen"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import IconSwitch from "@/components/IconSwitch";
import CloseIcon from "@mui/icons-material/Close"
import CheckIcon from "@mui/icons-material/Check"
import SearchIcon from "@mui/icons-material/Search"
import persons from "@/data/persons.json";

const AttendanceTable = () => {
    const [attendance, setAttendance] = useState(false);
    return (
        <>
            <Sheet sx={{ display: "flex", justifyContent: "space-between", alignItems: "end", mb: 2, }}>
                <Stack gap={1}>
                    <Stack direction="column" sx={{ justifyContent: "space-between", justifyContent: "center", }}>
                        <Typography level="h1" sx={{ color: "primary.main" }}>
                            February 21
                        </Typography>
                        <Typography level="h4" sx={{ color: "primary.main" }}>
                            Sunday Service
                        </Typography>
                    </Stack>

                </Stack>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-end", gap: 2, w: "100%" }}>
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1, flex: 1, justifyContent: "flex-end", alignItems: "end" }}>
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
                        Add
                    </Button>
                    <Button
                        variant="solid"
                        color="neutral"
                        startDecorator={<LockOpenIcon />}
                    >
                        Lock
                    </Button>

                </Stack>

            </Sheet>
            <Card sx={{ bgcolor: "white", borderRadius: "40px" }}>
                <Table aria-label="basic table" sx={{
                    "& th": { bgcolor: "#fff" },
                }}>
                    <thead >
                        <tr>
                            <th>Attendee</th>
                            <th>
                                <Stack direction="row" sx={{ justifyContent: "end", gap: 2 }}>
                                    StatusT
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
                                    <Stack direction="row" sx={{ justifyContent: "end", gap: 2, alignItems: "center" }}>
                                        {/* Lock Icon */}

                                        {/* Toggle Switch */}
                                        <IconSwitch
                                            checkedBgColor="success.500"
                                            uncheckedBgColor="secondary.main"
                                            checked={attendance}
                                            onChange={(e) => setAttendance(e.target.checked)}
                                            uncheckedIcon={<CloseIcon sx={{ color: "primary" }} />} // Sun color
                                            checkedIcon={<CheckIcon sx={{ color: "success.500" }} />} // Moon color
                                        />
                                        <LockOpenIcon sx={{ color: "neutral.500", fontSize: 20, cursor: "pointer" }} />
                                    </Stack>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card >
        </>
    )
}

export default AttendanceTable