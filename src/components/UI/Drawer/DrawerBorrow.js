// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getUSDPrice } from "redux/selectors/data/totalBalance";

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
    Tooltip,
    Typography,
} from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import { XCircle as XIcon } from "react-feather";
import { HelpCircle as HelpIcon } from "react-feather";

// Section 3: Components & Containers import from the application
// import Chart from "./ChartWrapper";
import { formatPercent, formatETHMoneyOrgFee } from "utils/ui";
import ToolTipWrapper from "./ToolTipWrapper";

// Section 4: Define Styles function taking theme as argument and returning an object
const DrawerClass = makeStyles((theme) =>
    createStyles({
        supplyPercent: {
            letterSpacing: "0px",
            color: "#00A577",
            opacity: 1,
            fontSize: "28px",
            fontWeight: "500",
            textAlign: "center",
            // backgroundColor:'#1B1B1B',
            padding: "25px 0",
        },
        drawer: {
            width: "100%",
            "@media (min-width: 780px)": {
                width: 330,
            },
            "@media (min-width: 1940px)": {
                width: 380,
            },
        },
        btnDrawer: {
            minWidth: 100,
            textTransform: "capitalize",
            fontWeight: 500,
            minHeight: 32,
        },
        inputWrap: {
            position: "relative",
        },
        maxTips: {
            position: "absolute",
            right: "15px",
            top: "17px",
            cursor: "pointer",
            color: "#ffffff",
            fontSize: "0.875rem",
        },
        input: {
            background: "#08090c 0% 0% no-repeat padding-box",
            border: "1px solid #000000",
            opacity: 1,
            height: "54px",
            paddingLeft: "10px",
            color: "white",
            fontSize: "18px",
            borderRadius: "4px",
        },
        rateInfo: {
            color: "white",
            fontSize: "0.875rem",
            marginTop: "20px",
        },
        rateRow: {
            padding: "12px 0",
            borderBottom: "1px dashed #57595d",
        },
        walletBalance: {
            color: "#a7a7a7",
        },
        aprBox: {
            border: "solid #57595d 1px",
            borderRadius: "4px",
        },
        vertCent: {
            margin: "auto",
        },
        helpIcon: {
            width: ".8rem",
            marginLeft: "6px",
            color: "#979797",
        },
    })
);

const DrawerWrapper = ({
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
    amountValue,
    walletIsKYCd,
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

    //Origination Fee
    const orgFee = 0.001;

    // Section 5: Code Component
    return (
        <>
            <ToolTipWrapper
                walletIsKYCd={walletIsKYCd}
                toolTipTitle="You are not KYC authorized"
            >
                <Button
                    type="button"
                    className={classes.btnDrawer}
                    variant={triggerButtonVariant}
                    size="small"
                    color={triggerButtonColor}
                    onClick={handleOpen}
                    disabled={walletIsKYCd !== true}
                >
                    {isDoingAction ? (
                        <CircularProgress size={20} color="inherit" />
                    ) : (
                        buttonsLabel
                    )}
                </Button>
            </ToolTipWrapper>

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
                    <Box px={2} py={3} mx={2} mt={5} className={classes.aprBox}>
                        <Typography variant="h2" color="primary" align="center">
                            {formatPercent(asset.apy)} APY
                        </Typography>

                        {/*<Chart> </Chart>*/}
                    </Box>
                    <Box p={2} mt={3}>
                        <Box pb={1}>
                            <Grid container direction="row">
                                <Grid item md={6} xs className={classes.amount}>
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        Amount
                                    </Typography>
                                </Grid>
                                <Grid item md={6} className={classes.vertCent}>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        align="right"
                                    >
                                        {amountValue}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
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
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    className={classes.vertCent}
                                >
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Market Utilization
                                    </Typography>
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
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    className={classes.vertCent}
                                >
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Asset Price
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {usdPrice}
                                </Grid>
                            </Grid>
                            align="left"
                            <Grid container className={classes.rateRow}>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    className={classes.vertCent}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            Borrow Fees
                                        </Typography>
                                        <Tooltip
                                            title="0.1% origination fee"
                                            placement="right"
                                            arrow
                                            className={classes.toolTip}
                                        >
                                            <HelpIcon
                                                fontSize="small"
                                                className={classes.helpIcon}
                                            />
                                        </Tooltip>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    <Box>
                                        {amount * orgFee}{" "}
                                        {asset.unit === "WETH"
                                            ? "ETH"
                                            : asset.unit}
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            align="right"
                                        >
                                            {formatETHMoneyOrgFee(
                                                asset.price,
                                                amount,
                                                "USD",
                                                asset.unit,
                                                useSelector(getUSDPrice)
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Box className={classes.sendButtonDiv} mt={4}>
                            <Button
                                type="button"
                                className={classes.btnModal}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    onButtonClick({ asset, amount });
                                    handleClose();
                                }}
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
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

// Section 6: Documentation with PropTypes
DrawerWrapper.propTypes = {
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
    amountValue: PropTypes.string.isRequired,
    walletIsKYCd: PropTypes.bool.isRequired,
};

// Section 7:  Connect styles and export
export default DrawerWrapper;
