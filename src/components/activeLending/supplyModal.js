import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

import SupplyChart from './supplyChart';
import styles from "./styles";
import CloseIcon from '@material-ui/icons/Close';



function getModalStyle() {
  const top = 5;
  const left = 50;


  return {
    top: `${top}%`,
    left: `${left}%`,
   // transform: `translate(-${top}%, -${left}%)`,
   transform: `translateX(-${left}%)`,
    width:`459px`,
    padding:`0`
  };
}


export default function SimpleModal() {
  const classes = styles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
    <Grid container  className={classes.titleSupply}>
          <Grid item md={11}>
            <Grid className={classes.textSupply} id="simple-modal-title">Supply ETH</Grid>
          </Grid>
          <Grid item md={1} className={classes.closeIcon} onClick={handleClose}>
            <CloseIcon></CloseIcon>
          </Grid>
        </Grid>
        <Grid className={classes.supplyChart}>
          <div className={classes.supplyPercent}>
          2.34% APR
          </div>
          <div id="simple-modal-chart" className={classes.simpleModalChart}>
              <SupplyChart> </SupplyChart>
          </div>
        </Grid>
        <div className={classes.supplyCon}>
            <Grid container className={classes.amount}>
              <Grid item md={6} xs>
                Amount
              </Grid>
              <Grid item md={6} xs container justify="flex-end" className={classes.walletBalance} >
                Wallet:  11234.88
              </Grid>
            </Grid>
            <div className={classes.inputWrap}>
                <Input
                autoFocus="true"
                disableUnderline="true"
                className={classes.input}
                    placeholder='0.00'
                    type='value'
                    // onChange={(e) => { input_chang(this, e.target.value) }}
                    // value={this.state.amount_to_dupply}
                />
                <span className={classes.maxTips} >MAX</span>
                {/* onClick={() => { click_max(this) }} */}
            </div>
            <Grid className={classes.rateInfo}>
              <Grid container className={classes.rateRow}>
                <Grid item md={6} xs>
                  Utilization rate
                </Grid>
                <Grid item md={6} xs container justify="flex-end" >
                  72.80%
                </Grid>
              </Grid>
              <Grid container className={classes.rateRow}>
                <Grid item md={6} xs>
                  Price
                </Grid>
                <Grid item md={6} xs container justify="flex-end" >
                  $1.00
                </Grid>
              </Grid>
              <Grid container className={classes.rateRow}>
                <Grid item md={6} xs>
                  Dai Balance
                </Grid>
                <Grid item md={6} xs container justify="flex-end" >
                  0.00
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.divSupply}>
            <Button type="button" className={classes.btnSupply} variant="contained" color="primary.dark" onClick={handleOpen}>
             Supply
            </Button>
            </div>
        </div>
    </div>
  );


  return (
    <div>
    <Button type="button" className={classes.btnActive} variant="contained" color="primary.dark" onClick={handleOpen}>
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
