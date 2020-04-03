import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

export default function LendingInfo() {

  return (
       <Grid container spacing={3}>
        <Grid className="box" item xs>
          <Grid className="info_box">
              <Grid className="title">Aggregated USD Value</Grid>
              <Divider className="divider"  />
              <Grid className="valuable">$0.00</Grid>
          </Grid>
        </Grid>
        <Grid className="box" item xs>
          <Grid className="info_box">
              <Grid className="title">Interest Earnt</Grid>
              <Divider className="divider"  />
              <Grid className="valuable">$0.00</Grid>
          </Grid>
        </Grid>
        <Grid className="box" item xs>
          <Grid className="info_box">
            <Grid className="title">Earning APR</Grid>
            <Divider className="divider"  />
            <Grid className="valuable">$0.00</Grid>
          </Grid>
        </Grid>
      </Grid>

  );
}
