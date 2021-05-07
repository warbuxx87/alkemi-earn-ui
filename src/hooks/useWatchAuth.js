// Retrieve auth on start, also saves it to local storage (jwt token) when

// Section 1: React/Redux low level imports
import { useEffect } from "react";
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

        dispatch(restoreAuthData(JSON.parse(retrievedAuth)));
    }, [dispatch]);

    useEffect(() => {
        // save to local storage
        if (authList) localStorage.setItem("auth", JSON.stringify(authList));
        // }

        // if(!initFromLocalStorage) setInitFromLocalStorage(true)
    }, [authList]);
};

export default useWatchAuth;
