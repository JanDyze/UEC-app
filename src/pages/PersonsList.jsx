import React, { useEffect, useState } from "react";
import { Table, Sheet, Typography, Button, IconButton } from "@mui/joy";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; // View Icon

const PersonsList = () => {
    const [persons, setPersons] = useState([]);

    // Fetch persons from the backend
    useEffect(() => {
        fetchPersons();
    }, []);

    const fetchPersons = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/persons");
            const data = await res.json();
            setPersons(data);
        } catch (error) {
            console.error("Error fetching persons:", error);
        }
    };

    // Handle delete person
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this person?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/persons/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setPersons(persons.filter((person) => person.id !== id));
            } else {
                console.error("Failed to delete person");
            }
        } catch (error) {
            console.error("Error deleting person:", error);
        }
    };

    return (
        <Sheet
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: "md",
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography level="h4" sx={{ mb: 2 }}>
                Persons List
            </Typography>

            <Button component={Link} to="/new-person" sx={{ mb: 2 }}>
                Add New Person
            </Button>

            <Table borderAxis="both" sx={{ width: "90%", maxHeight: "70vh", overflow: "auto" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.length > 0 ? (
                        persons.map((person) => (
                            <tr key={person.id}>
                                <td>
                                    {person.firstname} {person.lastname}
                                </td>
                                <td>{person.phone || "N/A"}</td>
                                <td>
                                    {/* View Button */}
                                    <IconButton component={Link} to={`/profile/${person.id}`} size="sm">
                                        <VisibilityIcon />
                                    </IconButton>

                                    {/* Edit Button */}
                                    <IconButton component={Link} to={`/edit-person/${person.id}`} size="sm">
                                        <EditIcon />
                                    </IconButton>

                                    {/* Delete Button */}
                                    <IconButton onClick={() => handleDelete(person.id)} size="sm" color="danger">
                                        <DeleteIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        ))
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

export default PersonsList;
