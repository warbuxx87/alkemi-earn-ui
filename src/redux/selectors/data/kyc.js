// History Selectors
export const getKycApplications = (state) =>
    state.data.kyc.kycApplications.data;

export const getFetchKycApplicationsStatus = (state) =>
    state.data.kyc.kycApplications.fetched;
