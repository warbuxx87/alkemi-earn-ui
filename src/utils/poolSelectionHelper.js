import address from "constants/address_map.json";

export const getAddressMoneyMarketByPool = (currentPool, network) => {
    if (currentPool === "open") {
        return address[network].address_open_MoneyMarket;
    } else if (currentPool === "open_1_5") {
        return address[network].address_open_MoneyMarket_1_5;
    } else if (currentPool === "permissioned_1_5") {
        return address[network].address_MoneyMarket_1_5;
    } else {
        return address[network].address_MoneyMarket;
    }
};

export const getPoolName = (currentPool) => {
    if (currentPool === "open") {
        return "OPEN";
    } else if (currentPool === "open_1_5") {
        return "OPEN v1.5";
    } else if (currentPool === "permissioned_1_5") {
        return "VERIFIED v1.5";
    } else {
        return "VERIFIED";
    }
};

export const getAvailablePoolsByNetwork = (network) => {
    if (network === "rinkeby") {
        return [
            {
                id: "permissioned",
                name: "Verified Pool",
            },
            {
                id: "open",
                name: "Open Pool",
            },
            {
                id: "open_1_5",
                name: "NEW Open Pool V1.5",
            },
            {
                id: "permissioned_1_5",
                name: "NEW Verified Pool V1.5",
            },
        ];
    } else {
        return [
            {
                id: "permissioned",
                name: "Verified Pool",
            },
            {
                id: "open",
                name: "Open Pool",
            },
        ];
    }
};
