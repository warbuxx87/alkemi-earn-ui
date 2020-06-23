import WETH_ABI from "constants/ABI/WETH_ABI.json";
import DAI_ABI from "constants/ABI/DAI_ABI.json";
import USDT_ABI from "constants/ABI/USDT_ABI.json";
import USDC_ABI from "constants/ABI/USDC_ABI.json";
import WBTC_ABI from "constants/ABI/WBTC_ABI.json";
import PAX_ABI from "constants/ABI/PAX_ABI.json";
import MoneyMarket_ABI from "constants/ABI/MoneyMarket_ABI.json";

import address from "constants/address_map.json";
import constants from "constants/constant.json";

const assets = ["PAX", "DAI", "USDT", "USDC", "WBTC", "WETH"];

const ABIs = {
    PAX: PAX_ABI,
    WETH: WETH_ABI,
    DAI: DAI_ABI,
    USDT: USDT_ABI,
    USDC: USDC_ABI,
    WBTC: WBTC_ABI,
};

export const initContracts = (drizzle) => {
    initMarketContract({ drizzle });
    assets.forEach((asset) => initAssetContract({ drizzle, asset }));
};

export const initAssetContract = ({ drizzle, asset }) => {
    if (drizzle.contracts[asset]) return drizzle.contracts[asset];
    const drizzleStore = drizzle.store.getState();
    const myAddress = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
    if (!drizzle.web3.eth) return;
    const tokenContract = new drizzle.web3.eth.Contract(
        ABIs[asset],
        address[network][`address_${asset}`]
    );
    // const events = ["Approval", "Transfer"];
    const events = [];
    drizzle.addContract(
        {
            contractName: asset,
            web3Contract: tokenContract,
        },
        events
    );
    // get allowance
    tokenContract.methods.allowance.cacheCall(
        myAddress,
        address[network].address_MoneyMarket
    );

    // get balance
    tokenContract.methods.balanceOf.cacheCall(myAddress);
    return drizzle.contracts[asset];
};

export const initMarketContract = ({ drizzle }) => {
    if (drizzle.contracts.MoneyMarket) return drizzle.contracts.MoneyMarket;
    const drizzleStore = drizzle.store.getState();
    const myAddress = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
    const assets = ["PAX", "DAI", "USDT", "USDC", "WBTC", "WETH"];
    if (!network) return; // drizzle not fetched
    if (!drizzle.web3.eth) return;
    const MoneyMarketContract = new drizzle.web3.eth.Contract(
        MoneyMarket_ABI,
        address[network][`address_MoneyMarket`]
    );
    drizzle.addContract({
        contractName: "MoneyMarket",
        web3Contract: MoneyMarketContract,
    });

    assets.forEach((asset) => {
        // get each asset Supply Balance (current )
        MoneyMarketContract.methods.getSupplyBalance.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );

        // get each asset Borrow Balance (current )
        MoneyMarketContract.methods.getBorrowBalance.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );

        // get each supplyBalances ( principle )
        MoneyMarketContract.methods.supplyBalances.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );

        // get each borrowBalances ( principle )
        MoneyMarketContract.methods.borrowBalances.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );

        // get each asset Price
        MoneyMarketContract.methods.assetPrices.cacheCall(
            address[network][`address_${asset}`]
        );
        // get each market data
        MoneyMarketContract.methods.markets.cacheCall(
            address[network][`address_${asset}`]
        );
    });

    // get account liquidity
    MoneyMarketContract.methods.getAccountLiquidity.cacheCall(myAddress);

    // get account balance
    MoneyMarketContract.methods.calculateAccountValues.cacheCall(myAddress);

    return drizzle.contracts.MoneyMarket;
};
