// Pool Select Container

// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";
import { PoolPopover } from "components/Sidebar/PoolSelect";

// Section 2: internal imports
// import { onPoolChange } from "redux/actions/status/pool";

// Section 3: Selectors
import { getPool } from "redux/selectors/status/pool";

// Section 4: components
import { CustomCube as CloudIcon } from "components/UI/Icons/custom-cube";

// Section 5: Code Container
const PoolSelectContainer = () => {
    const currentPool = useSelector(getPool);

    const pools = [
        {
            id: "permissioned",
            name: "Verified Pool",
            icon: <CloudIcon />,
        },
        {
            id: "open",
            name: "Open Pool",
            icon: "assets/images/logo-white.svg",
        },
    ];

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
            window.localStorage.setItem("changedPool", newPool.id);

            window.location.reload();
        }
    };

    return (
        <PoolPopover
            selectedPool={selectedPool}
            onPoolChange={handlePoolChange}
            pools={pools}
        />
    );
};

// Export
export default PoolSelectContainer;
