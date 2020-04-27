// Import action of interest as constants
import {
  FETCH_LEND_PENDING,
  FETCH_LEND_SUCCESS,
  FETCH_LEND_ERROR
} from "redux/actions/data";

// import internal assets
import dai from "assets/images/DAI.svg";
import usdc from "assets/images/USDC.svg";
import imbtc from "assets/images/imBTC.svg";
import usdt from "assets/images/USDT.svg";
import eth from "assets/images/WETH.svg";
// import pax from "assets/images/pax.png";

function createData(name, unit, image, wallet, balance, apr, collateral) {
  return { name, unit, image, wallet, balance, apr, collateral };
}

const assets = [
  createData("Ether", "WETH", eth, 0, 0, 0, 0),
  createData("Maker DAI", "DAI", dai, 0, 0, 0, 0),
  createData("Tether", "USDT", usdt, 0, 0, 0, 0),
  createData("USD Coin", "USDC", usdc, 0, 0, 0, 0),
  createData("Tokenized BTC", "imBTC", imbtc, 0, 0, 0, 0)
  //createData('Paxos','PAX', pax, 0, 0, 0, 0),
];

// Define initial state
const initialState = {
  pending: false,
  active: [],
  inactive: assets,
  error: null
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, { type, active, inactive }) => {
  switch (type) {
    case FETCH_LEND_PENDING:
      return {
        ...state,
        pending: true
      };

    case FETCH_LEND_SUCCESS:
      return {
        ...state,
        pending: false,
        active: active,
        inactive: inactive
      };

    case FETCH_LEND_ERROR:
      return {
        ...state,
        pending: false,
        error: active.error
      };

    default:
      return state;
  }
};
