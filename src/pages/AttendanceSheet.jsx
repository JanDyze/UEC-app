import React from "react";
import { Stack, Typography, Box, Card, Grid, } from "@mui/joy";
import CalendarComponent from "@/components/Calendar";
import AttendanceTable from "@/components/AttendanceTable";

const AttendanceSheet = () => {


    return (
        <>
            <Grid container spacing={2} columns={16} sx={{ flexGrow: 1, width: "100%", }}>
                <Grid xs={16} lg={11} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Card>
                        <AttendanceTable />
                    </Card>
                </Grid>
                <Grid xs={16} lg={5} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Card>
                        <CalendarComponent />
                    </Card>
                    <Card>
                        Sample
                    </Card>
                </Grid>
            </Grid >
        </>
    );
};

export default AttendanceSheet;