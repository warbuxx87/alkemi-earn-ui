/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { getMarketContract, createActiveAssetContract } from "../Lend/utils";
import withDrizzle from "containers/Drizzle/withDrizzle";

import TableSupply from "components/Dashboard/TableSupply";

import { getLendActive, isDrizzleInitialized } from "redux/selectors/data";

const TableSupplyContainer = ({
    activeReserves,
    drizzle,
    isDrizzleInitialized
}) => {
    React.useEffect(() => {
        if (isDrizzleInitialized) {
            getMarketContract({ drizzle });
        }
    }, [isDrizzleInitialized]);

    React.useEffect(() => {
        // create missing contracts for active asset
        createActiveAssetContract({ drizzle, assets: activeReserves });
    }, [activeReserves.length]);

    return <TableSupply activeReserves={activeReserves} />;
};

const mapStateToProps = state => ({
    activeReserves: getLendActive(state),
    isDrizzleInitialized: isDrizzleInitialized(state)
});

export default compose(
    withDrizzle(),
    connect(mapStateToProps)
)(TableSupplyContainer);
