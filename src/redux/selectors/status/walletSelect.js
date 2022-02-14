export const showWallet = (state) => {
    return state.status.walletSelect.showWalletModal;
};

export const getSelectedWallet = (state) => {
    return state.status.walletSelect.selectedWallet;
};

export const isActivating = (state) => {
    return state.status.walletSelect.activating;
};

export const isActivated = (state) => {
    return state.status.walletSelect.activated;
};

export const isAskingToConnect = (state) => {
    return state.status.walletSelect.askToConnect;
};

export const getLastSelectedWallet = (state) => {
    return state.status.walletSelect.lastSelectedWallet;
};
