import * as React from "react";
import { Stack, Switch, Typography } from "@mui/joy";

export default function IconSwitch({
    checkedIcon,
    uncheckedIcon,
    checkedBgColor = "primary",
    uncheckedBgColor = "secondary",
    width = "50px",
    height = "30px",
}) {
    const [checked, setChecked] = React.useState(false);

    return (
        <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            size="lg"
            color={checked ? checkedBgColor : uncheckedBgColor}
            slotProps={{
                input: { "aria-label": "Mode toggle" },
                thumb: {
                    children: checked ? checkedIcon : uncheckedIcon,
                    sx: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease-in-out",
                        bgcolor: "neutral.light",
                    },
                },
                // track: {
                //     children: (
                //         <Typography component="span" level="inherit" >
                //             {checked ? checkedLabel : uncheckedLabel}
                //         </Typography>
                //     ),
                //     sx: {
                //         display: "flex",
                //         alignItems: "end",
                //         justifyContent: checked ? "flex-start" : "flex-end", // Align text
                //         px: 1, // Add padding to keep text inside
                //         width, // Custom width
                //         transition: "justify-content 1s ease-in-out, transform 1s ease-in-out"
                //     },
                // },
            }}
            sx={{
                "--Switch-thumbSize": "25px",
                "--Switch-trackWidth": width, // Adjust the width of the switch
                "--Switch-trackHeight": height, // Adjust height if needed
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer", // Ensure cursor changes properly
                transition: "background-color 0.3s ease-in-out, width 0.3s ease-in-out",
            }}

        />
    );
}
