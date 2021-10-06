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
    ListItem,
    ListItemText,
    SvgIcon,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { XCircle as XIcon, Menu as MenuIcon } from "react-feather";

// Section 3: Components & Containers import from the application
import SidebarDashboardItem from "containers/Sidebar/DashboardItem";
import SidebarLendItem from "containers/Sidebar/LendItem";
import SidebarBorrowItem from "containers/Sidebar/BorrowItem";
import SidebarMarketsItem from "containers/Sidebar/MarketsItem";
import SidebarHistoryItem from "containers/Sidebar/HistoryItem";
import SidebarLiquidateItem from "containers/Sidebar/LiquidateItem";
import SidebarHeader from "containers/Sidebar/Header";

// Section 4: Define Styles function taking theme as argument and returning an object
const DrawerClass = makeStyles((theme) =>
    createStyles({
        drawer: {
            width: "100%",
            "@media (min-width: 780px)": {
                width: 380,
            },
        },
        iconbutton: {
            borderRadius: "4px",
            border: "solid 2px",
            borderColor: theme.palette.background.paper,
            minHeight: "36px",
            minWidth: "36px",
        },
    })
);

// Section 5: Code Component
export default function MobileMenu({ walletIsLiquidator }) {
    const classes = DrawerClass();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton
                color="inherit"
                onClick={handleOpen}
                className={classes.iconbutton}
                data-testid="openMenu"
                size="small"
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
                data-testid="menuDrawer"
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
                    <Divider />
                    <Box pt={1} pb={1}>
                        <List onClick={handleClose}>
                            <SidebarDashboardItem />
                            <SidebarLendItem />
                            <SidebarBorrowItem />
                            <SidebarMarketsItem />
                            <SidebarHistoryItem />
                            {walletIsLiquidator === true ? (
                                <SidebarLiquidateItem />
                            ) : null}
                        </List>
                    </Box>
                    <Divider />
                    <Box p={1} display="flex" alignItems="flex-end">
                        <List>
                            <ListItem
                                button
                                component="a"
                                href="https://docs.alkemi.network/user-guide/"
                            >
                                <ListItemText primary="Earn User Guide" />
                            </ListItem>
                            <ListItem
                                button
                                component="a"
                                href="https://support.alkemi.network/support/tickets/new"
                            >
                                <ListItemText primary="Contact Support" />
                            </ListItem>
                            <ListItem
                                button
                                component="a"
                                href="https://feedback.alkemi.network/feature-requests"
                            >
                                <ListItemText primary="Feature Request" />
                            </ListItem>
                            <ListItem
                                button
                                component="a"
                                href="https://feedback.alkemi.network/bug-reports"
                            >
                                <ListItemText primary="Report Bug" />
                            </ListItem>
                            <ListItem
                                button
                                component="a"
                                href="https://vote.alkemi.network/#/"
                            >
                                <ListItemText primary="Governance" />
                            </ListItem>
                            <ListItem
                                button
                                component="a"
                                href="https://kyc.alkemi.network/#/auth/signup"
                            >
                                <ListItemText primary="Get KYC Verified" />
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}
