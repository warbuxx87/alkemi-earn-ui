// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import {
    Box,
    Button,
    Card,
    CardHeader,
    CircularProgress,
    Divider,
    Grid,
    makeStyles,
    Paper,
    Switch,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    withStyles
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import LendTableCell from "./TableCell";

// Section 4: Define Styles function taking theme as argument and returning an object
const styles = theme => ({
    imageSize: {
        width: "35px",
        height: "35px"
    },
    btnActiveOutline: {
        minWidth: 100
    }
});

const Columns = [
    { id: "1", label: "Asset" },
    { id: "2", label: "Wallet Balance", align: "right" },
    { id: "3", label: "Balance", align: "right" },
    {
        id: "4",
        label: "APR %",
        align: "right"
        //format: value => value.toLocaleString(),
    },
    {
        id: "5",
        label: "Collateral",
        align: "right"
        // format: value => value.toFixed(2),
    },
    {
        id: "6",
        label: "",
        align: "right"
        // format: value => value.toFixed(2),
    }
];

// Section 5: Code Component
const LendTable = ({
    classes,
    onboard,
    data = [],
    loading = {},
    onActivate
}) => (
    <Card>
        <CardHeader title="Available Markets" />
        <Divider />
        <Paper>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {Columns.map((Column, i) => (
                            <LendTableCell
                                className={classes.Row}
                                key={Column.id}
                                align={Column.align}
                            >
                                {Column.label}
                            </LendTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(Row => (
                        <TableRow key={Row.name}>
                            <LendTableCell
                                component="th"
                                scope="Row"
                                style={{ width: "10%" }}
                            >
                                <Box
                                    minWidth={150}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <img
                                        className={classes.imageSize}
                                        src={Row.image}
                                        alt="dai"
                                    />
                                    <Box ml={2}>
                                        <Typography
                                            variant="h6"
                                            color="textPrimary"
                                        >
                                            {Row.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {Row.unit}
                                        </Typography>
                                    </Box>
                                </Box>
                            </LendTableCell>
                            <LendTableCell
                                align="right"
                                style={{ width: "15%" }}
                            >
                                {Row.wallet}
                            </LendTableCell>
                            <LendTableCell
                                align="right"
                                style={{ width: "15%" }}
                            >
                                {Row.balance}
                            </LendTableCell>
                            <LendTableCell
                                align="right"
                                style={{ width: "15%" }}
                            >
                                {Row.apr}
                            </LendTableCell>
                            <LendTableCell
                                align="right"
                                style={{ width: "15%" }}
                            >
                                <Switch
                                    // checked={state.checkedB}
                                    // onChange={handleChange}
                                    name="checkedB"
                                    color="primary"
                                />
                            </LendTableCell>
                            <LendTableCell align="right">
                                <Box
                                    minWidth={208}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                >
                                    <Box mr={2}>
                                        {/* <Grid className={classesbtnActive">
                          Active
                        </Grid> */}
                                    </Box>
                                    <Button
                                        type="button"
                                        className={classes.btnActiveOutline}
                                        variant="outlined"
                                        color="secondary"
                                        disable={Row.pending}
                                        onClick={() => onActivate(Row.unit)}
                                    >
                                        {Row.pending ? (
                                            <CircularProgress
                                                size={20}
                                                color="white"
                                            />
                                        ) : (
                                            "Activate"
                                        )}
                                    </Button>
                                </Box>
                            </LendTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    </Card>
);

// Documentation with PropTypes
LendTable.propTypes = {
    classes: PropTypes.object.isRequired,
    onboard: PropTypes.object.isRequired
};

export default withStyles(styles)(LendTable);
