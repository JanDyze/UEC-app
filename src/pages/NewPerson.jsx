import React, { useState } from "react";
import { Sheet, Typography, Stack, Input, Button, Select, Option } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const NewPerson = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        address: "",
        birthday: "",
        gender: "",
        nickname: "",
        phone: "",
        facebook: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/persons/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate("/persons"); // Redirect to home page after successful submission
            } else {
                console.error("Failed to add person");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Sheet variant="outlined" sx={{ p: 4, maxWidth: 400, mx: "auto", borderRadius: "md" }}>
            <Typography level="h3" sx={{ mb: 2 }}>Add New Person</Typography>
            <Stack spacing={2} component="form" onSubmit={handleSubmit}>
                <Input name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
                <Input name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
                <Input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <Input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
                <Select name="gender" value={formData.gender} onChange={(e, newValue) => setFormData({ ...formData, gender: newValue })} required>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                </Select>
                <Input name="nickname" placeholder="Nickname" value={formData.nickname} onChange={handleChange} />
                <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                <Input name="facebook" placeholder="Facebook Profile Link" value={formData.facebook} onChange={handleChange} />
                <Button type="submit">Submit</Button>
            </Stack>
        </Sheet>
    );
};

export default NewPerson;
