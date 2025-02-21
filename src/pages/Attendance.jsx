import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Sheet, Typography, Button, Box } from "@mui/joy";
import IconSwitch from "@/components/IconSwitch";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";


const Attendance = () => {
    const { serviceId } = useParams(); // Get service_id from URL
    const [persons, setPersons] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [service, setService] = useState(serviceId);

    useEffect(() => {
        fetchPersons();
        fetchService();
        fetchAttendance();
    }, [serviceId]); // Re-fetch when serviceId changes


    const fetchService = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/services/${serviceId}`);
            const data = await res.json();
            setService(data);
        } catch (error) {
            console.error("Error fetching service details:", error);
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

    const fetchAttendance = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/attendance");
            const data = await res.json();
            // Filter attendance records for the given serviceId
            const filteredData = data.filter((a) => a.service_id === parseInt(serviceId));
            setAttendance(filteredData);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };

    const toggleAttendance = async (personId) => {
        const existingRecord = attendance.find((a) => a.person_id === personId);

        // Determine the new status
        const newStatus = existingRecord
            ? existingRecord.status === "Present"
                ? "Absent"
                : "Present"
            : "Present"; // Default to Present if no record exists

        const updatedRecord = {
            service_id: parseInt(serviceId),
            person_id: personId,
            status: newStatus,
        };

        try {
            const res = await fetch(`http://localhost:5000/api/attendance`, {
                method: existingRecord ? "PUT" : "POST", // Update if exists, else create new
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedRecord),
            });

            if (res.ok) {
                // Update the attendance state
                setAttendance((prevAttendance) => {
                    if (existingRecord) {
                        return prevAttendance.map((a) =>
                            a.person_id === personId ? { ...a, status: newStatus } : a
                        );
                    } else {
                        return [...prevAttendance, { ...updatedRecord, id: Date.now() }];
                    }
                });
            } else {
                console.error("Failed to update attendance");
            }
        } catch (error) {
            console.error("Error updating attendance:", error);
        }
    };

    return (
        <Sheet variant="outlined" sx={{ p: 2, borderRadius: "md", width: "90vw", mx: "auto", mt: 4 }}>
            <Box sx={{}}>
                <IconSwitch
                    checkedIcon={<CheckIcon />}
                    uncheckedIcon={<CloseIcon />}
                    checkedBgColor="success" // Set the background color when ON
                    uncheckedBgColor="danger" // Set the background color when OFF
                />            </Box>
            <Typography level="h4" sx={{ mb: 2 }}>
                Attendance List for Service #{serviceId}
            </Typography>
            {service && (
                <Typography level="body1" sx={{ mb: 2 }}>
                    Service Date: {new Date(service.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </Typography>
            )}

            <Table borderAxis="both" sx={{ width: "100%", overflow: "auto" }}>
                <thead>
                    <tr>
                        <th>Person</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.length > 0 ? (
                        persons.map((person) => {
                            const record = attendance.find((a) => a.person_id === person.id);
                            const statusText = record
                                ? record.status === "Present"
                                    ? "✅ Present"
                                    : "❌ Absent"
                                : "⏳ Not Marked Yet";

                            return (
                                <tr key={person.id}>
                                    <td>{person.firstname} {person.lastname}</td>
                                    <td>{statusText}</td>
                                    <td>
                                        <Button size="sm" onClick={() => toggleAttendance(person.id)}>
                                            Toggle Status
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="3">No persons found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Sheet>
    );
};

export default Attendance;
