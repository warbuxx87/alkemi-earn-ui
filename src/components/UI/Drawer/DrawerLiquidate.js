// Sub Component

// Section 1: React low level imports
import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Input,
    Grid,
    SvgIcon,
    Typography,
    Radio,
} from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import { XCircle as XIcon } from "react-feather";

// Section 3: Components & Containers import from the application
import clsx from "clsx";

import { getTokenIcon } from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object
const DrawerLiquidateClass = makeStyles(
    (theme) =>
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
                fontSize: "14px",
            },
            input: {
                background: "#1B1B1B 0% 0% no-repeat padding-box",
                border: "1px solid #000000",
                opacity: 1,
                height: "54px",
                paddingLeft: "10px",
                color: "white",
                fontSize: "18px",
            },
            amount: {
                color: "white",
                paddingBottom: "14px",
            },
            rateInfo: {
                color: "white",
                fontSize: "14px",
                marginTop: "20px",
            },
            rateRow: {
                padding: "12px 0",
                borderBottom: "1px dashed #a7a7a7",
            },
            walletBalance: {
                color: "#a7a7a7",
            },
            title: {
                fontSize: "16px",
                marginTop: "0px",
                marginBottom: "0px",
            },
            subtitle: {
                fontSize: "12px",
                margin: "0px",
                fontWeight: "300",
            },
            wrapperRadio: {
                padding: "10px",
                border: "1px solid #000000",
                borderRadius: "4px",
                marginBottom: "10px",
                "&:hover": {
                    border: "1px solid rgba(240, 240, 240, 0.3)",
                    cursor: "pointer",
                },
            },
            textRight: {
                textAlign: "right",
            },
            borderWhite: {
                border: "1px solid #FFF",
            },
            mr15: {
                marginRight: "15px",
            },
            styleRadio: {
                padding: "0px",
            },
            text: {
                fontSize: "12px",
                color: "#979797",
                marginBottom: "5px",
                textTransform: "none",
            },
        }),
    {
        name: "drawerLiquidate",
        index: 1,
    }
);

const DrawerLiquidateWrapper = ({ buttonsLabel, data, supplyList }) => {
    const classes = DrawerLiquidateClass();

    // UI state
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState("");
    const [dataAmount, setDataAmount] = React.useState({});

    const handleChooseCoin = (val) => {
        setValue(val.symbol);
        setDataAmount(val);
    };

    // Choose first entry by default on load
    useEffect(() => {
        handleChooseCoin(supplyList[0]);
    }, []);

    useEffect(() => {
        if (data.length) {
            setValue(data[0].symbol);
            setDataAmount(data[0]);
        }
    }, [data]);

    console.log("supplyList: ", supplyList);

    // Section 5: Code Component
    return (
        <>
            <Button
                type="button"
                className={classes.btnDrawer}
                size="small"
                onClick={handleOpen}
                style={{ background: "#e0e0e0", color: "rgba(0, 0, 0, 0.87)" }}
            >
                View
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
                            Liquidate
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <SvgIcon fontSize="small">
                                <XIcon />
                            </SvgIcon>
                        </IconButton>
                    </Box>
                    <Divider />
                    <Box pt={5} p={2}>
                        <Grid container className={classes.amount}>
                            Available Assets
                        </Grid>
                        {supplyList.map((val) => (
                            <Grid
                                container
                                xs
                                justify="space-between"
                                alignItems="center"
                                className={
                                    value === val.symbol
                                        ? clsx(
                                              classes.wrapperRadio,
                                              classes.borderWhite
                                          )
                                        : classes.wrapperRadio
                                }
                                onClick={() => handleChooseCoin(val)}
                            >
                                <Grid container item xs>
                                    <img
                                        src={getTokenIcon(val.symbol)}
                                        alt="asset"
                                        width="35px"
                                        className={classes.mr15}
                                    />
                                    <Grid>
                                        <h3 className={classes.title}>
                                            {val.amountToken} {val.symbol}
                                        </h3>
                                        <h5 className={classes.subtitle}>
                                            ${val.valueUSD}
                                        </h5>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.textRight}>
                                    <Radio
                                        checked={value === val.symbol}
                                        value={val.symbol}
                                        name="radio-button"
                                        className={classes.styleRadio}
                                    />
                                    <div>
                                        <span>{/*val.discount*/}?% </span>
                                        <span
                                            style={{
                                                opacity: "0.5",
                                                textTransform: "none",
                                            }}
                                        >
                                            Discount
                                        </span>
                                    </div>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                    <Box p={2}>
                        <Grid container className={classes.amount}>
                            <Grid item md={6} xs>
                                Amount
                            </Grid>
                        </Grid>
                        <div className={classes.inputWrap}>
                            <Input
                                autoFocus={true}
                                disableUnderline={true}
                                className={classes.input}
                                placeholder="0.00"
                                type="number"
                                value={0}
                                fullWidth={true}
                            />
                            <span className={classes.maxTips}>MAX</span>
                            {/* onClick={() => { click_max(this) }} */}
                        </div>
                        <Grid className={classes.rateInfo}>
                            <Grid container className={classes.rateRow}>
                                <Grid item md={6} xs>
                                    Debt to cover
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {dataAmount.debtToCover | 0} ETH
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
                                    {dataAmount.discountValue | 0}{" "}
                                    {dataAmount.symbol}
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
                                    {dataAmount.recieve | 0} {dataAmount.symbol}
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
                                    handleClose();
                                }}
                                size="large"
                                fullWidth={true}
                            >
                                {buttonsLabel}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

// Section 6: Documentation with PropTypes
DrawerLiquidateWrapper.propTypes = {
    buttonsLabel: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

// Section 7:  Connect styles and export
export default DrawerLiquidateWrapper;
