import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import withDrizzle from "containers/Drizzle/withDrizzle";
import SupplyModal from "components/Lend/ModalSupply";
import onSupplyAction from "./Supply";

const SupplyModalContainer = ({ asset, drizzle, onSupplyAction }) => {
    return (
        <SupplyModal
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
)(SupplyModalContainer);
