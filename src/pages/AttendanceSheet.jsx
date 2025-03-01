import React from "react";
import { Grid, Card } from "@mui/joy";
import CalendarComponent from "@/components/Calendar";
import AttendanceTable from "@/components/AttendanceTable";

const AttendanceSheet = () => {
    return (
        <Grid container spacing={2} columns={16} sx={{ width: "auto" }}>
            {/* Attendance Table - Moves below Calendar on small screens */}
            <Grid
                xs={16}
                lg={11}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    order: { xs: 2, lg: 1 }, // Moves below on small screens
                }}
            >
                <Card>
                    <AttendanceTable />
                </Card>
            </Grid>

            {/* Calendar & Sample - Moves above AttendanceTable on small screens */}
            <Grid
                xs={16}
                lg={5}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    order: { xs: 1, lg: 2 }, // Moves above on small screens
                }}
            >
                <Card>
                    <CalendarComponent />
                </Card>
                <Card>
                    Sample
                </Card>
            </Grid>
        </Grid>
    );
};

export default AttendanceSheet;
