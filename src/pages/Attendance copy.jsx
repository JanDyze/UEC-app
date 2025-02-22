import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Sheet, Typography, Stack, Avatar, IconButton } from "@mui/joy";
import { fetchAttendanceById, updateAttendance } from "@/api/attendanceApi";
import { fetchPersons } from "@/api/personsApi";
import IconSwitch from "@/components/IconSwitch";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const Attendance = () => {
    const { serviceId } = useParams(); // Get service_id from URL
    const [persons, setPersons] = useState([]);
    const [attendance, setAttendance] = useState({});

    useEffect(() => {
        loadData();
    }, [serviceId]);

    const loadData = async () => {
        const personsData = await fetchPersons();
        console.log("Persons Data:", personsData);

        const attendanceResponse = await fetchAttendanceById(serviceId);
        console.log("Attendance Response:", attendanceResponse);

        let attendanceData = [];
        if (Array.isArray(attendanceResponse)) {
            attendanceData = attendanceResponse;
        } else {
            attendanceData = [attendanceResponse]; // Ensure it's always an array
        }
        console.log("Attendance Data Array:", attendanceData);

        setPersons(personsData);

        // Build attendanceMap ensuring all persons are included
        const attendanceMap = personsData.reduce((acc, person) => {
            // Find the matching attendance record for this person
            const record = attendanceData.find((att) => att.person_id === person._id);

            console.log("Processing Person:", person);
            console.log("Matching Attendance Record:", record);

            // If a record exists, set it based on status; otherwise, default to false (Absent)
            acc[person._id] = record?.status === "Present";
            return acc;
        }, {});



        console.log("Final Attendance Map:", attendanceMap);
        setAttendance(attendanceMap);
    };


    const toggleAttendance = async (personId) => {
        const newStatus = !attendance[personId] ? "Present" : "Absent";
        console.log(`Toggling attendance for personId ${personId}: New status: ${newStatus}`);

        const response = await updateAttendance(serviceId, personId, newStatus);
        console.log("Update response:", response);
        if (response.success) {
            setAttendance(prev => ({ ...prev, [personId]: !prev[personId] }));
        }
    };


    return (
        <Sheet sx={{ p: 3, borderRadius: "md" }}>
            <Typography level="h4" sx={{ mb: 2 }}>
                Attendance for Service ID: {serviceId}
            </Typography>

            <Typography level="body2" sx={{ my: 2, p: 2, backgroundColor: "#f5f5f5", borderRadius: "md" }}>
                <strong>Attendance Data:</strong>
                <pre>{JSON.stringify(attendance, null, 2)}</pre>
            </Typography>
            <Table aria-label="Attendance Table">
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
                        <tr key={person._id}>
                            <td>
                                <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
                                    <Avatar
                                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${person.firstname}-${person.lastname}`}
                                        alt={`${person.firstname} ${person.lastname}`}
                                    />
                                    {person.firstname} {person.lastname}
                                </Stack>
                            </td>
                            <td>
                                <Stack direction="row" sx={{ justifyContent: "end", gap: 2, alignItems: "center" }}>
                                    <IconSwitch
                                        checkedBgColor="success.500"
                                        uncheckedBgColor="secondary.main"
                                        checked={attendance[person._id] || false}
                                        onChange={() => toggleAttendance(person.id)}
                                        uncheckedIcon={<CloseIcon sx={{ color: "primary" }} />}
                                        checkedIcon={<CheckIcon sx={{ color: "success.500" }} />}
                                    />
                                    <IconButton size="sm">
                                        <LockOpenIcon sx={{ color: "neutral.500", fontSize: 20, cursor: "pointer" }} />
                                    </IconButton>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    );
};

export default Attendance;
