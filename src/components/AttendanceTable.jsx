import React from 'react'
import { useState } from "react";
import { IconButton, Input, Stack, Table, Sheet, Typography, Button, Box, Card, Grid, Avatar, Chip } from "@mui/joy";
import LockOpenIcon from "@mui/icons-material/LockOpen"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import IconSwitch from "@/components/IconSwitch";
import CloseIcon from "@mui/icons-material/Close"
import CheckIcon from "@mui/icons-material/Check"
import SearchIcon from "@mui/icons-material/Search"
import persons from "@/data/persons.json";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
const AttendanceTable = () => {
    const [attendance, setAttendance] = useState(false);
    return (
        <>
            <Sheet
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on larger screens
                    justifyContent: "space-between",
                    alignItems: { xs: "center", sm: "flex-end" }, // Center on mobile, end on larger screens
                    gap: 2,
                    mb: 2,
                }}
            >
                {/* Left Side: Date & Service Info */}
                <Stack gap={1} sx={{ textAlign: { xs: "center", sm: "left", width: "100%", } }}>
                    <Typography
                        level="h1"
                        sx={{ color: "primary.main", fontSize: { xs: "1.5rem", sm: "2rem" } }}
                    >
                        February 21
                    </Typography>
                    <Typography
                        level="h4"
                        sx={{ color: "primary.main", fontSize: { xs: "1rem", sm: "1.5rem" } }}
                    >
                        Sunday Service
                    </Typography>
                </Stack>

                {/* Right Side: Search & Buttons */}
                <Stack
                    direction={{ xs: "column", sm: "row" }} // Stack on mobile, inline on desktop
                    spacing={2}
                    alignItems="center"
                    sx={{ width: "100%", maxWidth: { sm: "auto" } }}
                >
                    {/* Search Input */}
                    <Input
                        placeholder="Search..."
                        size="sm"
                        sx={{
                            width: { xs: "100%", sm: "auto" }, // Full width on mobile, auto on larger screens
                            borderRadius: "24px",
                            "--Input-placeholderColor": "rgba(0, 0, 0, 0.5)",
                            color: "primary.solidBg",
                        }}
                        endDecorator={
                            <IconButton size="sm" variant="plain">
                                <SearchIcon color="primary" />
                            </IconButton>
                        }
                    />

                    {/* Buttons */}
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                        sx={{ width: { xs: "100%", sm: "auto" } }}
                    >
                        <Button
                            sx={{
                                bgcolor: "primary.main",
                                borderRadius: "24px",
                                color: "white",
                                "&:hover": { bgcolor: "primary.dark" },
                                width: { xs: "100%", sm: "auto" },
                            }}
                            startDecorator={<PersonAddIcon />}
                        >
                            Add
                        </Button>

                        <Button
                            variant="solid"
                            color="neutral"
                            startDecorator={<LockOpenIcon />}
                            sx={{ width: { xs: "100%", sm: "auto" } }}
                        >
                            Lock
                        </Button>
                    </Stack>
                </Stack>
            </Sheet >

            <Card sx={{ bgcolor: "white", borderRadius: "40px" }}>
                <Table aria-label="basic table" sx={{
                    "& th": { bgcolor: "#fff" },
                }}>
                    <thead >
                        <tr style={{ textTransform: "uppercase" }}>
                            <th style={{ width: "7%", textAlign: "left" }}>Status</th>
                            <th style={{ width: "15%" }}>Attendee</th>
                            <th style={{ width: "25%" }} className="hide-on-small">
                                Roles
                            </th>

                            <th style={{ width: "10%" }} className="hide-on-small">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons.map((person) => (
                            <tr key={person.id}>
                                {/* Status Column - 15% */}
                                <td style={{ width: "15%" }}>
                                    <Stack direction="row" sx={{ justifyContent: "start", gap: 2, alignItems: "center" }}>
                                        {/* <LockOpenIcon sx={{ color: "neutral.500", fontSize: 20, cursor: "pointer" }} /> */}
                                        <IconSwitch
                                            checkedBgColor="success.500"
                                            uncheckedBgColor="secondary.main"
                                            checked={attendance}
                                            onChange={(e) => setAttendance(e.target.checked)}
                                            uncheckedIcon={<CloseIcon sx={{ color: "primary" }} />}
                                            checkedIcon={<CheckIcon sx={{ color: "success.500" }} />}
                                        />
                                    </Stack>
                                </td>

                                {/* Attendee Column - 50% */}
                                <td style={{ width: "50%" }}>
                                    <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
                                        <Avatar
                                            src={`https://randomuser.me/api/portraits/${person.gender === "Male" ? "men" : "women"}/${person.id % 80}.jpg`}
                                            alt={`${person.firstname} ${person.lastname}`}
                                        // sx={{ display: { xs: "none", md: "block" } }} // Hide on xs, show on md+
                                        />
                                        <Typography level="body1">
                                            {person.firstname} {person.lastname}
                                        </Typography>
                                    </Stack>
                                </td>
                                {/* Roles Column - 35% */}
                                {/* Roles Column - Hidden on Small Screens */}
                                <td style={{ width: "35%" }} className="hide-on-small">
                                    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                                        {person.roles.length > 0 ? (
                                            person.roles.map((role, index) => (
                                                <Chip key={index} variant="solid" color="primary" size="sm">
                                                    {role}
                                                </Chip>
                                            ))
                                        ) : (
                                            <Chip variant="soft" color="neutral" size="sm">
                                                No Role
                                            </Chip>
                                        )}
                                    </Stack>
                                </td>


                                <td className="hide-on-small">
                                    <Stack direction="row" sx={{ justifyContent: "start", gap: 0, alignItems: "center" }}>
                                        <IconButton size="md" variant="plain" color="danger">
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                        <IconButton size="md" variant="plain" color="black">
                                            <LockOpenIcon />
                                        </IconButton>
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