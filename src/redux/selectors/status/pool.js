import constants from "constants/constant.json";

export const getPool = (state) => {
    return state.status.pool.pool;
};

// utility to easily know if current pool needs KYC checks
export const isKYCPool = (state) => {
    return ["permissioned", "permissioned_1_5"].includes(
        state.status.pool.pool
    );
};

// max uint depends on the selected pool
export const getPoolMaxUint = (state) => {
    if (["open", "permissioned"].includes(state.status.pool.pool)) {
        return constants.max_uint; // if there is only one set of contracts, make sure the right uint amount is the one used, after v1.5 it's max uint128
    } else {
        return constants.max_uint_128; // this one for v1.5 and after
    }
};
