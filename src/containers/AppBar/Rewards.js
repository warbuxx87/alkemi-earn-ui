// Alk reward Container

// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import { bigNumberToLocale } from "utils/ui";

// Section 3: Selectors
import { walletAlkReward } from "redux/selectors/data/rewards";

// Section 4: components
import Rewards from "components/AppBar/Rewards";

// Section 5: Code Container
const RewardsContainer = () => {
    const alkReward = useSelector(walletAlkReward);

    return <Rewards alkReward={bigNumberToLocale(alkReward)} />;
};

// Export
export default RewardsContainer;
