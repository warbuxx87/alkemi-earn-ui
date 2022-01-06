// Section 1: React/Redux low level imports
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import Web3 from "web3";

import { useWeb3React } from "@web3-react/core";

// import { ethers } from "ethers";

import Web3WsProvider from "web3-providers-ws";

// Section 2: internal imports
import {
    isWalletConnected,
    walletAddress,
    walletNetworkName,
} from "redux/selectors/data/onboard";

import { getPool } from "redux/selectors/status/pool";

import { transactionResolved } from "redux/actions/status/transactions";

import addressMap from "constants/address_map.json";

import { triggerToastDisplay } from "utils/notify";

import topics from "constants/topics";

import { getTransactions } from "redux/selectors/status/status";

const INFURA_ID = process.env.REACT_APP_INFURA_ID;

const moneyMarketTopics = topics.MoneyMarket;

const assetsTopics = topics.assets;

const rewardControlTopics = topics.RewardControl;

const WSoptions = (projectId) => {
    return {
        timeout: 3600000, // ms -- 60 min

        // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
        headers: {
            authorization: `Basic :${projectId}`,
        },

        //  Useful if requests result are large
        clientConfig: {
            maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
            maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

            // Useful to keep a connection alive
            keepalive: true,
            keepaliveInterval: 15000, // ms
        },

        // Enable auto reconnection
        reconnect: {
            auto: true,
            delay: 5000, // ms
            maxAttempts: 100000,
            onTimeout: true,
        },
    };
};

const wssProvider = (projectId) => {
    return new Web3WsProvider(
        `wss://rinkeby.infura.io/ws/v3/${projectId}`, // TODO: adapt to network
        WSoptions(projectId)
    );
};

// define data structure for input for moneymarket contract
const contractInput = [
    {
        type: "address",
        name: "account",
    },
    {
        type: "address",
        name: "asset",
    },
    {
        type: "uint256",
        name: "amount",
    },
    {
        type: "uint256",
        name: "startingBalance",
    },
    {
        type: "uint256",
        name: "newBalance",
    },
];

const messagePerType = {
    supply: "Supply Received",
    borrow: "Borrow Taken",
    withdraw: "Supply Withdrawn",
    repayBorrow: "Borrow Repaid",

    liquidate: "Borrow Liquidated",

    approve: "Asset Authorized", // activate
    allocateTo: "Assets allocated", // test network only (fires also on borrow especially)
};

function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => {
        return object[key].toLowerCase() === value.toLowerCase();
    });
}

