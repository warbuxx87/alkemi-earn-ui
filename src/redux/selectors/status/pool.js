export const getPool = (state) => {
    return state.status.pool.pool;
};

// utility to easily know if current pool needs KYC checks
export const isKYCPool = (state) => {
    return state.status.pool.pool === "permissioned";
};
