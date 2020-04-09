import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from "@material-ui/core/Button";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import dai from "../../assets/images/DAI.svg";
import usdc from "../../assets/images/USDC.svg";
import eth from "../../assets/images/WETH.svg";
import wbtc from "../../assets/images/WBTC.svg";
import usdx from "../../assets/images/USDx.svg";
import imbtc from "../../assets/images/imBTC.svg";
import usdt from "../../assets/images/USDT.svg";
import hbtc from "../../assets/images/HBTC.svg";
import pax from "../../assets/images/pax.png";
import tusd from "../../assets/images/tusd.png";
import styles from './styles';

const LendingTableCell = withStyles((theme) => ({
  head: {
    backgroundColor:'#202123',
    color: '#a7a7a7',
    opacity:'1',
    fontSize:'12px',
    lineHeight:'1px',
    letterSpacing: 0,
    borderBottom:'1px solid #000000'
  },
  body: {
    fontSize: 14,
    color: theme.palette.common.white,
    borderBottom:'1px solid #000000'
  },
}))(TableCell);



function createData(name, unit, image, wallet, balance, apr, collateral) {
  return { name,unit,image, wallet, balance, apr, collateral };
}

const lRows = [
  createData('Maker DAI','DAI',dai, 0, 0, 0, 0),
  createData('Tether','USDT',usdt, 0, 0, 0, 0),
  createData('USD Coin', 'USDC', usdc, 0, 0, 0, 0),
  createData('Wrapped BTC', 'BTC', wbtc, 0, 0, 0, 0),
  createData('Paxos','PAX', pax, 0, 0, 0, 0),
];

// const useStyles = makeStyles({
//   table: {
//     minWidth: 700,
//   },
// });

export default function CustomizedTables() {
  const classes = styles();
  const lColumns = [
    { id: '1', label: 'Asset', minWidth: 200,  },
    { id: '2', label: 'Wallet Balance', minWidth: 120, align: 'center', },
    { id: '3', label: 'Balance', minWidth: 100, align: 'center', },
    {
      id: '4',
      label: 'APR %',
      minWidth: 100,
      align: 'center',
      //format: value => value.toLocaleString(),
    },
    {
      id: '5',
      label: 'Collateral',
      minWidth: 100,
      align: 'center',
      // format: value => value.toFixed(2),
    },
    {
      id: '6',
      label: '',
      minWidth: 280,
      align: 'center',
      // format: value => value.toFixed(2),
    },
  ];

  return (
    <Grid className={classes.tableLending}>
      <Grid container className={classes.bg_title}>
        <Grid item md={6}>
            <Grid className={classes.table_name}>
             Current Markets
            </Grid>
        </Grid>
        <Grid item md={6} className={classes.add}>
          <Button className={classes.addAsset}>
          Add Asset +
        </Button>
        </Grid>
      </Grid>
    <TableContainer  className={classes.table}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
        <TableRow >
                {lColumns.map((lColumn,i) => (
                  <LendingTableCell key={i} className={classes.lRow}
                    key={lColumn.id}
                    align={lColumn.align}
                    style={{ minWidth: lColumn.minWidth }}
                  >
                    {lColumn.label}
                  </LendingTableCell>
                ))}
              </TableRow>
        </TableHead>
        <TableBody>
          {lRows.map((lRow) => (
            <TableRow key={lRow.name}>
              <LendingTableCell component="th" scope="lRow">
              <Grid container>
                    <Grid item md={5}>
                        <Grid>
                          <img className={classes.imageSize} src={lRow.image} alt='dai' />
                        </Grid>
                    </Grid>
                    <Grid item md={7}>
                      <Grid>
                      {lRow.name}
                      </Grid>
                      <Grid className={classes.unit}>
                        {lRow.unit}
                      </Grid>
                    </Grid>
               </Grid>
              </LendingTableCell>
              <LendingTableCell align="center">
               {lRow.wallet}
              </LendingTableCell>
              <LendingTableCell align="center">{lRow.balance}</LendingTableCell>
              <LendingTableCell align="center">{lRow.apr}</LendingTableCell>
              <LendingTableCell align="center">
                    <Switch
                     // checked={state.checkedB}
                     // onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    /></LendingTableCell>
              <LendingTableCell align="center">
              <Grid className='lastest' container>
                  <Grid item md={6} xs container
                    direction="row"
                    justify="flex-end"
                    alignItems="center">
                      {/* <Grid className={classesbtnActive">
                        Active
                      </Grid> */}
                  </Grid>
                  <Grid item md={6} xs container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Button type="button" className={classes.btnActiveOutline} variant="outlined" color="secondary.dark">
                        Activate
                    </Button>
                  </Grid>
                </Grid>
              </LendingTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Grid>
  );
}
