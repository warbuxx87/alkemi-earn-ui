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
import CircularProgress from '@material-ui/core/CircularProgress';

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

const lColumns = [
  { id: '1', label: 'Asset', minWidth: 200,  },
  { id: '2', label: 'Wallet Balance', minWidth: 120, align: 'right', },
  { id: '3', label: 'Balance', minWidth: 100, align: 'right', },
  {
    id: '4',
    label: 'APR %',
    minWidth: 100,
    align: 'right',
    //format: value => value.toLocaleString(),
  },
  {
    id: '5',
    label: 'Collateral',
    minWidth: 100,
    align: 'right',
    // format: value => value.toFixed(2),
  },
  {
    id: '6',
    label: '',
    minWidth: 280,
    align: 'right',
    // format: value => value.toFixed(2),
  },
];


class LendingTable extends React.Component {
  render () {
    const classes = this.props.classes;
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
                    <LendingTableCell className={classes.lRow}
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
            {this.props.data.map((lRow) => (
              <TableRow key={lRow.name}>
                <LendingTableCell component="th" scope="lRow" align='left'>
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
                <LendingTableCell align='right'>{lRow.wallet}</LendingTableCell>
                <LendingTableCell align='right'>{lRow.balance}</LendingTableCell>
                <LendingTableCell align='right'>{lRow.apr}</LendingTableCell>
                <LendingTableCell align='right'>
                  <Switch
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                </LendingTableCell>
                <LendingTableCell align='right'>
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
                      <Button
                        type="button"
                        className={classes.btnActiveOutline}
                        variant="outlined"
                        color="secondary"
                        disable={this.props.loading[lRow.unit]}
                        onClick={() => this.props.onActivate(lRow.unit)}>
                          { this.props.loading[lRow.unit] ? <CircularProgress size={20} color="white" /> : 'Activate'}
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

  
}

export default withStyles(styles)(LendingTable)