// Pool Select Container

// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

// Section 2: internal imports
import {
    setSelectedWallet,
    setDismissWalletSelection,
} from "redux/actions/status/walletSelect";

// Section 3: Selectors
import {
    showWallet,
    isAskingToConnect,
    getLastSelectedWallet,
    isActivating,
} from "redux/selectors/status/walletSelect";

import { isWalletConnected } from "redux/selectors/data/onboard";

// Section 4: components
import WalletSelectModal from "components/UI/WalletSelectModal";

// Section 5: Code Container
const WalletSelectContainer = () => {
    // redux
    const dispatch = useDispatch();

    const walletConnected = useSelector(isWalletConnected);

    const showWalletSelection = useSelector(showWallet);
    const askToConnect = useSelector(isAskingToConnect);
    const lastSelectedWallet = useSelector(getLastSelectedWallet);
    const activating = useSelector(isActivating);

    const handleWalletSelect = (event, selectedWallet) => {
        if (selectedWallet === "installMetaMask") {
            const newWindow = window.open(
                "https://metamask.io/",
                "_blank",
                "noopener,noreferrer"
            );
            if (newWindow) newWindow.opener = null;
        } else {
            dispatch(setSelectedWallet(selectedWallet));
        }
    };

    const handleTryAgain = (lastSelectedWallet) => {
        dispatch(setSelectedWallet(lastSelectedWallet));
    };

    const handleDismiss = () => {
        dispatch(setDismissWalletSelection());
    };

    return (
        <>
            {!activating &&
            !walletConnected &&
            (showWalletSelection === true || askToConnect === true) ? (
                <WalletSelectModal
                    handleWalletSelect={handleWalletSelect}
                    showWalletSelection={showWalletSelection}
                    askToConnect={askToConnect}
                    lastSelectedWallet={lastSelectedWallet}
                    handleTryAgain={handleTryAgain}
                    handleDismiss={handleDismiss}
                />
            ) : null}
        </>
    );
};

// Export
export default WalletSelectContainer;
