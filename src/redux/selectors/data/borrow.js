// Libs
import { createSelector } from "reselect";
import _ from "lodash";
import address from "constants/address_map.json";
import { walletNetworkName } from "redux/selectors/data/onboard";
import { getMarketLiquidity } from "redux/selectors/data/totalBalance";
import web3 from "web3";
import Big from "big.js";

// Helpers
function calculateInterest(rateMantissa) {
    const total_blocks_per_year = (3600 * 24 * 365) / 15;
    let rateAPY = (rateMantissa * total_blocks_per_year) / 1e18;
    return rateAPY;
}

function calculateUtilization(totalBorrow, totalSupply) {
    const utilization = totalBorrow / totalSupply;

    return utilization;
}

const getAllowances = (state) => {
    const allowances = {};
    Object.keys(state.contracts).forEach((asset) => {
        if (asset !== "MoneyMarket") {
            const allowance = Object.values(state.contracts[asset].allowance);
            allowances[asset] = _.get(allowance, "[0].value", "0") !== "0";
        }
    });
    return allowances;
};

const getUtilizationValues = (state) => {
    const utilizationRates = {};
    Object.values(_.get(state, "contracts.MoneyMarket.markets", {})).forEach(
        (market) => {
            if (
                market.args[0] !== undefined &&
                market.value[6] !== undefined &&
                market.value[3] !== undefined
            )
                return (utilizationRates[market.args[0]] = calculateUtilization(
                    market.value[6],
                    market.value[3]
                ));
        }
    );
    return utilizationRates;
};

const getAssetPrices = (state) => {
    const assetPrices = {};
    Object.values(
        _.get(state, "contracts.MoneyMarket.assetPrices", {})
    ).forEach((asset) => (assetPrices[asset.args[0]] = asset.value));
    return assetPrices;
};

const getAccountLiquidity = (state) => {
    const accountLiquidity = Object.values(
        _.get(state, "contracts.MoneyMarket.getAccountLiquidity", {})
    );
    if (accountLiquidity[0]) {
        //console.log(" Account Liquidity", accountLiquidity[0].value);
        return _.get(accountLiquidity, "[0].value");
    }
    return null;
};

export const getCollateralRatio = (state) => {
    const collateralRatio = _.get(
        state,
        "contracts.MoneyMarket.collateralRatio"
    );
    if (collateralRatio["0x0"]) {
        //console.log("collateralRatio", collateralRatio["0x0"].value);
        return _.get(collateralRatio, "['0x0'].value");
    }
    return null;
};

export const getOriginationFee = (state) => {
    const originationFee = _.get(state, "contracts.MoneyMarket.originationFee");
    if (originationFee["0x0"]) {
        return _.get(originationFee, "['0x0'].value");
    }
    return null;
};

// Borrow Selectors
export const getBorrowAccountValue = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[2]");
    }
    return null;
};

const borrowAssetSelector = (state) => state.data.borrow.assets;

const borrowBalanceSelector = (state) => {
    const borrowBalance = {};
    Object.values(
        _.get(state, "contracts.MoneyMarket.getBorrowBalance", {})
    ).forEach((balance) => (borrowBalance[balance.args[1]] = balance.value));
    return borrowBalance;
};

const borrowAPYSelector = (state) => {
    const borrowAPY = {};

    try {
        Object.values(
            _.get(state, "contracts.MoneyMarket.markets", {})
        ).forEach(
            (apy) =>
                (borrowAPY[apy.args[0]] = calculateInterest(
                    apy.value.borrowRateMantissa
                ))
        );
    } catch (e) {}

    return borrowAPY;
};

const borrowPrincipalSelector = (state) => {
    const borrowPrincipal = {};

    try {
        Object.values(
            _.get(state, "contracts.MoneyMarket.borrowBalances", {})
        ).forEach(
            (loan) => (borrowPrincipal[loan.args[1]] = loan.value.principal)
        );
    } catch (e) {}
    return borrowPrincipal;
};

// Create Borrow Selectors

