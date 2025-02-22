import React, { useEffect, useState } from "react";
import { Sheet, Typography, Stack, Avatar, CircularProgress } from "@mui/joy";
import { useParams } from "react-router-dom";
import { fetchPersonById } from "@/api/personsApi"; // Import the API function

const ProfilePage = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPerson = async () => {
            setLoading(true);
            try {
                const data = await fetchPersonById(id);
                setPerson(data);
            } catch (error) {
                console.error("Error fetching person:", error);
                setPerson(null);
            } finally {
                setLoading(false);
            }
        };

        getPerson();
    }, [id]);

    if (loading) {
        return (
            <Sheet sx={{ p: 3, textAlign: "center" }}>
                <CircularProgress />
                <Typography level="h4">Loading...</Typography>
            </Sheet>
        );
    }

    if (!person) {
        return (
            <Sheet sx={{ p: 3, textAlign: "center" }}>
                <Typography level="h3">Person Not Found</Typography>
            </Sheet>
        );
    }

    return (
        <Sheet variant="outlined" sx={{ p: 4, maxWidth: 400, mx: "auto", borderRadius: "md" }}>
            <Stack spacing={2} alignItems="center">
                <Avatar size="lg" />
                <Typography level="h3">{person.firstname} {person.lastname}</Typography>
                <Typography level="body1">Nickname: {person.nickname || "N/A"}</Typography>
                <Typography level="body1">Gender: {person.gender}</Typography>
                <Typography level="body1">Birthday: {person.birthday}</Typography>
                <Typography level="body1">Phone: {person.phone || "N/A"}</Typography>
                <Typography level="body1">
                    Facebook: {person.facebook ? <a href={person.facebook} target="_blank" rel="noopener noreferrer">{person.facebook}</a> : "N/A"}
                </Typography>
                <Typography level="body1">Address: {person.address || "N/A"}</Typography>
            </Stack>
        </Sheet>
    );
};

export default ProfilePage;
