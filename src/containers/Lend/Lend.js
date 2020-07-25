/* eslint-disable react-hooks/exhaustive-deps */
// Main Container

// Section 1: React/Redux low level imports
import React from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import { onLendActivate } from "redux/actions/status/lend";
import Lend from "components/Lend/Lend";
import withDrizzle from "containers/Drizzle/withDrizzle";

import useFetchPrice from "hooks/useFetchPrice";

// Section 3: Selectors
import {
    getLendError,
    getLendActive,
    getLendInactive,
} from "redux/selectors/data/lend";

import { getUSDPrice } from "redux/selectors/totalBalance";

// Section 4: Container
const LendContainer = ({
    inactiveLend,
    activeLend,
    onActivate,
    drizzle,
    errorLend,
}) => {
    useFetchPrice(); // gets current USD price
    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    return (
        <Lend
            inactiveLend={inactiveLend}
            activeLend={activeLend}
            onActivate={(asset) => onActivate({ drizzle, asset })}
            errorLend={errorLend}
            USDPrice={USDPrice}
        />
    );
};

const mapStateToProps = (state) => ({
    inactiveLend: getLendInactive(state),
    activeLend: getLendActive(state),
    errorLend: getLendError(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            onActivate: onLendActivate,
        },
        dispatch
    );

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(LendContainer);
