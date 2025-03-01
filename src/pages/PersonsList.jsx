import React, { useEffect, useState } from "react";
import { Table, Sheet, Typography, Button, IconButton, Grid } from "@mui/joy";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { fetchPersons, deletePerson } from "@/api/personsApi";

const PersonsList = () => {
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch persons from the backend
    useEffect(() => {
        loadPersons();
    }, []);

    const loadPersons = async () => {
        setLoading(true);
        const data = await fetchPersons();
        setPersons(data);
        setLoading(false);
    };

    // Handle delete person
    const handleDelete = async (_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this person?");
        if (!confirmDelete) return;

        const success = await deletePerson(_id);
        if (success) {
            setPersons((prev) => prev.filter((person) => person._id !== _id));
        } else {
            alert("Failed to delete person. Please try again.");
        }
    };

    return (
        <Grid container spacing={2} columns={16} sx={{ width: "auto", }}>

            <Sheet
                sx={{
                    p: 2,
                    borderRadius: "md",
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
                        {loading ? (
                            <tr>
                                <td colSpan="3">Loading persons...</td>
                            </tr>
                        ) : persons.length > 0 ? (
                            persons.map((person) => (
                                <tr key={person._id}>
                                    <td>
                                        {person.firstname} {person.lastname}
                                    </td>
                                    <td>{person.phone || "N/A"}</td>
                                    <td>
                                        <IconButton component={Link} to={`/profile/${person._id}`} size="sm">
                                            <VisibilityIcon />
                                        </IconButton>

                                        <IconButton component={Link} to={`/edit-person/${person._id}`} size="sm">
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton onClick={() => handleDelete(person._id)} size="sm" color="danger">
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
        </Grid>
    );
};

export default PersonsList;
