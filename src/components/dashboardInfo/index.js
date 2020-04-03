import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

export default function DashboardInfo() {

  return (
       <Grid container spacing={3}>
        <Grid className="box" item xs>
          <Grid className="info_box">
              <Grid className="title">Portfolio Value</Grid>
              <Divider className="divider"  />
              <Grid className="valuable">$0.00</Grid>
          </Grid>
        </Grid>
        <Grid className="box" item xs>
          <Grid className="info_box">
              <Grid className="title">Deposits</Grid>
              <Divider className="divider"  />
              <Grid className="valuable">$0.00</Grid>
          </Grid>
        </Grid>
        <Grid className="box" item xs>
          <Grid className="info_box">
            <Grid className="title">Loans</Grid>
            <Divider className="divider"  />
            <Grid className="valuable">$0.00</Grid>
          </Grid>
        </Grid>
      </Grid>

  );
}
