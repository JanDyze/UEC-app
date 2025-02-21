import React from "react";
import { Table, Sheet, Typography, Button } from "@mui/joy";
import persons from "../data/persons.json";
import services from "../data/services.json";
import attendance from "../data/attendance.json";
import { Link } from "react-router-dom";

const getAttendanceData = () => {
    return attendance.map((record) => {
        const person = persons.find((p) => p.id === record.person_id);
        return {
            id: record.id,
            name: person ? `${person.firstname} ${person.lastname}` : "Unknown",
            status: record.status,
        };
    });
};

const AttendanceSheet = () => {
    const attendanceData = getAttendanceData();

    return (
        <>
            <Button component={Link} to="/new-person" sx={{ mb: 2 }}>
                Add New Person
            </Button>
            <Sheet variant="outlined" sx={{ p: 2, borderRadius: "md", maxWidth: 400 }}>
                <Typography level="h4" sx={{ mb: 2 }}>
                    Attendance Sheet
                </Typography>
                <Table borderAxis="both">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((record) => (
                            <tr key={record.id}>
                                <td>
                                    <Link to={`/profile/${record.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                        {record.name}
                                    </Link>
                                </td>
                                <td>{record.status}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </Sheet>
        </>
    );
};

export default AttendanceSheet;