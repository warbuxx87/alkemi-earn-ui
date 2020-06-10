// Sub Component

// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    SvgIcon,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import { XCircle as XIcon } from "react-feather";
import SidebarDashboardItem from "containers/Sidebar/DashboardItem";
import SidebarLendItem from "containers/Sidebar/LendItem";
import SidebarBorrowItem from "containers/Sidebar/BorrowItem";
import SidebarHeader from "containers/Sidebar/Header";
import MenuDrawer from "components/UI/Drawer";
import { Menu as MenuIcon } from "react-feather";

// Section 4: Define Styles function taking theme as argument and returning an object

export default function DrawerSupply({ asset, onSupply }) {
    const classes = MenuDrawer();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Section 5: Code Component
    return (
        <>
            <IconButton
                className={classes.menuButton}
                color="inherit"
                onClick={handleOpen}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                classes={{ paper: classes.drawer }}
                ModalProps={{ BackdropProps: { invisible: false } }}
                onClose={handleClose}
                open={isOpen}
                variant="temporary"
                transitionDuration={0}
            >
                <Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={1}
                    >
                        <SidebarHeader />
                        <IconButton onClick={handleClose}>
                            <SvgIcon fontSize="small">
                                <XIcon />
                            </SvgIcon>
                        </IconButton>
                    </Box>
                    <Divider className={classes.divider} />
                    <Box pt={1}>
                        <List className={classes.list} onClick={handleClose}>
                            <SidebarDashboardItem />
                            <SidebarLendItem />
                            <SidebarBorrowItem />
                        </List>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}
