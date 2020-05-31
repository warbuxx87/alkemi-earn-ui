import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import withDrizzle from "containers/Drizzle/withDrizzle";
import DrawerRedeem from "components/Lend/DrawerRedeem";
import onRedeemAction from "containers/Lend/RedeemMethod";

const DrawerRedeemContainer = ({ asset, drizzle, onRedeemAction }) => {
    return (
        <DrawerRedeem
            asset={asset}
            onRedeem={({ asset, amount }) =>
                onRedeemAction({ drizzle, asset, amount })
            }
        />
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ onRedeemAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(DrawerRedeemContainer);
