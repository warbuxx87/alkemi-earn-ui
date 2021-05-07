import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import Web3 from "web3";

import { walletNetworkName } from "redux/selectors/data/onboard";

import { getAuth } from "redux/selectors/status/auth";
import { restoreAuthData } from "redux/actions/status/auth";
import {
    setKycApplications,
    setPreviouslyKycdWallet,
} from "redux/actions/data/kyc";

import address from "constants/address_map.json";
import MoneyMarket_ABI from "constants/ABI/MoneyMarket_ABI.json";

const url_map = require("constants/url_map.json");

// Retrieve the USD price every 15 seconds
const useFetchKycData = (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const authList = useSelector(getAuth);

    const currentNetworkName = useSelector(walletNetworkName);

    useEffect(() => {
        // move this async call to redux if needs to be called from more than one place
        const getKycApplicationsData = () => {
            let selectedNetworkName = currentNetworkName;
            if (!selectedNetworkName) selectedNetworkName = "main";

            if (
                !(
                    authList[currentNetworkName] &&
                    authList[currentNetworkName].accessToken &&
                    authList[currentNetworkName].isAdmin
                )
            )
                return;

            const kycapplications_api =
                url_map[currentNetworkName].kycapplications_url;

            const bodyData = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authList[currentNetworkName].accessToken,
                },
            };

            fetch(kycapplications_api, bodyData)
                .then((res) => {
                    return res.text();
                })
                .then((data) => {
                    if (data) {
                        let obj_data = JSON.parse(data);

                        if (obj_data.code && obj_data.code === 401) {
                            // TODO: display notification not signed in
                            dispatch(
                                restoreAuthData({
                                    ...authList,
                                    [currentNetworkName]: undefined,
                                })
                            ); // TODO: improve with selective reset action
                        }

                        dispatch(setKycApplications(obj_data));
                    }
                });
        };

        getKycApplicationsData();

        return () => {};
    }, [dispatch, currentNetworkName, authList]);

    useEffect(() => {
        // move this async call to redux if needs to be called from more than one place
        const getPreviouslyKycdWallets = () => {
            let selectedNetworkName = 0;
            if (!selectedNetworkName) selectedNetworkName = "main";

            if (
                !(
                    authList[currentNetworkName] &&
                    authList[currentNetworkName].accessToken &&
                    authList[currentNetworkName].isAdmin
                )
            )
                return;

            const checkkyc_api = url_map[currentNetworkName].checkkyc_url;

            const bodyData = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authList[currentNetworkName].accessToken,
                },
            };

            fetch(checkkyc_api, bodyData)
                .then((res) => {
                    return res.text();
                })
                .then((data) => {
                    if (data) {
                        let obj_data = JSON.parse(data);

                        if (obj_data.code && obj_data.code === 401) {
                            // TODO: display notification not signed in
                            dispatch(
                                restoreAuthData({
                                    ...authList,
                                    [currentNetworkName]: undefined,
                                })
                            ); // TODO: improve with selective reset action
                        }

                        if (
                            obj_data.data.res === undefined ||
                            obj_data.data.res == null ||
                            !Array.isArray(obj_data.data.res)
                        )
                            return; // TODO: no data/wrong endpoint handle properly

                        obj_data.data.res.forEach((wallet) => {
                            // const network = constants.network_type[currentNetworkName];

                            let provider = window.currentlyUsedProvider;
                            if (!provider) {
                                // TODO: improve
                                provider = window.ethereum;
                            }

                            const web3 = new Web3(provider); // could be replaced by window.currentlyUsedProvider

                            const address_MoneyMarket =
                                address[currentNetworkName].address_MoneyMarket;

                            const MoneyMarketContract = new web3.eth.Contract(
                                MoneyMarket_ABI,
                                address_MoneyMarket
                            );

                            MoneyMarketContract.methods
                                .verifyKYC(wallet)
                                .call()
                                .then((res) => {
                                    dispatch(
                                        setPreviouslyKycdWallet({
                                            address: wallet,
                                            kycStatus: res,
                                        })
                                    );
                                });
                        });
                    }
                });
        };

        getPreviouslyKycdWallets();

        return () => {};
    }, [dispatch, currentNetworkName, authList]);

    return {};
};

export default useFetchKycData;
