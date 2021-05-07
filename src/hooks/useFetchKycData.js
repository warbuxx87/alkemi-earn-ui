import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import { walletNetworkName } from "redux/selectors/data/onboard";

import { getAuth } from "redux/selectors/status/auth";
import { restoreAuthData } from "redux/actions/status/auth";
import {
    setKycApplications,
    setPreviouslyKycdWallets,
} from "redux/actions/data/kyc";

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

                        dispatch(setPreviouslyKycdWallets(obj_data.data.res));
                    }
                });
        };

        getPreviouslyKycdWallets();

        return () => {};
    }, [dispatch, currentNetworkName, authList]);

    return {};
};

export default useFetchKycData;
