// Retrieve auth on start, also saves it to local storage (jwt token) when

// Section 1: React/Redux low level imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Section 2: internal imports
import { restoreAuthData } from "redux/actions/status/auth";

// Section 3: Selectors
import { getAuth } from "redux/selectors/status/auth";

const useWatchAuth = () => {
    const dispatch = useDispatch();

    // const drizzle = useContext(DrizzleContext);
    const authList = useSelector(getAuth);
    // const [initFromLocalStorage, setInitFromLocalStorage] = useState(false);

    // TODO: improve set/retrieve logic
    useEffect(() => {
        // TODO: move all localstorage into a single main object
        var retrievedAuth = localStorage.getItem("auth");

        console.log("0 retrievedAuth: ", JSON.parse(retrievedAuth));

        dispatch(restoreAuthData(JSON.parse(retrievedAuth)));
    }, []);

    useEffect(() => {
        // if(initFromLocalStorage) {
        console.log("1 save to local storage: ", JSON.stringify(authList));

        // save to local storage
        console.log("authList: ", authList);
        if (authList) localStorage.setItem("auth", JSON.stringify(authList));
        // }

        // if(!initFromLocalStorage) setInitFromLocalStorage(true)
    }, [authList]);
};

export default useWatchAuth;
