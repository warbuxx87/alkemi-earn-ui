// Section 1: React/Redux low level imports
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

// Section 2: internal imports
import DrizzleContext from "utils/DrizzleContext";

import {
    isWalletConnected,
    walletAddress,
    walletNetworkName,
} from "redux/selectors/data/onboard";

import { transactionResolved } from "redux/actions/status/transactions";

import addressMap from "constants/address_map.json";

import { triggerToastDisplay } from "utils/notify";

import topics from "constants/topics";

const moneyMarketTopics = topics.MoneyMarket;

const assetsTopics = topics.assets;

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
    const drizzle = useContext(DrizzleContext);
    const dispatch = useDispatch();

    const walletConnected = useSelector(isWalletConnected); // Kind of useless to use here but won't hurt (hopefully)
    const userWalletAddress = useSelector(walletAddress);
    const currentNetworkName = useSelector(walletNetworkName);

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

        const watchMoneyMarketLogs = () => {
            const options = {
                address: addressMap[currentNetworkName].address_MoneyMarket,
                //topics: ['0x12345...']
            };

            watchers.MoneyMarket = drizzle.web3.eth.subscribe(
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
                            topic === moneyMarketTopics.repayBorrow
                        ) {
                            // @dev https://web3js.readthedocs.io/en/v1.2.7/web3-eth-abi.html#id18
                            // console.log(
                            //     "Tx topic matched Deposit/Borrow/Withdraw/Repay"
                            // );

                            // decode the transaction data byte code so it's readable
                            let result = drizzle.web3.eth.abi.decodeLog(
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
                                    addressMap[currentNetworkName];

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
                                                transactionResolved({
                                                    txHash: tx.transactionHash,
                                                    assetUnit,
                                                    type: resultType,
                                                })
                                            );

                                            triggerToastDisplay({
                                                toastMessageVariant: "success",
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
                            }
                        }
                    });
                }
            );
        };

        const watchAssetLogs = (assetSymbol) => {
            const options = {
                address:
                    addressMap[currentNetworkName][`address_${assetSymbol}`],
                // topics: assetsTopicsToWatch
            };

            watchers[assetSymbol] = drizzle.web3.eth.subscribe(
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

                            drizzle.web3.eth
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
                                                        txHash:
                                                            tx.transactionHash,
                                                        assetSymbol,
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
            currentNetworkName != null
        ) {
            clearWatchers(watchers);

            watchMoneyMarketLogs();
            watchAssetLogs("USDC");
            watchAssetLogs("WBTC");
            watchAssetLogs("WETH");
            watchAssetLogs("DAI");
        }

        return () => {
            clearWatchers(watchers);
        };
    }, [
        userWalletAddress,
        currentNetworkName,
        walletConnected,
        drizzle,
        dispatch,
    ]);
};
