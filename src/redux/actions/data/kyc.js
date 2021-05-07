// This file is for kyc data for admin dashboard
// Section 1: Utilities imports and low level imports

// Section 2: Action types declarations and action creators

// Declare action type as a constant
export const SET_KYC_APPLICATIONS = "SET_KYC_APPLICATIONS";

// Declare action creator
export const setKycApplications = (kycApplications) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_KYC_APPLICATIONS,
    payload: {
        kycApplications,
    },
});

export const SET_PREVIOUSLY_KYCD_WALLETS = "SET_PREVIOUSLY_KYCD_WALLETS";

// Declare action creator
export const setPreviouslyKycdWallets = (previouslyKycdWallets) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_PREVIOUSLY_KYCD_WALLETS,
    payload: {
        previouslyKycdWallets,
    },
});

// Section 3: Action dispatch methods and async funcs
