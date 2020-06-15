// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";

// Section 2: Material-UI imports
import {
    Box,
    Card,
    CardHeader,
    Divider,
    Paper,
    Switch,
    Table,
    TableBody,
    TableHead,
    TableRow,
    Typography,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application

//import DrawerBorrow from "components/UI/DrawerBorrow";
import BorrowDrawerBorrow from "containers/Borrow/DrawerBorrow";
import BorrowDrawerRepay from "containers/Borrow/DrawerRepay";
import BorrowTableCell from "components/UI/TableCell";
import { formatNumber, formatPercent } from "utils/front-end";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles({
    imageSize: {
        width: "36px",
        height: "36px",
    },
});

const columns = [
    { id: "1", label: "Asset" },
    { id: "2", label: "Available", align: "center" },
    { id: "3", label: "Borrowed", align: "center" },
    {
        id: "4",
        label: "APR %",

        align: "center",
        style: "percent",
        format: (value) => value.toFixed(2),
    },
    {
        id: "5",
        label: "Collateral",

        align: "center",
        format: (value) => value.toFixed(2),
    },
    {
        id: "6",
        label: "",
    },
];

// Section 5: Code Component
const BorrowTableActive = ({ data = [] }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader title="Active Borrowing" />
            <Divider />
            <Paper>
                <PerfectScrollbar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((columns, i) => (
                                    <BorrowTableCell
                                        key={columns.id}
                                        align={columns.align}
                                    >
                                        {columns.label}
                                    </BorrowTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.name}>
                                    <BorrowTableCell
                                        component="th"
                                        scope="row"
                                        style={{ width: "16%" }}
                                    >
                                        <Box
                                            minWidth={150}
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <img
                                                className={classes.imageSize}
                                                src={row.image}
                                                alt="dai"
                                            />
                                            <Box ml={2}>
                                                <Typography
                                                    variant="h6"
                                                    color="textPrimary"
                                                >
                                                    {row.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    {row.unit}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </BorrowTableCell>
                                    <BorrowTableCell
                                        align="center"
                                        style={{ width: "16%" }}
                                    >
                                        <Typography
                                            variant="h6"
                                            color="textPrimary"
                                        >
                                            {formatNumber(row.wallet, row.unit)}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {row.wallet_2}
                                        </Typography>
                                    </BorrowTableCell>
                                    <BorrowTableCell
                                        align="center"
                                        style={{ width: "16%" }}
                                    >
                                        <Typography
                                            variant="h6"
                                            color="textPrimary"
                                        >
                                            {formatNumber(
                                                row.balance,
                                                row.unit
                                            )}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {row.balance_2}
                                        </Typography>
                                    </BorrowTableCell>
                                    <BorrowTableCell
                                        align="center"
                                        style={{ width: "16%" }}
                                    >
                                        <Typography
                                            variant="h6"
                                            color="textPrimary"
                                        >
                                            {formatPercent(row.apr)}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {row.apr_2}
                                        </Typography>
                                    </BorrowTableCell>
                                    <BorrowTableCell
                                        align="center"
                                        style={{ width: "16%" }}
                                    >
                                        <Switch
                                            // checked={state.checkedB}
                                            // onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    </BorrowTableCell>
                                    <BorrowTableCell align="center">
                                        <Box
                                            minWidth={208}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="flex-end"
                                        >
                                            <Box mr={1}>
                                                <BorrowDrawerRepay
                                                    asset={row}
                                                />
                                            </Box>
                                            <BorrowDrawerBorrow asset={row} />
                                        </Box>
                                    </BorrowTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PerfectScrollbar>
            </Paper>
        </Card>
    );
};

// Section 6: Documentation with PropTypes
BorrowTableActive.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

// Section 7:  Connect styles and export
export default BorrowTableActive;
