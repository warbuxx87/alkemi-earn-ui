// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import Drawer from "components/UI/Drawer/Drawer";

import useWalletSelect from "hooks/useWalletSelect";

import { onTx } from "redux/actions/status/transactions";

import {
    formatNumber,
    fromWei,
    formatETHMoney,
    assetToDecimals,
} from "utils/ui";

// Section 3: Selectors
import { getUSDPrice } from "redux/selectors/data/totalBalance";
import { walletAddress, walletNetwork } from "redux/selectors/data/onboard";

import { isWalletKYCd, getTransactions } from "redux/selectors/status/status";

import { getPool, isKYCPool } from "redux/selectors/status/pool";

// Section 4: Import Underlying Components / Containers

// Section 5: Code Container
const DrawerAllocateContainer = ({ asset, onTx }) => {
    const { library } = useWalletSelect();
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const needKYC = useSelector(isKYCPool);

    const walletIsKYCd = useSelector(isWalletKYCd);
    const txs = useSelector(getTransactions);

    const [amount, setAmount] = React.useState("");

    const currentPool = useSelector(getPool);

    const onSetAmount = (newValue) => {
        const numberOfDecimalsForAsset = assetToDecimals[asset.unit]
            ? assetToDecimals[asset.unit].toString()
            : "18"; // chose 18 as default, arbitrary choice here
        const regex = new RegExp(
            "^(?:\\d*\\.\\d{0," + numberOfDecimalsForAsset + "}|\\d+)$"
        );

        if (newValue === "" || (newValue + "").match(regex))
            // limiting inputting more decimal places than the asset supports
            setAmount(newValue);
    };

    const onSetMax = () => {
        setAmount(fromWei(asset.wallet, asset.unit));
    };

    const [enableAllocate, setEnableAllocate] = React.useState(false);

    const [isProcessing, setIsProcessing] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            // Will eventually crash if fed a NaN, TODO: fix in DF-184
            setEnableAllocate(true);
        }
    }, [amount, asset.wallet, asset.unit]);

    React.useEffect(() => {
        const tx = Object.values(txs).filter((aTx) => {
            return (
                aTx.assetUnit === asset.unit &&
                aTx.type === "allocateTo" &&
                aTx.processing === true
            );
        });

        if (tx && tx.length > 0) setIsProcessing(tx[0].processing);
        else setIsProcessing(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txs]);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Allocate"
            triggerButtonColor="secondary"
            triggerButtonVariant="outlined"
            enableButtonClick={
                enableAllocate &&
                (asset.alternativeUnitLabel === "ETH"
                    ? false
                    : true) /* Disabled allocating for ETH */
            }
            onButtonClick={() =>
                onTx({
                    userWalletNetwork,
                    userWalletAddress,
                    asset,
                    amount,
                    type: "allocateTo",
                    shouldSendMax: false, // shouldSendMax==true will send max_UINT, for this call we should not send it and set a precise amount
                    currentPool,
                    library,
                })
            }
            isDoingAction={isProcessing}
            usdPrice={formatETHMoney(asset.price, "USD", asset.unit, USDPrice)}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={onSetAmount}
            mainTitle={`Mint New ${asset.unit} Tokens`}
            balanceValue={`0.00`}
            amountValue={`Wallet: ${formatNumber(
                asset.wallet,
                asset.unit,
                userWalletNetwork
            )}`}
            walletIsKYCd={needKYC ? walletIsKYCd : true}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({ onTx }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    DrawerAllocateContainer
);
