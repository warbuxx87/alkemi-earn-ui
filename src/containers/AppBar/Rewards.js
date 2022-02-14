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

// Section 3: Selectors
import { walletClaimableALKRewards } from "redux/selectors/data/rewards";

import { walletAddress, walletNetwork } from "redux/selectors/data/onboard";

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

    const currentPool = useSelector(getPool);

    const txs = useSelector(getTransactions);

    const [isProcessing, setIsProcessing] = React.useState(false);
    const [claimableALKRewardUSD, setClaimableALKRewardUSD] =
        React.useState("0.00");

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
            isDoingAction={isProcessing}
            claimableALKRewardUSD={claimableALKRewardUSD}
        />
    );
};

// Export
export default RewardsContainer;
