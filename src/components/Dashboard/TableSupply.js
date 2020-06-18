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

//import { useHistory } from "react-router-dom";
import SupplyTableCell from "components/UI/TableCell";
import {
    formatNumber,
    formatPercent,
    //    formatMoney,
    //  calculateEarnings
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
    { id: "3", label: "Supplied", align: "left" },
    { id: "4", label: "APR %", align: "right" },
    { id: "5", label: "Earnings", align: "right" },
];

export default function SupplyTables({ activeReserves, currency }) {
    const classes = useStyles();
    //  let history = useHistory();
    // Section 5: Code Component
    return (
        <Card>
            <Divider />
            <Paper>
                <PerfectScrollbar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column, i) => (
                                    <SupplyTableCell
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {column.label}
                                    </SupplyTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {activeReserves.map((row) => (
                                <TableRow key={row.unit}>
                                    <SupplyTableCell component="th" scope="row">
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
                                    </SupplyTableCell>
                                    <SupplyTableCell align="left">
                                        {formatNumber(row.wallet, row.unit)}
                                    </SupplyTableCell>
                                    <SupplyTableCell align="left">
                                        {formatNumber(row.balance, row.unit)}
                                    </SupplyTableCell>
                                    <SupplyTableCell align="right">
                                        {formatPercent(row.apr)}
                                    </SupplyTableCell>
                                    <SupplyTableCell align="right">
                                        0
                                    </SupplyTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PerfectScrollbar>
            </Paper>
        </Card>
    );
}
