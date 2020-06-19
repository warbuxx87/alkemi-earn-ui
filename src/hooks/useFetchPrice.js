import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { networkSelector } from "redux/selectors/drizzle";

import { fetchPrice } from "redux/actions/data/price";

export default () => {
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(networkSelector);

    useEffect(() => {
        if (currentNetworkName !== undefined) {
            dispatch(fetchPrice({ currentNetworkName, unit: "USDC" }));
        }
    }, [currentNetworkName, dispatch]);
};
