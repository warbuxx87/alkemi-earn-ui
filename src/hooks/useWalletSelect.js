// Section 1: React imports
import { useEffect, useState, useCallback, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useWeb3React } from "@web3-react/core";
import { ConnectorEvent } from "@web3-react/types";

import Web3 from "web3";
// import { ethers } from "ethers";

// Section 2: Internal imports

import {
    injected,
    walletconnect,
    LedgerHQFrame,
    safeMultisigConnector,
    walletlink,
} from "utils/web3ReactConnectors";

import { initContracts, deleteAllContracts } from "utils/contracts";
import { resetLendData, cancelFetchInterest } from "redux/actions/data/lend";
import { resetBorrowData } from "redux/actions/data/borrow";
import { resetTxDataAndCancelFetch } from "redux/actions/data/tx";

import {
    setWalletConnected,
    setWalletAddress,
    setWalletNetwork,
    setWalletBalance,
    setWalletIsIframe,
} from "redux/actions/status/onboard";

import { setEthLendBalance } from "redux/actions/data/lend";
import { setEthBorrowBalance } from "redux/actions/data/borrow";
import {
    setShowWalletModal,
    setActivatedWallet,
} from "redux/actions/status/walletSelect";

import { getPool } from "redux/selectors/status/pool";
import { getSelectedWallet } from "redux/selectors/status/walletSelect";

import DrizzleContext from "utils/DrizzleContext";

import address_map from "constants/address_map.json";
import constants from "constants/constant.json";

import { setResetSelectionWallet } from "redux/actions/status/walletSelect";
import { isIframe } from "web3-ledgerhq-frame-connector";
import { useSafeAppConnection } from "@gnosis.pm/safe-apps-web3-react";

const DEFAULT_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;

const connectorsByName = {
    MetaMask: injected,
    MMI: injected,
    WalletConnect: walletconnect,
    LedgerLive: LedgerHQFrame,
    GnosisSafeApp: safeMultisigConnector,
    Coinbase: walletlink,
};

