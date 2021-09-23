// Alk reward Container

// Section 1: React low level imports
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

// Section 2: internal imports
import {
    formatNumber,
    fromWei,
    multiplyBigNumbers,
    formatPriceWithCurrency,
} from "utils/ui";
import DrizzleContext from "utils/DrizzleContext";
import useFetchALKPrice from "hooks/useFetchALKPrice";

// Section 3: Selectors
import { walletClaimableALKRewards } from "redux/selectors/data/rewards";

import { walletAddress } from "redux/selectors/data/onboard";

import { getTransactions } from "redux/selectors/status/status";

// Section 4: components
import Rewards from "components/AppBar/Rewards";
import { onTx } from "redux/actions/status/transactions";

// Section 5: Code Container
const RewardsContainer = () => {
    const dispatch = useDispatch();

    const drizzle = useContext(DrizzleContext);

    const claimableALKReward = useSelector(walletClaimableALKRewards);

    const userWalletAddress = useSelector(walletAddress);

    const txs = useSelector(getTransactions);

    const [isProcessing, setIsProcessing] = React.useState(false);
    const [claimableALKRewardUSD, setClaimableALKRewardUSD] = React.useState(
        "0.00"
    );

    const { ALKUSDPrice } = useFetchALKPrice(true);

    React.useEffect(() => {
        const tx = Object.values(txs).filter((aTx) => {
            return (
                aTx.transactionLocalId === "ALK" &&
                aTx.type === "claim" &&
                aTx.processing === true
            );
        });

        if (tx && tx.length > 0) setIsProcessing(tx[0].processing);
        else setIsProcessing(false);
    }, [txs]);

    const onClaimALK = () => {
        dispatch(
            onTx({
                drizzle,
                userWalletAddress,
                asset: { unit: "ALK" },
                type: "claim",
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
