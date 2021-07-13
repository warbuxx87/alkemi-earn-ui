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
        const previouslySelectedPool = window.localStorage.getItem(
            "selectedPool"
        );

        if (
            previouslySelectedPool !== undefined &&
            typeof previouslySelectedPool === "string"
        ) {
            dispatch(setPool(previouslySelectedPool));
        } else {
        }
    }, [dispatch]); // Might cause a problem to have dispatch here
};

export default usePoolManager;
