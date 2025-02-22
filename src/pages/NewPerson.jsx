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
                {["firstname", "lastname", "address", "nickname", "phone", "facebook"].map((field) => (
                    <Input
                        key={field}
                        name={field}
                        placeholder={field.replace(/^\w/, (c) => c.toUpperCase())} // Capitalizes first letter
                        value={formData[field]}
                        onChange={handleChange}
                        required={["firstname", "lastname", "address", "phone"].includes(field)}
                        sx={{
                            "&::placeholder": { color: "primary.500" }, // Placeholder color
                            "&:focus-within": { color: "primary.main" }, // Focus color
                        }}
                    />
                ))}
                <Input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    required
                    sx={{
                        "&:focus-within": { color: "primary.main" },
                    }}
                />
                <Select
                    name="gender"
                    value={formData.gender}
                    onChange={(e, newValue) => setFormData({ ...formData, gender: newValue })}
                    required
                    sx={{ color: "primary.main" }}
                >
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                </Select>
                <Button type="submit" sx={{ bgcolor: "primary.main", color: "white" }}>Submit</Button>
            </Stack>
        </Sheet>
    );
};

export default NewPerson;
