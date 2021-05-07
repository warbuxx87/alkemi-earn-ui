// Import action of interest as constants
import {
    SET_KYC_APPLICATIONS,
    SET_PREVIOUSLY_KYCD_WALLETS,
} from "redux/actions/data/kyc";
// import internal assets

// Define initial state
const initialState = {
    kycApplications: {
        data: [],
        fetched: false, // TODO: use to display loader
    },

    previouslyKycdWallets: {
        data: [],
        fetched: false, // TODO: use to display loader
    },
};

// Implement "reducer" function with initial state as default state
const kycReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_KYC_APPLICATIONS: {
            return {
                ...state,
                kycApplications: {
                    fetched: true,
                    data: action.payload.kycApplications,
                },
            };
        }

        case SET_PREVIOUSLY_KYCD_WALLETS: {
            return {
                ...state,
                previouslyKycdWallets: {
                    fetched: true,
                    data: action.payload.previouslyKycdWallets,
                },
            };
        }

        default:
            return state;
    }
};

export default kycReducer;
