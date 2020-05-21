import Notify from "bnc-notify";

const DAPP_ID = process.env.REACT_APP_DAPP_ID;

const notify = Notify({
    dappId: DAPP_ID, // [String] The API key created by step one above
    networkId: 4,
    darkMode: true,
    desktopPosition: "topRight" // [Integer] The Ethereum network ID your Dapp uses.
});

export default notify;
