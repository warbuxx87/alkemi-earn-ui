// KYC Selectors
export const getKycApplications = (state) =>
    state.data.kyc.kycApplications.data;

export const getFetchKycApplicationsStatus = (state) =>
    state.data.kyc.kycApplications.fetched;

export const getPreviouslyKycdWallets = (state) =>
    state.data.kyc.previouslyKycdWallets.data;

export const getFetchPreviouslyKycdWalletsStatus = (state) =>
    state.data.kyc.previouslyKycdWallets.fetched;
