// Sub Component

// Section 1: React low level imports
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

// Section 2: Material-UI imports
import {
    Box,
    Button,
    CircularProgress,
    fade,
    Table,
    TableBody,
    TableRow,
    Typography,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import LendTableCell from "components/UI/TableCell";
import DepositButton from "containers/Lend/DrawerDeposit";
import AllocateButton from "containers/Lend/DrawerAllocate";
import { formatNumber, formatPercent } from "utils/ui";

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
        marginTop: "3px",
    },
    label: {
        fontFamily: theme.typography.fontFamily,
        alignItems: "center",
        borderRadius: 2,
        display: "inline-flex",
        flexGrow: 0,
        whiteSpace: "nowrap",
        cursor: "default",
        flexShrink: 0,
        height: 24,
        justifyContent: "center",
        letterSpacing: 0.5,
        minWidth: 20,
        padding: theme.spacing(0.5, 0.5),
        textTransform: "uppercase",
        color: theme.palette.success.main,
        backgroundColor: fade(theme.palette.success.main, 0.08),
    },
    btnActiveOutline: {
        minWidth: 100,
        minHeight: 32,
        textTransform: "capitalize",
    },
    heading: {
        fontWeight: 500,
    },
}));

const checkActivating = (row, txs) => {
    const tx = Object.values(txs).filter((aTx) => {
        return (
            aTx.transactionLocalId === row.unit &&
            aTx.type === "approve" &&
            aTx.processing === true
        );
    });

    if (tx && tx.length > 0) return true;
    else return false;
};

// Section 5: Code Component
const LendTable = ({ data = [], onActivate, displayAllocateButton, txs }) => {
    const classes = useStyles();
    return (
        <Box mt={1}>
            <Typography
                className={classes.heading}
                variant="h6"
                color="textPrimary"
            >
                Available Markets
            </Typography>
            <PerfectScrollbar>
                <Table className={classes.root}>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.name} className={classes.row}>
                                <LendTableCell
                                    className={classes.startcell}
                                    component="th"
                                    scope="row"
                                    style={{ width: "18%" }}
                                >
                                    <Box
                                        minWidth={150}
                                        display="flex"
                                        alignItems="right"
                                    >
                                        <img
                                            className={classes.imageSize}
                                            src={row.image}
                                            alt={row.name}
                                        />
                                        <Box ml={2}>
                                            <Typography
                                                variant="h6"
                                                color="textPrimary"
                                            >
                                                {row.unit}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {row.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </LendTableCell>
                                <LendTableCell
                                    align="right"
                                    style={{ width: "18%" }}
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
                                        Wallet
                                    </Typography>
                                </LendTableCell>
                                <LendTableCell
                                    align="right"
                                    style={{ width: "18%" }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        {formatNumber(row.liquidity, row.unit)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Liquidity
                                    </Typography>
                                </LendTableCell>
                                <LendTableCell
                                    align="right"
                                    style={{ width: "18%" }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                        className={classes.label}
                                    >
                                        {formatPercent(row.apy)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        APY
                                    </Typography>
                                </LendTableCell>
                                {/*}<LendTableCell
                                    align="right"
                                    style={{ width: "16%" }}
                                >
                                    <Switch name="checkedB" color="primary" />
                                </LendTableCell>*/}
                                <LendTableCell
                                    align="right"
                                    className={classes.endcell}
                                >
                                    <Box
                                        minWidth={208}
                                        display="flex"
                                        alignItems="right"
                                        justifyContent="flex-end"
                                    >
                                        {displayAllocateButton && (
                                            <Box mr={1}>
                                                {row.allocating ? (
                                                    <CircularProgress
                                                        size={20}
                                                        color="inherit"
                                                    />
                                                ) : (
                                                    <AllocateButton
                                                        asset={row}
                                                    />
                                                )}
                                            </Box>
                                        )}
                                        {row.activated ? (
                                            <DepositButton asset={row} />
                                        ) : (
                                            <Button
                                                type="button"
                                                className={
                                                    classes.btnActiveOutline
                                                }
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                disable={checkActivating(
                                                    row,
                                                    txs
                                                )}
                                                onClick={() => onActivate(row)}
                                            >
                                                {checkActivating(row, txs) ? (
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
            </PerfectScrollbar>
        </Box>
    );
};

// Section 6: Documentation with PropTypes
//LendTable.propTypes = {
//onboard: PropTypes.object.isRequired
//};

// Section 7:  Connect styles and export
export default LendTable;
