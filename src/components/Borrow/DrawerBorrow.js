// Sub Component

// Section 1: React low level imports
import React from "react";
// import PropTypes from "prop-types";
// import web3 from "web3";
// import withDrizzle from "containers/Drizzle/withDrizzle";
import { useSelector } from "react-redux";

// Section 2: Material-UI imports
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Drawer,
    IconButton,
    Input,
    Grid,
    SvgIcon,
    Typography,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import { XCircle as XIcon } from "react-feather";
import BorrowChartBorrow from "./ChartBorrow";
import BorrowDrawer from "components/UI/Drawer";
// import { onBorrow } from "containers/Borrow/BorrowAction";
import {
    formatNumber,
    formatPriceWithCurrency,
    // fromWei,
    // toWei,
    formatPercent,
} from "utils/front-end";

// wild selector
import { networkSelector } from "redux/selectors/drizzle";

// wild url_map
const url_map = require("constants/url_map.json");
const address_map = require("constants/address_map.json");

// Section 4: Define Styles function taking theme as argument and returning an object

export default function DrawerBorrow({ asset, onBorrow }) {
    const classes = BorrowDrawer();

    const currentNetworkName = useSelector(networkSelector);
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Section 5: Code Component
    const [usdPrice, setUsdPrice] = React.useState(null);

    const [amount, setAmount] = React.useState("");
    // const onSetMax = () => setAmount(fromWei(asset.balance, asset.unit));

    const [enableBorrow, setEnableBorrow] = React.useState(false);
    React.useEffect(() => {
        if (amount) {
            // const isAmountLTBalance = web3.utils
            //     .toBN(toWei(amount, asset.unit))
            //     .lte(web3.utils.toBN(asset.balance));
            setEnableBorrow(true);
        }
    }, [amount, asset.balance, asset.unit]);

    React.useEffect(() => {
        let timer;
        // TODO extract new code with the rest from component in DF-170, consider also extracting this API call if need to be reused
        const getPrices = () => {
            if (!url_map[currentNetworkName].markets_url) return; // TODO markets_url for rinkeby is gotten from main for now, consider replacing with proper url

            // This call is made for each coin in the table, would benefit from making this call only once,
            // TODO decide later (after refactor tasks) if it should be called at a higher order and dispatched to redux and/or throttled directly
            fetch(url_map[currentNetworkName].markets_url)
                .then((res) => {
                    return res.text();
                })
                .then((data) => {
                    if (data) {
                        const obj_data = JSON.parse(data);

                        const marketsData = obj_data.find((market) =>
                            Object.prototype.hasOwnProperty.call(
                                market,
                                address_map[currentNetworkName][
                                    `address_${asset.unit}`
                                ]
                            )
                        );

                        setUsdPrice(
                            `${
                                marketsData[
                                    address_map[currentNetworkName][
                                        `address_${asset.unit}`
                                    ]
                                ].price
                            }`
                        );
                    }

                    timer = setTimeout(getPrices, 15 * 1000);
                });
        };

        if (currentNetworkName !== undefined) getPrices();

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [currentNetworkName, asset.unit]);

    return (
        <>
            <Button
                type="button"
                className={classes.btnDrawer}
                variant="contained"
                size="small"
                onClick={handleOpen}
            >
                {asset.borrowing ? (
                    <CircularProgress size={20} color="inherit" />
                ) : (
                    "Borrow"
                )}
            </Button>
            <Drawer
                anchor="right"
                classes={{ paper: classes.drawer }}
                ModalProps={{ BackdropProps: { invisible: false } }}
                onClose={handleClose}
                open={isOpen}
                variant="temporary"
            >
                <Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={2}
                    >
                        <Typography variant="h4" color="textPrimary">
                            Borrow {asset.unit}
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <SvgIcon fontSize="small">
                                <XIcon />
                            </SvgIcon>
                        </IconButton>
                    </Box>
                    <Divider />
                    <Box bgcolor="background.dark" p={2}>
                        <div className={classes.supplyPercent}>
                            {formatPercent(asset.apr)} APR
                        </div>
                        <BorrowChartBorrow> </BorrowChartBorrow>
                    </Box>
                    <Box p={2} mt={3}>
                        <Grid container className={classes.amount}>
                            <Grid item md={6} xs>
                                Amount
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs
                                container
                                justify="flex-end"
                                className={classes.walletBalance}
                            >
                                Wallet: {formatNumber(asset.wallet, asset.unit)}
                            </Grid>
                        </Grid>
                        <div className={classes.inputWrap}>
                            <Input
                                autoFocus={true}
                                disableUnderline={true}
                                className={classes.input}
                                placeholder="0.00"
                                type="number"
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount}
                                fullWidth={true}
                            />
                            <span
                                className={classes.maxTips}
                                // onClick={onSetMax}
                            >
                                MAX
                            </span>
                            {/* onClick={() => { click_max(this) }} */}
                        </div>
                        <Grid className={classes.rateInfo}>
                            <Grid container className={classes.rateRow}>
                                <Grid item md={6} xs>
                                    Market Utilization
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {formatPercent(asset.utilization)}
                                </Grid>
                            </Grid>
                            <Grid container className={classes.rateRow}>
                                <Grid item md={6} xs>
                                    Price
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {formatPriceWithCurrency(usdPrice, "USD")}
                                </Grid>
                            </Grid>
                            <Grid container className={classes.rateRow}>
                                <Grid item md={6} xs>
                                    Balance
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {formatNumber(asset.balance, asset.unit)}
                                </Grid>
                            </Grid>
                        </Grid>
                        <div className={classes.divBorrow}>
                            <Button
                                type="button"
                                className={classes.btnModal}
                                variant="contained"
                                color="primary"
                                onClick={() => onBorrow({ asset, amount })}
                                disabled={!enableBorrow || asset.borrowing}
                                size="large"
                                fullWidth={true}
                            >
                                {asset.borrowing ? (
                                    <CircularProgress
                                        size={20}
                                        color="inherit"
                                    />
                                ) : (
                                    "Borrow"
                                )}
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

// // Section 6: Documentation with PropTypes
// DrawerBorrow.propTypes = {
//     asset: PropTypes.array.isRequired,
//     onBorrow: PropTypes.func.isRequired
// };

// Section 7:  Connect styles and export
