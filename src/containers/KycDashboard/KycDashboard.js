// Main Container

// Section 1: React/Redux low level imports
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports

import KycDashboard from "components/KycDashboard/KycDashboard";

import { SIGN_IN } from "constants/routes";

// Section 3: Selectors
import { getAuth } from "redux/selectors/status/auth";

import { walletNetworkName } from "redux/selectors/data/onboard";
import useFetchKycData from "hooks/useFetchKycData";
import {
    getKycApplications,
    getPreviouslyKycdWallets,
} from "redux/selectors/data/kyc";

// Section 4: Container
const KycDashboardContainer = ({ ...props }) => {
    useFetchKycData();

    const currentNetworkName = useSelector(walletNetworkName);
    const authList = useSelector(getAuth);

    const kycApplications = useSelector(getKycApplications);
    const previouslyKycdWallets = useSelector(getPreviouslyKycdWallets);

    const [kycdWithoutApplications, setKycdWithoutApplications] = useState([]);

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

    useEffect(() => {
        if (previouslyKycdWallets) {
            const kycdWalletsWithoutApplications = [];
            Object.entries(previouslyKycdWallets).forEach(([key, value]) => {
                if (value === true) {
                    const found =
                        kycApplications && Array.isArray(kycApplications)
                            ? kycApplications.find((application) => {
                                  return application.ethAddress === key;
                              })
                            : false;

                    if (!found)
                        kycdWalletsWithoutApplications.push({
                            ethAddress: key,
                        });
                }
            });

            setKycdWithoutApplications(kycdWalletsWithoutApplications);
        }
    }, [kycApplications, previouslyKycdWallets]);

    return (
        <KycDashboard
            kycApplications={kycApplications}
            currentNetworkName={currentNetworkName}
            previouslyKycdWallets={previouslyKycdWallets}
            kycdWithoutApplications={kycdWithoutApplications}
        />
    );
};

// Section 5: Export
export default KycDashboardContainer;
