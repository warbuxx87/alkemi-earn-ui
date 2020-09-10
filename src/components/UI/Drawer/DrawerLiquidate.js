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
    FormControl,
    Grid,
    MenuItem,
    Select,
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
                borderRadius: "4px",
                opacity: 1,
                height: "50px",
                paddingLeft: "10px",
                color: "white",
                fontSize: "16px",
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
            subtitle: {
                paddingBottom: "12px",
                fontWeight: 500,
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
                marginBottom: "0px",
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

const DrawerLiquidateWrapper = ({
    buttonsLabel,
    supplyList,
    borrowList,

    shortfallETH,
    onButtonClick,

    onSetMax,
    onResetAmount,
    amount,
    onSetAmount,

    enableButtonClick,
    isDoingAction,

    selectedSupplyAsset,
    setSelectedSupplyAsset,
    selectedBorrowAsset,
    setSelectedBorrowAsset,
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

    const [
        selectedSupplyAssetData,
        setSelectedSupplyAssetData,
    ] = React.useState({});
    const [
        selectedBorrowAssetData,
        setSelectedBorrowAssetData,
    ] = React.useState({});

    const handleChooseSupplyCoin = useCallback(
        (val) => {
            if (!val) return;

            setSelectedSupplyAsset(val.symbol);
            setSelectedSupplyAssetData(val);
        },
        [setSelectedSupplyAsset, setSelectedSupplyAssetData]
    );

    const handleChooseBorrowCoin = useCallback(
        (val) => {
            if (!val) return;

            setSelectedBorrowAsset(val);

            const assetFromBorrowList = borrowList.find(
                (e) => e.symbol === val
            );

            console.log("assetFromBorrowList: ", assetFromBorrowList);
            setSelectedBorrowAssetData(assetFromBorrowList);
        },
        [setSelectedBorrowAsset, setSelectedBorrowAssetData]
    );
    const handleChangeDropdownBorrow = (event) => {
        handleChooseBorrowCoin(event.target.value);
    };

    // Choose first entry by default on load/data change
    useEffect(() => {
        if (supplyList.length > 0) {
            handleChooseSupplyCoin(supplyList[0]);
        }
    }, [supplyList, handleChooseSupplyCoin]);

    useEffect(() => {
        if (borrowList.length > 0) handleChooseBorrowCoin(borrowList[0].symbol);
    }, [borrowList, handleChooseBorrowCoin]);

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
                                    {val.amountToken} {val.symbol}
                                </h3>
                                <h5 className={classes.cardSubtitle}>
                                    ${val.valueUSD}
                                </h5>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.textRight}>
                            <Radio
                                checked={selectedAsset === val.symbol}
                                value={val.symbol}
                                name="radio-button"
                                className={classes.styleRadio}
                            />
                            {showDiscount && (
                                <Box>
                                    <span>10% </span>
                                    <span
                                        style={{
                                            opacity: "1",
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
                {val.symbol}
            </MenuItem>
        ));
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
                            list: borrowList,
                            selectedAsset: selectedBorrowAsset,
                            handleChooseCoin: handleChooseBorrowCoin,
                            showDiscount: false,
                        })}
                    </Box>*/}

                    <Box pt={5} p={2}>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            className={classes.subtitle}
                        >
                            Available Collateral
                        </Typography>
                        {displayAssetsRadio({
                            list: supplyList,
                            selectedAsset: selectedSupplyAsset,
                            handleChooseCoin: handleChooseSupplyCoin,
                            showDiscount: true,
                        })}
                    </Box>

                    <Box p={2}>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            className={classes.subtitle}
                        >
                            Amount
                        </Typography>
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
                            />
                            <span
                                className={classes.maxTips}
                                onClick={amount < 0 ? onResetAmount : onSetMax}
                            >
                                {amount < 0 ? "CHANGE" : "MAX"}
                            </span>
                        </Box>
                        <Box className={classes.inputWrap} pt={2}>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                className={classes.subtitle}
                            >
                                Receive Asset
                            </Typography>
                            <Select
                                className={classes.select}
                                labelId="receive-asset"
                                id="receive-asset"
                                value={selectedBorrowAsset}
                                onChange={handleChangeDropdownBorrow}
                                label="Asset"
                                fullWidth={true}
                                autoFocus={true}
                                disableUnderline={true}
                            >
                                {displayAssetsDropdown({ list: borrowList })}
                            </Select>
                        </Box>
                        <Grid className={classes.rateInfo}>
                            <Grid container className={classes.rateRow}>
                                <Grid item md={6} xs>
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                    >
                                        Covering Debt
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {shortfallETH.toFixed(6)} ETH
                                </Grid>
                            </Grid>

                            <Grid container className={classes.rateRow}>
                                <Grid item md={6} xs>
                                    <Typography
                                        variant="body1"
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
                                    {selectedSupplyAssetData.discountValue | 0}{" "}
                                    {selectedSupplyAssetData.symbol}
                                </Grid>
                            </Grid>
                            <Grid container className={classes.rateRow}>
                                <Grid item md={6} xs>
                                    <Typography
                                        variant="body1"
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
                                    {selectedSupplyAssetData.receive | 0}{" "}
                                    {selectedSupplyAssetData.symbol}
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
                                        assetCollateral:
                                            selectedSupplyAssetData.asset,
                                        assetBorrow:
                                            selectedBorrowAssetData.asset,

                                        symbol: selectedSupplyAssetData.symbol,
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
    supplyList: PropTypes.array.isRequired,
};

// Section 7:  Connect styles and export
export default DrawerLiquidateWrapper;
