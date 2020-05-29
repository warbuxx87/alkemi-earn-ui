/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isDrizzleInitialized } from "redux/selectors/drizzle";

import {
    getMarketContract,
    createActiveAssetContract
} from "containers/Lend/utils";
import withDrizzle from "containers/Drizzle/withDrizzle";

import TableBorrow from "components/Dashboard/TableBorrow";

import { getBorrowActive } from "redux/selectors/data";

const TableBorrowContainer = ({
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

    return <TableBorrow activeReserves={activeReserves} currency="USD" />;
};

const mapStateToProps = state => ({
    activeReserves: getBorrowActive(state),
    isDrizzleInitialized: isDrizzleInitialized(state)
});

export default compose(
    withDrizzle(),
    connect(mapStateToProps)
)(TableBorrowContainer);
