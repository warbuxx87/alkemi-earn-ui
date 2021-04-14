// Section 1: React/Redux low level imports
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

// Section 2: internal imports
import DrizzleContext from "utils/DrizzleContext";

import { isWalletConnected, walletAddress } from "redux/selectors/data/onboard";

import { setWalletBalance } from "redux/actions/status/onboard";
import { setEthLendBalance } from "redux/actions/data/lend";
import { setEthBorrowBalance } from "redux/actions/data/borrow";

// Retrieve the user's wallet ether balance every 30 seconds
const useWatchEtherBalance = () => {
    const drizzle = useContext(DrizzleContext);
    const dispatch = useDispatch();

    const walletConnected = useSelector(isWalletConnected); // Kind of useless to use here but won't hurt (hopefully)
    const address = useSelector(walletAddress);

    useEffect(() => {
        let timer;

        const getBalance = () => {
            drizzle.web3.eth
                .getBalance(address)
                .then((currentWalletBalance) => {
                    dispatch(setWalletBalance(currentWalletBalance));
                    dispatch(setEthLendBalance(currentWalletBalance));
                    dispatch(setEthBorrowBalance(currentWalletBalance));
                });

            // Ethereum Average Block Time is normally slightly north of 13 sec
            // We could have web3 subscribe to new blockheaders and retrieve the balance then, but a timer of 30 seconds seems good enough
            // As at the time of writing this there is no possibility to watch ether balance changes (and drizzle doesn't do that)
            timer = setTimeout(getBalance, 30 * 1000); // getBalance every 30 secs
        };

        if (walletConnected && address !== undefined && address !== null) {
            getBalance();
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [address, walletConnected, drizzle, dispatch]);
};

export default useWatchEtherBalance;
