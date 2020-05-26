// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

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
    makeStyles
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import LendModalSupply from "containers/Lend/ModalSupply";
import LendModalWithdraw from "./ModalWithdraw";
import LendTableCell from "components/UI/TableCell";
import { formatNumber } from "./utils";
// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles({
    imageSize: {
        width: "36px",
        height: "36px"
    }
});

const columns = [
    { id: "1", label: "Asset" },
    { id: "2", label: "Available", align: "center" },
    { id: "3", label: "Supplied", align: "center" },
    {
        id: "4",
        label: "APR %",

        align: "center",
        style: "percent",
        format: value => value.toFixed(2)
    },
    {
        id: "5",
        label: "Collateral",

        align: "center",
        format: value => value.toFixed(2)
    },
    {
        id: "6",
        label: ""
    }
];

// Section 5: Code Component
const LendTableActive = ({ data = [] }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader title="Active Lending Reserves" />
            <Divider />
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((columns, i) => (
                                <LendTableCell
                                    key={columns.id}
                                    align={columns.align}
                                >
                                    {columns.label}
                                </LendTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row.name}>
                                <LendTableCell
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
                                </LendTableCell>
                                <LendTableCell
                                    align="center"
                                    style={{ width: "16%" }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        {formatNumber(row.balance, row.unit)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {row.wallet_2}
                                    </Typography>
                                </LendTableCell>
                                <LendTableCell
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
                                        {row.balance_2}
                                    </Typography>
                                </LendTableCell>
                                <LendTableCell
                                    align="center"
                                    style={{ width: "16%" }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        {row.apr}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {row.apr_2}
                                    </Typography>
                                </LendTableCell>
                                <LendTableCell
                                    align="center"
                                    style={{ width: "16%" }}
                                >
                                    <Switch
                                        // checked={state.checkedB}
                                        // onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                </LendTableCell>
                                <LendTableCell align="center">
                                    <Box
                                        minWidth={208}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="flex-end"
                                    >
                                        <Box mr={1}>
                                            <LendModalWithdraw>
                                                {" "}
                                            </LendModalWithdraw>
                                        </Box>
                                        <LendModalSupply asset={row} />
                                    </Box>
                                </LendTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Card>
    );
};

// Section 6: Documentation with PropTypes
LendTableActive.propTypes = {
    data: PropTypes.array.isRequired
};

// Section 7:  Connect styles and export
export default LendTableActive;
