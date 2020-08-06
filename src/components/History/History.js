// Main Component

// Section 1: React low level imports
import React, { useState } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import clsx from 'clsx';

// Section 2: Material-UI imports
import {
    Box,
    Button,
    Card,
    Table,
    IconButton,
    Link,
    SvgIcon,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    TextField,
    Typography,
    makeStyles,
} from "@material-ui/core";

import {
  ArrowRight as ArrowRightIcon,
} from 'react-feather';

// Section 3: Components & Containers import from the application

import {
    toDate,
    openEtherScan,
    formatNumber,
    getTokenIcon,
    checkAction,
} from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    imageSize: {
        width: "30px",
        height: "30px",
    },
    assetField: {
    flexBasis: 200
  },
  eventField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200
  },
  sortField: {
  flexBasis: 200
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
        id: "Borrow",
        name: "Borrow",
    },
    {
        id: "Repay",
        name: "Repay",
    },
    {
        id: "Withdraw",
        name: "Withdraw",
    },
];

const sortOptions = [
    {
      value: 'latest|desc',
      label: 'Most Recent'
    },
    {
      value: 'oldest|asc',
      label: 'Oldest'
    },
    {
      value: 'highvalue|desc',
      label: 'Highest Value'
    },
    {
      value: 'lowvalue|asc',
      label: 'Lowest Value'
    }
];

// Section 5: Code Component
const History = ({ address,className, txList, txPending, error, ...rest }) => {
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
    };
    const [isOpen, setOpen] = useState(false);
    const [values, setValues] = useState({});

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (field, value) => {
        setValues({
            ...values,
            [field]: value,
        });
    };


    return (
      <Card
className={clsx(classes.root, className)}
{...rest}
>      <Box p={2} pt={3}>
        <Box
          display="flex"
          alignItems="center"
        >
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
        <TextField
            fullWidth
            label="Action"
            name="action"
            className={classes.eventField}
            onChange={handleChange}
            select
            SelectProps={{ native: true }}
            value={values.category}
            variant="outlined"
            color="secondary"
        >
            {eventAction.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
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
              SelectProps={{ native: true }}
              value={values.category}
              variant="outlined"
              color="secondary"
          >
              {sortOptions.map((category) => (
                  <option key={category.value} value={category.value}>
                      {category.label}
                  </option>
              ))}
          </TextField>
        </Box>

      </Box>
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">
                        <Typography
                                variant="body2"
                                color="textSecondary">
                                Date
                            </Typography>
                            </TableCell>
                        <TableCell className="px-0">
                        <Typography
                                variant="body2"
                                color="textSecondary">
                                Action
                                </Typography>
                                </TableCell>
                        <TableCell className="px-0"><Typography
                                variant="body2"
                                color="textSecondary">
                                Asset
                                </Typography>
                                </TableCell>
                        <TableCell className="px-0"><Typography
                                variant="body2"
                                color="textSecondary">
                                Symbol
                                </Typography>
                                </TableCell>
                        <TableCell className="px-0"><Typography
                                variant="body2"
                                color="textSecondary">
                                Amount
                                </Typography>
                                </TableCell>
                        <TableCell className="px-0"><Typography
                                variant="body2"
                                color="textSecondary">
                                Value
                                </Typography>
                                </TableCell>
                        <TableCell className="px-0" align="right"><Typography
                                variant="body2"
                                color="textSecondary">View TX
                                </Typography>
                                </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {txList
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                <Typography
                                    variant="body1"
                                      color="textPrimary">
                                    {toDate(item.timeStamp)}
                                </Typography>
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                <Typography
                                    variant="body1"
                                      color="textPrimary">
                                    {checkAction(
                                        address,
                                        item.to,
                                        item.from,
                                        formatNumber(
                                            item.value,
                                            item.tokenSymbol
                                        )
                                    )}
                                </Typography>
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                <Typography
                                    variant="body1"
                                      color="textPrimary">
                                    {item.tokenName}
                                </Typography>
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    <img
                                        className={classes.imageSize}
                                        src={getTokenIcon(item.tokenSymbol)}
                                        alt={item.tokenName}
                                    />
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                <Typography
                                    variant="body1"
                                      color="textPrimary">
                                    {formatNumber(item.value, item.tokenSymbol)}
                                </Typography>
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                <Typography
                                    variant="body1"
                                      color="textPrimary">
                                    $
                                </Typography>
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="right"
                                >
                                <IconButton   href={openEtherScan(item.hash)}>
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[8, 25, 50, 100]}
                component="div"
                count={txList.length}
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
