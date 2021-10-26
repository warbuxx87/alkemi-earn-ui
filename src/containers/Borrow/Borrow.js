// Main Container

// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import DrizzleContext from "utils/DrizzleContext";

import { onTx } from "redux/actions/status/transactions";

import useOnboard from "hooks/useOnboard";

import constants from "constants/constant.json";
import marketsByNetwork from "constants/markets_by_network.json";
import useFetchMarkets from "hooks/useFetchMarkets";
import useFetchALKPrice from "hooks/useFetchALKPrice";

// Section 3: Selectors
import {
    getBorrowActive,
    getBorrowInactive,
    //  getBorrowError,
    //  getBorrowPending
} from "redux/selectors/data/borrow";

import { getUSDPrice } from "redux/selectors/data/totalBalance";

import {
    isWalletConnected,
    walletAddress,
    walletNetwork,
} from "redux/selectors/data/onboard";

import { isWalletKYCd, getTransactions } from "redux/selectors/status/status";
import { getPool, isKYCPool } from "redux/selectors/status/pool";

import { getMarkets, getAlkApyPerMarket } from "redux/selectors/data/markets";

// Section 4: components
import Borrow from "components/Borrow/Borrow";
import { getAggregatedAlkApy } from "redux/selectors/data/borrow";

// Section 5: Code Container
const BorrowContainer = ({ inactiveBorrow, activeBorrow, onActivate }) => {
    useFetchALKPrice();
    useFetchMarkets(true);

    const { onConnect } = useOnboard();

    const marketsData = useSelector(getMarkets);
    const alkApyPerMarket = useSelector(getAlkApyPerMarket);
    const aggregatedAlkApy = useSelector(getAggregatedAlkApy);

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const drizzle = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    const walletConnected = useSelector(isWalletConnected);

    const walletIsKYCd = useSelector(isWalletKYCd);
    const txs = useSelector(getTransactions);

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
            inactiveBorrow.filter((marketData) =>
                arrayOfAssets.includes(marketData.unit)
            )
        );
    }, [inactiveBorrow, currentPool, userWalletNetwork]);

    React.useEffect(() => {
        if (!userWalletNetwork) return;
        if (!currentPool) return;

        const network = constants.network_type[userWalletNetwork];

        const arrayOfAssets = marketsByNetwork[network][currentPool];

        setActiveMarketsData(
            activeBorrow.filter((marketData) =>
                arrayOfAssets.includes(marketData.unit)
            )
        );
    }, [activeBorrow, currentPool, userWalletNetwork]);

    const activateAsset = (asset) =>
        onActivate({
            drizzle,
            userWalletNetwork,
            userWalletAddress,
            asset,
            type: "approve",
            currentPool,
        });

    return (
        <Borrow
            inactiveBorrow={inactiveMarketsData}
            activeBorrow={activeMarketsData}
            onActivate={walletConnected ? activateAsset : onConnect}
            txs={txs}
            USDPrice={USDPrice}
            walletIsKYCd={walletIsKYCd}
            needKYC={needKYC}
            userWalletNetwork={userWalletNetwork}
            marketsData={marketsData}
            walletConnected={walletConnected}
            alkApyPerMarket={alkApyPerMarket}
            aggregatedAlkApy={aggregatedAlkApy}
        />
    );
};

const mapStateToProps = (state) => ({
    inactiveBorrow: getBorrowInactive(state),
    activeBorrow: getBorrowActive(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onActivate: onTx }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    BorrowContainer
);
