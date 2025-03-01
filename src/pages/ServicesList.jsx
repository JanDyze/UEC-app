import React, { useEffect, useState } from "react";
import { Table, Typography, Button, IconButton, Modal, ModalDialog, Stack, Input, Select, Option } from "@mui/joy";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { fetchServices, addService, deleteService } from "../api/servicesApi";

const ServicesList = () => {
    const [services, setServices] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [newService, setNewService] = useState({ date: "", type_of_event: "" });

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        const serviceData = await fetchServices();
        setServices(serviceData);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;

        const success = await deleteService(id);
        if (success) {
            setServices(services.filter((service) => service._id !== id));
        }
    };

    const handleAddService = async () => {
        if (!newService.date || !newService.type_of_event) {
            alert("Please fill in all fields.");
            return;
        }

        const addedService = await addService(newService);
        if (addedService) {
            setServices([...services, addedService]);
            setNewService({ date: "", type_of_event: "" });
            setOpenModal(false);
        }
    };

    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", mb: 2 }}>
                Services List
            </Typography>

            <Button startDecorator={<AddIcon />} onClick={() => setOpenModal(true)} sx={{ mb: 2 }}>
                Add New Service
            </Button>

            <Table borderAxis="both" sx={{ width: "90%", maxHeight: "70vh", overflow: "auto" }}>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Date</th>
                        <th>Type of Event</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.length > 0 ? (
                        services.map((service) => (
                            <tr key={service._id}>
                                {/* <td>{service._id}</td> */}
                                <td>{new Date(service.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
                                <td>{service.type_of_event}</td>
                                <td>
                                    <IconButton component={Link} to={`/attendance/${service._id}`} size="sm" color="primary">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton component={Link} to={`/edit-service/${service._id}`} size="sm">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(service._id)} size="sm" color="danger">
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

            {/* Modal for adding a new service */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <ModalDialog sx={{ width: "400px", padding: "20px" }}>
                    <Typography level="h4" sx={{ mb: 2 }}>
                        Add New Service
                    </Typography>
                    <Stack spacing={2}>
                        <Input
                            type="date"
                            value={newService.date}
                            onChange={(e) => setNewService({ ...newService, date: e.target.value })}
                            placeholder="Select Date"
                        />
                        <Select
                            value={newService.type_of_event}
                            onChange={(e, value) => setNewService({ ...newService, type_of_event: value })}
                            placeholder="Select Event Type"
                        >
                            <Option value="Sunday Service">Sunday Service</Option>
                            <Option value="Bible Study">Bible Study</Option>
                            <Option value="Prayer Meeting">Prayer Meeting</Option>
                            <Option value="Special Event">Special Event</Option>
                        </Select>
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button onClick={() => setOpenModal(false)} variant="plain">
                                Cancel
                            </Button>
                            <Button onClick={handleAddService} variant="solid">
                                Add
                            </Button>
                        </Stack>
                    </Stack>
                </ModalDialog>
            </Modal>
        </div>
    );
};

export default ServicesList;
