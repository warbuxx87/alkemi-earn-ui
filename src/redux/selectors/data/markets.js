import Big from "big.js";
import { getPool } from "../status/pool";
import { getAlkPrice } from "./rewards";

// Stats Selectors

const getMarketsStoreData = (state, dataName, pool) => {
    let targetPool = pool;
    if (!targetPool) targetPool = getPool(state);

    const resultData = state.data.markets[targetPool][dataName];

    return resultData;
};

export const getMarkets = (pool) => (state) => {
    return getMarketsStoreData(state, "marketsData", pool);
};

// retrieve server data for each pool
export const getMarketsRawData = (state) => {
    return {
        open: state.data.markets.open.rawData,
        permissioned: state.data.markets.permissioned.rawData,
        combined: state.data.markets.combined.rawData,
    };
};

export const getSupplyArray = (pool) => (state) =>
    getMarketsStoreData(state, "supplyArray", pool);
export const getBorrowArray = (pool) => (state) =>
    getMarketsStoreData(state, "borrowArray", pool);
export const getCalculationsTotals = (pool) => (state) =>
    state.data.markets[pool].calculationsTotals;
export const getTxPending = (pool) => (state) =>
    getMarketsStoreData(state, "pending", pool);
export const getTxError = (pool) => (state) =>
    getMarketsStoreData(state, "error", pool);

export const getAlkApyPerMarket = (pool) => (state) => {
    const marketData = getMarketsStoreData(state, "marketsData", pool);
    const alkPrice = getAlkPrice(state);

    const alkApyPerMarket = {};
    marketData.forEach((market) => {
        // alkRewardsAPY = (2102400 * rateRewards * alkPrice) / grossSupply
        let bigGrossSupply = Big(
            market.grossSupplyUSD ? market.grossSupplyUSD : 1
        );
        if (bigGrossSupply.eq(Big(0))) bigGrossSupply = Big(1);

        let bigRateRewards = Big(market.rateRewards ? market.rateRewards : 0);
        let bigAlkPrice = Big(alkPrice ? alkPrice : 0);

        const alkRewardsAPY = Big(2371128)
            .times(bigRateRewards)
            .times(bigAlkPrice)
            .div(bigGrossSupply);

        alkApyPerMarket[market.symbol] = alkRewardsAPY.times(100).toFixed(2);
    });

    return alkApyPerMarket;
};
