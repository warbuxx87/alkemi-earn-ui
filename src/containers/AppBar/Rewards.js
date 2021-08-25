// Alk reward Container

// Section 1: React low level imports
import React, { useContext } from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import { bigNumberToLocale } from "utils/ui";
import DrizzleContext from "utils/DrizzleContext";

// Section 3: Selectors
import {
    walletClaimableALKRewards,
    walletBalanceOfALKTokens,
} from "redux/selectors/data/rewards";

import { walletAddress } from "redux/selectors/data/onboard";

// Section 4: components
import Rewards from "components/AppBar/Rewards";
import { handle_claim_ALK_click } from "utils/drizzle";

// Section 5: Code Container
const RewardsContainer = () => {
    const drizzle = useContext(DrizzleContext);

    const claimableALKReward = useSelector(walletClaimableALKRewards);
    const balanceOfALKTokens = useSelector(walletBalanceOfALKTokens);

    const userWalletAddress = useSelector(walletAddress);

    const onClaimALK = () => {
        handle_claim_ALK_click({
            drizzle,
            userWalletAddress,
        });
    };
    // TODO: format balanceOf to account for 18 decimals
    return (
        <Rewards
            claimableALKReward={bigNumberToLocale(claimableALKReward)}
            balanceOfALKTokens={bigNumberToLocale(balanceOfALKTokens)}
            onClaimALK={onClaimALK}
        />
    );
};

// Export
export default RewardsContainer;
