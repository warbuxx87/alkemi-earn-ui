import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import withDrizzle from "containers/Drizzle/withDrizzle";
import DrawerFaucet from "components/Lend/DrawerFaucet";
import onAllocateAction from "containers/Lend/AllocateMethod";

const DrawerFaucetContainer = ({ asset, drizzle, onAllocateAction }) => {
    return (
        <DrawerFaucet
            asset={asset}
            onAllocate={({ asset, amount }) =>
                onAllocateAction({ drizzle, asset, amount })
            }
        />
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ onAllocateAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(DrawerFaucetContainer);
