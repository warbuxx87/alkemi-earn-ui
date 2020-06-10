// Sub Component

// Section 1: React low level imports
import React from "react";
import web3 from "web3";
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
import LendChart from "./ChartLend";
import LendDrawer from "components/UI/Drawer";
import {
    formatNumber,
    formatPriceWithCurrency,
    fromWei,
    toWei,
    formatPercent,
} from "utils/front-end";

// wild selector
import { networkSelector } from "redux/selectors/drizzle";

// wild url_map
const url_map = require("constants/url_map.json");
const address_map = require("constants/address_map.json");

// Section 4: Define Styles function taking theme as argument and returning an object

export default function DrawerRedeem({ asset, onRedeem }) {
    const classes = LendDrawer();

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
    const onSetMax = () => setAmount(fromWei(asset.balance, asset.unit));

    const [enableRedeem, setEnableRedeem] = React.useState(false);
    React.useEffect(() => {
        if (amount) {
            const isAmountLTBalance = web3.utils
                .toBN(toWei(amount, asset.unit))
                .lte(web3.utils.toBN(asset.balance));
            setEnableRedeem(isAmountLTBalance);
        }
    }, [amount, asset.balance, asset.unit]);

    return (
        <>
            <Button
                type="button"
                className={classes.btnDrawer}
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleOpen}
            >
                {asset.redeeming ? (
                    <CircularProgress size={20} color="inherit" />
                ) : (
                    "Redeem"
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
                        <Typography
                            variant="h4"
                            color="textPrimary"
                        ></Typography>
                        <IconButton onClick={handleClose}>
                            <SvgIcon fontSize="small">
                                <XIcon />
                            </SvgIcon>
                        </IconButton>
                    </Box>
                    <Divider />
                    <Box p={2} bgcolor="background.dark">
                        <div className={classes.supplyPercent}>
                            {formatPercent(asset.apr)} APR
                        </div>
                        <LendChart> </LendChart>
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
                                {""}
                                {}
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
                                onClick={onSetMax}
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
                        <div className={classes.divRedeem}>
                            <Button
                                type="button"
                                className={classes.btnModal}
                                variant="contained"
                                color="primary"
                                onClick={() => onRedeem({ asset, amount })}
                                disabled={!enableRedeem || asset.redeeming}
                                size="large"
                                fullWidth={true}
                            >
                                {asset.redeeming ? (
                                    <CircularProgress
                                        size={20}
                                        color="inherit"
                                    />
                                ) : (
                                    "REDEEM"
                                )}
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}
