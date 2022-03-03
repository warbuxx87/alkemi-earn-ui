// Main Container

// Section 1: React/Redux low level imports
import React from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import Lend from "components/Lend/Lend";

import { onTx } from "redux/actions/status/transactions";

import useFetchInterest from "hooks/useFetchInterest";
import useFetchMarkets from "hooks/useFetchMarkets";

import constants from "constants/constant.json";
import marketsByNetwork from "constants/markets_by_network.json";
import useFetchALKPrice from "hooks/useFetchALKPrice";

import useWalletSelect from "hooks/useWalletSelect";

// Section 3: Selectors
import {
    getLendError,
    getLendActive,
    getLendInactive,
    getCalculatedInterests,
    getInterestErrorStatus,
    getAggregatedAlkApy,
} from "redux/selectors/data/lend";

import { getUSDPrice } from "redux/selectors/data/totalBalance";

import {
    isWalletConnected,
    walletAddress,
    walletNetwork,
} from "redux/selectors/data/onboard";

import { isWalletKYCd, getTransactions } from "redux/selectors/status/status";

import { getPool, isKYCPool } from "redux/selectors/status/pool";
import { getMarkets, getAlkApyPerMarket } from "redux/selectors/data/markets";

// Section 4: Container
const LendContainer = ({ inactiveLend, activeLend, onActivate, errorLend }) => {
    useFetchALKPrice();

    const { onConnect, library } = useWalletSelect();

    useFetchInterest();
    useFetchMarkets(true);

    const marketsData = useSelector(getMarkets());
    const alkApyPerMarket = useSelector(getAlkApyPerMarket());
    const aggregatedAlkApy = useSelector(getAggregatedAlkApy);

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    const walletConnected = useSelector(isWalletConnected);

    const walletIsKYCd = useSelector(isWalletKYCd);
    const txs = useSelector(getTransactions);

    const calculatedInterest = useSelector(getCalculatedInterests);
    const fetchInterestErrorStatus = useSelector(getInterestErrorStatus);
    const currentPool = useSelector(getPool);
    const needKYC = useSelector(isKYCPool);

    const [inactiveMarketsData, setInactiveMarketsData] = React.useState([]);
    const [activeMarketsData, setActiveMarketsData] = React.useState([]);

    React.useEffect(() => {
        if (!userWalletNetwork) return;
        if (!currentPool) return;

        const network = constants.network_type[userWalletNetwork];

        const arrayOfAssets = marketsByNetwork[network][currentPool];

        setInactiveMarketsData(
            inactiveLend.filter((marketData) =>
                arrayOfAssets.includes(marketData.unit)
            )
        );
    }, [inactiveLend, currentPool, userWalletNetwork]);

    React.useEffect(() => {
        if (!userWalletNetwork) return;
        if (!currentPool) return;

        const network = constants.network_type[userWalletNetwork];

        const arrayOfAssets = marketsByNetwork[network][currentPool];

        setActiveMarketsData(
            activeLend.filter((marketData) =>
                arrayOfAssets.includes(marketData.unit)
            )
        );
    }, [activeLend, currentPool, userWalletNetwork]);

    const activateAsset = (asset) => {
        onActivate({
            userWalletNetwork,
            userWalletAddress,
            asset,

            shouldSendMax: true,

            type: "approve",
            currentPool,
            library,
        });
    };

    return (
        <Lend
            inactiveLend={inactiveMarketsData}
            activeLend={activeMarketsData}
            onActivate={walletConnected ? activateAsset : onConnect}
            errorLend={errorLend}
            USDPrice={USDPrice}
            displayAllocateButton={
                userWalletNetwork !== "1" && userWalletNetwork !== 1
            }
            txs={txs}
            walletIsKYCd={walletIsKYCd}
            needKYC={needKYC}
            userWalletNetwork={userWalletNetwork}
            calculatedInterest={calculatedInterest}
            fetchInterestErrorStatus={fetchInterestErrorStatus}
            marketsData={marketsData}
            walletConnected={walletConnected}
            alkApyPerMarket={alkApyPerMarket}
            aggregatedAlkApy={aggregatedAlkApy}
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
