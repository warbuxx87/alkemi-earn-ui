// sub-component

// Section 1: React low level imports
import React from "react";
import web3 from "web3";

// Section 2: Material-UI imports
import {
    Modal,
    Button,
    Input,
    Grid,
    CircularProgress
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// Section 3: Components & Containers import from the application
import BorrowChart from "./ChartBorrow";
import ModalBorrow from "components/UI/Modal";
import { formatNumber, fromWei, toWei } from "utils/front-end";

// Section 4: Define Styles function taking theme as argument and returning an object

function getModalStyle() {
    const top = 5;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`,
        transform: `translateX(-${left}%)`,
        width: `459px`,
        padding: `0`
    };
}

export default function BorrowModal({ asset, onBorrow }) {
    const classes = ModalBorrow();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // Section 5: Code Component
    const [amount, setAmount] = React.useState(null);
    const onSetMax = () => setAmount(fromWei(asset.balance, asset.unit));

    const [enableBorrow, setEnableBorrow] = React.useState(false);
    React.useEffect(() => {
        if (amount) {
            const isAmountLTBalance = web3.utils
                .toBN(toWei(amount, asset.unit))
                .lte(web3.utils.toBN(asset.balance));
            setEnableBorrow(isAmountLTBalance);
        }
    }, [amount, asset.balance, asset.unit]);
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Grid container className={classes.titleBorrow}>
                <Grid item md={11}>
                    <Grid
                        className={classes.textBorrow}
                        id="simple-modal-title"
                    >
                        Borrow {asset.unit}
                    </Grid>
                </Grid>
                <Grid
                    item
                    md={1}
                    className={classes.closeIcon}
                    onClick={handleClose}
                >
                    <CloseIcon></CloseIcon>
                </Grid>
            </Grid>
            <Grid className={classes.borrowChart}>
                <div className={classes.borrowPercent}>2.34% APR</div>
                <div
                    id="simple-modal-chart"
                    className={classes.simpleModalChart}
                >
                    <BorrowChart> </BorrowChart>
                </div>
            </Grid>
            <div className={classes.borrowCon}>
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
                        Wallet: {formatNumber(asset.balance, asset.unit)}
                    </Grid>
                </Grid>
                <div className={classes.inputWrap}>
                    <Input
                        autoFocus={true}
                        disableUnderline={true}
                        className={classes.input}
                        placeholder="0.00"
                        type="value"
                        onChange={e => setAmount(e.target.value)}
                        value={amount}
                    />
                    <span className={classes.maxTips} onClick={onSetMax}>
                        MAX
                    </span>
                    {/* onClick={() => { click_max(this) }} */}
                </div>
                <Grid className={classes.rateInfo}>
                    <Grid container className={classes.rateRow}>
                        <Grid item md={6} xs>
                            Utilization rate
                        </Grid>
                        <Grid item md={6} xs container justify="flex-end">
                            72.80%
                        </Grid>
                    </Grid>
                    <Grid container className={classes.rateRow}>
                        <Grid item md={6} xs>
                            Price
                        </Grid>
                        <Grid item md={6} xs container justify="flex-end">
                            $1.00
                        </Grid>
                    </Grid>
                    <Grid container className={classes.rateRow}>
                        <Grid item md={6} xs>
                            Dai Balance
                        </Grid>
                        <Grid item md={6} xs container justify="flex-end">
                            0.00
                        </Grid>
                    </Grid>
                </Grid>
                <div className={classes.divBorrow}>
                    <Button
                        type="button"
                        className={classes.btnModal}
                        variant="contained"
                        onClick={() => onBorrow({ asset, amount })}
                        disabled={!enableBorrow || asset.borrowing}
                    >
                        {asset.borrowing ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            "Borrow"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Button
                type="button"
                className={classes.btnModal}
                variant="contained"
                onClick={handleOpen}
            >
                {asset.borrowing ? (
                    <CircularProgress size={20} color="inherit" />
                ) : (
                    "Borrow"
                )}
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-chart"
            >
                {body}
            </Modal>
        </div>
    );
}
