// Main Container

// Section 1: React/Redux low level imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Section 2: internal imports

import { DASHBOARD, SIGN_IN } from "constants/routes";

// Section 3: Selectors
import { getAuth } from "redux/selectors/status/auth";

import { walletNetworkName } from "redux/selectors/data/onboard";

// Section 4: Container
const SignInContainer = ({ ...props }) => {
    const currentNetworkName = useSelector(walletNetworkName);
    const authList = useSelector(getAuth);

    useEffect(() => {
        console.log(
            "state in sign in KYC dashboard: ",
            currentNetworkName,
            authList
        );
        // if(currentNetworkName && authList[currentNetworkName]) {
        //     props.history.push(SIGN_IN)
        // } else if(!currentNetworkName && authList['main']) {
        //     props.history.push(SIGN_IN)
        // } // TODO: check not admin
    }, [authList, props.history]);

    return <span>KYC DASHBOARD</span>;
};

// Section 5: Export
export default SignInContainer;
