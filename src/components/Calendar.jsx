import { useState } from "react";
import { Box, Typography, Sheet } from "@mui/joy";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());

    return (
        <Sheet
            sx={{
                p: 2,
                borderRadius: "md",
                bgcolor: "background.surface",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                width: "100%",
                // maxWidth: 400, // Adjust as needed
            }}
        >
            <Typography level="h4" sx={{ color: "primary.solidBg" }}>
                Select a Date
            </Typography>

            <Box
                sx={{
                    "& .react-calendar": {
                        width: "100%",
                        border: "none",
                        backgroundColor: "transparent",
                    },
                    "& .react-calendar__tile--active": {
                        backgroundColor: "primary.solidBg",
                        color: "white",
                        borderRadius: "8px",
                    },
                    "& .react-calendar__tile": {
                        borderRadius: "8px",
                    },
                }}
            >
                <Calendar value={date} onChange={setDate} />
            </Box>

            <Typography level="body1">
                Selected Date: {date.toDateString()}
            </Typography>
        </Sheet>
    );
};

export default CalendarComponent;
