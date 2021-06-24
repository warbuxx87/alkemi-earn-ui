// Pool Select Container

// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
// Section 3: Selectors
import { getPool } from "redux/selectors/status/pool";

// Section 4: components
import PoolSelect from "components/AppBar/PoolSelect";

// Section 5: Code Container
const PoolSelectContainer = () => {
    const onChangePool = (event, newPool) => {
        console.log(newPool);
    };

    const currentPool = useSelector(getPool);

    return <PoolSelect onChangePool={onChangePool} currentPool={currentPool} />;
};

// Export
export default PoolSelectContainer;