export default () => {
    const { library, active, error } = useWeb3React();

    const dispatch = useDispatch();

    const walletConnected = useSelector(isWalletConnected); // Kind of useless to use here but won't hurt (hopefully)
    const userWalletAddress = useSelector(walletAddress);
    const currentNetworkName = useSelector(walletNetworkName);
    const currentPool = useSelector(getPool);

    const txs = useSelector(getTransactions);

    const clearWatchers = (watchers) => {
        if (watchers) {
            for (const key of Object.keys(watchers)) {
                watchers[key].unsubscribe();
            }
        }
    };

    useEffect(() => {
        let watchers = {};
        const notifiedTx = []; // tracking fired notifications by txHash (protects against web3.subscribe firing multiple times)

        const address_MoneyMarket =
            currentPool === "open"
                ? addressMap[currentNetworkName].address_open_MoneyMarket
                : addressMap[currentNetworkName].address_MoneyMarket;

        const watchMoneyMarketLogs = () => {
            const options = {
                address: address_MoneyMarket,
                //topics: ['0x12345...']
            };

            // let infuraProvider = new ethers.providers.InfuraProvider('rinkeby'); // TODO: adapt to network name // kind of a hack to get project id from infuraprovider

            const web3 = new Web3(wssProvider(INFURA_ID));

            watchers.MoneyMarket = web3.eth.subscribe(
                "logs",
                options,
                function (error, tx) {
                    if (error || tx == null) {
                        // console.log(
                        //     "Error when watching incoming transactions: ",
                        //     error
                        // );
                        return;
                    }

                    tx.topics.forEach((topic) => {
                        // console.log("Found tx with this topic " + topic);
                        // If the Transaction Topic is supply / withdraw / borrow / repay
                        if (
                            topic === moneyMarketTopics.supply ||
                            topic === moneyMarketTopics.withdraw ||
                            topic === moneyMarketTopics.borrow ||
                            topic === moneyMarketTopics.repayBorrow ||
                            topic === moneyMarketTopics.liquidate
                        ) {
                            // @dev https://web3js.readthedocs.io/en/v1.2.7/web3-eth-abi.html#id18
                            // console.log(
                            //     "Tx topic matched Deposit/Borrow/Withdraw/Repay"
                            // );

                            // decode the transaction data byte code so it's readable
                            let result = web3.eth.abi.decodeLog(
                                contractInput,
                                tx.data,
                                tx.topics
                            );

                            if (
                                result.account.toLowerCase() ===
                                userWalletAddress.toLowerCase()
                            ) {
                                // tx.asset IS the address on the blockchain and not the symbol / assetUnit
                                const assetsAddresses =
                                    addressMap[currentNetworkName][currentPool];

                                const resultKey = getKeyByValue(
                                    assetsAddresses,
                                    result.asset
                                );

                                if (
                                    resultKey !== undefined &&
                                    resultKey != null
                                ) {
                                    const assetUnit = resultKey.replace(
                                        "address_",
                                        ""
                                    );

                                    const resultType = getKeyByValue(
                                        moneyMarketTopics,
                                        topic
                                    );

                                    if (
                                        resultType !== undefined &&
                                        resultType != null
                                    ) {
                                        if (
                                            !notifiedTx.includes(
                                                tx.transactionHash
                                            )
                                        ) {
                                            notifiedTx.push(tx.transactionHash);

                                            dispatch(
                                                // this could show a resolved transaction even if it's fired outside the current instance of the app
                                                transactionResolved({
                                                    txHash: tx.transactionHash,
                                                    assetUnit,
                                                    type: resultType,
                                                })
                                            );

                                            // this will definitely display a success message even if it's triggered outside of the instance of the app
                                            // triggerToastDisplay({
                                            //     toastMessageVariant: "success",
                                            //     displayMessage:
                                            //         "Transaction Successful",
                                            //     displaySecondaryMessage:
                                            //         messagePerType[
                                            //             resultType
                                            //         ] ||
                                            //         "Consult the transaction hash",
                                            //     currentNetworkName,
                                            //     txHash: tx.transactionHash,
                                            // });
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            );
        };

        const watchAssetLogs = (assetSymbol) => {
            const options = {
                address:
                    addressMap[currentNetworkName][currentPool][
                        `address_${assetSymbol}`
                    ],
                // topics: assetsTopicsToWatch
            };

            const web3 = new Web3(library.provider);

            watchers[assetSymbol] = web3.eth.subscribe(
                "logs",
                options,
                function (error, tx) {
                    if (error || tx == null) {
                        // console.log(
                        //     "Error when watching incoming transactions: ",
                        //     error
                        // );
                        return;
                    }

                    tx.topics.forEach((topic) => {
                        // console.log("Found tx with this topic " + topic);
                        // If the Transaction Topic is supply / withdraw / borrow / repay
                        if (
                            topic === assetsTopics.allocateTo ||
                            topic === assetsTopics.approve
                        ) {
                            // @dev https://web3js.readthedocs.io/en/v1.2.7/web3-eth-abi.html#id18
                            // console.log("Tx topic matched allocateTo/approve");

                            web3.eth
                                .getTransaction(tx.transactionHash)
                                .then((result) => {
                                    if (
                                        result.from.toLowerCase() ===
                                        userWalletAddress.toLowerCase()
                                    ) {
                                        const resultType = getKeyByValue(
                                            assetsTopics,
                                            topic
                                        );

                                        if (
                                            resultType !== undefined &&
                                            resultType != null
                                        ) {
                                            if (
                                                !notifiedTx.includes(
                                                    tx.transactionHash
                                                )
                                            ) {
                                                notifiedTx.push(
                                                    tx.transactionHash
                                                );

                                                dispatch(
                                                    transactionResolved({
                                                        txHash: tx.transactionHash,
                                                        assetSymbol, // TODO: assetUnit ?
                                                        type: resultType,
                                                    })
                                                );

                                                // triggerToastDisplay({
                                                //     toastMessageVariant:
                                                //         "success",
                                                //     displayMessage:
                                                //         "Transaction Successful",
                                                //     displaySecondaryMessage:
                                                //         messagePerType[
                                                //             resultType
                                                //         ] ||
                                                //         "Consult the transaction hash",
                                                //     currentNetworkName,
                                                //     txHash: tx.transactionHash,
                                                // });
                                            }
                                        }
                                    }
                                });
                        }
                    });
                }
            );
        };

        const watchRewardControlLogs = () => {
            const options = {
                address:
                    addressMap[currentNetworkName][`address_RewardControl`],
                //topics: ['0x12345...']
            };

            // let infuraProvider = new ethers.providers.InfuraProvider('rinkeby'); // TODO: adapt to network name // kind of a hack to get project id from infuraprovider

            const web3 = new Web3(wssProvider(INFURA_ID));

            watchers.RewardControl = web3.eth.subscribe(
                "logs",
                options,
                function (error, tx) {
                    if (error || tx == null) {
                        // console.log(
                        //     "Error when watching incoming transactions: ",
                        //     error
                        // );
                        return;
                    }

                    tx.topics.forEach((topic) => {
                        if (topic === rewardControlTopics.claimAlk) {
                            web3.eth
                                .getTransaction(tx.transactionHash)
                                .then((result) => {
                                    if (
                                        result.from.toLowerCase() ===
                                        userWalletAddress.toLowerCase()
                                    ) {
                                        const resultType = getKeyByValue(
                                            rewardControlTopics,
                                            topic
                                        );

                                        if (
                                            resultType !== undefined &&
                                            resultType != null
                                        ) {
                                            if (
                                                !notifiedTx.includes(
                                                    tx.transactionHash
                                                )
                                            ) {
                                                notifiedTx.push(
                                                    tx.transactionHash
                                                );

                                                dispatch(
                                                    transactionResolved({
                                                        txHash: tx.transactionHash,
                                                        assetUnit: "ALK",
                                                        type: resultType,
                                                    })
                                                );

                                                triggerToastDisplay({
                                                    toastMessageVariant:
                                                        "success",
                                                    displayMessage:
                                                        "Transaction Successful",
                                                    displaySecondaryMessage:
                                                        messagePerType[
                                                            resultType
                                                        ] ||
                                                        "Consult the transaction hash",
                                                    currentNetworkName,
                                                    txHash: tx.transactionHash,
                                                });
                                            }
                                        }
                                    }
                                });
                        }
                    });
                }
            );
        };

        if (
            walletConnected &&
            userWalletAddress !== undefined &&
            userWalletAddress != null &&
            currentNetworkName !== undefined &&
            currentNetworkName != null &&
            active &&
            library &&
            !error
        ) {
            clearWatchers(watchers);

            watchMoneyMarketLogs();
            watchAssetLogs("USDC");
            watchAssetLogs("WBTC");
            watchAssetLogs("WETH");
            watchAssetLogs("DAI");
            watchRewardControlLogs();
        } else if (error) {
            try {
                clearWatchers(watchers);
            } catch (e) {
                console.error("Error clearing transactions watchers ", e);
            }
        }

        return () => {
            clearWatchers(watchers);
        };
    }, [
        userWalletAddress,
        currentNetworkName,
        walletConnected,
        library,
        active,
        error,
        dispatch,
    ]);

    useEffect(() => {
        const foundTxs = Object.values(txs).filter((aTx) => {
            return (
                aTx.userWalletName === "WalletConnect" &&
                aTx.foundRealTx !== true &&
                aTx.processing === true
            );
        });

        const fetchWalletConnectRealTx = (txHash) => {
            fetch(
                `https://safe-transaction.rinkeby.gnosis.io/api/v1/multisig-transactions/${txHash}`,
                {
                    // TODO: adapt link to mainnet
                    method: "GET",
                    headers: { accept: "application/json" },
                }
            )
                .then((response) => {
                    if (
                        response.status === 404 ||
                        response.statusText === "Not Found"
                    ) {
                        setTimeout(
                            () => fetchWalletConnectRealTx(txHash),
                            5 * 1000
                        );
                    } else {
                        return response.json();
                    }
                })
                .then(function (data) {
                    if (
                        !data ||
                        !data.transactionHash ||
                        data.confirmations.length < 1
                    ) {
                        // NB: This is very slow to resolve, as in receiving a confirmation
                        setTimeout(
                            () => fetchWalletConnectRealTx(txHash),
                            3 * 1000
                        );
                    } else {
                        dispatch(
                            transactionResolved({
                                txHash: txHash,
                            })
                        );
                        // dispatch safe tx resolved
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        foundTxs.map((tx) => {
            fetchWalletConnectRealTx(tx.txHash);
        });
    }, [txs]);
};
