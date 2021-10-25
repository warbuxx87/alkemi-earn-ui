// Sub Component

// Section 1: React low level imports
import React from "react";
import Big from "big.js";

// Section 2: Material-UI imports
import {
    Box,
    Card,
    fade,
    CardHeader,
    FormControlLabel,
    Paper,
    Switch,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    makeStyles,
} from "@material-ui/core";

import PerfectScrollbar from "react-perfect-scrollbar";

// Section 3: Components & Containers import from the application

import { format_str_to_kmb, format_str_to_percent } from "utils/ui";

import MarketsTableCell from "components/UI/TableCell";
import APYDisplay from "components/UI/APYDisplay";

// tokens icons
import WETH from "assets/images/WETH.svg";
import WBTC from "assets/images/WBTC.svg";
import DAI from "assets/images/DAI.svg";
import USDC from "assets/images/USDC.svg";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    label: {
        display: "inline-flex",
        flexGrow: 0,
        whiteSpace: "nowrap",
        flexShrink: 0,
    },
    item: {
        textAlign: "left",
        justifyContent: "center",
    },
    assetImage: {
        width: 34,
    },
    header: {
        padding: "10px 16px",
        "& .MuiCardHeader-action": {
            margin: 0,
        },
    },
    switch: {
        "& .MuiTypography-body1": {
            fontSize: 12,
        },
    },
}));

// Section 5: Code Component
const TableMarkets = ({ marketsData, alkApyPerMarket, userWalletNetwork }) => {
    const classes = useStyles();

    const [toggleUSD, setToggleUSD] = React.useState(false);

    const displayUSDOrNativeValue = (usdValue, nativeValue, nativeUnit) => {
        if (toggleUSD === true) {
            return <>${format_str_to_kmb(usdValue)}</>;
        } else {
            return (
                <>
                    {format_str_to_kmb(nativeValue)}
                    {" " + nativeUnit}
                </>
            );
        }
    };

    const tokens = {
        WETH: WETH,
        USDC: USDC,
        WBTC: WBTC,
        DAI: DAI,
    };

    return (
        <Card>
            <CardHeader
                title="Market Liquidity"
                className={classes.header}
                action={
                    <FormControlLabel
                        value="usd"
                        className={classes.switch}
                        control={
                            <Switch
                                color="secondary"
                                checked={toggleUSD}
                                onChange={() => {
                                    setToggleUSD(!toggleUSD);
                                }}
                            />
                        }
                        label="Display USD"
                        labelPlacement="start"
                    />
                }
            />
            <PerfectScrollbar>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className={classes.tablehead}>
                            <TableRow>
                                <MarketsTableCell>
                                    {" "}
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        {" "}
                                        Market
                                    </Typography>
                                </MarketsTableCell>
                                <MarketsTableCell align="right">
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        {" "}
                                        Total Supply{" "}
                                    </Typography>
                                </MarketsTableCell>
                                <MarketsTableCell align="right">
                                    <Typography
                                        color="textSecondary"
                                        variant="subtitle2"
                                    >
                                        Total Borrow
                                    </Typography>
                                </MarketsTableCell>
                                <MarketsTableCell align="right">
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Deposit APY{" "}
                                    </Typography>
                                </MarketsTableCell>

                                <MarketsTableCell align="right">
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Borrow APY
                                    </Typography>
                                </MarketsTableCell>
                                <MarketsTableCell align="right">
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Market Utilization
                                    </Typography>
                                </MarketsTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {marketsData &&
                                marketsData.length > 0 &&
                                marketsData.map((item) => (
                                    <TableRow key={item.address}>
                                        <MarketsTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            <Box
                                                minWidth={150}
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <img
                                                    className={
                                                        classes.assetImage
                                                    }
                                                    alt={item.name}
                                                    src={tokens[item.symbol]}
                                                />
                                                <Box ml={2}>
                                                    <Typography
                                                        variant="body1"
                                                        color="textPrimary"
                                                    >
                                                        {
                                                            item.symbol ===
                                                            "WETH"
                                                                ? "ETH"
                                                                : item.symbol /* Re-labeling WETH to ETH only */
                                                        }
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                    >
                                                        {
                                                            item.name ===
                                                            "Wrapped Ether"
                                                                ? "Ether"
                                                                : item.name /* Re-labeling WETH to ETH only */
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </MarketsTableCell>
                                        <MarketsTableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                            >
                                                {displayUSDOrNativeValue(
                                                    item.totalSupplyUSD,
                                                    item.totalSupply,
                                                    item.symbol === "WETH"
                                                        ? "ETH"
                                                        : item.symbol /* Re-labeling WETH to ETH only */
                                                )}
                                            </Typography>
                                        </MarketsTableCell>

                                        <MarketsTableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                            >
                                                {displayUSDOrNativeValue(
                                                    item.totalBorrowUSD,
                                                    item.totalBorrow,
                                                    item.symbol === "WETH"
                                                        ? "ETH"
                                                        : item.symbol /* Re-labeling WETH to ETH only */
                                                )}
                                            </Typography>
                                        </MarketsTableCell>
                                        <MarketsTableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                                className={classes.label}
                                            >
                                                <APYDisplay
                                                    apy={Big(item.supplyAPR)
                                                        .times(100)
                                                        .toFixed(2)}
                                                    alkApy={
                                                        alkApyPerMarket[
                                                            item.symbol
                                                        ]
                                                    }
                                                />
                                            </Typography>
                                        </MarketsTableCell>
                                        <MarketsTableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                                className={classes.label}
                                            >
                                                <APYDisplay
                                                    apy={Big(item.borrowAPR)
                                                        .times(100)
                                                        .toFixed(2)}
                                                    alkApy={
                                                        alkApyPerMarket[
                                                            item.symbol
                                                        ]
                                                    }
                                                />
                                            </Typography>
                                        </MarketsTableCell>
                                        <MarketsTableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                            >
                                                {format_str_to_percent(
                                                    item.utilizationRate * 1,
                                                    userWalletNetwork
                                                )}
                                            </Typography>
                                        </MarketsTableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PerfectScrollbar>
        </Card>
    );
};

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default TableMarkets;
