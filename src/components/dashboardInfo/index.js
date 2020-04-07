import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import styles from './styles';

export default function DashboardInfo() {
  const classes = styles();
  return (
       <Grid container spacing={3}>
        <Grid className={classes.box} item xs>
          <Grid className={classes.info_box}>
              <Grid className={classes.title}>Portfolio Value</Grid>
              <Divider className={classes.divider}  />
              <Grid className={classes.box_portfolio} container>
                <Grid item md={6} xs>
                  <Grid className={classes.nameValueable}>Portfolio Value</Grid>
                  <Grid  className={classes.valuable}>
                    0
                  </Grid>
                </Grid>
                <Grid item md={6} xs>
                  <Grid className={classes.nameChange}>24 hr Change</Grid>
                  <Grid  className={classes.change}>
                    0
                  </Grid>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid className={classes.info_box}>
              <Grid className={classes.title}>Deposits</Grid>
              <Divider className={classes.divider}  />
              <Grid className={classes.box_deposits}  container>
                <Grid item md={6} xs>
                  <Grid className={classes.nameValueable}>Total Lent</Grid>
                  <Grid  className={classes.valuable}>
                    0
                  </Grid>
                </Grid>
                <Grid item md={6} xs>
                  <Grid className={classes.nameChange}>Total Interest Earnt</Grid>
                  <Grid  className={classes.change}>
                    0
                  </Grid>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.box} item xs>
          <Grid className={classes.info_box}>
            <Grid className={classes.title}>Loans</Grid>
            <Divider className={classes.divider}  />
            <Grid className={classes.box_loans} container>
                <Grid item md={6} xs>
                  <Grid className={classes.nameValueable}>Total Debt</Grid>
                  <Grid  className={classes.valuable}>
                    0
                  </Grid>
                </Grid>
                <Grid item md={6} xs>
                  <Grid className={classes.nameChange}>Borrowing Power</Grid>
                  <Grid  className={classes.change}>
                    0
                  </Grid>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Grid>

  );
}
