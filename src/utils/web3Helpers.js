// import { InjectedConnector } from "@web3-react/injected-connector";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { SafeAppConnector } from "@gnosis.pm/safe-apps-web3-react";

export const getProviderName = (provider) => {
    if (provider instanceof WalletConnectProvider) return "WalletConnect";

    // For Gnosis safe app, instanceof SafeAppConnector doesn't seem to resolve as true so .safe and .sdk are used as make shift test
    if (provider instanceof SafeAppConnector) return "GnosisSafeApp";

    if (provider.safe && provider.sdk) return "GnosisSafeApp";

    if (provider.isMetaMask === true) return "MetaMask"; // could add check of _metamask exists

    return "Injected"; // Generic name
};
