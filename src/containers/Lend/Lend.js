// Main Container

// Section 1: React/Reduxd low level imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import onLendActivate from "./Activate";
import { getSupplyBalance, getWalletBalance } from "./utils";
import Lend from "components/Lend/Lend";
import withDrizzle from "containers/Drizzle/withDrizzle";

// Section 3: Selectors
import {
    // getLendError,
    getLendActive,
    getLendInactive
} from "redux/selectors/data";

class withLend extends Component {
    componentDidMount() {
        // fetch balance every 10 seconds
        this.fetchBalance = setInterval(() => {
            const { drizzle } = this.props;
            getWalletBalance({ drizzle });
            getSupplyBalance({ drizzle });
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.fetchBalance);
    }

    render() {
        // return a presentational component
        const { inactiveLend, activeLend, onActivate, drizzle } = this.props;
        return (
            <Lend
                inactiveLend={inactiveLend}
                activeLend={activeLend}
                onActivate={asset => onActivate({ drizzle, asset })}
            />
        );
    }
}

const mapStateToProps = state => ({
    inactiveLend: getLendInactive(state),
    activeLend: getLendActive(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            onActivate: onLendActivate
        },
        dispatch
    );

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(withLend);
