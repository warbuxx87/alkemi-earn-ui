import Big from "big.js";

// Stats Selectors
export const getMarkets = (state) => state.data.markets.marketsData;
export const getSupplyArray = (state) => state.data.markets.supplyArray;
export const getBorrowArray = (state) => state.data.markets.borrowArray;
export const getCalculationsTotals = (state) =>
    state.data.markets.calculationsTotals;
export const getTxPending = (state) => state.data.markets.pending;
export const getTxError = (state) => state.data.markets.error;

export const getAlkApyPerMarket = (state) => {
    const marketData = state.data.markets.marketsData;
    const alkPrice = state.data.rewards.alkPrice;

    const alkApyPerMarket = {};
    marketData.forEach((market) => {
        // alkRewardsAPY = (2102400 * rateRewards * alkPrice) / grossSupply
        let bigGrossSupply = Big(
            market.grossSupplyUSD ? market.grossSupplyUSD : 1
        );
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
