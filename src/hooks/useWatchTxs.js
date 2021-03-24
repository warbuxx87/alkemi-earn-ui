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

// TODO move constants to config files + TODO: use the same naming
const topics = {
    supply:
        "0x4ea5606ff36959d6c1a24f693661d800a98dd80c0fb8469a665d2ec7e8313c21",
    withdraw:
        "0x56559a17e3aa8ea4b05036eaf31aeaf9fb71fc1b8865b6389647639940bed030",
    borrow:
        "0x6b69190ebbb96f162b04dc222ef96416f9dca9a415b6dd183c79424501113e18",
    repayBorrow:
        "0x550e7e464126359c6adc43831f011682856b177df6c49c0af6675dd2a063649d",
    liquidate:
        "0x0938b1e79e1fd5816573487e5bd6a1e1329ec26f94f401a7b49d4b71d479657a",
    failure:
        "0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0",
}; // TODO, manage token approvals example: https://rinkeby.etherscan.io/tx/0x32105e1747a31da8e35bbb115a3bb01223bddb04d758340218300d8e7c7aa2eb#eventlog

const assetsTopics = {
    approve:
        "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
    allocateTo:
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
};

// TODO: filter by this
// const assetsTopicsToWatch = [
//     "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
//     "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
// ]

// define data structure
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
// define data structure
// const assetsContractInputApprove = {
//     DAI: [
//         { "name": "guy", "type": "address" },
//         { "name": "wad", "type": "uint256" }
//     ],
//     WETH: [
//         { "name": "guy", "type": "address" },
//         { "name": "wad", "type": "uint256" }
//     ],
//     USDC: [
//         { "name": "_spender", "type": "address" },
//         { "name": "_value", "type": "uint256" }
//     ],
//     WBTC: [
//         { "name": "_spender", "type": "address" },
//         { "name": "_value", "type": "uint256" }
//     ]
// };

const messagePerType = {
    supply: "Supply Received",
    borrow: "Borrow Taken",
    withdraw: "Supply Withdrawn",
    repayBorrow: "Borrow Repaid",

    liquidate: "Borrow Liquidated",

    approve: "Asset Authorized", // activate
    allocateTo: "Tokens Minted", // test network only
};

function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => {
        return object[key].toLowerCase() === value.toLowerCase();
    });
}

// Retrieve the user's wallet ether balance every 30 seconds
export default () => {
    const drizzle = useContext(DrizzleContext);
    const dispatch = useDispatch();

    const walletConnected = useSelector(isWalletConnected); // Kind of useless to use here but won't hurt (hopefully)
    const userWalletAddress = useSelector(walletAddress);
    const currentNetworkName = useSelector(walletNetworkName);

    useEffect(() => {
        let watcher = {};

        const watchMoneyMarketLogs = () => {
            const options = {
                address: addressMap[currentNetworkName].address_MoneyMarket,
                //topics: ['0x12345...']
            };

            watcher.MoneyMarket = drizzle.web3.eth.subscribe(
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
                            topic === topics.supply ||
                            topic === topics.withdraw ||
                            topic === topics.borrow ||
                            topic === topics.repayBorrow
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
                                        topics,
                                        topic
                                    );

                                    if (
                                        resultType !== undefined &&
                                        resultType != null
                                    ) {
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
                                                    resultType ||
                                                        "Consult the transaction hash"
                                                ],
                                            currentNetworkName,
                                            txHash: tx.transactionHash,
                                        });
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

            watcher[assetSymbol] = drizzle.web3.eth.subscribe(
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
                            console.log("Tx topic matched allocateTo/approve");

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
                                            dispatch(
                                                transactionResolved({
                                                    txHash: tx.transactionHash,
                                                    assetSymbol,
                                                    type: resultType,
                                                })
                                            );

                                            triggerToastDisplay({
                                                toastMessageVariant: "success",
                                                displayMessage:
                                                    "Transaction Successful",
                                                displaySecondaryMessage:
                                                    messagePerType[
                                                        resultType ||
                                                            "Consult the transaction hash"
                                                    ],
                                                currentNetworkName,
                                                txHash: tx.transactionHash,
                                            });
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
            watchMoneyMarketLogs();
            watchAssetLogs("USDC");
            watchAssetLogs("WBTC");
            watchAssetLogs("WETH");
            watchAssetLogs("DAI");
        }

        return () => {
            if (watcher) {
                for (const key of Object.keys(watcher)) {
                    watcher[key].unsubscribe();
                }
            }
        };
    }, [
        userWalletAddress,
        currentNetworkName,
        walletConnected,
        drizzle,
        dispatch,
    ]);
};
