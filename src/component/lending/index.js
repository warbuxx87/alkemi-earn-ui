import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Router, Route, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LendingTable from '../lendingTable';
import ActiveLending from '../activeLending'

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
              Active Lending Reserves
              </Grid>
          </Grid>
          <Grid item md={6} className="add">
            {/* <Grid className="addAsset">
            Add Asset +
            </Grid> */}
          </Grid>
        </Grid>
        <ActiveLending></ActiveLending>
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
