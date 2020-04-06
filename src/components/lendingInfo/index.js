import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import styles from './styles';

export default function LendingInfo() {
  const classes = styles();
  return (
       <Grid container spacing={2}>
        <Grid className={classes.box} item xs>
          <Grid className={classes.info_box}>
              <Grid className={classes.title}>Aggregated USD Value</Grid>
              <Divider className={classes.divider}  />
              <Grid className={classes.valuable}>$0.00</Grid>
          </Grid>
        </Grid>
        <Grid className={classes.box} item xs>
          <Grid className={classes.info_box}>
              <Grid className={classes.title}>Interest Earnt</Grid>
              <Divider className={classes.divider} />
              <Grid className={classes.valuable}>$0.00</Grid>
          </Grid>
        </Grid>
        <Grid className={classes.box} item xs>
          <Grid className={classes.info_box}>
            <Grid className={classes.title}>Earning APR</Grid>
            <Divider className={classes.divider} />
            <Grid className={classes.valuable}>$0.00</Grid>
          </Grid>
        </Grid>
      </Grid>

  );
}
