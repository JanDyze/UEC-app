import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sheet, Typography, Button, Input } from "@mui/joy";

const EditPerson = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [person, setPerson] = useState({
        firstname: "",
        lastname: "",
        phone: "",
    });

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/persons/${id}`);
                const data = await res.json();
                setPerson(data);
            } catch (error) {
                console.error("Error fetching person:", error);
            }
        };

        fetchPerson();
    }, [id]);

    const handleChange = (e) => {
        setPerson({ ...person, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/persons/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(person),
            });

            if (res.ok) {
                navigate("/persons");
            } else {
                console.error("Failed to update person");
            }
        } catch (error) {
            console.error("Error updating person:", error);
        }
    };

    return (
        <Sheet
            variant="outlined"
            sx={{
                p: 3,
                borderRadius: "md",
                width: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography level="h4" sx={{ mb: 2 }}>
                Edit Person
            </Typography>
            <form onSubmit={handleSubmit}>
                <Input name="firstname" value={person.firstname} onChange={handleChange} placeholder="First Name" sx={{ mb: 2 }} />
                <Input name="lastname" value={person.lastname} onChange={handleChange} placeholder="Last Name" sx={{ mb: 2 }} />
                <Input name="phone" value={person.phone} onChange={handleChange} placeholder="Phone Number" sx={{ mb: 2 }} />
                <Button type="submit">Save Changes</Button>
            </form>
        </Sheet>
    );
};

export default EditPerson;
