// Import action of interest as constants
import {
    FETCH_LEND_PENDING,
    FETCH_LEND_SUCCESS,
    FETCH_LEND_ERROR,
    SUPPLY_PENDING,
    SUPPLY_SUCCESS,
    SUPPLY_ERROR
} from "redux/actions/data";
// import internal assets
import dai from "assets/images/DAI.svg";
import usdc from "assets/images/USDC.svg";
import imbtc from "assets/images/imBTC.svg";
import usdt from "assets/images/USDT.svg";
import eth from "assets/images/WETH.svg";
// import pax from "assets/images/pax.png";

function createData(name, unit, image, wallet, balance, apr, collateral) {
    return {
        name,
        unit,
        image,
        wallet,
        balance,
        apr,
        collateral,
        activated: false,
        pending: false,
        supplying: false
    };
}

const assets = {
    WETH: createData("Ether", "WETH", eth, "0", "0", 0, 0),
    DAI: createData("Maker DAI", "DAI", dai, "0", "0", 0, 0),
    USDT: createData("Tether", "USDT", usdt, "0", "0", 0, 0),
    USDC: createData("USD Coin", "USDC", usdc, "0", "0", 0, 0),
    imBTC: createData("Tokenized BTC", "imBTC", imbtc, "0", "0", 0, 0)
    // PAX: createData('Paxos','PAX', pax, 0, 0, 0, 0),
};
// Define initial state
const initialState = {
    assets
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
                        pending: true
                    }
                }
            };
        case FETCH_LEND_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload]: {
                        ...state.assets[action.payload],
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
                                balance: action.value
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
        default:
            return state;
    }
};
