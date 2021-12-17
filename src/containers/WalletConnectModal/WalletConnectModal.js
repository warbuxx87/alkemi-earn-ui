// Section 1: React/Redux low level imports
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import WalletConnectNotification from "components/UI/Dialog";
// Section 3: Selectors / hooks
import { displayWalletConnectModal } from "redux/selectors/status/walletConnect";

// Section 4: Code container
const WalletConnectModal = () => {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    const shouldDisplayWalletConnectModal = useSelector(
        displayWalletConnectModal
    );

    useEffect(() => {
        setOpen(shouldDisplayWalletConnectModal);
    }, [shouldDisplayWalletConnectModal]);

    return (
        <div>
            {shouldDisplayWalletConnectModal === true ? (
                <WalletConnectNotification
                    open={open}
                    handleClose={handleClose}
                />
            ) : null}
        </div>
    );
};

export default WalletConnectModal;
