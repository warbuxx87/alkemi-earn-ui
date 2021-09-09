// Pool Select Container

// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
// import { onPoolChange } from "redux/actions/status/pool";
import PoolSwitchAlert from "./PoolSwitchAlert";

// Section 3: Selectors
import { getPool } from "redux/selectors/status/pool";

// Section 4: components
import { PoolPopover } from "components/Sidebar/PoolSelect";

const pools = [
    {
        id: "permissioned",
        name: "Verified Pool",
    },
    {
        id: "open",
        name: "Open Pool",
    },
];

// Section 5: Code Container
const PoolSelectContainer = () => {
    const currentPool = useSelector(getPool);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [chosenPool, setChosenPool] = React.useState(false);

    const [noShow, setNoShow] = React.useState(false); // not showing confirmation modal again

    // On start
    React.useEffect(() => {
        if (currentPool) {
            const newPool = pools.find((pool) => pool.id === currentPool);
            setSelectedPool(newPool);
        }
    }, [currentPool]);

    // On start
    React.useEffect(() => {
        const perviouslySetNoShowAlert = window.localStorage.getItem(
            "noShowChangePoolAlert"
        );

        if (
            perviouslySetNoShowAlert !== undefined &&
            typeof perviouslySetNoShowAlert === "string" &&
            [true, "true"].includes(perviouslySetNoShowAlert)
        ) {
            setNoShow(true);
        }
    }, []);

    const [selectedPool, setSelectedPool] = React.useState(pools[0]);

    const handlePoolChange = (poolId) => {
        const newPool = pools.find((pool) => pool.id === poolId);

        if (newPool.id !== currentPool) {
            if (noShow) {
                window.localStorage.setItem("changedPool", newPool.id);

                window.location.reload();
            } else {
                setChosenPool(newPool.id);
                setOpenAlert(true);
            }
        }
    };

    return (
        <>
            <PoolSwitchAlert
                open={openAlert}
                setOpen={setOpenAlert}
                chosenPool={chosenPool}
                noShow={noShow}
                setNoShow={setNoShow}
            />
            <PoolPopover
                selectedPool={selectedPool}
                onPoolChange={handlePoolChange}
                pools={pools}
            />
        </>
    );
};

// Export
export default PoolSelectContainer;
