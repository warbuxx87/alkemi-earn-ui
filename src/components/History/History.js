// Main Component

// Section 1: React low level imports
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import clsx from "clsx";

// Section 2: Material-UI imports
import {
    Box,
    Card,
    Table,
    IconButton,
    SvgIcon,
    TableHead,
    TableBody,
    TableRow,
    TablePagination,
    TextField,
    Typography,
    makeStyles,
    MenuItem,
} from "@material-ui/core";

import { ExternalLink as LinkIcon } from "react-feather";

// Section 3: Components & Containers import from the application

import { openEtherScan, getTokenIcon } from "utils/ui";

import HistoryTableCell from "components/UI/TableCell";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    imageSize: {
        width: "30px",
        height: "30px",
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

const eventAction = [
    {
        id: "All",
        name: "All",
    },
    {
        id: "Deposit",
        name: "Deposit",
    },
    {
        id: "Withdraw",
        name: "Withdraw",
    },
    {
        id: "Borrow",
        name: "Borrow",
    },
    {
        id: "Repay",
        name: "Repay",
    },
    {
        id: "Liquidate",
        name: "Liquidate",
    },
];

const sortOptions = [
    {
        value: "latest|desc",
        label: "Most Recent",
    },
    {
        value: "oldest|asc",
        label: "Oldest",
    },
    {
        value: "highamount|desc",
        label: "Highest Amount",
    },
    {
        value: "lowamount|asc",
        label: "Lowest Amount",
    },
];

// Section 5: Code Component
const History = ({ address, className, txList, txPending, error, ...rest }) => {
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [page, setPage] = React.useState(0);
    const [txtListData, setTxtListData] = React.useState([]);
    const [values, setValues] = useState({
        symbol: "",
        topic: "",
        sortBy: "",
    });

    // filter the data displayed by type and sorting selected
    const filterData = useCallback(() => {
        let data = JSON.parse(JSON.stringify(txList));
        if (values.asset && values.asset !== "ALL") {
            data = data.filter((item) => item.symbol === values.asset);
        }
        if (values.action && values.action !== "All") {
            data = data.filter((item) => {
                return item.topic === values.action;
            });
        }
        if (values.sortBy) {
            switch (values.sortBy) {
                case "lowamount|asc":
                    data = data.sort(
                        (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
                    );
                    break;
                case "highamount|desc":
                    data = data.sort(
                        (a, b) => parseFloat(b.amount) - parseFloat(a.amount)
                    );
                    break;
                case "latest|desc":
                    data = data.sort(
                        (a, b) =>
                            parseFloat(b.timestamp) - parseFloat(a.timestamp)
                    );
                    break;
                case "oldest|asc":
                    data = data.sort(
                        (a, b) =>
                            parseFloat(a.timestamp) - parseFloat(b.timestamp)
                    );
                    break;
                default:
            }
        }

        setPage(0);
        setTxtListData(data);
    }, [txList, values.asset, values.action, values.sortBy]);

    React.useEffect(() => {
        filterData();
    }, [filterData]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
    };

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <Card className={clsx(classes.root, className)} {...rest}>
            {" "}
            <Box p={2} pt={3}>
                <Box display="flex" alignItems="center">
                    <TextField
                        fullWidth
                        label="Asset"
                        name="asset"
                        className={classes.assetField}
                        onChange={handleChange}
                        select
                        value={values.asset}
                        variant="outlined"
                        color="secondary"
                    >
                        {assetName.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        label="Action"
                        name="action"
                        className={classes.eventField}
                        onChange={handleChange}
                        select
                        value={values.action}
                        variant="outlined"
                        color="secondary"
                    >
                        {eventAction.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box flexGrow={1} />
                    <TextField
                        fullWidth
                        label="Sort By"
                        name="sortBy"
                        className={classes.sortField}
                        onChange={handleChange}
                        select
                        value={values.sortBy}
                        variant="outlined"
                        color="secondary"
                    >
                        {sortOptions.map((category) => (
                            <MenuItem
                                key={category.value}
                                value={category.value}
                            >
                                {category.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </Box>
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <HistoryTableCell className="px-0">
                            <Typography variant="body2" color="textSecondary">
                                Date
                            </Typography>
                        </HistoryTableCell>
                        <HistoryTableCell className="px-0">
                            <Typography variant="body2" color="textSecondary">
                                Action
                            </Typography>
                        </HistoryTableCell>
                        <HistoryTableCell className="px-0">
                            <Typography variant="body2" color="textSecondary">
                                Asset
                            </Typography>
                        </HistoryTableCell>
                        <HistoryTableCell className="px-0">
                            <Typography variant="body2" color="textSecondary">
                                Symbol
                            </Typography>
                        </HistoryTableCell>
                        <HistoryTableCell className="px-0">
                            <Typography variant="body2" color="textSecondary">
                                Amount
                            </Typography>
                        </HistoryTableCell>
                        <HistoryTableCell className="px-0">
                            <Typography variant="body2" color="textSecondary">
                                Balance
                            </Typography>
                        </HistoryTableCell>
                        <HistoryTableCell className="px-0" align="right">
                            <Typography variant="body2" color="textSecondary">
                                View TX
                            </Typography>
                        </HistoryTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {txtListData
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => (
                            <TableRow key={index}>
                                <HistoryTableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                    >
                                        {item.date}
                                    </Typography>
                                </HistoryTableCell>
                                <HistoryTableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                    >
                                        {item.topic}
                                    </Typography>
                                </HistoryTableCell>
                                <HistoryTableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                    >
                                        {item.name}
                                    </Typography>
                                </HistoryTableCell>
                                <HistoryTableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    <img
                                        className={classes.imageSize}
                                        src={getTokenIcon(item.symbol)}
                                        alt={item.name}
                                    />
                                </HistoryTableCell>
                                <HistoryTableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                    >
                                        {item.amount}
                                    </Typography>
                                </HistoryTableCell>
                                <HistoryTableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                    >
                                        {item.newBalance}
                                    </Typography>
                                </HistoryTableCell>
                                <HistoryTableCell
                                    className="px-0 capitalize"
                                    align="right"
                                >
                                    <IconButton
                                        href={openEtherScan(item.txHash)}
                                        target="_blank"
                                    >
                                        <SvgIcon fontSize="small">
                                            <LinkIcon />
                                        </SvgIcon>
                                    </IconButton>
                                </HistoryTableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                className="px-4"
                rowsPerPageOptions={[8, 25, 50, 100]}
                component="div"
                count={txtListData.length}
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
History.propTypes = {
    txList: PropTypes.array.isRequired,
    txPending: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
};

// Section 7:  Connect styles and export
export default compose(History);
