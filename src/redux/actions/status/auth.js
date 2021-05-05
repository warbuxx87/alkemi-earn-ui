// Section 1: Utilities imports and low level imports
import _ from "lodash";

const url_map = require("constants/url_map.json");

// Section 2: Action types declarations and action creators

//                                     //
// ------------ SIGN_IN ACTIONS --------    //
//                                     //

// Declare action type as a constant
export const FETCH_SIGN_IN_PENDING = "FETCH_SIGN_IN_PENDING";

// Declare action creator
const fetchSignInPending = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_SIGN_IN_PENDING,
});

// Declare action type as a constant
export const FETCH_SIGN_IN_SUCCESS = "FETCH_SIGN_IN_SUCCESS";

// Declare action creator
const fetchSignInSuccess = ({ accessToken, network, isAdmin }) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_SIGN_IN_SUCCESS,
    payload: {
        accessToken,
        network,
        isAdmin,
    },
});

// Declare action type as a constant
export const FETCH_SIGN_IN_ERROR = "FETCH_SIGN_IN_ERROR";

// Declare action creator
const fetchSignInError = (error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_SIGN_IN_ERROR,
    payload: new Error(),
    error: true,
});

//                                               //
// ---------------- RESTORE AUTH DATA ------------ //
//                                               //

export const RESTORE_AUTH_DATA = "RESTORE_AUTH_DATA";

export const restoreAuthData = (auth) => ({
    type: RESTORE_AUTH_DATA,
    payload: {
        auth,
    },
});

//                                               //
// ---------------- RESET AUTH DATA ------------ //
//                                               //

export const RESET_AUTH_DATA = "RESET_AUTH_DATA";

const resetAuthData = () => ({
    type: RESET_AUTH_DATA,
});

// Section 3: Action dispatch methods and async funcs
export const signIn = ({ email, password, strategy, currentNetworkName }) => (
    dispatch
) => {
    let selectedNetwork = currentNetworkName;
    if (!url_map[selectedNetwork].authentication) selectedNetwork = "main";

    // dispatch(fetchSignInPending());

    const authURL = url_map[selectedNetwork].authentication_url;

    const bodyData = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ email, password, strategy }), // body data type must match "Content-Type" header
    };

    fetch(authURL, bodyData)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            if (data) {
                const userSignIn = JSON.parse(data);

                console.log({
                    accessToken: userSignIn.accessToken,
                    network: selectedNetwork,
                });

                dispatch(
                    fetchSignInSuccess({
                        accessToken: userSignIn.accessToken,
                        network: selectedNetwork,
                        isAdmin: userSignIn.user.isAdmin,
                    })
                );
            }
        })
        .catch((error) => {
            console.log("userSignIn error: ", error);
            // dispatch(fetchSignInError(error.message));
        });
};
