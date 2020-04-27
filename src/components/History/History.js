import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from "@material-ui/core";

import { open_it_onetherscan } from "containers/History/utils";
import tx_data from "containers/History/MOCK_DATA";

const History = fetchStats => {
  const accountsList = tx_data;
  console.log(accountsList);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  return (
    <div className="w-full overflow-auto">
      <Table className="whitespace-pre">
        <TableHead>
          <TableRow>
            <TableCell className="px-0">Date</TableCell>
            <TableCell className="px-0">Action</TableCell>
            <TableCell className="px-0">Address</TableCell>
            <TableCell className="px-0">Asset</TableCell>
            <TableCell className="px-0">Amount</TableCell>
            <TableCell className="px-0">Value</TableCell>
            <TableCell className="px-0">TX</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountsList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left">
                  {item.date}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {item.action}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {item.address}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {item.symbol}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {item.amount}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {item.value}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      open_it_onetherscan(this, item.tx);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        className="px-4"
        rowsPerPageOptions={[8, 25, 50, 100]}
        component="div"
        count={accountsList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

History.propTypes = {
  tx: PropTypes.any.isRequired,
  fetchStats: PropTypes.any.isRequired
};

export default compose(History);
