import { useEffect, useState } from "react";
import { fetchAttendanceRecords, addAttendance } from "@/api/attendanceApi";
import { fetchPersons } from "@/api/personsApi";

const AttendanceList = () => {
    const [attendance, setAttendance] = useState([]);
    const [persons, setPersons] = useState([]);
    const [formData, setFormData] = useState({
        date: "",
        person_id: "",
        status: "Present",
    });

    useEffect(() => {
        const loadData = async () => {
            const attendanceData = await fetchAttendanceRecords();
            const personsData = await fetchPersons();

            setAttendance(attendanceData || []);
            setPersons(personsData || []);
        };
        loadData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { date, person_id, status } = formData;

        const response = await addAttendance({ date, person_id, status });

        if (response) {
            setAttendance((prev) => [...prev, response]);
            setFormData({ date: "", person_id: "", status: "Present" });
        } else {
            alert("Failed to add attendance.");
        }
    };

    return (
        <div>
            <h2>Attendance Records</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <select name="person_id" value={formData.person_id} onChange={handleChange} required>
                    <option value="">Select Person</option>
                    {persons.map((person) => (
                        <option key={person._id} value={person._id}>
                            {person.firstname} {person.lastname}
                        </option>
                    ))}
                </select>

                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                </select>

                <button type="submit" disabled={!formData.date || !formData.person_id}>
                    Add Attendance
                </button>
            </form>

            {attendance.length === 0 ? (
                <p>No attendance records found.</p>
            ) : (
                attendance.map((record) => (
                    <div key={record._id}>
                        {new Date(record.date).toISOString().split("T")[0]} -{" "}
                        {record.person_id?.firstname} {record.person_id?.lastname} -{" "}
                        {record.status}
                    </div>
                ))
            )}
        </div>
    );
};

export default AttendanceList;
