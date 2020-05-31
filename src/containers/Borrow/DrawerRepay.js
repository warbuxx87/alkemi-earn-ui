import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import withDrizzle from "containers/Drizzle/withDrizzle";
import DrawerRepay from "components/Borrow/DrawerRepay";
import onRepayAction from "containers/Borrow/RepayMethod";

const DrawerRepayContainer = ({ asset, drizzle, onRepayAction }) => {
    return (
        <DrawerRepay
            asset={asset}
            onRepay={({ asset, amount }) =>
                onRepayAction({ drizzle, asset, amount })
            }
        />
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ onRepayAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(DrawerRepayContainer);
