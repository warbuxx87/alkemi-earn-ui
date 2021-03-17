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
    repay: "0x550e7e464126359c6adc43831f011682856b177df6c49c0af6675dd2a063649d",
    liquidate:
        "0x0938b1e79e1fd5816573487e5bd6a1e1329ec26f94f401a7b49d4b71d479657a",
    failure:
        "0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0",
};

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

const messagePerType = {
    supply: "Supply Received",
    borrow: "Borrow Taken",
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
        let watcher;

        const watchEth = () => {
            const options = {
                address: addressMap[currentNetworkName].address_MoneyMarket,
            };

            watcher = drizzle.web3.eth.subscribe(
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
                        console.log("Found tx with this topic " + topic);
                        // If the Transaction Topic is supply / withdraw / borrow / repay
                        if (
                            topic === topics.supply ||
                            topic === topics.withdraw ||
                            topic === topics.borrow ||
                            topic === topics.repay
                        ) {
                            // @dev https://web3js.readthedocs.io/en/v1.2.7/web3-eth-abi.html#id18
                            console.log(
                                "Tx topic matched Deposit/Borrow/Withdraw/Repay"
                            );

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

        if (
            walletConnected &&
            userWalletAddress !== undefined &&
            userWalletAddress != null &&
            currentNetworkName !== undefined &&
            currentNetworkName != null
        ) {
            watchEth();
        }

        return () => {
            if (watcher) watcher.unsubscribe();
        };
    }, [
        userWalletAddress,
        currentNetworkName,
        walletConnected,
        drizzle,
        dispatch,
    ]);
};
