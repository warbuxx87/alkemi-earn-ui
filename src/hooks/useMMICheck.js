// Section 1: React imports
import { useEffect, useState, useCallback, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useWeb3React } from "@web3-react/core";
// import { ConnectorEvent } from "@web3-react/types";

import Web3 from "web3";
import { ethers } from "ethers";

// Section 2: Internal imports
import { setBlockTxForMMI } from "redux/actions/status/blockTxForMMI";

import { getPool, isKYCPool } from "redux/selectors/status/pool";
import { getSelectedWallet } from "redux/selectors/status/walletSelect";

import { triggerToastDisplay } from "utils/notify";

const CONST_VERIFIER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const useMMICheck = () => {
    // web3-react
    const {
        // connector,
        library,
        // chainId,
        // account,
        // activate,
        // deactivate,
        // active,
        // address
    } = useWeb3React();

    // redux
    const dispatch = useDispatch();

    // selectors
    // const currentPool = useSelector(getPool);
    const selectedWallet = useSelector(getSelectedWallet);

    // state
    // const [providerInitialized, setProviderInitialized] = useState(false);

    // track active state
    // const prevActiveRef = useRef();

    // useEffect(() => {
    //     prevActiveRef.current = active;
    // });
    // const prevActive = prevActiveRef.current;

    // drizzle
    const needKYC = useSelector(isKYCPool);

    useEffect(() => {
        if (
            selectedWallet === "MMI" &&
            needKYC === true &&
            library &&
            library.provider &&
            library.provider.selectedAddress &&
            library.provider.isMetaMask === true
        ) {
            // TODO add if ETH MAINNET
            console.log("library.provider: ", library.provider);
            dispatch(setBlockTxForMMI(true));

            // block txs

            triggerToastDisplay({
                toastMessageVariant: "processing",
                displayMessage: "We need to verify your credentials",
                displaySecondaryMessage:
                    "Please allow it on the MetaMask popup",
            });

            const triggerFailureMessageMMI = () => {
                triggerToastDisplay({
                    toastMessageVariant: "failure",
                    displayMessage: "We could not verify your credentials",
                    displaySecondaryMessage: "You can't make transactions.",
                });

                // TODO block txs
            };

            const checkOnVeriteServers = (mmiToken) => {
                console.log("mmiToken: ", mmiToken);
                async function postData(url = "", data = {}) {
                    // Default options are marked with *
                    const response = await fetch(url, {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        // mode: 'cors', // no-cors, *cors, same-origin
                        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        // credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                            "Content-Type": "application/json",
                        },
                        // redirect: 'follow', // manual, *follow, error
                        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                        body: JSON.stringify(data), // body data type must match "Content-Type" header
                    });
                    return response.json(); // parses JSON response into native JavaScript objects
                }

                async function getData(url = "") {
                    // Default options are marked with *
                    const response = await fetch(url, {
                        method: "GET", // *GET, POST, PUT, DELETE, etc.
                        // mode: 'cors', // no-cors, *cors, same-origin
                        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        // credentials: 'same-origin', // include, *same-origin, omit
                        // redirect: 'follow', // manual, *follow, error
                        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    });
                    return response.json(); // parses JSON response into native JavaScript objects
                }

                const dataToSend = {
                    network: "ethereum",
                    chainId: 1337,
                    subject: library.provider.selectedAddress,

                    // "name": "VerificationRegistry",
                    // "version": "1.0"
                };

                console.log("dataToSend: ", dataToSend);

                postData(
                    "https://verifier-sandbox.circle.com/api/v1/verifications",
                    dataToSend
                )
                    .then((data) => {
                        console.log("data: ", data);

                        getData(data.challengeTokenUrl)
                            .then((data2) => {
                                console.log("data2: ", data2);

                                const dataToSend2 = {
                                    credential_fulfillment: {
                                        descriptor_map: [
                                            {
                                                format: "jwt_vc",
                                                id: "proofOfIdentifierControlVP",
                                                path: "$.presentation.credential[0]",
                                            },
                                        ],
                                        id: "e921d5b2-5293-4297-a467-907f9d565e4e",
                                        manifest_id: "KYBPAMLAttestation",
                                    },
                                    presentation_submission: {
                                        id: "b68fda51-21aa-4cdf-84b7-d452b1c9c3cc",
                                        descriptor_map: [
                                            {
                                                format: "jwt_vc",
                                                id: "kybpaml_input",
                                                path: "$.verifiableCredential[0]",
                                            },
                                        ],
                                    },
                                    vp: {
                                        "@context": [
                                            "https://www.w3.org/2018/credentials/v1",
                                        ],
                                        type: [
                                            "VerifiablePresentation",
                                            "CredentialFulfillment",
                                        ],
                                    },
                                };

                                const PARAMS = {
                                    host_port: "verifier-sandbox.circle.com",
                                    did: "did:key:***REMOVED***",
                                    subject:
                                        "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
                                    // "vc_jwt": "***REMOVED***"
                                };

                                const did = PARAMS["did"];
                                const vc_jwt = mmiToken;
                                // const host_port = PARAMS['host_port']
                                const subject = PARAMS["subject"];

                                dataToSend2["nonce"] =
                                    data2["body"]["challenge"];
                                dataToSend2["presentation_submission"][
                                    "definition_id"
                                ] =
                                    data2["body"]["presentation_definition"][
                                        "id"
                                    ];
                                dataToSend2["sub"] = subject;
                                dataToSend2["iss"] = did;
                                dataToSend2["vp"]["verifiableCredential"] = [
                                    vc_jwt,
                                ];
                                dataToSend2["vp"]["holder"] = did;

                                console.log("dataToSend2: ", dataToSend2);
                                console.log(
                                    "data2.reply_url: ",
                                    data2.reply_url
                                );
                                postData(data2.reply_url, dataToSend2)
                                    .then((data3) => {
                                        console.log("data3: ", data3);

                                        const signature = data3.signature;
                                        const expiration =
                                            data3.verificationResult.expiration;

                                        const domain = {
                                            // name: "VerificationRegistry",
                                            // version: "1.0",
                                            chainId: 1337,
                                            // verifyingContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
                                        };

                                        const types = {
                                            VerificationResult: [
                                                {
                                                    name: "schema",
                                                    type: "string",
                                                },
                                                {
                                                    name: "subject",
                                                    type: "address",
                                                },
                                                {
                                                    name: "expiration",
                                                    type: "uint256",
                                                },
                                            ],
                                        };
                                        const verificationResult = {
                                            schema: data3.verificationResult
                                                .schema,
                                            subject:
                                                data3.verificationResult
                                                    .subject,
                                            expiration: expiration,
                                        };

                                        console.log("domain: ", domain);
                                        console.log("types: ", types);
                                        console.log(
                                            "verificationResult: ",
                                            verificationResult
                                        );
                                        console.log("signature: ", signature);

                                        try {
                                            const recoveredAddress =
                                                ethers.utils.verifyTypedData(
                                                    domain,
                                                    types,
                                                    verificationResult,
                                                    signature
                                                );

                                            if (
                                                recoveredAddress ==
                                                CONST_VERIFIER_ADDRESS
                                            ) {
                                                // all good unlock
                                                dispatch(
                                                    setBlockTxForMMI(false)
                                                );

                                                triggerToastDisplay({
                                                    toastMessageVariant:
                                                        "success",
                                                    displayMessage:
                                                        "We successfully verified your credentials",
                                                    displaySecondaryMessage:
                                                        "You can now make transactions if you are whitelisted on our pools.",
                                                });
                                            } else {
                                                triggerFailureMessageMMI();
                                            }
                                        } catch (e) {
                                            triggerFailureMessageMMI();
                                        }

                                        // // Get public key from the private key used to create the signature
                                        // const signer = new ethers.Wallet(
                                        //     "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
                                        // )
                                        // const address = signer.address

                                        // console.log(`signeer address = ${ address }`) // This is just a sample script. Paste your real code (javascript or HTML) here.
                                    })
                                    .catch(() => {
                                        triggerFailureMessageMMI();
                                    });
                            })
                            .catch(() => {
                                triggerFailureMessageMMI();
                            });
                    })
                    .catch(() => {
                        triggerFailureMessageMMI();
                    });
            };
            console.log("library: ", library);
            // library.provider

            //         .request({
            //             method: 'metamaskinstitutional_request_credentials',
            //             params:
            //         })
            //         .then((result) => {
            //             console.log('result: ', result);
            //             // The result varies by RPC method.
            //             // For example, this method will return a transaction hash hexadecimal string on success.
            //         })
            //         .catch((error) => {
            //             console.log('error: ', error);
            //             // If the request fails, the Promise will reject with an error.
            //         });
            // }

            const requestedCredentials = ["KYBPAMLAttestation"];
            library.provider
                .request({
                    method: "metamaskinstitutional_request_credentials",
                    params: {
                        requestedCredentials,
                        type: "jwt",
                    },
                })
                .then((result) => {
                    console.log(
                        'result["KYBPAMLAttestation"][0].token: ',
                        result["KYBPAMLAttestation"][0].token
                    );
                    // The result varies by RPC method.
                    // For example, this method will return a transaction hash hexadecimal string on success.
                    if (
                        result["KYBPAMLAttestation"] &&
                        result["KYBPAMLAttestation"][0] &&
                        result["KYBPAMLAttestation"][0].token
                    )
                        checkOnVeriteServers(
                            result["KYBPAMLAttestation"][0].token
                        );
                    else triggerFailureMessageMMI();
                })
                .catch((error) => {
                    triggerFailureMessageMMI();
                    // If the request fails, the Promise will reject with an error.
                });
        }
    }, [needKYC, library?.provider, selectedWallet]);

    return {};
};

export default useMMICheck;
