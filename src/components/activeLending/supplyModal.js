import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import SupplyChart from './supplyChart';
import styles from "./styles";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
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
      <h2 id="simple-modal-title">Supply *Token*</h2>

        <div id="simple-modal-chart">
          <SupplyChart> </SupplyChart>
        </div>
    </div>
  );

  return (
    <div>
    <Button typle="button" className={classes.btnActive} variant="contained" color="primary" onClick={handleOpen}>
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