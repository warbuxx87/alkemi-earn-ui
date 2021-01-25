// Import action of interest as constants
import { RESET_LEND_DATA, SET_ETH_LEND_BALANCE } from "redux/actions/data/lend";
// import internal assets
import dai from "assets/images/DAI.svg";
import usdc from "assets/images/USDC.svg";
import wbtc from "assets/images/WBTC.svg";
import eth from "assets/images/WETH.svg";

import address from "constants/address_map.json";

const ENABLED_TOKENS = process.env.REACT_APP_ENABLED_TOKENS.split(",");

function createData(name, unit, image, wallet, alternativeUnitLabel) {
    return {
        name,
        unit,
        alternativeUnitLabel,
        image,
        wallet,
        activated: false,
        activating: false,
        approving: false,
        pending: false,
    };
}

const assets = {
    DAI: createData("Dai Stablecoin", "DAI", dai, "0"),
    WETH: createData("Ether", "WETH", eth, "0", "ETH"),
    USDC: createData("USD Coin", "USDC", usdc, "0"),
    WBTC: createData("Wrapped Bitcoin", "WBTC", wbtc, "0"),
};

// generate assets object from enabled tokens in env var
const generateAssetsList = () => {
    let enabledAssetsData = {};

    ENABLED_TOKENS.forEach((v) => {
        enabledAssetsData[v] = assets[v];
    });

    return enabledAssetsData;
};

// Define initial state
const initialState = {
    assets: generateAssetsList(),
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
                            .includes(action.args[0]) && // check if the contract address linked to the action is not the address of moneyMarket (in any of the networks)
                        action.name !== "WETH" && // under the hood ETH is used out of user wallet, we cannot change all references form WETH to ETH as WETH is used in some other places, so this is the cleanest way found to make this exception for ETH
                        ENABLED_TOKENS.includes(action.name)
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

        case SET_ETH_LEND_BALANCE: {
            if (ENABLED_TOKENS.includes("WETH"))
                return {
                    ...state,
                    assets: {
                        ...state.assets,
                        WETH: {
                            ...state.assets["WETH"],
                            wallet: action.payload.walletETHBalance, // expecting that only one account is used at the same time, and thus only one value is retrieved
                        },
                    },
                };
            break;
        }

        case RESET_LEND_DATA:
            return initialState;

        default:
            return state;
    }
};
