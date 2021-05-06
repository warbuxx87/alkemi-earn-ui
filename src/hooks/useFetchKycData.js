import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import { walletNetworkName } from "redux/selectors/data/onboard";

import { getAuth } from "redux/selectors/status/auth";
import { restoreAuthData } from "redux/actions/status/auth";
import { setKycApplications } from "redux/actions/data/kyc";

const url_map = require("constants/url_map.json");

// Retrieve the USD price every 15 seconds
const useFetchKycData = (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const authList = useSelector(getAuth);

    const currentNetworkName = useSelector(walletNetworkName);

    const [kycApplicationsData, setKycApplicationsData] = useState([]);
    const [kycUsersData, setKycUsersData] = useState([]);

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
    }, [dispatch, setKycApplicationsData, currentNetworkName, authList]);

    return { kycApplicationsData, kycUsersData };
};

export default useFetchKycData;
