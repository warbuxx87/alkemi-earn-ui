// Alk reward Container

// Section 1: React low level imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Section 2: internal imports
import {
    formatNumber,
    fromWei,
    multiplyBigNumbers,
    formatPriceWithCurrency,
} from "utils/ui";

import useFetchALKPrice from "hooks/useFetchALKPrice";

import useWalletSelect from "hooks/useWalletSelect";

import address from "constants/address_map.json";

import { getProviderName } from "utils/web3Helpers";

// Section 3: Selectors
import { walletClaimableALKRewards } from "redux/selectors/data/rewards";

import {
    walletAddress,
    walletNetwork,
    walletNetworkName,
} from "redux/selectors/data/onboard";

import { getTransactions } from "redux/selectors/status/status";

import { getAlkPrice } from "redux/selectors/data/rewards";

import { getPool } from "redux/selectors/status/pool";

// Section 4: components
import Rewards from "components/AppBar/Rewards";
import { onTx } from "redux/actions/status/transactions";

// Section 5: Code Container
const RewardsContainer = () => {
    const dispatch = useDispatch();

    const { library } = useWalletSelect();

    useFetchALKPrice();
    const ALKUSDPrice = useSelector(getAlkPrice);

    const claimableALKReward = useSelector(walletClaimableALKRewards);

    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);
    const currentNetworkName = useSelector(walletNetworkName);

    const currentPool = useSelector(getPool);

    const txs = useSelector(getTransactions);

    const [isProcessing, setIsProcessing] = React.useState(false);
    const [claimableALKRewardUSD, setClaimableALKRewardUSD] =
        React.useState("0.00");

    const walletName = getProviderName(library.provider);

    React.useEffect(() => {
        const tx = Object.values(txs).filter((aTx) => {
            return (
                aTx.assetUnit === "ALK" &&
                aTx.type === "claimAlk" &&
                aTx.processing === true
            );
        });

        if (tx && tx.length > 0) setIsProcessing(tx[0].processing);
        else setIsProcessing(false);
    }, [txs]);

    const onClaimALK = () => {
        dispatch(
            onTx({
                userWalletAddress,
                asset: { unit: "ALK" },
                type: "claimAlk",
                userWalletNetwork,
                currentPool,
                library,
            })
        );
    };

    const onAddTokenToMetamask = async () => {
        const tokenAddress = address[currentNetworkName][`address_ALK_TOKEN`];
        const tokenSymbol = "ALK";
        const tokenDecimals = 18;
        const tokenImage = "https://i.ibb.co/18tHFzV/snap1.png";

        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown. (reality is nothing is thrown it seems, so no way to show a spinner)
            const wasAdded = await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20", // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                // console.log('Thanks for your interest!');
            } else {
                // console.log('Your loss!');
            }
        } catch (error) {
            // console.log(error);
        }
    };

    React.useEffect(() => {
        if (claimableALKReward && ALKUSDPrice) {
            const claimableALKRewardNumber = fromWei(claimableALKReward);
            const value = formatPriceWithCurrency(
                multiplyBigNumbers(ALKUSDPrice, claimableALKRewardNumber),
                "USD"
            );

            setClaimableALKRewardUSD(value);
        }
    }, [claimableALKReward, ALKUSDPrice]);

    return (
        <Rewards
            claimableALKReward={formatNumber(claimableALKReward, "ALK")}
            onClaimALK={onClaimALK}
            onAddTokenToMetamask={onAddTokenToMetamask}
            isDoingAction={isProcessing}
            claimableALKRewardUSD={claimableALKRewardUSD}
            displayAddToken={walletName === "MetaMask"}
        />
    );
};

// Export
export default RewardsContainer;
