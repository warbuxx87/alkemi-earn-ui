import { InjectedConnector } from "@web3-react/injected-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { LedgerHQFrameConnector } from "web3-ledgerhq-frame-connector";

import { WalletConnectConnector } from "utils/CustomWalletConnector";
import { SafeAppConnector } from "@gnosis.pm/safe-apps-web3-react";

const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const RPC_URL_MAINNET = "https://infura.io/v3/" + INFURA_ID;
const RPC_URL_RINKEBY = "https://rinkeby.infura.io/v3/" + INFURA_ID;

export const injected = new InjectedConnector({ supportedChainIds: [1, 4] });

export const walletconnect = new WalletConnectConnector({
    rpc: { 1: RPC_URL_MAINNET, 4: RPC_URL_RINKEBY },
    infuraId: INFURA_ID,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    // preferredNetworkId: 1
});

export const LedgerHQFrame = new LedgerHQFrameConnector();

export const safeMultisigConnector = new SafeAppConnector();
