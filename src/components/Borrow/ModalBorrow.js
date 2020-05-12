// sub-component

// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import { Modal, Button, Input, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// Section 3: Components & Containers import from the application
import BorrowChartSupply from "./ChartBorrow";
import BorrowModal from "components/UI/Modal";

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

export default function SimpleModal() {
    const classes = BorrowModal();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // Section 5: Code Component

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Grid container className={classes.titleSupply}>
                <Grid item md={11}>
                    <Grid
                        className={classes.textSupply}
                        id="simple-modal-title"
                    >
                        Supply ETH
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
            <Grid className={classes.supplyChart}>
                <div className={classes.supplyPercent}>2.34% APR</div>
                <div
                    id="simple-modal-chart"
                    className={classes.simpleModalChart}
                >
                    <BorrowChartSupply> </BorrowChartSupply>
                </div>
            </Grid>
            <div className={classes.supplyCon}>
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
                        Wallet: 11234.88
                    </Grid>
                </Grid>
                <div className={classes.inputWrap}>
                    <Input
                        autoFocus="true"
                        disableUnderline="true"
                        className={classes.input}
                        placeholder="0.00"
                        type="value"
                        // onChange={(e) => { input_chang(this, e.target.value) }}
                        // value={this.state.amount_to_dupply}
                    />
                    <span className={classes.maxTips}>MAX</span>
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
                <div className={classes.divSupply}>
                    <Button
                        type="button"
                        className={classes.btnModal}
                        variant="contained"
                        onClick={handleOpen}
                    >
                        Supply
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
                Supply
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
