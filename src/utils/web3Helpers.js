// import { InjectedConnector } from "@web3-react/injected-connector";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const getProviderName = (provider) => {
    if (provider instanceof WalletConnectProvider) return "WalletConnect";

    if (provider.isMetaMask === true) return "MetaMask";

    return "Injected"; // Generic name
};
