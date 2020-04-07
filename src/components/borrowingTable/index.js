import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import dai from '../../assets/images/dai.png';
import usdc from '../../assets/images/usdc.png';
import eth from '../../assets/images/eth.png';
import wbtc from '../../assets/images/wbtc.png';
import styles from './styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor:'#202123',
    color: theme.palette.common.white,
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

const rows = [
  createData('Ether','ETH',eth, 159, 6.0, '24%', 4.0),
  createData('Maker DAI','DAI',dai, 237, 9.0, '24%', 4.3),
  createData('USD Coin', 'USDC',usdc,262, 16.0, '24%', 6.0),
  createData('Wrapped Btc', 'BTC',wbtc,305, 3.7, '24%', 4.3),
];

// const useStyles = makeStyles({
//   table: {
//     minWidth: 700,
//   },
// });

export default function CustomizedTables() {
  const classes = styles();
  const columns = [
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
      label: 'collateral',
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
    <Grid className={classes.tableBorrowing}>
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
                {columns.map((column,i) => (
                  <StyledTableCell key={i} className={classes.row}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
              <Grid container>
                    <Grid item md={5}>
                        <Grid>
                          <img className={classes.imageSize} src={row.image} alt='dai' />
                        </Grid>
                    </Grid>
                    <Grid item md={7}>
                      <Grid>
                      {row.name}
                      </Grid>
                      <Grid className={classes.unit}>
                        {row.unit}
                      </Grid>
                    </Grid>
               </Grid>
              </StyledTableCell>
              <StyledTableCell align="center">
               {row.wallet}
              </StyledTableCell>
              <StyledTableCell align="center">{row.balance}</StyledTableCell>
              <StyledTableCell align="center">{row.apr}</StyledTableCell>
              <StyledTableCell align="center">
                    <Switch
                     // checked={state.checkedB}
                     // onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    /></StyledTableCell>
              <StyledTableCell align="center">
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
                      <Button variant='contained' color='primary' className={classes.btnActive}>
                        Activate
                      </Button>
                  </Grid>
                </Grid>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Grid>
  );
}