const getBorrowAsset = createSelector(
    (state) => borrowAssetSelector(state),
    (state) => walletNetworkName(state),
    (state) => borrowBalanceSelector(state),
    (state) => borrowAPYSelector(state),
    (state) => borrowPrincipalSelector(state),
    (state) => getUtilizationValues(state),
    (state) => getAssetPrices(state),
    (state) => getAccountLiquidity(state),
    (state) => getBorrowAccountValue(state),
    (state) => getMarketLiquidity(state),
    (state) => getCollateralRatio(state),
    (state) => getOriginationFee(state),
    (
        assets,
        network,
        borrowBalances,
        borrowAPY,
        borrowPrincipal,
        marketUtilization,
        assetPrices,
        accountLiquidity,
        accountTotalBorrow,
        marketLiquidity,
        collateralRatio,
        originationFee
    ) =>
        Object.values(assets).map((asset) => {
            let balance = "0";
            let ethBalance = "0";
            let weight = "0";
            let apy = "0";
            let principal = "0";
            let utilization = "0";
            let price = "0";
            let USDprice = "0";
            let maxBorrowToken = "0";
            let safeBorrowToken = "0";
            let totalBorrowed = "0";
            let liquidity = "0";
            if (network && address[network]) {
                const token_address = address[network][`address_${asset.unit}`];
                balance = borrowBalances[token_address] || "0";
                apy = borrowAPY[token_address] || "0";
                principal = borrowPrincipal[token_address] || "0";
                utilization = marketUtilization[token_address] || "0";
                price = assetPrices[token_address] || "0";
                totalBorrowed = accountTotalBorrow || "0";
                liquidity = marketLiquidity[token_address] || "0";
                ethBalance = web3.utils
                    .toBN(balance)
                    .mul(web3.utils.toBN(price))
                    .toString();
                weight = (
                    ethBalance / web3.utils.fromWei(totalBorrowed)
                ).toString();

                // Replaced now with address_USDC
                USDprice = assetPrices[address[network][`address_USDC`]] || "0";
            }

            if (network && accountLiquidity && price && price > 0) {
                let mantissaPrice;
                switch (asset.unit) {
                    case "USDC":
                        mantissaPrice = price / 1e12;
                        break;
                    case "WBTC":
                        mantissaPrice = price / 1e10;
                        break;
                    default:
                        mantissaPrice = price;
                }

                let maxBorrowTokenBig = Big(accountLiquidity); // Amount of User Liquidity in ETH scaled by 10e18
                maxBorrowTokenBig = maxBorrowTokenBig.div(
                    mantissaPrice.toString()
                ); // Liquidity ETH Amount divided Amount of tokens for 1 Eth

                let maxBorrowRate = 0.7999; // default value set to 0.7999
                if (collateralRatio != null && originationFee !== null) {
                    // collateralRatio / 1e18 = x ( ex 1.25 or 125%)
                    let collateralRatioBig = Big(collateralRatio);
                    collateralRatioBig = collateralRatioBig.div(1e18); // x

                    // originationFee / 1e18 = y (ex .001 or .1%)
                    let originationFeeBig = Big(originationFee);
                    originationFeeBig = originationFeeBig.div(1e18); // y

                    // 1/x = loanToValue  ( ex .8 or 80% )
                    let loanToValueBig = Big(1);
                    loanToValueBig = loanToValueBig.div(collateralRatioBig);

                    // multiplier = loanToValue - y
                    let multiplierBig = loanToValueBig;
                    multiplierBig = multiplierBig.sub(originationFeeBig);

                    maxBorrowRate = parseFloat(multiplierBig.toString());
                }

                maxBorrowTokenBig = maxBorrowTokenBig.times(maxBorrowRate); // Maximum Borrow Amount with collateralRatio & Origination Fee factored

                switch (asset.unit) {
                    case "WBTC":
                        maxBorrowToken = maxBorrowTokenBig.toFixed(8);
                        break;
                    case "USDC":
                        maxBorrowToken = maxBorrowTokenBig.toFixed(6);
                        break;
                    default:
                        maxBorrowToken = maxBorrowTokenBig.toFixed(18);
                }

                let safeBorrowTokenBig = Big(maxBorrowToken);
                safeBorrowTokenBig = safeBorrowTokenBig.times(0.8);

                safeBorrowToken = safeBorrowTokenBig.toString();
            }

            return {
                ...asset,
                balance,
                ethBalance,
                apy,
                weight,
                principal,
                utilization,
                price,
                USDprice,
                maxBorrowToken,
                safeBorrowToken,
                liquidity,
            };
        })
);

export const getBorrowActive = createSelector(getBorrowAsset, (assets) =>
    assets.filter((asset) => asset.balance !== "0")
);

export const getBorrowInactive = createSelector(
    getBorrowAsset,
    getAllowances,
    (assets, allowances) =>
        assets
            .filter((asset) => asset.balance === "0")
            .map((asset) => {
                asset.activated = allowances[asset.unit] || false;
                return asset;
            })
);

export const getBorrowError = (state) => state.data.borrow.error;

export const getAggregatedBorrowAPY = createSelector(
    getBorrowActive,
    walletNetworkName,
    (activeAssets, network) => {
        let totalAPY = 0;
        if (network) {
            // checks that web3 wallet is connected
            activeAssets.forEach(function (asset) {
                totalAPY += asset.weight * asset.apy;
                totalAPY = parseInt(totalAPY);
            });
        }

        if (isFinite(totalAPY)) {
            totalAPY = web3.utils.fromWei(totalAPY.toString()); // formats for WEI to decimal
        }

        return totalAPY.toString();
    }
);
