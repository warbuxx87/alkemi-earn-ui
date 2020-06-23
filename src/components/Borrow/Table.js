// Sub Component

// Section 1: React low level imports
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

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
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import BorrowTableCell from "components/UI/TableCell";
import BorrowDrawerContainer from "containers/Borrow/DrawerBorrow";
import { formatNumber, formatPercent } from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles({
    imageSize: {
        width: "36px",
        height: "36px",
    },
    btnActiveOutline: {
        minWidth: 100,
        minHeight: 36,
        textTransform: "capitalize",
    },
});

const Columns = [
    { id: "1", label: "Asset" },
    { id: "2", label: "Wallet Balance", align: "center" },
    { id: "3", label: "Balance", align: "center" },
    {
        id: "4",
        label: "APR %",
        align: "center",
        //format: value => value.toLocaleString(),
    },
    {
        id: "5",
        label: "Collateral",
        align: "center",
        // format: value => value.toFixed(2),
    },
    {
        id: "6",
        label: "",
        align: "right",
        // format: value => value.toFixed(2),
    },
];

// Section 5: Code Component
const BorrowTable = ({ data = [], onActivate }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader title="Available Markets" />
            <Divider />
            <Paper>
                <PerfectScrollbar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {Columns.map((Column, i) => (
                                    <BorrowTableCell
                                        key={Column.id}
                                        align={Column.align}
                                    >
                                        {Column.label}
                                    </BorrowTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((Row) => (
                                <TableRow key={Row.name}>
                                    <BorrowTableCell
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
                                    </BorrowTableCell>
                                    <BorrowTableCell
                                        align="center"
                                        style={{ width: "16%" }}
                                    >
                                        {formatNumber(Row.wallet, Row.unit)}
                                    </BorrowTableCell>
                                    <BorrowTableCell
                                        align="center"
                                        style={{ width: "16%" }}
                                    >
                                        {formatNumber(Row.balance, Row.unit)}
                                    </BorrowTableCell>
                                    <BorrowTableCell
                                        align="center"
                                        style={{ width: "16%" }}
                                    >
                                        {formatPercent(Row.apr)}
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
                                    <BorrowTableCell align="right">
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
                                                <BorrowDrawerContainer
                                                    asset={Row}
                                                />
                                            ) : (
                                                <Button
                                                    type="button"
                                                    className={
                                                        classes.btnActiveOutline
                                                    }
                                                    variant="outlined"
                                                    color="secondary"
                                                    disable={Row.pending.toString()}
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

// Documentation with PropTypes
BorrowTable.propTypes = {
    //onboard: PropTypes.object.isRequired
};

export default BorrowTable;
