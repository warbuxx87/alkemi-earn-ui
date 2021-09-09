// Gets reward control data and values (+ ALK token)
// Libs
import _ from "lodash";

// not used for now
// export const walletAlkReward = (state) => {
//     const getAlkAccrued = Object.values(
//         _.get(state, "contracts.RewardControl.getAlkAccrued", {})
//     );

//     if (getAlkAccrued[0]) {
//         const reward = getAlkAccrued[0].value ? getAlkAccrued[0].value : 0;
//         return reward;
//     }
//     return 0;
// };

export const walletClaimableALKRewards = (state) => {
    const getAlkRewards = Object.values(
        _.get(state, "contracts.RewardControl.getAlkRewards", {})
    );

    if (getAlkRewards[0]) {
        const reward = getAlkRewards[0].value ? getAlkRewards[0].value : "0";
        return reward;
    }
    return 0;
};

// get users current balance of ALK tokens, not used for now
// export const walletBalanceOfALKTokens = (state) => {
//     const balanceOf = Object.values(
//         _.get(state, "contracts.ALKToken.balanceOf", {})
//     );

//     if (balanceOf[0]) {
//         const reward = balanceOf[0].value ? balanceOf[0].value : "0";
//         return reward;
//     }
//     return 0;
// };
