// Sub Component

// Section 1: React low level imports
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

// Section 2: Material-UI imports
import {
    Box,
    Card,
    CardHeader,
    Divider,
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    Typography,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application

//import { useHistory } from "react-router-dom";
import BorrowTableCell from "components/UI/TableCell";
import {
    formatNumber,
    formatPercent,
    // formatMoney,
    calculateEarnings,
} from "utils/front-end";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles({
    imageSize: {
        width: "18px",
        height: "18px",
    },
    btnActiveOutline: {
        minWidth: 100,
        minHeight: 36,
        textTransform: "capitalize",
    },
});

const columns = [
    { id: "1", label: "Asset", align: "left" },
    { id: "2", label: "Wallet", align: "left" },
    { id: "3", label: "Borrowed", align: "left" },
    { id: "4", label: "APR %", align: "right" },
    { id: "5", label: "Paid", align: "right" },
];

export default function BorrowTables({ activeReserves, currency }) {
    const classes = useStyles();
    //  let history = useHistory();

    // Section 5: Code Component
    return (
        <Card>
            <CardHeader title="Active Loans" />
            <Divider />
            <Paper>
                <PerfectScrollbar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column, i) => (
                                    <BorrowTableCell
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {column.label}
                                    </BorrowTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activeReserves.map((row) => (
                                <TableRow key={row.unit}>
                                    <BorrowTableCell component="th" scope="Row">
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
                                                    variant="h6"
                                                    color="textPrimary"
                                                >
                                                    {row.symbol}
                                                    {row.unit}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </BorrowTableCell>
                                    <BorrowTableCell align="left">
                                        {formatNumber(row.wallet, row.unit)}
                                    </BorrowTableCell>
                                    <BorrowTableCell align="left">
                                        {formatNumber(row.balance, row.unit)}
                                    </BorrowTableCell>
                                    <BorrowTableCell align="right">
                                        {formatPercent(row.apr)}
                                    </BorrowTableCell>
                                    <BorrowTableCell align="right">
                                        {calculateEarnings(
                                            row.balance,
                                            row.principal,
                                            row.USDprice,
                                            row.unit
                                        )}
                                    </BorrowTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PerfectScrollbar>
            </Paper>
        </Card>
    );
}
