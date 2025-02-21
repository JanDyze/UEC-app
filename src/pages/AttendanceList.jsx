import React, { useEffect, useState } from "react";
import { Table, Sheet, Typography, Button, IconButton } from "@mui/joy";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AttendanceList = () => {
    const [attendance, setAttendance] = useState([]);
    const [persons, setPersons] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetchAttendance();
        fetchPersons();
        fetchServices();
    }, []);

    const fetchAttendance = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/attendance");
            const data = await res.json();
            setAttendance(data);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };

    const fetchPersons = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/persons");
            const data = await res.json();
            setPersons(data);
        } catch (error) {
            console.error("Error fetching persons:", error);
        }
    };

    const fetchServices = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/services");
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    return (
        <Sheet variant="outlined" sx={{ p: 2, borderRadius: "md", width: "90vw", mx: "auto", mt: 4 }}>
            <Typography level="h4" sx={{ mb: 2 }}>
                Attendance List
            </Typography>

            <Button component={Link} to="/new-attendance" sx={{ mb: 2 }}>
                Add New Attendance
            </Button>

            <Table borderAxis="both" sx={{ width: "100%", overflow: "auto" }}>
                <thead>
                    <tr>
                        <th>Service Date</th>
                        <th>Person</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.length > 0 ? (
                        attendance.map((record) => {
                            const service = services.find((s) => s.id === record.service_id);
                            const person = persons.find((p) => p.id === record.person_id);

                            return (
                                <tr key={record.id}>
                                    <td>
                                        {service
                                            ? new Date(service.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })
                                            : "Unknown"}
                                    </td>
                                    <td>{person ? `${person.firstname} ${person.lastname}` : "Unknown"}</td>
                                    <td>{record.status}</td>
                                    <td>
                                        <IconButton component={Link} to={`/edit-attendance/${record.id}`} size="sm">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(record.id)} size="sm" color="danger">
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="4">No attendance records found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Sheet>
    );
};

export default AttendanceList;
