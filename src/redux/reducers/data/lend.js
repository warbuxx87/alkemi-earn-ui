// Import action of interest as constants
import {
    FETCH_LEND_PENDING,
    FETCH_LEND_SUCCESS,
    FETCH_LEND_ERROR,
    ALLOCATE_PENDING,
    ALLOCATE_SUCCESS,
    ALLOCATE_ERROR,
    APPROVE_PENDING,
    APPROVE_SUCCESS,
    APPROVE_ERROR,
    SUPPLY_PENDING,
    SUPPLY_SUCCESS,
    SUPPLY_ERROR,
    REDEEM_PENDING,
    REDEEM_SUCCESS,
    REDEEM_ERROR
} from "redux/actions/data";
// import internal assets
import dai from "assets/images/DAI.svg";
import usdc from "assets/images/USDC.svg";
import wbtc from "assets/images/WBTC.svg";
import usdt from "assets/images/USDT.svg";
import eth from "assets/images/WETH.svg";
import pax from "assets/images/pax.png";

function createData(
    name,
    unit,
    image,
    wallet,
    balance,
    apr,
    principal,
    collateral,
    price,
    utilization
) {
    return {
        name,
        unit,
        image,
        wallet,
        balance,
        apr,
        principal,
        collateral,
        price,
        utilization,
        activated: false,
        pending: false,
        supplying: false,
        redeeming: false,
        approving: false,
        allocating: false
    };
}

const assets = {
    WETH: createData("Ether", "WETH", eth, "0", "0", "0", "0", "0", "0", "0"),
    DAI: createData("Maker DAI", "DAI", dai, "0", "0", "0", "0", "0", "0", "0"),
    USDT: createData("Tether", "USDT", usdt, "0", "0", "0", "0", "0", "0", "0"),
    USDC: createData(
        "USD Coin",
        "USDC",
        usdc,
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0"
    ),
    WBTC: createData(
        "Wrapped Bitcoin",
        "WBTC",
        wbtc,
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0"
    ),
    PAX: createData("Paxos", "PAX", pax, "0", "0", "0", "0", "0", "0", "0")
};
// Define initial state
const initialState = {
    assets,
    error: null
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LEND_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.asset]: {
                        ...state.assets[action.asset],
                        pending: true,
                        activated: false
                    }
                }
            };
        case FETCH_LEND_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.asset]: {
                        ...state.assets[action.asset],
                        pending: false,
                        activated: true
                    }
                }
            };

        case FETCH_LEND_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        pending: false,
                        activated: false,
                        error: action.payload.error
                    }
                }
            };
        case "GOT_CONTRACT_VAR":
            switch (action.variable) {
                case "balanceOf":
                    return {
                        ...state,
                        assets: {
                            ...state.assets,
                            [action.name]: {
                                ...state.assets[action.name],
                                wallet: action.value
                            }
                        }
                    };
                default:
                    return state;
            }
        case SUPPLY_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload]: {
                        ...state.assets[action.payload],
                        supplying: true
                    }
                }
            };
        case SUPPLY_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload]: {
                        ...state.assets[action.payload],
                        supplying: false,
                        activated: true
                    }
                }
            };

        case SUPPLY_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        supplying: false,
                        error: action.payload.error
                    }
                }
            };

        case REDEEM_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload]: {
                        ...state.assets[action.payload],
                        redeeming: true
                    }
                }
            };
        case REDEEM_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload]: {
                        ...state.assets[action.payload],
                        redeeming: false,
                        activated: true
                    }
                }
            };

        case REDEEM_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        redeeming: false,
                        error: action.payload.error
                    }
                }
            };
        case APPROVE_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload]: {
                        ...state.assets[action.payload],
                        approving: true
                    }
                }
            };
        case APPROVE_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload]: {
                        ...state.assets[action.payload],
                        approving: false,
                        activated: true
                    }
                }
            };

        case APPROVE_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        approving: false,
                        error: action.payload.error
                    }
                }
            };
        case ALLOCATE_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload]: {
                        ...state.assets[action.payload],
                        allocating: true,
                        pending: true
                    }
                }
            };
        case ALLOCATE_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload]: {
                        ...state.assets[action.payload],
                        allocating: false,
                        pending: false,
                        activated: false
                    }
                }
            };

        case ALLOCATE_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        allocating: false,
                        pending: false,
                        error: action.payload.error
                    }
                }
            };
        default:
            return state;
    }
};
