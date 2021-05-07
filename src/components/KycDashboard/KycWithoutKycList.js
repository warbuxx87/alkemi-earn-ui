// Sub Component

// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import {
    Card,
    CardHeader,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    makeStyles,
    IconButton,
    SvgIcon,
} from "@material-ui/core";

import { ExternalLink as LinkIcon } from "react-feather";

import PerfectScrollbar from "react-perfect-scrollbar";

// Section 3: Components & Containers import from the application

import { openEtherScanAddress } from "utils/ui";

import TableCell from "components/UI/TableCell";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    label: {
        marginLeft: theme.spacing(1),
    },
    item: {
        textAlign: "left",
        justifyContent: "center",
    },
    header: {
        padding: "10px 16px",
        "& .MuiCardHeader-action": {
            margin: 0,
        },
    },

    greenStatus: {
        color: "#00e676",
    },
    yellowStatus: {
        color: "#ffeb3b",
    },
    ReadyForReviewStatus: {
        color: "#2979ff",
    },
    redStatus: {
        color: "#f50057",
    },
}));

// Section 5: Code Component
const ApplicationsList = ({ kycdWithoutApplications, currentNetworkName }) => {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader
                title="Kyc'd wallets onchain without applications"
                className={classes.header}
            />
            <PerfectScrollbar>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className={classes.tablehead}>
                            <TableRow>
                                <TableCell>
                                    {" "}
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        {" "}
                                        Wallets without KYC applications
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kycdWithoutApplications &&
                                kycdWithoutApplications.length > 0 &&
                                kycdWithoutApplications.map((item) => (
                                    <TableRow key={item.ethAddress}>
                                        <TableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                            >
                                                {item.ethAddress}

                                                {item.ethAddress ? (
                                                    <IconButton
                                                        href={openEtherScanAddress(
                                                            item.ethAddress,
                                                            currentNetworkName
                                                        )}
                                                        target="_blank"
                                                    >
                                                        <SvgIcon fontSize="small">
                                                            <LinkIcon />
                                                        </SvgIcon>
                                                    </IconButton>
                                                ) : (
                                                    "Not supplied"
                                                )}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PerfectScrollbar>
        </Card>
    );
};

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default ApplicationsList;
