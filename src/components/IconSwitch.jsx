import * as React from "react";
import { Stack, Switch, Typography } from "@mui/joy";

export default function IconSwitch({
    checkedIcon,
    uncheckedIcon,
    checkedBgColor = "primary",
    uncheckedBgColor = "neutral",
    width = "50px", // Customizable width
    checkedLabel = "PRESENT", // Customizable checked label
    uncheckedLabel = "ABSENT", // Customizable unchecked label

    ...props
}) {
    const [checked, setChecked] = React.useState(false);

    return (
        <Stack direction="row" gap={1}>
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
                    "--Switch-trackHeight": "20px", // Adjust height if needed
                    transition: "background-color 0.3s ease-in-out, width 0.3s ease-in-out",
                }}
                {...props}
            />
            <Typography component="span" level="inherit" >
                {checked ? checkedLabel : uncheckedLabel}
            </Typography>
        </Stack>
    );
}
