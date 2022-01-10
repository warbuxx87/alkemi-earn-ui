import { AbstractConnector } from "@web3-react/abstract-connector";

export class UserRejectedRequestError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = "The user rejected the request.";
    }
}

export class WalletConnectConnector extends AbstractConnector {
    constructor({ rpc, bridge, qrcode, pollingInterval, preferredNetworkId }) {
        super({ supportedChainIds: Object.keys(rpc).map((k) => Number(k)) });

        this.rpc = rpc;
        this.bridge = bridge;
        this.qrcode = qrcode;
        this.preferredNetworkId = preferredNetworkId;
        this.pollingInterval = pollingInterval;

        this.handleChainChanged = this.handleChainChanged.bind(this);
        this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
    }

    handleChainChanged(chainId) {
        console.log("Handling 'chainChanged' event with payload", chainId);

        this.emitUpdate({ chainId });
    }

    handleAccountsChanged(accounts) {
        console.log("Handling 'accountsChanged' event with payload", accounts);

        this.emitUpdate({ account: accounts[0] });
    }

    handleDisconnect() {
        console.log("Handling 'disconnect' event");

        this.emitDeactivate();
        // we have to do this because of a @walletconnect/web3-provider bug
        if (this.walletConnectProvider) {
            this.walletConnectProvider.stop();
            this.walletConnectProvider.removeListener(
                "chainChanged",
                this.handleChainChanged
            );
            this.walletConnectProvider.removeListener(
                "accountsChanged",
                this.handleAccountsChanged
            );
            this.walletConnectProvider = undefined;
        }

        this.emitDeactivate();
    }

    async activate() {
        if (!this.walletConnectProvider) {
            const WalletConnectProvider = await import(
                "@walletconnect/web3-provider"
            ).then((m) => m?.default ?? m);
            this.walletConnectProvider = new WalletConnectProvider({
                bridge: this.bridge,
                rpc: this.rpc,
                qrcode: this.qrcode,
                pollingInterval: this.pollingInterval,
                chainId: this.preferredNetworkId,
            });
        }

        const account = await this.walletConnectProvider
            .enable()
            .then((accounts) => accounts[0])
            .catch((error) => {
                if (error.message === "User closed modal") {
                    throw new UserRejectedRequestError();
                }

                throw error;
            });

        this.walletConnectProvider.on("disconnect", this.handleDisconnect);
        this.walletConnectProvider.on("chainChanged", this.handleChainChanged);
        this.walletConnectProvider.on(
            "accountsChanged",
            this.handleAccountsChanged
        );

        return { provider: this.walletConnectProvider, account };
    }

    async getProvider() {
        return this.walletConnectProvider;
    }

    async getChainId() {
        return this.walletConnectProvider.send("eth_chainId");
    }

    async getAccount() {
        return this.walletConnectProvider
            .send("eth_accounts")
            .then((accounts) => accounts[0]);
    }

    deactivate() {
        if (this.walletConnectProvider) {
            this.walletConnectProvider.stop();
            this.walletConnectProvider.removeListener(
                "disconnect",
                this.handleDisconnect
            );
            this.walletConnectProvider.removeListener(
                "chainChanged",
                this.handleChainChanged
            );
            this.walletConnectProvider.removeListener(
                "accountsChanged",
                this.handleAccountsChanged
            );
        }
    }

    async close() {
        await this.walletConnectProvider?.close();
    }
}
