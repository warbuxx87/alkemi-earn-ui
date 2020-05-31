import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import withDrizzle from "containers/Drizzle/withDrizzle";
import DrawerBorrow from "components/Borrow/DrawerBorrow";
import onBorrowAction from "containers/Borrow/BorrowMethod";

const BorrowDrawerContainer = ({ asset, drizzle, onBorrowAction }) => {
    return (
        <DrawerBorrow
            asset={asset}
            onBorrow={({ asset, amount }) =>
                onBorrowAction({ drizzle, asset, amount })
            }
        />
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ onBorrowAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(BorrowDrawerContainer);
