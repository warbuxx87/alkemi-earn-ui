/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import withDrizzle from "containers/Drizzle/withDrizzle";

import TableBorrow from "components/Dashboard/TableBorrow";

import { getBorrowActive } from "redux/selectors/data";

const TableBorrowContainer = ({ activeReserves }) => {
    return <TableBorrow activeReserves={activeReserves} currency="USD" />;
};

const mapStateToProps = (state) => ({
    activeReserves: getBorrowActive(state),
});

export default compose(
    withDrizzle(),
    connect(mapStateToProps)
)(TableBorrowContainer);
