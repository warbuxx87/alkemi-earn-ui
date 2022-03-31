// Sub Component

// Section 1: React low level imports
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Big from "big.js";

// Section 2: Material-UI imports
import {
    Box,
    alpha,
    Table,
    TableBody,
    TableRow,
    Typography,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

// Section 3: Components & Containers import from the application
import APYDisplay from "components/UI/APYDisplay";

//import { useHistory } from "react-router-dom";
import BorrowTableCell from "components/UI/TableCell";
import { formatNumber, ETHBalanceToUSD } from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        borderCollapse: "separate",
        borderSpacing: "0 1em",
    },
    startcell: {
        borderRadius: "6px 0px 0px 6px",
    },
    endcell: {
        borderRadius: "0px 6px 6px 0px",
    },
    row: {
        backgroundColor: theme.palette.background.paper,
    },
    imageSize: {
        width: "34px",
        height: "34px",
    },
    label: {
        fontFamily: theme.typography.fontFamily,
        alignItems: "center",
        borderRadius: 4,
        display: "inline-flex",
        flexGrow: 0,
        whiteSpace: "nowrap",
        cursor: "default",
        flexShrink: 0,
        height: 16,
        justifyContent: "center",
        letterSpacing: 0.5,
        minWidth: 20,
        padding: theme.spacing(1.5, 1),
        textTransform: "uppercase",
        color: theme.palette.warning.main,
        backgroundColor: alpha(theme.palette.warning.main, 0.1),
    },
}));

export default function BorrowTables({
    activeReserves,
    USDPrice,
    userWalletNetwork,
    alkApyPerMarket,
}) {
    const classes = useStyles();

    //  let history = useHistory();

    // Section 5: Code Component
    return (
        <PerfectScrollbar>
            <Table className={classes.root}>
                <TableBody>
                    {activeReserves.map((row) => (
                        <TableRow key={row.unit} className={classes.row}>
                            <BorrowTableCell
                                component="th"
                                scope="Row"
                                className={classes.startcell}
                            >
                                <Box
                                    minWidth={100}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <img
                                        className={classes.imageSize}
                                        src={row.image}
                                        alt={row.symbol}
                                    />
                                    <Box ml={2}>
                                        <Typography
                                            variant="body1"
                                            color="textPrimary"
                                        >
                                            {row.alternativeUnitLabel
                                                ? row.alternativeUnitLabel
                                                : row.unit}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {row.name}
                                        </Typography>
                                    </Box>
                                </Box>
                            </BorrowTableCell>
                            <BorrowTableCell align="right">
                                <Typography variant="body1" color="textPrimary">
                                    {formatNumber(
                                        row.wallet,
                                        row.unit,
                                        userWalletNetwork
                                    )}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Available
                                </Typography>
                            </BorrowTableCell>
                            <BorrowTableCell align="right">
                                <Typography variant="body1" color="textPrimary">
                                    {formatNumber(
                                        row.balance,
                                        row.unit,
                                        userWalletNetwork
                                    )}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Borrowed
                                </Typography>
                            </BorrowTableCell>
                            <BorrowTableCell align="right">
                                <Typography variant="body1" color="textPrimary">
                                    $
                                    {formatNumber(
                                        ETHBalanceToUSD(
                                            row.ethBalance,
                                            USDPrice
                                        ),
                                        null,
                                        userWalletNetwork
                                    )}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    USD Value
                                </Typography>
                            </BorrowTableCell>
                            <BorrowTableCell align="right">
                                <APYDisplay
                                    apy={Big(row.apy).times(100).toFixed(2)}
                                    alkApy={alkApyPerMarket[row.unit]}
                                    typeOfAPY={"borrow"}
                                />
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    APY
                                </Typography>
                            </BorrowTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </PerfectScrollbar>
    );
}
