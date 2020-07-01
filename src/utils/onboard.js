import Onboard from "bnc-onboard";

const DAPP_ID = process.env.REACT_APP_DAPP_ID;
const FORTMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY;
//const FORTMATIC_TEST_KEY = process.env.REACT_APP_FORTMATIC_TEST_KEY;
const PORTIS_KEY = process.env.REACT_APP_PORTIS_KEY;
const SQUARELINK_KEY = process.env.REACT_APP_SQUARELINK_KEY;
//const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
// const APP_URL = process.env.REACT_APP_APP_URL
// const CONTACT_EMAIL = process.env.REACT_APP_CONTACT_EMAIL:
const RPC_URL = "https://main.infura.io/v3/" + INFURA_KEY;

const walletChecks = [
    { checkName: "derivationPath" },
    { checkName: "accounts" },
    { checkName: "connect" },
    { checkName: "network" },
    { checkName: "balance", minimumBalance: "1000000" },
];

const wallets = [
    { walletName: "coinbase", preferred: true },
    { walletName: "trust", preferred: true, rpcUrl: RPC_URL },
    { walletName: "metamask", preferred: true },
    {
        walletName: "portis",
        apiKey: PORTIS_KEY,
        preferred: true,
        label: "Portis",
    },
    {
        walletName: "squarelink",
        apiKey: SQUARELINK_KEY,
        preferred: true,
        label: "SquareLink",
    },
    {
        walletName: "fortmatic",
        apiKey: FORTMATIC_KEY,
        preferred: true,
    },
];

const onboard = Onboard({
    dappId: DAPP_ID, // [String] The API key created by step one above
    networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
    darkMode: true,
    walletSelect: {
        wallets: wallets,
    },
    subscriptions: {
        wallet: (wallet) => {
            window.localStorage.setItem("selectedWallet", wallet.name);

            window.currentlyUsedProvider = wallet.provider;
        },
    },
    walletCheck: walletChecks,
});

// TODO replace by REDUX state
export const readyToTransact = async () => {
    if (!window.ethereum) {
        const walletSelected = await onboard.walletSelect();

        if (!walletSelected) return false;
    }

    const ready = await onboard.walletCheck();

    return ready;
};

export default onboard;
