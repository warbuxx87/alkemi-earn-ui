// Sub Component

// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import {
    Box,
    Button,
    Card,
    CardHeader,
    CircularProgress,
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
import LendTableCell from "components/UI/TableCell";
import LendModalSupply from "containers/Lend/DrawerSupply";
import { formatNumber } from "./utils";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles({
    imageSize: {
        width: "36px",
        height: "36px"
    },
    btnActiveOutline: {
        minWidth: 100,
        minHeight: 36,
        textTransform: "capitalize"
    }
});

const Columns = [
    { id: "1", label: "Asset" },
    { id: "2", label: "Available", align: "center" },
    { id: "3", label: "Supplied", align: "center" },
    {
        id: "4",
        label: "APR %",
        align: "center"
        //format: value => value.toLocaleString(),
    },
    {
        id: "5",
        label: "Collateral",
        align: "center"
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
const LendTable = ({ data = [], onActivate }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader title="Available Markets" />
            <Divider />
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            {Columns.map((Column, i) => (
                                <LendTableCell
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
                                    style={{ width: "16%" }}
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
                                    align="center"
                                    style={{ width: "16%" }}
                                >
                                    {formatNumber(Row.balance, Row.unit)}
                                </LendTableCell>
                                <LendTableCell
                                    align="center"
                                    style={{ width: "16%" }}
                                >
                                    {formatNumber(Row.wallet, Row.unit)}
                                </LendTableCell>
                                <LendTableCell
                                    align="center"
                                    style={{ width: "16%" }}
                                >
                                    {Row.apr}
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
                                        {Row.activated ? (
                                            <LendModalSupply asset={Row} />
                                        ) : (
                                            <Button
                                                type="button"
                                                className={
                                                    classes.btnActiveOutline
                                                }
                                                variant="outlined"
                                                color="secondary"
                                                disable={Row.pending}
                                                onClick={() =>
                                                    onActivate(Row.unit)
                                                }
                                            >
                                                {Row.pending ? (
                                                    <CircularProgress
                                                        size={20}
                                                        color="inherit"
                                                    />
                                                ) : (
                                                    "Activate"
                                                )}
                                            </Button>
                                        )}
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

// Documentation with PropTypes
LendTable.propTypes = {
    //onboard: PropTypes.object.isRequired
};

export default LendTable;
