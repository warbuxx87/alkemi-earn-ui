// Import action of interest as constants
import {
    APPROVE_PENDING,
    APPROVE_SUCCESS,
    APPROVE_ERROR,
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

        case RESET_LEND_DATA:
            return initialState;

        default:
            return state;
    }
};
