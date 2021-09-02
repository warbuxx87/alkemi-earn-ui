// Pool Select Container

// Section 1: React low level imports
import React from "react";
import PoolSwitchAlert from "components/UI/PoolSwitchAlert";

// Section 2: internal imports

// Section 3: Selectors

// Section 4: components

// Section 5: Code Container
const PoolSwitchAlertContainer = ({ open, setOpen }) => {
    const handleConfirm = () => {
        window.localStorage.setItem("changedPool", "open");

        window.location.reload();
    };

    return (
        <PoolSwitchAlert
            handleConfirm={handleConfirm}
            open={open}
            setOpen={setOpen}
        />
    );
};

// Export
export default PoolSwitchAlertContainer;
