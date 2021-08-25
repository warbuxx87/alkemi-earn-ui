// Alk reward Container

// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import { bigNumberToLocale } from "utils/ui";

// Section 3: Selectors
import {
    walletClaimableALKRewards,
    walletBalanceOfALKTokens,
} from "redux/selectors/data/rewards";

// Section 4: components
import Rewards from "components/AppBar/Rewards";

// Section 5: Code Container
const RewardsContainer = () => {
    const claimableALKReward = useSelector(walletClaimableALKRewards);
    const balanceOfALKTokens = useSelector(walletBalanceOfALKTokens);

    // TODO: format balanceOf to account for 18 decimals
    return (
        <Rewards
            claimableALKReward={bigNumberToLocale(claimableALKReward)}
            balanceOfALKTokens={bigNumberToLocale(balanceOfALKTokens)}
        />
    );
};

// Export
export default RewardsContainer;
