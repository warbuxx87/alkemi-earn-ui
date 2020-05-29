// Sub Component

// Section 1: React low level imports
import React from "react";

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
    makeStyles
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import dai from "../../assets/images/DAI.svg";
import usdc from "../../assets/images/USDC.svg";
import eth from "../../assets/images/WETH.svg";
import wbtc from "../../assets/images/WBTC.svg";
import usdx from "../../assets/images/USDx.svg";
import imbtc from "../../assets/images/imBTC.svg";
import usdt from "../../assets/images/USDT.svg";
import hbtc from "../../assets/images/HBTC.svg";
import pax from "../../assets/images/pax.png";
import tusd from "../../assets/images/tusd.png";
//import { useHistory } from "react-router-dom";
import BorrowTableCell from "components/UI/TableCell";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles({
    imageSize: {
        width: "18px",
        height: "18px"
    },
    btnActiveOutline: {
        minWidth: 100,
        minHeight: 36,
        textTransform: "capitalize"
    }
});

function createData(symbol, image, balance, value, apr, earnings) {
    return { symbol, image, balance, value, apr, earnings };
}

const rows = [
    createData("ETH", eth, 0, 0, 0, 0),
    createData("DAI", dai, 0, 0, 0, 0),
    createData("USDC", usdc, 0, 0, 0, 0),
    createData("USDT", usdt, 0, 0, 0, 0),
    createData("USDx", usdx, 0, 0, 0, 0),
    createData("PAX", pax, 0, 0, 0, 0),
    createData("TUSD", tusd, 0, 0, 0, 0),
    createData("wBTC", wbtc, 0, 0, 0, 0),
    createData("imBTC", imbtc, 0, 0, 0, 0),
    createData("HBTC", hbtc, 0, 0, 0, 0)
];

export default function BorrowTables() {
    const classes = useStyles();
    //  let history = useHistory();

    const columns = [
        { id: "1", label: "Asset" },
        { id: "2", label: "Borrowed", align: "left" },
        { id: "3", label: "Value", align: "left" },
        { id: "4", label: "Borrow APR %", align: "right" },
        { id: "5", label: "Paid", align: "right" }
    ];

    // Section 5: Code Component
    return (
        <Card>
            <CardHeader title="Active Loans" />
            <Divider />
            <Paper>
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
                        {rows.map(row => (
                            <TableRow key={row.symbol}>
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
                                            </Typography>
                                        </Box>
                                    </Box>
                                </BorrowTableCell>
                                <BorrowTableCell align="left">
                                    {row.balance}
                                </BorrowTableCell>
                                <BorrowTableCell align="left">
                                    {row.value}
                                </BorrowTableCell>
                                <BorrowTableCell align="right">
                                    {row.apr}
                                </BorrowTableCell>
                                <BorrowTableCell align="right">
                                    {row.earnings}
                                </BorrowTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Card>
    );
}
