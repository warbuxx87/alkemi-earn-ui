// Pool Select Container

// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

// Section 2: internal imports
import { setSelectedWallet } from "redux/actions/status/walletSelect";

// Section 3: Selectors
import { showWallet } from "redux/selectors/status/walletSelect";

// Section 4: components
import WalletSelectModal from "components/UI/WalletSelectModal";

// Section 5: Code Container
const WalletSelectContainer = () => {
    // redux
    const dispatch = useDispatch();

    const open = useSelector(showWallet);

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

    return (
        <WalletSelectModal
            handleWalletSelect={handleWalletSelect}
            open={open}
        />
    );
};

// Export
export default WalletSelectContainer;
