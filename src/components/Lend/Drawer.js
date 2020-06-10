// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

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
import DrawerClass from "components/UI/Drawer";
import {
    formatNumber,
    formatPriceWithCurrency,
    formatPercent,
} from "utils/front-end";

// Section 4: Define Styles function taking theme as argument and returning an object

const LendDrawer = ({
    asset,
    enableButtonClick,
    onButtonClick,
    usdPrice,
    onSetMax,
    amount,
    setAmount,
    mainTitle,
    balanceValue,
    isDoingAction,
    buttonsLabel,
    triggerButtonColor,
    triggerButtonVariant,
}) => {
    const classes = DrawerClass();

    // UI state
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Section 5: Code Component
    return (
        <>
            <Button
                type="button"
                className={classes.btnDrawer}
                variant={triggerButtonVariant}
                color="secondary"
                size="small"
                color={triggerButtonColor}
                onClick={handleOpen}
            >
                {isDoingAction ? (
                    <CircularProgress size={20} color="inherit" />
                ) : (
                    buttonsLabel
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
                            {mainTitle}
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
                                    {balanceValue}
                                </Grid>
                            </Grid>
                        </Grid>
                        <div className={classes.sendButtonDiv}>
                            <Button
                                type="button"
                                className={classes.btnModal}
                                variant="contained"
                                color="primary"
                                onClick={() => onButtonClick({ asset, amount })}
                                disabled={!enableButtonClick || isDoingAction}
                                size="large"
                                fullWidth={true}
                            >
                                {isDoingAction ? (
                                    <CircularProgress
                                        size={20}
                                        color="inherit"
                                    />
                                ) : (
                                    buttonsLabel
                                )}
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

LendDrawer.propTypes = {
    asset: PropTypes.object.isRequired,
    enableButtonClick: PropTypes.bool.isRequired,
    onButtonClick: PropTypes.func.isRequired,
    usdPrice: PropTypes.string, // It starts as null
    onSetMax: PropTypes.func.isRequired,
    amount: PropTypes.string.isRequired,
    setAmount: PropTypes.func.isRequired,
    mainTitle: PropTypes.string.isRequired,
    balanceValue: PropTypes.string.isRequired,
    isDoingAction: PropTypes.bool, // starts as undefined
    buttonsLabel: PropTypes.string.isRequired,
    triggerButtonColor: PropTypes.string, // not required
    triggerButtonVariant: PropTypes.string,
};

export default LendDrawer;
