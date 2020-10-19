// Main Container

// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import Lend from "components/Lend/Lend";

import DrizzleContext from "utils/DrizzleContext";

import { onLendActivate } from "redux/actions/status/lend";

// Section 3: Selectors
import {
    getLendError,
    getLendActive,
    getLendInactive,
} from "redux/selectors/data/lend";

import { getUSDPrice } from "redux/selectors/totalBalance";

import { walletAddress, walletNetwork } from "redux/selectors/onboard";

// Section 4: Container
const LendContainer = ({ inactiveLend, activeLend, onActivate, errorLend }) => {
    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const drizzle = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    return (
        <Lend
            inactiveLend={inactiveLend}
            activeLend={activeLend}
            onActivate={(asset) =>
                onActivate({
                    drizzle,
                    userWalletNetwork,
                    userWalletAddress,
                    asset,
                })
            }
            errorLend={errorLend}
            USDPrice={USDPrice}
            displayAllocateButton={
                userWalletNetwork !== "1" && userWalletNetwork !== 1
            }
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

// Section 6: Exports
export default compose(connect(mapStateToProps, mapDispatchToProps))(
    LendContainer
);
