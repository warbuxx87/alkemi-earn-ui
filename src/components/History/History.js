// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

// Section 2: Material-UI imports
import {
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    makeStyles,
} from "@material-ui/core";

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
}));

// Section 5: Code Component
const History = ({ address, txList }) => {
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
    };

    return (
        <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Date</TableCell>
                        <TableCell className="px-0">Action</TableCell>
                        <TableCell className="px-0">Asset</TableCell>
                        <TableCell className="px-0">Symbol</TableCell>
                        <TableCell className="px-0">Amount</TableCell>
                        <TableCell className="px-0">Value</TableCell>
                        <TableCell className="px-0">TX</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {address &&
                        txList
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
                                        {toDate(item.timeStamp)}
                                    </TableCell>
                                    <TableCell
                                        className="px-0 capitalize"
                                        align="left"
                                    >
                                        {checkAction(
                                            address,
                                            item.to,
                                            item.from,
                                            formatNumber(
                                                item.value,
                                                item.tokenSymbol
                                            )
                                        )}
                                    </TableCell>
                                    <TableCell
                                        className="px-0 capitalize"
                                        align="left"
                                    >
                                        {item.tokenName}
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
                                        {formatNumber(
                                            item.value,
                                            item.tokenSymbol
                                        )}
                                    </TableCell>
                                    <TableCell
                                        className="px-0 capitalize"
                                        align="left"
                                    >
                                        $
                                    </TableCell>
                                    <TableCell
                                        className="px-0 capitalize"
                                        align="left"
                                    >
                                        <Button
                                            href={openEtherScan(item.hash)}
                                            target="_blank"
                                            color="primary"
                                            variant="outlined"
                                        >
                                            View
                                        </Button>
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
        </div>
    );
};

// Section 6: Documentation with PropTypes
History.propTypes = {
    txList: PropTypes.array.isRequired,
    txPending: PropTypes.bool.isRequired,
    address: PropTypes.string,
};

// Section 7:  Connect styles and export
export default compose(History);
