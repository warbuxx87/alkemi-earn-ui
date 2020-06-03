// Sub Component

// Section 1: React low level imports
import React from "react";
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
import FaucetDrawer from "components/UI/Drawer";
import {
    formatNumber,
    formatETHMoney,
    fromWei,
    formatPercent,
} from "utils/front-end";

// Wild redux selector import
import { getUSDxPrice } from "redux/selectors/totalBalance";

// Section 4: Define Styles function taking theme as argument and returning an object

export default function DrawerFaucet({ asset, onAllocate }) {
    const classes = FaucetDrawer();

    // getModalStyle is not a pure function, we roll the style only on the first render
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Section 5: Code Component
    const usdPrice = useSelector((state) => getUSDxPrice(state));

    const [amount, setAmount] = React.useState(null);
    const onSetMax = () => setAmount(fromWei(asset.wallet, asset.unit));

    const [enableAllocate, setEnableAllocate] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            setEnableAllocate(true);
        }
    }, [amount, asset.wallet, asset.unit]);
    return (
        <>
            <Button
                type="button"
                className={classes.btnActiveOutline}
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleOpen}
            >
                {asset.allocating ? (
                    <CircularProgress size={20} color="inherit" />
                ) : (
                    "Allocate"
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
                            Mint New {asset.unit} Tokens
                        </Typography>
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
                                    {formatETHMoney(
                                        asset.price,
                                        "USD",
                                        asset.unit,
                                        usdPrice
                                    )}
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
                                    0.00
                                </Grid>
                            </Grid>
                        </Grid>
                        <div className={classes.divAllocate}>
                            <Button
                                type="button"
                                className={classes.btnModal}
                                variant="contained"
                                color="primary"
                                onClick={() => onAllocate({ asset, amount })}
                                disabled={!enableAllocate || asset.allocating}
                                size="large"
                                fullWidth={true}
                            >
                                {asset.allocating ? (
                                    <CircularProgress
                                        size={20}
                                        color="inherit"
                                    />
                                ) : (
                                    "Allocate"
                                )}
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}
