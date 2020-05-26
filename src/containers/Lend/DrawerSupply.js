import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import withDrizzle from "containers/Drizzle/withDrizzle";
import DrawerSupply from "components/UI/DrawerSupply";
import onSupplyAction from "./Supply";

const SupplyDrawerContainer = ({ asset, drizzle, onSupplyAction }) => {
    return (
        <DrawerSupply
            asset={asset}
            onSupply={({ asset, amount }) =>
                onSupplyAction({ drizzle, asset, amount })
            }
        />
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ onSupplyAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(SupplyDrawerContainer);
