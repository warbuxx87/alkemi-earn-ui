// Imports Section 1: React/Reduxd low level imports
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { useSelector } from "react-redux";

// Imports Section 2: Internal Imports
import History from "components/History/History";

// Section 3: Selectors
import useFetchTx from "hooks/useFetchTx";
import { getTxList, getTxPending, getTxError } from "redux/selectors/data/tx";
import { getBlocksData } from "redux/selectors/data/history";

import { walletAddress, walletNetworkName } from "redux/selectors/data/onboard";

// Section 4: Container Code

const HistoryContainer = ({ txPending, txError }) => {
    useFetchTx(); // gets txList from Etherscan

    const currentAddress = useSelector(walletAddress);
    const currentNetworkName = useSelector(walletNetworkName);

    const txList = useSelector(getTxList);
    const blocksData = useSelector(getBlocksData); // blocks TXs above were fired on (and their timestamp)

    return (
        <div className="history-list-wrapper">
            <History
                txList={txList}
                blocksData={blocksData}
                txPending={txPending}
                txError={txError}
                address={currentAddress}
                currentNetworkName={currentNetworkName}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    txPending: getTxPending(state),
    txError: getTxError(state),
});

export default compose(connect(mapStateToProps))(HistoryContainer);
