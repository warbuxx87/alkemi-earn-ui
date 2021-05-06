// Main Container

// Section 1: React/Redux low level imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Section 2: internal imports

import KycDashboard from "components/KycDashboard/KycDashboard";

import { SIGN_IN } from "constants/routes";

// Section 3: Selectors
import { getAuth } from "redux/selectors/status/auth";

import { walletNetworkName } from "redux/selectors/data/onboard";
import useFetchKycData from "hooks/useFetchKycData";
import { getKycApplications } from "redux/selectors/data/kyc";

// Section 4: Container
const KycDashboardContainer = ({ ...props }) => {
    useFetchKycData();

    const currentNetworkName = useSelector(walletNetworkName);
    const authList = useSelector(getAuth);

    const kycApplications = useSelector(getKycApplications);

    useEffect(() => {
        if (currentNetworkName && !authList[currentNetworkName]) {
            props.history.push(SIGN_IN);
        }

        // if(currentNetworkName && authList[currentNetworkName]) {
        //     props.history.push(SIGN_IN)
        // } else if(!currentNetworkName && authList['main']) {
        //     props.history.push(SIGN_IN)
        // } // TODO: check not admin
    }, [authList, props.history]);

    return (
        <KycDashboard
            kycApplications={kycApplications}
            currentNetworkName={currentNetworkName}
        />
    );
};

// Section 5: Export
export default KycDashboardContainer;
