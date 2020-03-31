import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import dai from '../../images/dai.png';
import usdc from '../../images/usdc.png';
import eth from '../../images/eth.png';
import wbtc from '../../images/wbtc.png';

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
  createData('Ether','ETH',eth, 159, 6.0, 24, 4.0),
  createData('Maker DAI','DAI',dai, 237, 9.0, 37, 4.3),
  createData('USD Coin', 'USDC',usdc,262, 16.0, 24, 6.0),
  createData('Wrapped Btc', 'BTC',wbtc,305, 3.7, 67, 4.3),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const columns = [
    { id: '1', label: 'Asset', minWidth: 200,  },
    { id: '2', label: 'Wallet Balance', minWidth: 100, align: 'center', },
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
      minWidth: 120,
      align: 'center',
      // format: value => value.toFixed(2),
    },
    {
      id: '6',
      label: '',
      minWidth: 250,
      align: 'center',
      // format: value => value.toFixed(2),
    },
  ];

  return (
    <TableContainer  className="table">
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
        <TableRow >
                {columns.map((column,i) => (
                  <StyledTableCell key={i} className={[classes.row, classes.borrowing]}
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
                          <img className="imageSize" src={row.image} alt='dai' />
                        </Grid>
                    </Grid>
                    <Grid item md={7}>
                      <Grid>
                      {row.name}
                      </Grid>
                      <Grid className="unit">
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
                <Grid className='lastest'>
                  <Grid className="btnActive">Activate</Grid>
                </Grid>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
