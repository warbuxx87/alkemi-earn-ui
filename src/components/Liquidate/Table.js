// Main Component

// Section 1: React low level imports
import React from "react";
import clsx from "clsx";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

// Section 2: Material-UI imports
import {
    Box,
    Card,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TablePagination,
    TextField,
    Typography,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import LiquidateButton from "containers/Liquidate/DrawerLiquidate";
import LiquidTableCell from "components/UI/TableCell";

import { addressParser } from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    imageSize: {
        width: "28px",
        height: "28px",
    },
    assetField: {
        flexBasis: 200,
    },
    eventField: {
        marginLeft: theme.spacing(2),
        flexBasis: 200,
    },
    sortField: {
        flexBasis: 200,
    },
}));

/*const liquidateList = [
    {
        tokenDebt: "124.344",
        collateral: "0.9345",
        collateralUSD: "$153.45",
        tokenDebtUSD: "$123.39",
        tokenIcon: DAI,
        tokenSymbol: "DAI",
        tokenHealth: 20,
        walletAddress: "0x813..9c1a",
    },
    {
        tokenDebt: "343.065",
        collateral: "1.1245",
        collateralUSD: "$543.45",
        tokenDebtUSD: "$345.45",
        tokenIcon: USDC,
        tokenSymbol: "USDC",
        tokenHealth: 22,
        walletAddress: "0x834..3c3g",
    },
    {
        tokenDebt: "3264.733",
        collateral: "2.4345",
        collateralUSD: "$3545.95",
        tokenDebtUSD: "$8674.53",
        tokenIcon: USDT,
        tokenSymbol: "USDT",
        tokenHealth: 43,
        walletAddress: "0x234..6x7h",
    },
    {
        tokenDebt: "74398.934",
        collateral: "12.7434",
        collateralUSD: "$74956.49",
        tokenDebtUSD: "$54562.35",
        tokenIcon: USDC,
        tokenSymbol: "USDC",
        tokenHealth: 54,
        walletAddress: "0x834..5b6a",
    },
    {
        tokenDebt: "973.382",
        collateral: "4.4543",
        collateralUSD: "$973.44",
        tokenDebtUSD: "$837.34",
        tokenIcon: DAI,
        tokenSymbol: "DAI",
        tokenHealth: 77,
        walletAddress: "0x553..5f3a",
    },
    {
        tokenDebt: "6.38958",
        collateral: "12.3948",
        collateralUSD: "$123453.45",
        tokenDebtUSD: "$87455.38",
        tokenIcon: WBTC,
        tokenSymbol: "WBTC",
        tokenHealth: 80,
        walletAddress: "0x823..0b2a",
    },
    {
        tokenDebt: "92.345",
        collateral: "0.5343",
        collateralUSD: "$94.05",
        tokenDebtUSD: "$73.43",
        tokenIcon: USDT,
        tokenSymbol: "USDT",
        tokenHealth: 101,
        walletAddress: "0x803..7c7a",
    },
    {
        tokenDebt: "34234.76",
        collateral: "13.4534",
        collateralUSD: "$36544.09",
        tokenDebtUSD: "$34563.29",
        tokenIcon: USDC,
        tokenSymbol: "USDC",
        tokenHealth: 112,
        walletAddress: "0x413..5z2a",
    },
    {
        tokenDebt: "124.344",
        collateral: "0.93",
        collateralUSD: "$653.45",
        tokenDebtUSD: "$123.39",
        tokenIcon: DAI,
        tokenSymbol: "DAI",
        tokenHealth: 20,
        walletAddress: "0x813..9c1a",
    },
];*/

const assetName = [
    {
        id: "ALL",
        name: "All",
    },
    {
        id: "DAI",
        name: "DAI - Maker Dai",
    },
    {
        id: "PAX",
        name: "PAX - Paxos",
    },
    {
        id: "USDC",
        name: "USDC - USD Coin",
    },
    {
        id: "USDT",
        name: "USDT - Tether",
    },
    {
        id: "WBTC",
        name: "WBTC - Wrapped BTC",
    },
    {
        id: "WETH",
        name: "WETH - Ether",
    },
];

const Liquidate = ({ className, liquidationsList, ...rest }) => {
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [page, setPage] = React.useState(0);

    console.log("liquidationsList: ", liquidationsList);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
    };

    const [values, setValues] = useState({});
    const handleChange = (field, value) => {
        setValues({
            ...values,
            [field]: value,
        });
    };

    // Section 5: Code Component
    return (
        <Card className={clsx(classes.root, className)} {...rest}>
            <Box p={2} pt={3} display="flex">
                <Box display="flex" alignItems="center">
                    <TextField
                        fullWidth
                        label="Asset"
                        name="asset"
                        className={classes.assetField}
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={values.category}
                        variant="outlined"
                        color="secondary"
                    >
                        {assetName.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </TextField>
                </Box>
            </Box>
            <PerfectScrollbar>
                <Table className="whitespace-pre">
                    <TableHead>
                        <TableRow>
                            <LiquidTableCell>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Debt to Cover
                                </Typography>
                            </LiquidTableCell>
                            <LiquidTableCell>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Collateral
                                </Typography>
                            </LiquidTableCell>
                            <LiquidTableCell>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Collateral Ratio
                                </Typography>
                            </LiquidTableCell>
                            <LiquidTableCell>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Address
                                </Typography>
                            </LiquidTableCell>
                            <LiquidTableCell>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Composition
                                </Typography>
                            </LiquidTableCell>
                            <LiquidTableCell align="right"></LiquidTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {liquidationsList
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((item, index) => (
                                <TableRow key={index}>
                                    <LiquidTableCell component="th" scope="row">
                                        <Box
                                            minWidth={150}
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <Box ml={2}>
                                                <Typography
                                                    variant="h6"
                                                    color="textPrimary"
                                                >
                                                    {item.shortfallETH} ETH
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    ${item.shortfallUSD}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </LiquidTableCell>
                                    <LiquidTableCell component="th" scope="row">
                                        <Box
                                            minWidth={150}
                                            display="flex"
                                            alignItems="center"
                                        >
                                            {/*<img
                                                className={classes.imageSize}
                                                src={ETH}
                                                alt="ETH"
                                            />*/
                                            /*  supply array icons */}
                                            <Box>
                                                {" "}
                                                {/*ml={2} */
                                                /* TODO: put back on if we dispplay icons from suppy*/}
                                                <Typography
                                                    variant="h6"
                                                    color="textPrimary"
                                                >
                                                    {item.totalSupplyETH} ETH
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    ${item.totalSupplyUSD}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </LiquidTableCell>
                                    <LiquidTableCell
                                        className="px-0 capitalize"
                                        align="left"
                                    >
                                        {item.collateralRate}
                                    </LiquidTableCell>
                                    <LiquidTableCell className="px-0 capitalize">
                                        {addressParser(item.address)}
                                    </LiquidTableCell>
                                    <LiquidTableCell className="px-0 capitalize">
                                        Donut Chart
                                    </LiquidTableCell>
                                    <LiquidTableCell
                                        className="px-0"
                                        align="right"
                                    >
                                        <LiquidateButton
                                            supplyList={item.supply}
                                            shortfallETH={item.shortfallETH}
                                        />
                                    </LiquidTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </PerfectScrollbar>
            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={liquidationsList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page",
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Card>
    );
};

// Section 6: Documentation with PropTypes
// Liquidate.propTypes = {
//     classes: PropTypes.object.isRequired
// };

// Section 7:  Connect styles and export
export default Liquidate;
