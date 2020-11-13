// Import action of interest as constants
import {
    ALLOCATE_PENDING,
    ALLOCATE_SUCCESS,
    ALLOCATE_ERROR,
    APPROVE_PENDING,
    APPROVE_SUCCESS,
    APPROVE_ERROR,
    DEPOSIT_PENDING,
    DEPOSIT_SUCCESS,
    DEPOSIT_ERROR,
    WITHDRAW_PENDING,
    WITHDRAW_SUCCESS,
    WITHDRAW_ERROR,
    RESET_LEND_DATA,
} from "redux/actions/data/lend";
// import internal assets
import dai from "assets/images/DAI.svg";
import usdc from "assets/images/USDC.svg";
import wbtc from "assets/images/WBTC.svg";
import eth from "assets/images/WETH.svg";

import address from "constants/address_map.json";

function createData(name, unit, image, wallet) {
    return {
        name,
        unit,
        image,
        wallet,
        activated: false,
        activating: false,
        approving: false,
        pending: false,
        allocating: false,
        depositing: false,
        borrowing: false,
        repaying: false,
        withdrawing: false,
    };
}

const assets = {
    WETH: createData("Ether", "WETH", eth, "0"),
    DAI: createData("Dai Stablecoin", "DAI", dai, "0"),
    WBTC: createData("Wrapped Bitcoin", "WBTC", wbtc, "0"),
    USDC: createData("USD Coin", "USDC", usdc, "0"),
};

// Define initial state
const initialState = {
    assets,
    error: null,
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, action) => {
    switch (action.type) {
        case "GOT_CONTRACT_VAR": {
            switch (action.variable) {
                case "balanceOf":
                    // don't update wallet balance of the main smartContract
                    // need this filter so that main contracts liquidity is not returned as the user's local wallet balance
                    if (
                        !Object.values(address)
                            .map((net) => net.address_MoneyMarket)
                            .includes(action.args[0]) // check if the contract address linked to the action is not the address of moneyMarket (in any of the networks)
                    ) {
                        return {
                            ...state,
                            assets: {
                                ...state.assets,
                                [action.name]: {
                                    ...state.assets[action.name],
                                    wallet: action.value,
                                },
                            },
                        };
                    }
                // falls through
                default:
                    return state;
            }
        }
        case DEPOSIT_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        depositing: true,
                        activating: true,
                    },
                },
            };
        case DEPOSIT_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        depositing: false,
                        activated: true,
                    },
                },
            };

        case DEPOSIT_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        depositing: false,
                        activating: false,
                        error: action.error,
                    },
                },
            };

        case WITHDRAW_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        withdrawing: true,
                    },
                },
            };
        case WITHDRAW_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        withdrawing: false,
                        activated: true,
                    },
                },
            };

        case WITHDRAW_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        withdrawing: false,
                        error: action.error,
                    },
                },
            };
        case APPROVE_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        approving: true,
                    },
                },
            };
        case APPROVE_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        approving: false,
                        activated: true,
                    },
                },
            };

        case APPROVE_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        approving: false,
                        error: action.error,
                    },
                },
            };
        case ALLOCATE_PENDING: {
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset.unit]: {
                        ...state.assets[action.payload.asset.unit],
                        allocating: true,
                        activating: false,
                    },
                },
            };
        }

        case ALLOCATE_SUCCESS: {
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset.unit]: {
                        ...state.assets[action.payload.asset.unit],
                        allocating: false,
                        activated: false,
                        pending: false,
                    },
                },
            };
        }

        case ALLOCATE_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        allocating: false,
                        activating: false,
                        error: action.error,
                    },
                },
            };

        case RESET_LEND_DATA:
            return initialState;

        default:
            return state;
    }
};
