// Main Component

// Section 1: React low level imports
import React from "react";
import clsx from "clsx";
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
    Typography,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

// Section 3: Components & Containers import from the application
import LiquidateButton from "containers/Liquidate/DrawerLiquidate";
import LiquidTableCell from "components/UI/TableCell";
import LiquidationChart from "components/Liquidate/Chart";

import { addressParser, formatStringNumber } from "utils/ui";

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
    cell: {
        paddingTop: "8px",
        paddingBottom: "8px",
    },
}));

const Liquidate = ({
    className,
    liquidationsList,
    userWalletNetwork,
    ...rest
}) => {
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
    };

    // Section 5: Code Component
    return (
        <Card elevation={0} className={clsx(classes.root, className)} {...rest}>
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
                                    <LiquidTableCell
                                        component="th"
                                        scope="row"
                                        className={classes.cell}
                                    >
                                        <Box
                                            minWidth={150}
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    color="textPrimary"
                                                >
                                                    {item.shortfallETH.toFixed(
                                                        6
                                                    )}{" "}
                                                    ETH
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
                                    <LiquidTableCell
                                        component="th"
                                        scope="row"
                                        className={classes.cell}
                                    >
                                        <Box
                                            //minWidth={150}
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
                                                    {formatStringNumber(
                                                        item.totalSupplyETH,
                                                        null,
                                                        userWalletNetwork,
                                                        6
                                                    )}{" "}
                                                    ETH
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    $
                                                    {formatStringNumber(
                                                        item.totalSupplyUSD,
                                                        null,
                                                        userWalletNetwork
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </LiquidTableCell>
                                    <LiquidTableCell
                                        className={classes.cell}
                                        align="left"
                                    >
                                        {formatStringNumber(
                                            item.collateralRate,
                                            null,
                                            userWalletNetwork,
                                            4
                                        )}
                                        %
                                    </LiquidTableCell>
                                    <LiquidTableCell className={classes.cell}>
                                        {addressParser(item.address)}
                                    </LiquidTableCell>
                                    <LiquidTableCell className={classes.cell}>
                                        <LiquidationChart
                                            supplyList={item.supply}
                                            borrowList={item.borrow}
                                        />
                                    </LiquidTableCell>
                                    <LiquidTableCell
                                        className={classes.cell}
                                        align="right"
                                    >
                                        <LiquidateButton
                                            supplyList={item.supply}
                                            borrowList={item.borrow}
                                            shortfallETH={item.shortfallETH}
                                            targetAccount={item.address}
                                            liquidationId={
                                                item._id ||
                                                item.shortfallETH /* In case _id gets removed from API data */
                                            }
                                        />
                                    </LiquidTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </PerfectScrollbar>
            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 8, 10, 25]}
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
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
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
