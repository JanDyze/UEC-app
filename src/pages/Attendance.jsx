import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAttendanceByServiceId, setAttendanceByServiceId, updateAttendance } from "../api/attendanceApi";
import { fetchServiceById } from "../api/servicesApi"; // Import service fetching function
import { Table, Typography, IconButton, Switch } from "@mui/joy";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const AttendanceByService = () => {
    const { serviceId } = useParams();
    const [attendance, setAttendance] = useState([]);
    const [serviceType, setServiceType] = useState("");

    const [serviceDate, setServiceDate] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initializeAttendance();
    }, [serviceId]);

    const initializeAttendance = async () => {
        setLoading(true);

        // Fetch service details (date)
        const service = await fetchServiceById(serviceId);
        if (service) {
            setServiceDate(service.date);
            setServiceType(service.type_of_event); // Assuming API returns { type_of_event: "Sunday Service" }
            // Assuming the API returns { date: "YYYY-MM-DD" }
        }

        // Set attendance
        await setAttendanceByServiceId(serviceId);
        const records = await fetchAttendanceByServiceId(serviceId);
        setAttendance(records);
        setLoading(false);
    };

    const handleStatusChange = async (id, currentStatus) => {
        const newStatus = currentStatus === "Present" ? "Absent" : "Present";
        await updateAttendance(id, { status: newStatus });
        setAttendance(attendance.map(record =>
            record._id === id ? { ...record, status: newStatus } : record
        ));
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", mb: 1 }}>
                {serviceDate
                    ? new Date(serviceDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })
                    : "Loading..."}
            </Typography>

            <Typography sx={{ fontSize: "1.2rem", color: "gray", mb: 2 }}>
                {serviceType || "Loading event type..."}
            </Typography>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table borderAxis="both" sx={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((record) => (
                            <tr key={record._id}>
                                <td>
                                    {record.person_id ? `${record.person_id.firstname} ${record.person_id.lastname}` : "Unknown"}
                                </td>
                                <td>
                                    <Switch
                                        checked={record.status === "Present"}
                                        onChange={() => handleStatusChange(record._id, record.status)}
                                        startDecorator={<CloseIcon />}
                                        endDecorator={<CheckIcon />}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default AttendanceByService;
