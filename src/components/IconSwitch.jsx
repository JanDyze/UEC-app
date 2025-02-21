import * as React from "react";
import { Switch } from "@mui/joy";

export default function IconSwitch({
    checkedIcon,
    uncheckedIcon,
    checkedBgColor = "primary",
    uncheckedBgColor = "neutral",
    checkedIconColor = "primary.main",
    uncheckedIconColor = "white",
    width = "50px",
    height = "30px",
}) {
    const [checked, setChecked] = React.useState(false);

    return (
        <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            size="lg"
            slotProps={{
                input: { "aria-label": "Mode toggle" },
                thumb: {
                    children: checked ? (
                        React.cloneElement(checkedIcon, { sx: { color: checkedIconColor } })
                    ) : (
                        React.cloneElement(uncheckedIcon, { sx: { color: uncheckedIconColor } })
                    ),
                    sx: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease-in-out",
                        bgcolor: checked ? uncheckedBgColor + ".main" : checkedBgColor + ".light",
                    },
                },
                track: {
                    sx: {
                        display: "flex",
                        alignItems: "end",
                        bgcolor: checked ? checkedBgColor : uncheckedBgColor,
                        justifyContent: checked ? "flex-start" : "flex-end",
                        px: 1,
                        width,
                        transition: "justify-content 1s ease-in-out, transform 1s ease-in-out",
                    },
                },
            }}
            sx={{
                "--Switch-thumbSize": "25px",
                "--Switch-trackWidth": width,
                "--Switch-trackHeight": height,
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.3s ease-in-out, width 0.3s ease-in-out",
            }}
        />
    );
}
