// Section 1: React/Redux low level imports
import React from "react";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";

// Section 2: internal imports

// import {
//     getMarketContract,
//     createActiveAssetContract
// } from "utils/drizzle";

import TableSupply from "components/Dashboard/TableDeposit";
import useFetchALKPrice from "hooks/useFetchALKPrice";

// Section 3: Selectors
import { getLendActive } from "redux/selectors/data/lend";

import { getUSDPrice } from "redux/selectors/data/totalBalance";

import { walletNetwork } from "redux/selectors/data/onboard";

import { getAlkApyPerMarket } from "redux/selectors/data/markets";

const TableDepositContainer = ({ activeReserves }) => {
    useFetchALKPrice();

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const userWalletNetwork = useSelector(walletNetwork);

    const alkApyPerMarket = useSelector(getAlkApyPerMarket());

    return (
        <TableSupply
            activeReserves={activeReserves}
            /*currency="USD"*/ USDPrice={USDPrice}
            userWalletNetwork={userWalletNetwork}
            alkApyPerMarket={alkApyPerMarket}
        />
    );
};

const mapStateToProps = (state) => ({
    activeReserves: getLendActive(state),
});

export default compose(connect(mapStateToProps))(TableDepositContainer);
