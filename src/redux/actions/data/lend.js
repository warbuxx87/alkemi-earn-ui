// Section 1: Utilities imports and low level imports
import _ from "lodash";

const url_map = require("constants/url_map.json");

// Section 2: Action types declarations and action creators

//                                               //
// ------------- FETCH LEND BALANCE ------------ //
//                                               //

export const RESET_LEND_DATA = "RESET_LEND_DATA";

export const resetLendData = () => ({
    type: RESET_LEND_DATA,
});

// Declare action type as a constant
export const SET_ETH_LEND_BALANCE = "SET_ETH_LEND_BALANCE";

// Declare action creator
export const setEthLendBalance = (walletETHBalance) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_ETH_LEND_BALANCE,
    payload: {
        walletETHBalance,
    },
});

//                                               //
// -------------- FETCH INTEREST --------------- //
//                                               //

// Pending state is defined by having all assets values (for calculated interests) set (not null)

// Declare action type as a constant
export const SET_INTEREST = "SET_INTEREST";

// Declare action creator
export const fetchInterestSuccess = ({ calculatedInterest, asset }) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_INTEREST,
    payload: { calculatedInterest, asset },
});

// Declare action type as a constant
export const FETCH_INTEREST_ERROR = "FETCH_INTEREST_ERROR";

// Declare action creator
const fetchInterestError = (error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_INTEREST_ERROR,
});

// Section 3: Action dispatch methods and async funcs
const fetchInterestCall = ({
    currentNetworkName,
    currentPool,
    address,
    asset,
    dispatch,
}) => {
    if (!address) return;
    if (!url_map[currentNetworkName][currentPool].interest_url) return;

    const params = `?account=${address.toLowerCase()}&asset=${asset}&type=savings&millisecondsBefore=86400000`;

    const interestURL =
        url_map[currentNetworkName][currentPool].interest_url + params;
    console.log("🚀 ~ file: lend.js ~ line 68 ~ interestURL", interestURL);

    fetch(interestURL)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            if (data) {
                console.log({ data, asset });
                const interestCallResult = JSON.parse(data);

                if (["fail", "error"].includes(interestCallResult.status)) {
                    // in case the backend errors out or the call above hasn't been merged yet to the API
                    dispatch(fetchInterestError());
                } else {
                    dispatch(
                        fetchInterestSuccess({
                            calculatedInterest:
                                interestCallResult.data.calculatedInterest,
                            asset,
                        })
                    );
                }
            }
        })
        .catch(() => {
            dispatch(fetchInterestError());
        });
};

// This call may be fetched from multiple containers but only executes once every 60 seconds
const throttledFetchInterest = _.throttle(fetchInterestCall, 60 * 1000, {
    trailing: false,
});

export const fetchInterest = ({
    currentNetworkName,
    currentPool,
    address,
    asset,
    fetchPeriodically,
}) => async (dispatch) => {
    if (fetchPeriodically)
        // if fetchPeriodically set to true it will go through the throttled method
        throttledFetchInterest({
            currentNetworkName,
            currentPool,
            address,
            asset,
            dispatch,
        });
    // if not, it will call on fetch directly no matter what
    else
        fetchInterestCall({
            currentNetworkName,
            currentPool,
            address,
            asset,
            dispatch,
        });

    // this is to avoid the throttle to block the call when the user reconnects their wallet.
    // Of course as it is now, the call is triggered whenever the user opens the page, which good in a sense that the user wants fresh data each time
};

// Reset Tx data and cancels throttled recurring fetch calls
export const cancelFetchInterest = () => () => {
    if (throttledFetchInterest) {
        throttledFetchInterest.cancel();
    }
};
