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
    Tooltip,
    Typography,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import BorrowTableCell from "components/UI/TableCell";
import BorrowDrawerContainer from "containers/Borrow/DrawerBorrow";
import {
    formatNumber,
    formatPercent,
    format_str_to_percent,
    formatStringNumber,
} from "utils/ui";

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
        color: theme.palette.warning.main,
        backgroundColor: fade(theme.palette.warning.main, 0.1),
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

const checkActivating = (Row, txs) => {
    const tx = Object.values(txs).filter((aTx) => {
        return (
            aTx.transactionLocalId === Row.unit &&
            aTx.type === "approve" &&
            aTx.processing === true
        );
    });

    if (tx && tx.length > 0) return true;
    else return false;
};

// Section 5: Code Component
const BorrowTable = ({
    data = [],
    onActivate,
    txs,
    walletIsKYCd,
    userWalletNetwork,
    needKYC,
    marketsData,
    walletConnected,
}) => {
    const classes = useStyles();

    const displayAPY = ({
        apy,
        marketsData,
        userWalletNetwork,
        walletConnected,
        symbol,
    }) => {
        if (walletConnected) {
            return formatPercent(apy);
        } else {
            const asset = marketsData.find((market) => {
                return market.symbol === symbol;
            });

            if (asset && asset.symbol)
                return format_str_to_percent(
                    asset.borrowAPR,
                    userWalletNetwork
                );
            else return formatPercent(apy);
        }
    };

    const displayLiquidity = ({
        liquidity,
        marketsData,
        userWalletNetwork,
        walletConnected,
        symbol,
    }) => {
        const assetLiquidity = formatNumber(
            liquidity,
            symbol,
            userWalletNetwork
        );
        if (walletConnected) {
            return assetLiquidity;
        } else {
            const asset = marketsData.find((market) => {
                return market.symbol === symbol;
            });

            if (asset && asset.symbol) {
                return formatStringNumber(
                    asset.balance,
                    asset.symbol,
                    userWalletNetwork
                );
            } else return assetLiquidity;
        }
    };

    return (
        <Box mt={1}>
            <Typography
                className={classes.heading}
                variant="body1"
                color="textPrimary"
            >
                Borrow Markets
            </Typography>
            <PerfectScrollbar>
                <Table className={classes.root}>
                    <TableBody>
                        {data.map((Row) => (
                            <TableRow key={Row.name} className={classes.row}>
                                <BorrowTableCell
                                    className={classes.startcell}
                                    component="th"
                                    scope="Row"
                                    style={{ width: "18%" }}
                                >
                                    <Box
                                        minWidth={150}
                                        display="flex"
                                        alignItems="right"
                                    >
                                        <img
                                            className={classes.imageSize}
                                            src={Row.image}
                                            alt="dai"
                                        />
                                        <Box ml={2}>
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                            >
                                                {Row.alternativeUnitLabel
                                                    ? Row.alternativeUnitLabel
                                                    : Row.unit}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {Row.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </BorrowTableCell>
                                <BorrowTableCell
                                    align="right"
                                    style={{ width: "18%" }}
                                >
                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                    >
                                        {formatNumber(
                                            Row.wallet,
                                            Row.unit,
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
                                <BorrowTableCell
                                    align="right"
                                    style={{ width: "18%" }}
                                >
                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                    >
                                        {displayLiquidity({
                                            liquidity: Row.liquidity,
                                            marketsData,
                                            userWalletNetwork,
                                            walletConnected,
                                            symbol: Row.unit,
                                        })}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Liquidity
                                    </Typography>
                                </BorrowTableCell>
                                <BorrowTableCell
                                    align="right"
                                    style={{ width: "18%" }}
                                >
                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                        className={classes.label}
                                    >
                                        {displayAPY({
                                            apy: Row.apy,
                                            marketsData,
                                            userWalletNetwork,
                                            walletConnected,
                                            symbol: Row.unit,
                                        })}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        APY
                                    </Typography>
                                </BorrowTableCell>
                                {/*<BorrowTableCell
                                    align="right"
                                    style={{ width: "16%" }}
                                >
                                    <Switch
                                        // checked={state.checkedB}
                                        // onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                </BorrowTableCell>-*/}
                                <BorrowTableCell
                                    align="right"
                                    className={classes.endcell}
                                >
                                    <Box
                                        minWidth={208}
                                        display="flex"
                                        alignItems="right"
                                        justifyContent="flex-end"
                                    >
                                        <Box mr={2}></Box>
                                        {Row.activated ||
                                        (walletConnected &&
                                            (needKYC ? walletIsKYCd : true) &&
                                            Row.unit === "WETH") ? (
                                            <BorrowDrawerContainer
                                                asset={Row}
                                            />
                                        ) : (
                                            <Tooltip
                                                className={classes.Tooltip}
                                                title="Enable to allow borrowing"
                                                placement="bottom"
                                                arrow
                                            >
                                                <Button
                                                    type="button"
                                                    className={
                                                        classes.btnActiveOutline
                                                    }
                                                    variant="outlined"
                                                    color="secondary"
                                                    size="small"
                                                    disabled={
                                                        checkActivating(
                                                            Row,
                                                            txs
                                                        ) || needKYC
                                                            ? !walletIsKYCd
                                                            : false
                                                    }
                                                    onClick={() =>
                                                        onActivate(Row)
                                                    }
                                                >
                                                    {checkActivating(
                                                        Row,
                                                        txs
                                                    ) ? (
                                                        <CircularProgress
                                                            size={20}
                                                            color="inherit"
                                                        />
                                                    ) : (
                                                        "Enable"
                                                    )}
                                                </Button>
                                            </Tooltip>
                                        )}
                                    </Box>
                                </BorrowTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </PerfectScrollbar>
        </Box>
    );
};

// Documentation with PropTypes
BorrowTable.propTypes = {
    //onboard: PropTypes.object.isRequired
};

export default BorrowTable;
