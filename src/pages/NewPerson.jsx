import React, { useState } from "react";
import { Sheet, Typography, Stack, Input, Button, Select, Option } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { addPerson } from "../api/personsApi"; // Import API function

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

    const [error, setError] = useState(null); // State for error handling

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addPerson(formData); // Use API function
            if (response) {
                navigate("/persons"); // Redirect after success
            } else {
                setError("Failed to add person.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred while adding the person.");
        }
    };

    return (
        <Sheet variant="outlined" sx={{ p: 4, maxWidth: 400, mx: "auto", borderRadius: "md", color: "primary.main" }}>
            <Typography level="h3" sx={{ mb: 2, color: "primary.main" }}>Add New Person</Typography>
            {error && <Typography sx={{ color: "danger.main" }}>{error}</Typography>}
            <Stack spacing={2} component="form" onSubmit={handleSubmit} sx={{ color: "primary.main" }}>
                <Input
                    name="firstname"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    sx={{ "&::placeholder": { color: "primary.500" }, "&:focus-within": { color: "primary.main" } }}
                />
                <Input
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    sx={{ "&::placeholder": { color: "primary.500" }, "&:focus-within": { color: "primary.main" } }}
                />
                <Input
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    sx={{ "&::placeholder": { color: "primary.500" }, "&:focus-within": { color: "primary.main" } }}
                />
                <Input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    sx={{ "&:focus-within": { color: "primary.main" } }}
                />
                <Select
                    name="gender"
                    value={formData.gender}
                    onChange={(e, newValue) => setFormData({ ...formData, gender: newValue })}
                    sx={{ color: "primary.main" }}
                >
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                </Select>
                <Input
                    name="nickname"
                    placeholder="Nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    sx={{ "&::placeholder": { color: "primary.500" }, "&:focus-within": { color: "primary.main" } }}
                />
                <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    sx={{ "&::placeholder": { color: "primary.500" }, "&:focus-within": { color: "primary.main" } }}
                />
                <Input
                    name="facebook"
                    placeholder="Facebook Profile Link"
                    value={formData.facebook}
                    onChange={handleChange}
                    sx={{ "&::placeholder": { color: "primary.500" }, "&:focus-within": { color: "primary.main" } }}
                />
                <Button type="submit" sx={{ bgcolor: "primary.main", color: "white" }}>Submit</Button>
            </Stack>
        </Sheet>
    );
};

export default NewPerson;
