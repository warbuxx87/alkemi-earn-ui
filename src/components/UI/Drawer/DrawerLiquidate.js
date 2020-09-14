// Sub Component

// Section 1: React low level imports
import React, { useEffect, useCallback } from "react";
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
    MenuItem,
    Select,
    SvgIcon,
    Typography,
    Radio,
    InputAdornment,
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
                borderRadius: "4px",
                opacity: 1,
                height: "50px",
                paddingLeft: "10px",
                color: "white",
                fontSize: "16px",
                "& .MuiInputBase-input": {
                    padding: "6px 0 6px",
                },
            },
            select: {
                background: "#1B1B1B 0% 0% no-repeat padding-box",
                border: "1px solid #000000",
                borderRadius: "4px",
                opacity: 1,
                height: "50px",
                color: "white",
                fontSize: "16px",
                "& .MuiSelect-selectMenu": {
                    padding: "6px 10px",
                },
                "& .MuiSelect-select:focus": {
                    background: "none",
                },
                "& .MuiSelect-icon": {
                    right: "10px",
                },
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
            cardTitle: {
                fontSize: "16px",
                marginTop: "0px",
                marginBottom: "3px",
                fontWeight: 500,
            },
            cardSubtitle: {
                fontSize: "12px",
                color: "#979797",
                margin: "0px",
                fontWeight: "400",
            },
            wrapperRadio: {
                padding: "10px",
                border: "1px solid #000000",
                borderRadius: "4px",
                marginBottom: "12px",
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
            bonusBox: {
                paddingTop: 3,
            },
            assetImg: {
                marginRight: "12px",
                width: "25px",
                height: "25px",
                paddingTop: "3px",
            },
            inputIcon: {
                width: "25px",
                height: "25px",
                marginRight: "4px",
            },
            vertCent: {
                margin: "auto",
            },
            amount: {
                paddingTop: "20px",
            },
        }),
    {
        name: "drawerLiquidate",
        index: 1,
    }
);

