// Contracts address manager, manage selection between open and permissioned pools

// Section 1: React/Redux low level imports
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Section 2: internal imports
import { setPool } from "redux/actions/status/pool";

const usePoolManager = () => {
    const dispatch = useDispatch();

    // On start
    useEffect(() => {
        const previouslySetDefaultPool = window.localStorage.getItem(
            "defaultPool"
        );

        const previouslyChangedPool = window.localStorage.getItem(
            "changedPool"
        );

        if (
            previouslyChangedPool !== undefined &&
            typeof previouslyChangedPool === "string"
        ) {
            dispatch(setPool(previouslyChangedPool));

            localStorage.removeItem("changedPool");
        } else if (
            previouslySetDefaultPool !== undefined &&
            typeof previouslySetDefaultPool === "string"
        ) {
            dispatch(setPool(previouslySetDefaultPool));
        }
    }, [dispatch]); // Might cause a problem to have dispatch here
};

export default usePoolManager;