const useWalletSelect = () => {
    // web3-react
    const {
        connector,
        library,
        chainId,
        account,
        activate,
        deactivate,
        active,
        // address
    } = useWeb3React();

    // redux
    const dispatch = useDispatch();

    // selectors
    const currentPool = useSelector(getPool);
    const selectedWallet = useSelector(getSelectedWallet);

    // state
    const [providerInitialized, setProviderInitialized] = useState(false);

    // track active state
    const prevActiveRef = useRef();

    useEffect(() => {
        prevActiveRef.current = active;
    });
    const prevActive = prevActiveRef.current;

    // drizzle
    const drizzle = useContext(DrizzleContext);

    const resetStoreData = useCallback(() => {
        dispatch(resetLendData());
        dispatch(resetBorrowData());
        dispatch(resetTxDataAndCancelFetch(dispatch));
        dispatch(cancelFetchInterest());
        // ADD more stores to reset if needs be
    }, [dispatch]);

    const deleteCurrentData = useCallback(() => {
        deleteAllContracts(drizzle);

        dispatch(setWalletConnected(false));
        dispatch(setWalletAddress(null));
        dispatch(setWalletBalance(0));
        dispatch(setEthLendBalance(0));
        dispatch(setEthBorrowBalance(0));
        dispatch(setWalletNetwork(DEFAULT_NETWORK));
        dispatch(setWalletIsIframe(false));

        resetStoreData();

        try {
            drizzle.web3.currentProvider.removeAllListeners("accountsChanged");
            drizzle.web3.currentProvider.removeAllListeners("chainChanged");
            drizzle.contractList = [];
            drizzle.contracts = {};
        } catch (e) {
            // Formatic doesn't subscribe to anything
        }
    }, [dispatch, drizzle, resetStoreData]);

    const onReset = useCallback(async () => {
        deactivate();

        window.localStorage.removeItem("selectedWallet");

        deleteCurrentData();

        window.location.reload();
    }, [deactivate, deleteCurrentData]);

    const handleUpdate = useCallback(
        async (update) => {
            if (!connector) {
                return;
            }

            if (update.chainId || update.account) onReset(); // might need to react to more events
        },
        [connector, onReset]
    );

    const handleError = useCallback(async (error) => {
        if (!error) {
            return;
        }

        console.error("web3-react error: ", error);
    }, []);

    const handleDeactivate = useCallback(() => {
        onReset(); // might create recursiveness if there is no window.reload
    }, [onReset]);

    useEffect(() => {
        if (connector) {
            connector
                .on(ConnectorEvent.Update, handleUpdate)
                .on(ConnectorEvent.Error, handleError)
                .on(ConnectorEvent.Deactivate, handleDeactivate);
        }

        return () => {
            if (connector) {
                connector
                    .off(ConnectorEvent.Update, handleUpdate)
                    .off(ConnectorEvent.Error, handleError)
                    .off(ConnectorEvent.Deactivate, handleDeactivate);
            }
        };
    }, [connector, handleDeactivate, handleError, handleUpdate]);

    useEffect(() => {
        const initDrizzleData = (
            active,
            library,
            providerInitialized,
            forceUpdate = false
        ) => {
            if (
                active === true &&
                providerInitialized === false &&
                library.provider
            ) {
                // Could consider turning this into some sort of mutex

                // console.log('library.provider: ', library.provider);

                setProviderInitialized(true);

                // address network
                let currentWalletAddress = account;
                let currentWalletNetwork = chainId.toString();
                if (!currentWalletAddress && !currentWalletNetwork) return;
                // console.log('currentWalletNetwork: ', currentWalletNetwork);
                // console.log('currentWalletAddress: ', currentWalletAddress);

                window.currentlyUsedProvider = library.provider;

                const web3 = new Web3(library.provider);

                drizzle.web3 = web3; // best method found to update drizzle's web3, have to manually update contracts and clean up store and usage of network and account address

                // The order matters here
                dispatch(setWalletNetwork(currentWalletNetwork));
                dispatch(setWalletAddress(currentWalletAddress));

                // Init drizzle contracts set up
                const network = constants.network_type[currentWalletNetwork];
                const address_MoneyMarket =
                    currentPool === "open"
                        ? address_map[network].address_open_MoneyMarket
                        : address_map[network].address_MoneyMarket;

                // account connected
                initContracts({
                    drizzle,
                    userWalletAddress: currentWalletAddress,
                    userWalletNetwork: currentWalletNetwork,

                    forceUpdate,
                    address_MoneyMarket,
                    currentPool,
                });
            }
        };

        if (active && prevActive === false) {
            // only initDrizzleData when provider/web3-react wasn't active before because providerInitialized is not tracked fast enough
            dispatch(setActivatedWallet());
            dispatch(setWalletConnected(true));

            if (providerInitialized === false) {
                // could be optional
                initDrizzleData(active, library, providerInitialized, false);
            }
        }
    }, [
        providerInitialized,
        active,
        library,
        account,
        chainId,
        currentPool,
        dispatch,
        drizzle,
        prevActive,
    ]);

    // useEffect(() => {
    //     // console.log( "useEffect chainId: ", chainId);
    // }, [chainId]);

    // useEffect(() => {
    //     // console.log("useEffect account: ", account);
    //     // Might want to dispatch(setWalletAddress(currentWalletAddress)); here
    // }, [account]);

    // useEffect(() => {
    //     // console.log("useEffect library: ", library);
    // }, [library]);

    useEffect(() => {
        // protects from being called multiple times
        if (selectedWallet && connectorsByName[selectedWallet] && !active) {
            activate(connectorsByName[selectedWallet], undefined, true)
                .then(() => {})
                .catch((error) => {
                    dispatch(setResetSelectionWallet(true, selectedWallet));
                });
        }
    }, [selectedWallet, active, activate, dispatch]);

    // useEffect(() => {
    //     if(library && library.provider && library.provider.selectedAddress && library.provider.isMetaMask === true) { // TODO add if ETH MAINNET
    //         console.log('library.provider: ', library.provider);

    //         // library.provider

    //         //         .request({
    //         //             method: 'metamaskinstitutional_request_credentials',
    //         //             params:
    //         //         })
    //         //         .then((result) => {
    //         //             console.log('result: ', result);
    //         //             // The result varies by RPC method.
    //         //             // For example, this method will return a transaction hash hexadecimal string on success.
    //         //         })
    //         //         .catch((error) => {
    //         //             console.log('error: ', error);
    //         //             // If the request fails, the Promise will reject with an error.
    //         //         });

    //         // library.provider
    //         // .request({
    //         //     method: 'metamaskinstitutional_upload_credentials',
    //         //     params: {
    //         //       uploadRequest: {
    //         //          type: 'jwt',
    //         //          token: '***REMOVED***',
    //         //       },
    //         //     },
    //         //   })
    //         // .then((result) => {
    //         //     console.log('result: ', result);
    //         //     // The result varies by RPC method.
    //         //     // For example, this method will return a transaction hash hexadecimal string on success.
    //         // })
    //         // .catch((error) => {
    //         //     console.log('error: ', error);
    //         //     // If the request fails, the Promise will reject with an error.
    //         // });

    //         const requestedCredentials = ['KYBPAMLAttestation'];
    //         library.provider
    //             .request({ method: "metamaskinstitutional_request_credentials", params: {
    //                     requestedCredentials,
    //                     type: 'jwt',
    //                 },
    //             })
    //             .then((result) => {
    //                 console.log('0 result: ', result["KYBPAMLAttestation"][0].token);
    //                 // The result varies by RPC method.
    //                 // For example, this method will return a transaction hash hexadecimal string on success.

    //             })
    //             .catch((error) => {
    //                 console.log('0 error: ', error);
    //                 // If the request fails, the Promise will reject with an error.
    //             });

    //         // library.provider.eth.accounts.recover
    //         const web3 = new Web3(library.provider);
    //         console.log('web3: ', web3);

    //         // Example POST method implementation:
    //         async function postData(url = '', data = {}) {
    //             // Default options are marked with *
    //             const response = await fetch(url, {
    //             method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //             // mode: 'cors', // no-cors, *cors, same-origin
    //             // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //             // credentials: 'same-origin', // include, *same-origin, omit
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             // redirect: 'follow', // manual, *follow, error
    //             // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //             body: JSON.stringify(data) // body data type must match "Content-Type" header
    //             });
    //             return response.json(); // parses JSON response into native JavaScript objects
    //         }

    //         // Example POST method implementation:
    //         async function getData(url = '') {
    //             // Default options are marked with *
    //             const response = await fetch(url, {
    //             method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //             // mode: 'cors', // no-cors, *cors, same-origin
    //             // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //             // credentials: 'same-origin', // include, *same-origin, omit
    //             // redirect: 'follow', // manual, *follow, error
    //             // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //             });
    //             return response.json(); // parses JSON response into native JavaScript objects
    //         }

    //         console.log('library.provider.selectedAddress: ', library.provider.selectedAddress);
    //         const dataToSend = {

    //             "network": "ethereum",
    //             "chainId": 1337,
    //             "subject": library.provider.selectedAddress,

    //             // "name": "VerificationRegistry",
    //             // "version": "1.0"
    //         }

    //         console.log('dataToSend: ', dataToSend);

    //         postData('https://verifier-sandbox.circle.com/api/v1/verifications', dataToSend)
    //         .then((data) => {
    //             console.log('data: ', data);

    //             getData(data.challengeTokenUrl)
    //             .then((data2) => {
    //                 console.log('data2: ', data2);

    //                 const dataToSend2 = {
    //                     "credential_fulfillment": {
    //                       "descriptor_map": [
    //                         {
    //                           "format": "jwt_vc",
    //                           "id": "proofOfIdentifierControlVP",
    //                           "path": "$.presentation.credential[0]"
    //                         }
    //                       ],
    //                       "id": "e921d5b2-5293-4297-a467-907f9d565e4e",
    //                       "manifest_id": "KYBPAMLAttestation"
    //                     },
    //                     "presentation_submission": {
    //                         "id": "b68fda51-21aa-4cdf-84b7-d452b1c9c3cc",
    //                         "descriptor_map": [
    //                             {
    //                                 "format": "jwt_vc",
    //                                 "id": "kybpaml_input",
    //                                 "path": "$.verifiableCredential[0]"
    //                             }
    //                         ]
    //                     },
    //                     "vp": {
    //                       "@context": [
    //                         "https://www.w3.org/2018/credentials/v1"
    //                       ],
    //                       "type": [
    //                         "VerifiablePresentation",
    //                         "CredentialFulfillment"
    //                       ]
    //                     }
    //                 }

    //                 const PARAMS = {
    //                     "host_port": "verifier-sandbox.circle.com",
    //                     "did": "did:key:***REMOVED***",
    //                     "subject": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    //                     "vc_jwt": "***REMOVED***"
    //                 }

    //                 const did = PARAMS['did']
    //                 const vc_jwt = PARAMS['vc_jwt']
    //                 // const host_port = PARAMS['host_port']
    //                 const subject = PARAMS['subject']

    //                 dataToSend2['nonce'] = data2['body']['challenge']
    //                 dataToSend2['presentation_submission']['definition_id'] = data2['body']['presentation_definition']['id']
    //                 dataToSend2['sub'] = subject
    //                 dataToSend2['iss'] = did
    //                 dataToSend2['vp']['verifiableCredential'] = [vc_jwt]
    //                 dataToSend2['vp']['holder'] = did

    //                 console.log('dataToSend2: ', dataToSend2);
    //                 console.log('data2.reply_url: ', data2.reply_url);
    //                 postData(data2.reply_url, dataToSend2)

    //                     .then((data3) => {
    //                         console.log('data3: ', data3);

    //                         const signature = data3.signature
    //                         const expiration = data3.verificationResult.expiration

    //                         const domain = {
    //                             // name: "VerificationRegistry",
    //                             // version: "1.0",
    //                             chainId: 1337,
    //                             // verifyingContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    //                         }

    //                         const types = {
    //                             VerificationResult: [{
    //                                     name: "schema",
    //                                     type: "string"
    //                                 },
    //                                 {
    //                                     name: "subject",
    //                                     type: "address"
    //                                 },
    //                                 {
    //                                     name: "expiration",
    //                                     type: "uint256"
    //                                 }
    //                             ]
    //                         }
    //                         const verificationResult = {
    //                             schema: data3.verificationResult.schema,
    //                             subject: data3.verificationResult.subject,
    //                             expiration: expiration
    //                         }

    //                         const recoveredAddress = ethers.utils.verifyTypedData(
    //                             domain,
    //                             types,
    //                             verificationResult,
    //                             signature
    //                         )

    //                         console.log(`recoveredAddress = ${
    //                             recoveredAddress
    //                         }`)

    //                         // // Get public key from the private key used to create the signature
    //                         // const signer = new ethers.Wallet(
    //                         //     "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    //                         // )
    //                         // const address = signer.address

    //                         // console.log(`signeer address = ${ address }`) // This is just a sample script. Paste your real code (javascript or HTML) here.

    //                     });
    //             });
    //         });

    //         // console.log('library: ', library);
    //         // library.provider

    //         //         .request({
    //         //             method: 'metamaskinstitutional_request_credentials',
    //         //             params:
    //         //         })
    //         //         .then((result) => {
    //         //             console.log('result: ', result);
    //         //             // The result varies by RPC method.
    //         //             // For example, this method will return a transaction hash hexadecimal string on success.
    //         //         })
    //         //         .catch((error) => {
    //         //             console.log('error: ', error);
    //         //             // If the request fails, the Promise will reject with an error.
    //         //         });
    //     }
    // }, [library]);

    const triedToConnectToSafe = useSafeAppConnection(safeMultisigConnector);

    useEffect(() => {
        if (isIframe() && !active) {
            dispatch(setWalletIsIframe(true));

            if (LedgerHQFrame.isLedgerApp()) {
                // debugger;

                activate(connectorsByName["LedgerLive"], undefined, true).catch(
                    (error) => {
                        dispatch(setResetSelectionWallet());
                    }
                );
            } else if (triedToConnectToSafe) {
                // debugger;

                activate(
                    connectorsByName["GnosisSafeApp"],
                    undefined,
                    true
                ).catch((error) => {
                    dispatch(setResetSelectionWallet());
                });
            }
        }
    }, [
        selectedWallet,
        active,
        activate,
        dispatch,
        connector,
        triedToConnectToSafe,
    ]);

    const onConnect = async () => {
        dispatch(setShowWalletModal(true));
    };

    return {
        onConnect,
        onReset,
        library,
    };
};

export default useWalletSelect;
