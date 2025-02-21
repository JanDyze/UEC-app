import React, { useEffect, useState } from "react";
import { Table, Sheet, Typography, Button, IconButton } from "@mui/joy";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; // View icon

const ServicesList = () => {
    const [services, setServices] = useState([]);
    const [presentCounts, setPresentCounts] = useState({}); // Stores present count for each service

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/services");
            const data = await res.json();
            setServices(data);
            fetchPresentCounts(data); // Fetch present counts after fetching services
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchPresentCounts = async (services) => {
        const counts = {};
        await Promise.all(
            services.map(async (service) => {
                try {
                    const res = await fetch(`http://localhost:5000/api/attendance/${service.id}/count/present`);
                    const data = await res.json();
                    counts[service.id] = data.presentCount; // Store count by service ID
                } catch (error) {
                    console.error(`Error fetching present count for service ${service.id}:`, error);
                    counts[service.id] = 0; // Default to 0 if there's an error
                }
            })
        );
        setPresentCounts(counts);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/services/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setServices(services.filter((service) => service.id !== id));
                setPresentCounts((prev) => {
                    const newCounts = { ...prev };
                    delete newCounts[id]; // Remove count entry for deleted service
                    return newCounts;
                });
            } else {
                console.error("Failed to delete service");
            }
        } catch (error) {
            console.error("Error deleting service:", error);
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
                Services List
            </Typography>

            <Button component={Link} to="/new-service" sx={{ mb: 2 }}>
                Add New Service
            </Button>

            <Table borderAxis="both" sx={{ width: "90%", maxHeight: "70vh", overflow: "auto" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Present Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.length > 0 ? (
                        services.map((service) => (
                            <tr key={service.id}>
                                <td>{service.id}</td>
                                <td>{new Date(service.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
                                <td>{presentCounts[service.id] ?? "Loading..."}</td>
                                <td>
                                    <IconButton component={Link} to={`/attendance/${service.id}`} size="sm" color="primary">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton component={Link} to={`/edit-service/${service.id}`} size="sm">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(service.id)} size="sm" color="danger">
                                        <DeleteIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No services found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Sheet>
    );
};

export default ServicesList;
