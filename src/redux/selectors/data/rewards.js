// Gets reward control data and values
// Libs
import _ from "lodash";

export const walletAlkReward = (state) => {
    const getAlkAccrued = Object.values(
        _.get(state, "contracts.RewardControl.getAlkAccrued", {})
    );

    if (getAlkAccrued[0]) {
        const reward = getAlkAccrued[0].value ? getAlkAccrued[0].value : 0;
        return reward;
    }
    return 0;
};
