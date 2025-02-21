import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sheet, Typography, Button, Select, Option } from "@mui/joy";

const AttendanceForm = () => {
    const { id } = useParams(); // ID for editing an existing attendance
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [persons, setPersons] = useState([]);
    const [attendance, setAttendance] = useState({
        service_id: "",
        person_id: "",
        status: "Present",
    });

    // Fetch services and persons
    useEffect(() => {
        const fetchData = async () => {
            try {
                const servicesRes = await fetch("http://localhost:5000/api/services");
                const personsRes = await fetch("http://localhost:5000/api/persons");
                const servicesData = await servicesRes.json();
                const personsData = await personsRes.json();

                setServices(servicesData);
                setPersons(personsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // If editing, fetch existing attendance data
    useEffect(() => {
        if (id) {
            const fetchAttendance = async () => {
                try {
                    const res = await fetch(`http://localhost:5000/api/attendance/${id}`);
                    const data = await res.json();
                    setAttendance({
                        service_id: data.service_id,
                        person_id: data.person_id,
                        status: data.status,
                    });
                } catch (error) {
                    console.error("Error fetching attendance:", error);
                }
            };

            fetchAttendance();
        }
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = id ? "PUT" : "POST";
        const url = id
            ? `http://localhost:5000/api/attendance/${id}`
            : "http://localhost:5000/api/attendance";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(attendance),
            });

            if (res.ok) {
                navigate("/"); // Redirect to attendance sheet after success
            } else {
                console.error("Failed to submit attendance");
            }
        } catch (error) {
            console.error("Error submitting attendance:", error);
        }
    };

    return (
        <Sheet
            variant="outlined"
            sx={{
                p: 4,
                maxWidth: 500,
                mx: "auto",
                borderRadius: "md",
                textAlign: "center",
            }}
        >
            <Typography level="h4" sx={{ mb: 2 }}>
                {id ? "Edit Attendance" : "New Attendance"}
            </Typography>

            <form onSubmit={handleSubmit}>
                <Select
                    value={attendance.service_id}
                    onChange={(e, value) => setAttendance({ ...attendance, service_id: value })}
                    placeholder="Select Service"
                    sx={{ mb: 2, width: "100%" }}
                >
                    {services.map((service) => (
                        <Option key={service.id} value={service.id}>
                            {new Date(service.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </Option>
                    ))}
                </Select>

                <Select
                    value={attendance.person_id}
                    onChange={(e, value) => setAttendance({ ...attendance, person_id: value })}
                    placeholder="Select Person"
                    sx={{ mb: 2, width: "100%" }}
                >
                    {persons.map((person) => (
                        <Option key={person.id} value={person.id}>
                            {person.firstname} {person.lastname}
                        </Option>
                    ))}
                </Select>

                <Select
                    value={attendance.status}
                    onChange={(e, value) => setAttendance({ ...attendance, status: value })}
                    sx={{ mb: 2, width: "100%" }}
                >
                    <Option value="Present">Present</Option>
                    <Option value="Absent">Absent</Option>
                </Select>

                <Button type="submit">{id ? "Update Attendance" : "Add Attendance"}</Button>
            </form>
        </Sheet>
    );
};

export default AttendanceForm;
