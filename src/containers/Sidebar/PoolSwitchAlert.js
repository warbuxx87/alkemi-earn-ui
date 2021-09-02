// Pool Select Container

// Section 1: React low level imports
import React from "react";
import PoolSwitchAlert from "components/UI/PoolSwitchAlert";

// Section 2: internal imports

// Section 3: Selectors

// Section 4: components

// Section 5: Code Container
const PoolSwitchAlertContainer = ({
    open,
    setOpen,
    chosenPool,
    noShow,
    setNoShow,
}) => {
    const handleConfirm = () => {
        window.localStorage.setItem("changedPool", chosenPool);

        if (noShow === true)
            window.localStorage.setItem("noShowChangePoolAlert", noShow);

        window.location.reload();
    };

    const handleCheckDoNotShow = (event) => {
        setNoShow(event.target.checked);
    };

    const handleClose = () => {
        setOpen(false);
        setNoShow(false);
    };

    return (
        <PoolSwitchAlert
            handleConfirm={handleConfirm}
            open={open}
            setOpen={setOpen}
            chosenPool={chosenPool}
            handleCheckDoNotShow={handleCheckDoNotShow}
            handleClose={handleClose}
        />
    );
};

// Export
export default PoolSwitchAlertContainer;
