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

    // On start
    React.useEffect(() => {
        if (currentPool) {
            const newPool = pools.find((pool) => pool.id === currentPool);
            setSelectedPool(newPool);
        }
    }, [currentPool]);

    const [selectedPool, setSelectedPool] = React.useState(pools[0]);

    const handlePoolChange = (poolId) => {
        const newPool = pools.find((pool) => pool.id === poolId);

        if (newPool.id !== currentPool) {
            if (newPool.id !== "permissioned") {
                // verified to open
                setOpenAlert(true);
            } else {
                // open to verified
                window.localStorage.setItem("changedPool", newPool.id);

                window.location.reload();
            }
        }
    };

    return (
        <>
            <PoolSwitchAlert open={openAlert} setOpen={setOpenAlert} />
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
