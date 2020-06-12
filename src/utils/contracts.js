import WETH_ABI from "contracts/WETH_ABI.json";
import DAI_ABI from "contracts/DAI_ABI.json";
import USDT_ABI from "contracts/USDT_ABI.json";
import USDC_ABI from "contracts/USDC_ABI.json";
import WBTC_ABI from "contracts/WBTC_ABI.json";
import PAX_ABI from "contracts/PAX_ABI.json";
import USDX_ABI from "contracts/USDX_ABI.json";
import market_ABI from "contracts/moneyMarket.json";

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
    USDx: USDX_ABI,
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
    drizzle.addContract({
        contractName: asset,
        web3Contract: tokenContract,
    });
    // get allowance
    tokenContract.methods.allowance.cacheCall(
        myAddress,
        address[network].address_mMarket
    );

    // get balance
    tokenContract.methods.balanceOf.cacheCall(myAddress);
    return drizzle.contracts[asset];
};

export const initMarketContract = ({ drizzle }) => {
    if (drizzle.contracts.mMarket) return drizzle.contracts.mMarket;
    const drizzleStore = drizzle.store.getState();
    const myAddress = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
    const address_mMarket = address[network].address_mMarket;
    const events = [
        "SupplyReceived",
        "SupplyWithdrawn",
        "BorrowTaken",
        "BorrowRepaid",
    ];
    if (!network) return; // drizzle not fetched
    if (!drizzle.web3.eth) return;
    const mMarketContract = new drizzle.web3.eth.Contract(
        market_ABI,
        address_mMarket
    );
    drizzle.addContract(
        {
            contractName: "mMarket",
            web3Contract: mMarketContract,
        },
        events
    );

    const assets = ["USDx", "DAI", "USDT", "USDC", "WBTC", "WETH", "PAX"];

    assets.forEach((asset) => {
        // get each asset Supply Balance (current )
        mMarketContract.methods.getSupplyBalance.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );

        // get each asset Borrow Balance (current )
        mMarketContract.methods.getBorrowBalance.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );

        // get each supplyBalances ( principle )
        mMarketContract.methods.supplyBalances.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );

        // get each borrowBalances ( principle )
        mMarketContract.methods.borrowBalances.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );

        // get each asset Price
        mMarketContract.methods.assetPrices.cacheCall(
            address[network][`address_${asset}`]
        );
        // get each market data
        mMarketContract.methods.markets.cacheCall(
            address[network][`address_${asset}`]
        );
    });

    // get account liquidity
    mMarketContract.methods.getAccountLiquidity.cacheCall(myAddress);

    // get account balance
    mMarketContract.methods.calculateAccountValues.cacheCall(myAddress);

    return drizzle.contracts.mMarket;
};
