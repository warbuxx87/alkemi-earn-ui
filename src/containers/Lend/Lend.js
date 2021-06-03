// Main Container

// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import Lend from "components/Lend/Lend";

import DrizzleContext from "utils/DrizzleContext";

import { onTx } from "redux/actions/status/transactions";

import useOnboard from "hooks/useOnboard";

import useFetchMarkets from "hooks/useFetchMarkets";

// Section 3: Selectors
import {
    getLendError,
    getLendActive,
    getLendInactive,
} from "redux/selectors/data/lend";

import { getUSDPrice } from "redux/selectors/data/totalBalance";

import {
    isWalletConnected,
    walletAddress,
    walletNetwork,
} from "redux/selectors/data/onboard";

import { isWalletKYCd, getTransactions } from "redux/selectors/status";

// Section 4: Container
const LendContainer = ({ inactiveLend, activeLend, onActivate, errorLend }) => {
    const { onConnect } = useOnboard();

    const { marketsData } = useFetchMarkets(true); // optimize useFetchMarkets (with a throttled call in redux action) if it's used from more than one place

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const drizzle = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    const walletConnected = useSelector(isWalletConnected);

    const walletIsKYCd = useSelector(isWalletKYCd);
    const txs = useSelector(getTransactions);

    const activateAsset = (asset) =>
        onActivate({
            drizzle,
            userWalletNetwork,
            userWalletAddress,
            asset,
            type: "approve",
        });

    return (
        <Lend
            inactiveLend={inactiveLend}
            activeLend={activeLend}
            onActivate={walletConnected ? activateAsset : onConnect}
            errorLend={errorLend}
            USDPrice={USDPrice}
            displayAllocateButton={
                userWalletNetwork !== "1" && userWalletNetwork !== 1
            }
            txs={txs}
            walletIsKYCd={walletIsKYCd}
            userWalletNetwork={userWalletNetwork}
            marketsData={marketsData}
            walletConnected={walletConnected}
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
            onActivate: onTx,
        },
        dispatch
    );

// Section 6: Exports
export default compose(connect(mapStateToProps, mapDispatchToProps))(
    LendContainer
);