const DrawerLiquidateWrapper = ({
    loanList,
    collateralAssetList,

    buttonsLabel,

    shortfallETH,
    onButtonClick,

    onSetMax,
    onResetAmount,
    amount,
    onSetAmount,

    enableButtonClick,
    isDoingAction,

    selectedLoanAsset,
    setSelectedLoanAsset,
    selectedCollateralAsset,
    setSelectedCollateralAsset,

    marketsData,
}) => {
    const classes = DrawerLiquidateClass();

    // UI state
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedLoanAssetData, setSelectedLoanAssetData] = React.useState(
        {}
    );
    const [
        selectedCollateralAssetData,
        setSelectedCollateralAssetData,
    ] = React.useState({});

    const handleChooseSupplyCoin = useCallback(
        (val) => {
            if (!val) return;

            setSelectedLoanAsset(val.symbol);
            setSelectedLoanAssetData(val);
        },
        [setSelectedLoanAsset, setSelectedLoanAssetData]
    );

    const handleChooseBorrowCoin = useCallback(
        (val) => {
            if (!val) return;

            setSelectedCollateralAsset(val);

            const assetFromcollateralAssetList = collateralAssetList.find(
                (e) => e.symbol === val
            );

            setSelectedCollateralAssetData(assetFromcollateralAssetList);
        },
        [
            setSelectedCollateralAsset,
            setSelectedCollateralAssetData,
            collateralAssetList,
        ]
    );
    const handleChangeDropdownBorrow = (event) => {
        handleChooseBorrowCoin(event.target.value);
    };

    // Choose first entry by default on load/data change
    useEffect(() => {
        if (loanList.length > 0) {
            handleChooseSupplyCoin(loanList[0]);
        }
    }, [loanList, handleChooseSupplyCoin]);

    useEffect(() => {
        if (collateralAssetList.length > 0)
            handleChooseBorrowCoin(collateralAssetList[0].symbol);
    }, [collateralAssetList, handleChooseBorrowCoin]);

    const displayAssetsRadio = ({
        list,
        selectedAsset,
        handleChooseCoin,
        showDiscount,
    }) => {
        return (
            <>
                {list.map((val) => (
                    <Grid
                        key={val.symbol}
                        container
                        justify="space-between"
                        alignItems="center"
                        className={
                            selectedAsset === val.symbol
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
                                <h3 className={classes.cardTitle}>
                                    {displayMaxAmountOfTokensForEachLoan(
                                        val.symbol
                                    ).toFixed(6)}{" "}
                                    {val.symbol}
                                </h3>
                                <h5 className={classes.cardSubtitle}>
                                    $
                                    {
                                        displayMaxAmountOfTokensForEachLoan(
                                            "USDC"
                                        ).toFixed(
                                            2
                                        ) /* using USDC calculation now for USD value */
                                    }
                                </h5>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.textRight}>
                            <Radio
                                checked={selectedAsset === val.symbol}
                                value={val.symbol}
                                name="radio-button"
                                className={classes.styleRadio}
                                size="small"
                            />
                            {showDiscount && (
                                <Box className={classes.bonusBox}>
                                    <span>10% </span>
                                    <span
                                        style={{
                                            color: "#a7a7a7",
                                            textTransform: "none",
                                        }}
                                    >
                                        Bonus
                                    </span>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                ))}
            </>
        );
    };

    const displayAssetsDropdown = ({ list }) => {
        return list.map((val) => (
            <MenuItem key={val.symbol} value={val.symbol}>
                <Box display="flex" alignItems="center">
                    <Box>
                        <img
                            src={getTokenIcon(val.symbol)}
                            alt="asset"
                            className={classes.assetImg}
                        />{" "}
                    </Box>
                    <Box> {val.symbol}</Box>
                </Box>
            </MenuItem>
        ));
    };

    const displayMaxAmountOfTokensForEachLoan = (symbol) => {
        const assetMarketDataForSymbol = marketsData.find(
            (e) => e.symbol === symbol
        );

        // shortFallETH / token Oracle Price
        let calculatedValue = 0;

        if (
            assetMarketDataForSymbol !== undefined &&
            assetMarketDataForSymbol &&
            shortfallETH
        )
            calculatedValue =
                shortfallETH / assetMarketDataForSymbol.oraclePrice;

        return calculatedValue;
    };

    const getPercentage = (theValue, appliedPercentage) => {
        return theValue * appliedPercentage;
    };

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

                    {/*  <Box pt={5} p={2}>
                        <Grid container className={classes.amount}>
                            Outstanding Loans
                        </Grid>
                        {displayAssetsRadio({
                            list: collateralAssetList,
                            selectedAsset: selectedCollateralAsset,
                            handleChooseCoin: handleChooseBorrowCoin,
                            showDiscount: false,
                        })}
                    </Box>*/}

                    <Box pt={5} px={2}>
                        <Box pb={1}>
                            <Typography variant="body1" color="textPrimary">
                                Outstanding Loan
                            </Typography>
                        </Box>
                        {displayAssetsRadio({
                            list: loanList,
                            selectedAsset: selectedLoanAsset,
                            handleChooseCoin: handleChooseSupplyCoin,
                            showDiscount: true,
                        })}
                    </Box>

                    <Box px={2} className={classes.amount}>
                        <Box pb={1}>
                            <Typography variant="body1" color="textPrimary">
                                Amount (What you Pay)
                            </Typography>
                        </Box>
                        <Box className={classes.inputWrap}>
                            <Input
                                autoFocus={true}
                                disableUnderline={true}
                                className={classes.input}
                                placeholder="0.00"
                                type={amount < 0 ? "text" : "number"}
                                onChange={(e) => onSetAmount(e.target.value)}
                                value={amount < 0 ? "LIQUIDATE ALL" : amount}
                                fullWidth={true}
                                disabled={amount < 0}
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <img
                                            src={getTokenIcon(
                                                selectedLoanAsset
                                            )}
                                            alt="asset"
                                            className={classes.inputIcon}
                                        />
                                    </InputAdornment>
                                }
                            />

                            <span
                                className={classes.maxTips}
                                onClick={amount < 0 ? onResetAmount : onSetMax}
                            >
                                {amount < 0 ? "CHANGE" : "MAX"}
                            </span>
                        </Box>
                        <Box className={classes.inputWrap} pt={2}>
                            <Box pb={1}>
                                <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    className={classes.subtitle}
                                >
                                    Collateral (What you Receive)
                                </Typography>
                            </Box>
                            <Select
                                className={classes.select}
                                labelId="receive-asset"
                                id="receive-asset"
                                value={selectedCollateralAsset}
                                onChange={handleChangeDropdownBorrow}
                                label="Asset"
                                fullWidth={true}
                                autoFocus={true}
                                disableUnderline={true}
                            >
                                {displayAssetsDropdown({
                                    list: collateralAssetList,
                                })}
                            </Select>
                        </Box>
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
                                        You're Paying
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {displayMaxAmountOfTokensForEachLoan(
                                        selectedLoanAsset
                                    ).toFixed(6)}{" "}
                                    {selectedLoanAsset}
                                </Grid>
                            </Grid>

                            <Grid container className={classes.rateRow}>
                                <Grid item md={6} className={classes.vertCent}>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        You Receive
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {displayMaxAmountOfTokensForEachLoan(
                                        selectedCollateralAsset
                                    ).toFixed(6)}{" "}
                                    {selectedCollateralAsset}
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
                                        Bonus
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {getPercentage(
                                        displayMaxAmountOfTokensForEachLoan(
                                            selectedCollateralAsset
                                        ),
                                        0.1
                                    ).toFixed(6)}{" "}
                                    {selectedCollateralAsset}
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
                                        Receive Total
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {(
                                        displayMaxAmountOfTokensForEachLoan(
                                            selectedCollateralAsset
                                        ) +
                                        getPercentage(
                                            displayMaxAmountOfTokensForEachLoan(
                                                selectedCollateralAsset
                                            ),
                                            0.1
                                        )
                                    ).toFixed(6)}{" "}
                                    {selectedCollateralAsset}
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
                                    onButtonClick({
                                        assetCollateral: selectedCollateralAsset,
                                        assetBorrow: selectedLoanAsset,

                                        symbol: selectedLoanAsset,
                                    });
                                    handleClose();
                                }}
                                size="large"
                                fullWidth={true}
                                disabled={!enableButtonClick || isDoingAction}
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
    loanList: PropTypes.array.isRequired,
};

// Section 7:  Connect styles and export
export default DrawerLiquidateWrapper;
