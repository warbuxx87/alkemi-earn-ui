import Onboard from "bnc-onboard";

const DEFAULT_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;

const DAPP_ID = process.env.REACT_APP_DAPP_ID;
const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const RPC_URL = "https://rinkeby.infura.io/v3/" + INFURA_ID; // TODO: Use mainnet

const walletChecks = [
    { checkName: "derivationPath" },
    { checkName: "accounts" },
    { checkName: "connect" },
    // { checkName: "balance", minimumBalance: "1000000" },
];

// if (!["true", true].includes(ALLOW_ALL_NETWORKS))
//     walletChecks.push({ checkName: "network" }); // connects only to default network

const wallets = [
    { walletName: "metamask", preferred: true },
    {
        walletName: "walletConnect",
        preferred: true,
        infuraKey: INFURA_ID, // your infura id [String][Optional if rpc is provided instead]
    },
    { walletName: "trust", rpcUrl: RPC_URL, preferred: false },
    // { walletName: "coinbase", preferred: false },
    // { walletName: 'walletLink', rpcUrl: RPC_URL },

    // {
    //     walletName: "portis",
    //     apiKey: PORTIS_KEY,
    //     preferred: true,
    //     label: "Portis",
    // },
    // {
    //     walletName: "ledger",
    //     rpcUrl: RPC_URL,
    //     preferred: true,
    // },
    // {
    //     walletName: "fortmatic", // don't forget fortmatic-site-verification in index.html
    //     apiKey: DEFAULT_NETWORK === "4" ? FORTMATIC_TEST_KEY : FORTMATIC_KEY,
    // },
];

export function initOnboard(subscriptions) {
    try {
        return Onboard({
            dappId: DAPP_ID, // [String] The API key created by step one above
            networkId: parseInt(DEFAULT_NETWORK, 10), // [Integer] The Ethereum network ID your Dapp uses.
            darkMode: true,
            hideBranding: true,
            walletSelect: {
                wallets: wallets,
            },
            subscriptions,
            walletCheck: walletChecks,
        });
    } catch (e) {
        // Alternative to the undefined onboard because the ws connection onboard was cut is to put the above initOnboard logic directly in onboardConfig.js
    }
}

export const readyToTransact = async () => {
    return true;
};
