// Sub Component

// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import {
    Box,
    Card,
    CardHeader,
    FormControlLabel,
    Paper,
    Switch,
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

import { openEtherScanAddress, addressParser } from "utils/ui";

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
const ApplicationsList = ({
    kycApplications,
    currentNetworkName,
    previouslyKycdWallets,
}) => {
    const classes = useStyles();

    const displayOwners = (owners) => {
        let ownersDisplay = "";

        for (let index = 0; index < owners.length; index++) {
            if (index === 0) {
                ownersDisplay += owners[index].email;
            } else {
                ownersDisplay += `\n${owners[index].email}`; // TODO: this is not working as expected, need to properly new line
            }
        }

        return ownersDisplay;
    };

    const displayStatus = (status) => {
        if (status === "Approved") {
            return <span className={classes.greenStatus}>{status}</span>;
        }

        if (status === "Ready For Review") {
            return (
                <span className={classes.ReadyForReviewStatus}>{status}</span>
            );
        }

        if (status === "In Progress") {
            return <span className={classes.yellowStatus}>{status}</span>;
        }

        if (status === "Cancelled") {
            return <span className={classes.redStatus}>{status}</span>;
        }

        return <span>{status}</span>;
    };

    const displayOnchainStatus = (wallet, previouslyKycdWallets) => {
        if (wallet) {
            if (previouslyKycdWallets[wallet] === true)
                return <span className={classes.greenStatus}>KYC enabled</span>;
            if (previouslyKycdWallets[wallet] === false)
                return <span className={classes.redStatus}>KYC disabled</span>;
            else
                return (
                    <span className={classes.yellowStatus}>
                        Wallet was never KYC'd before
                    </span>
                );
        } else {
            return "--";
        }
    };

    return (
        <Card>
            <CardHeader title="KYC Applications" className={classes.header} />
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
                                        Name
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        {" "}
                                        Email{" "}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        color="textSecondary"
                                        variant="subtitle2"
                                    >
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Wallet address{" "}
                                    </Typography>
                                </TableCell>

                                <TableCell align="right">
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        On-chain KYC status{" "}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kycApplications &&
                                kycApplications.length > 0 &&
                                kycApplications.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                            >
                                                ...
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                            >
                                                {displayOwners(item.owners)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                            >
                                                {displayStatus(item.statusName)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                            >
                                                {item.ethAddress
                                                    ? addressParser(
                                                          item.ethAddress
                                                      )
                                                    : null}

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

                                        <TableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                            >
                                                {displayOnchainStatus(
                                                    item.ethAddress,
                                                    previouslyKycdWallets
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
