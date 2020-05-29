import Notify from "bnc-notify";

const DAPP_ID = process.env.REACT_APP_DAPP_ID;

const notify = Notify({
    dappId: DAPP_ID, // [String] The API key created by step one above
    networkId: 4,
    darkMode: false,
    desktopPosition: "bottomRight" // [Integer] The Ethereum network ID your Dapp uses.
});

const networkIdToUrl = {
    main: "https://etherscan.io/tx",
    rinkeby: "https://rinkeby.etherscan.io/tx"
};

export const notifyTransaction = ({
    estimateGas, // () => Promise
    gasPrice, // () => Promise
    balance, // wei
    sendTransaction, // () => Promise,
    network, // "main" or "rinkeby"
    events // even handler https://docs.blocknative.com/notify#event-codes
}) =>
    new Promise((resolve, reject) => {
        const { emitter } = notify.transaction({
            estimateGas,
            gasPrice,
            balance,
            sendTransaction
        });

        emitter.on("txRequest", () => events.txRequest);

        emitter.on("txPool", () => events.txPool);

        emitter.on("txSendFail", () => {
            reject(new Error("The user rejected the transaction"));
            return false;
        });

        emitter.on("txConfirmed", transaction => {
            resolve(transaction);
            return events && events.txConfirmed && events.txConfirmed.message
                ? {
                      message: `
                ${events.txConfirmed.message}
                <br />
                <a href="${networkIdToUrl[network]}/${transaction.hash}" target="_blank">
                    View transaction here
                    <svg version="1.1" x="0px" y="0px" viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;height: 12px;fill: #1890ff;" xml:space="preserve">
                        <g><polygon points="79.093,0 48.907,30.187 146.72,128 48.907,225.813 79.093,256 207.093,128"/></g>
                    </svg>
                </a>
            `
                  }
                : {};
        });

        // called on every event that doesn't have a listener defined on this transaction
        emitter.on("all", transaction => {
            switch (transaction.eventCode) {
                case "txError":
                    return reject(
                        new Error("An error has occurred with the transaction")
                    );
                case "txUnderpriced":
                    return reject(
                        new Error(
                            "The gas was set too low for the transaction to complete"
                        )
                    );
                case "txFailed":
                    return reject(new Error("Transaction has failed"));
                case "txCancel":
                    return reject(
                        new Error(
                            "A new transaction has been submitted with the same nonce, a higher gas price, a value of zero and sent to an external address (not a contract)"
                        )
                    );
                case "txDropped":
                    return reject(
                        new Error(
                            "Transaction was dropped from the mempool without being added to a block."
                        )
                    );
                default:
            }
        });
    });

export default notify;
