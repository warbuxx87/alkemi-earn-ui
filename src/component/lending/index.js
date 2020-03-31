import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import LendingTable from '../lendingTable'
export default function PermanentDrawerLeft() {

  return (
   <div className="lending">
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
              <Grid className="title">Aggregated USD Value</Grid>
              <Divider className="divider"  />
              <Grid className="valuable">$0.00</Grid>
          </Grid>
        </Grid>
        <Grid className="box" item xs>
          <Grid className="info_box">
            <Grid className="title">Aggregated USD Value</Grid>
            <Divider className="divider"  />
            <Grid className="valuable">$0.00</Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="tableCurrent">
        <Grid container className="bg_title">
          <Grid item md={6}>
              <Grid className="table_name">
               Current Markets
              </Grid>
          </Grid>
          <Grid item md={6} className="add">
            <Grid className="addAsset">
            Add Asset +
            </Grid>
          </Grid>
        </Grid>
        <LendingTable></LendingTable>
      </Grid>
   </div>
  );
}
