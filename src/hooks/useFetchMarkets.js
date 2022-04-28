import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import { walletNetworkName } from "redux/selectors/data/onboard";

import {
    fetchMarketsCall,
    processMarketsData,
} from "redux/actions/data/markets";

import { getMarketsRawData } from "redux/selectors/data/markets";

import {
    sumUpTwoNumbers,
    sumUpTwoNumbers2,
    multiplyTwoNumbers,
    divideTwoNumbers,
    subUpTwoNumbers2,
} from "utils/ui";

// Retrieve the USD price every 15 seconds
const useFetchMarkets = (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(walletNetworkName);

    const marketsRawData = useSelector(getMarketsRawData);

    useEffect(() => {
        let timer;

        // move this async call to redux if needs to be called from more than one place
        const get_markets_data = () => {
            // We retrieve data for both pools
            fetchMarketsCall({
                currentNetworkName,
                poolToRetrieve: "permissioned",
                dispatch,
            });

            fetchMarketsCall({
                currentNetworkName,
                poolToRetrieve: "open",
                dispatch,
            });
        };

        const getMarketsData = (fetchPeriodically) => {
            if (currentNetworkName !== undefined) get_markets_data();

            if (fetchPeriodically === true) {
                timer = setTimeout(
                    () => getMarketsData(fetchPeriodically),
                    30 * 1000
                );
            }
        };

        if (currentNetworkName !== undefined) getMarketsData(fetchPeriodically);

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [dispatch, fetchPeriodically, currentNetworkName]);

    useEffect(() => {
        const mergeMarketsRawData = (marketsRawData) => {
            const permissionedData = marketsRawData.permissioned;
            const openData = marketsRawData.open;

            const arr_items_permissioned = permissionedData.map((market) => {
                let key_items = Object.values(market);

                let asset = key_items[0];

                return asset;
            });

            const arr_items_open = openData.map((market) => {
                // hidden tokens are not filtered here
                let key_items = Object.values(market);

                let asset = key_items[0];

                return asset;
            });

            const combinedData = arr_items_permissioned.map((element) => {
                const mergedObject = _.cloneDeep(element); // we start from permissioned data // Might be an issue if there is no verified data for a coin but there is for open

                let openTokensData = arr_items_open.find((oTData) => {
                    return oTData.symbol === element.symbol;
                });

                if (openTokensData) {
                    // if exists in case filtered above
                    // balance
                    mergedObject.balance = sumUpTwoNumbers(
                        mergedObject.balance,
                        openTokensData.balance,
                        parseInt(mergedObject.decimals, 10)
                    );

                    // rateRewards
                    mergedObject.rateRewards = sumUpTwoNumbers2(
                        mergedObject.rateRewards,
                        openTokensData.rateRewards
                    );

                    // Totals
                    const totalSupply = sumUpTwoNumbers2(
                        element.totalSupply,
                        openTokensData.totalSupply
                    );
                    const totalBorrow = sumUpTwoNumbers2(
                        mergedObject.totalBorrow,
                        openTokensData.totalBorrow
                    );
                    const totalGrossSupply = sumUpTwoNumbers2(
                        mergedObject.grossSupply,
                        openTokensData.grossSupply
                    );

                    // supplyAPR
                    let verifiedWeightedSupplyAPR = multiplyTwoNumbers(
                        element.supplyAPR,
                        divideTwoNumbers(element.totalSupply, totalSupply)
                    );
                    let openWeightedSupplyAPR = multiplyTwoNumbers(
                        openTokensData.supplyAPR,
                        divideTwoNumbers(
                            openTokensData.totalSupply,
                            totalSupply
                        )
                    );

                    mergedObject.supplyAPR = sumUpTwoNumbers2(
                        verifiedWeightedSupplyAPR,
                        openWeightedSupplyAPR
                    );

                    // borrowAPR
                    let verifiedWeightedBorrowAPR = multiplyTwoNumbers(
                        element.borrowAPR,
                        divideTwoNumbers(element.totalBorrow, totalBorrow)
                    );
                    let openWeightedBorrowAPR = multiplyTwoNumbers(
                        openTokensData.borrowAPR,
                        divideTwoNumbers(
                            openTokensData.totalBorrow,
                            totalBorrow
                        )
                    );

                    mergedObject.borrowAPR = sumUpTwoNumbers2(
                        verifiedWeightedBorrowAPR,
                        openWeightedBorrowAPR
                    );

                    // alkRewardsAPY
                    let verifiedWeightedAlkRewardsAPY = multiplyTwoNumbers(
                        element.alkRewardsAPY,
                        divideTwoNumbers(element.grossSupply, totalGrossSupply)
                    );
                    let openWeightedAlkRewardsAPY = multiplyTwoNumbers(
                        openTokensData.alkRewardsAPY,
                        divideTwoNumbers(
                            openTokensData.grossSupply,
                            totalGrossSupply
                        )
                    );

                    mergedObject.alkRewardsAPY = sumUpTwoNumbers2(
                        verifiedWeightedAlkRewardsAPY,
                        openWeightedAlkRewardsAPY
                    );

                    // utilizationRate
                    const remainingBorrowVerified = subUpTwoNumbers2(
                        element.totalSupply,
                        element.totalBorrow
                    );
                    const remainingBorrowOpen = subUpTwoNumbers2(
                        openTokensData.totalSupply,
                        openTokensData.totalBorrow
                    );
                    const remainingBorrowTotal = sumUpTwoNumbers2(
                        remainingBorrowVerified,
                        remainingBorrowOpen
                    );

                    let verifiedWeightedUtilizationRate = multiplyTwoNumbers(
                        element.utilizationRate,
                        divideTwoNumbers(
                            remainingBorrowVerified,
                            remainingBorrowTotal
                        )
                    );
                    let openWeightedUtilizationRate = multiplyTwoNumbers(
                        openTokensData.utilizationRate,
                        divideTwoNumbers(
                            remainingBorrowOpen,
                            remainingBorrowTotal
                        )
                    );

                    mergedObject.utilizationRate = sumUpTwoNumbers2(
                        verifiedWeightedUtilizationRate,
                        openWeightedUtilizationRate
                    );

                    // setting totalBorrow
                    mergedObject.totalBorrow = totalBorrow;
                    mergedObject.totalBorrowUSD = sumUpTwoNumbers2(
                        mergedObject.totalBorrowUSD,
                        openTokensData.totalBorrowUSD
                    );

                    // setting totalSupply
                    mergedObject.totalSupply = totalSupply;
                    mergedObject.totalSupplyUSD = sumUpTwoNumbers2(
                        mergedObject.totalSupplyUSD,
                        openTokensData.totalSupplyUSD
                    );

                    // setting grossSupply
                    mergedObject.grossSupply = totalGrossSupply;
                    mergedObject.grossSupplyUSD = sumUpTwoNumbers2(
                        mergedObject.grossSupplyUSD,
                        openTokensData.grossSupplyUSD
                    );
                }

                return mergedObject;
            });

            const resultData = combinedData.map((market) => {
                return {
                    [market.address]: {
                        ...market,
                    },
                };
            });

            return resultData;
        };

        if (marketsRawData.open && marketsRawData.permissioned) {
            const mergedData = mergeMarketsRawData(marketsRawData);

            processMarketsData({
                obj_data: mergedData,
                dispatch,
            });
        }
    }, [
        dispatch,
        marketsRawData,
        marketsRawData.open,
        marketsRawData.permissioned,
    ]);
};

export default useFetchMarkets;
