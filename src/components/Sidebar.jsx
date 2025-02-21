import React from "react";
import { useState } from "react";
import { Divider, Box, Drawer, List, ListItem, ListItemButton, Typography } from "@mui/joy";

export function Sidebar() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(inOpen);
    };

    return (
        <Drawer open={open} onClose={toggleDrawer(false)}>
            <Box
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
                        <ListItem key={text}>
                            <ListItemButton>{text}</ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text) => (
                        <ListItem key={text}>
                            <ListItemButton>{text}</ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}

// export default Sidebar;
