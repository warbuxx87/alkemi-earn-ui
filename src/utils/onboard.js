import Onboard from "bnc-onboard";

const DEFAULT_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;

const DAPP_ID = process.env.REACT_APP_DAPP_ID;
const INFURA_ID = process.env.REACT_APP_INFURA_ID;
// const FORTMATIC_TEST_KEY = process.env.REACT_APP_FORTMATIC_TEST_KEY;
// const FORTMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY;
const PORTIS_KEY = process.env.REACT_APP_PORTIS_KEY;
// const SQUARELINK_KEY = process.env.REACT_APP_SQUARELINK_KEY;
// const APP_URL = process.env.REACT_APP_APP_URL;
// const CONTACT_EMAIL = process.env.REACT_APP_CONTACT_EMAIL;
// const RPC_URL = "https://rinkeby.infura.io/v3/" + INFURA_ID;

const walletChecks = [
    { checkName: "derivationPath" },
    { checkName: "accounts" },
    { checkName: "connect" },
    // { checkName: "network" }, // connects to any network
    // { checkName: "balance", minimumBalance: "1000000" },
];

const wallets = [
    { walletName: "metamask", preferred: true },
    { walletName: "trust", preferred: true },
    { walletName: "coinbase", preferred: true },
    {
        walletName: "walletConnect",
        preferred: true,
        infuraKey: INFURA_ID, // your infura id [String][Optional if rpc is provided instead]
    },
    {
        walletName: "portis",
        apiKey: PORTIS_KEY,
        preferred: true,
        label: "Portis",
    },
    // {
    //     walletName: "ledger",
    //     rpcUrl: RPC_URL,
    //     preferred: true,
    // },
    // {
    //     walletName: "fortmatic",
    //     apiKey: DEFAULT_NETWORK === "4" ? FORTMATIC_TEST_KEY : FORTMATIC_KEY,
    // },
];

const onboard = Onboard({
    dappId: DAPP_ID, // [String] The API key created by step one above
    networkId: parseInt(DEFAULT_NETWORK, 10), // [Integer] The Ethereum network ID your Dapp uses.
    darkMode: true,
    walletSelect: {
        wallets: wallets,
    },
    subscriptions: {
        wallet: (wallet) => {
            //    window.localStorage.setItem("selectedWallet", wallet.name);

            switch (wallet.name) {
                case "Fortmatic": {
                    window.currentlyUsedProvider = wallet.instance.getProvider();
                    break;
                }
                default:
                    window.currentlyUsedProvider = wallet.provider;
            }
        },
    },
    walletCheck: walletChecks,
});

// replace by redux state (isWalletConnected) if there is any issue
export const readyToTransact = async () => {
    if (!window.currentlyUsedProvider) {
        const walletSelected = await onboard.walletSelect();

        if (!walletSelected) return false;
    }

    const ready = await onboard.walletCheck();

    return ready;
};

export default onboard;
