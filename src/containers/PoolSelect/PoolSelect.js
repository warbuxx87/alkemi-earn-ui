// Pool Select Container

// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
// import { onPoolChange } from "redux/actions/status/pool";

// Section 3: Selectors
import { getPool } from "redux/selectors/status/pool";

// Section 4: components
import PoolDialog from "components/UI/PoolDialog";

// Section 5: Code Container
const PoolSelectContainer = () => {
    // On start
    React.useEffect(() => {
        const previouslySetDefaultPool = window.localStorage.getItem(
            "defaultPool"
        );

        const previouslyChangedPool = window.localStorage.getItem(
            // needed because page will reload when selecting pool != from current one
            "changedPool"
        );

        if (
            !(
                previouslyChangedPool !== undefined && // if no previously selected pool
                typeof previouslyChangedPool === "string"
            ) && // and there is not a defaultPool
            !(
                previouslySetDefaultPool !== undefined &&
                typeof previouslySetDefaultPool === "string"
            )
        ) {
            setOpen(true);
        }
    }, []);

    const [open, setOpen] = React.useState(false);

    const currentPool = useSelector(getPool);
    const onContinue = () => {
        if (defaultPoolChecked) {
            window.localStorage.setItem("defaultPool", selectedPool);
        }

        if (selectedPool === currentPool) {
            setOpen(false);
        } else {
            window.localStorage.setItem("changedPool", selectedPool);

            window.location.reload();
        }
    };

    const [selectedPool, setSelectedPool] = React.useState(undefined);
    const [defaultPoolChecked, setAsDefaultPool] = React.useState(false);

    const handlePoolChange = (event, newPool) => {
        setSelectedPool(newPool);
    };

    const handleCheckDefaultPool = (event) => {
        setAsDefaultPool(event.target.checked);
    };

    return (
        <PoolDialog
            handleCheckDefaultPool={handleCheckDefaultPool}
            handlePoolChange={handlePoolChange}
            selectedPool={selectedPool}
            onContinue={onContinue}
            open={open}
        />
    );
};

// Export
export default PoolSelectContainer;
