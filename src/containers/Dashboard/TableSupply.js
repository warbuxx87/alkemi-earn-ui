/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import withDrizzle from "containers/Drizzle/withDrizzle";

import TableSupply from "components/Dashboard/TableSupply";

import { getLendActive } from "redux/selectors/data";

const TableSupplyContainer = ({ activeReserves }) => {
    return <TableSupply activeReserves={activeReserves} />;
};

const mapStateToProps = state => ({
    activeReserves: getLendActive(state)
});

export default compose(
    withDrizzle(),
    connect(mapStateToProps)
)(TableSupplyContainer);
