// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import Drawer from "components/UI/Drawer/Drawer";

import DrizzleContext from "utils/DrizzleContext";

import { onAllocateAction } from "redux/actions/data/lend";

import { formatNumber, fromWei, formatETHMoney } from "utils/ui";

// Section 3: Selectors
import { getUSDPrice } from "redux/selectors/data/totalBalance";
import { walletAddress } from "redux/selectors/data/onboard";

import { isWalletKYCd } from "redux/selectors/status";

const DrawerAllocateContainer = ({ asset, onAllocateAction }) => {
    const drizzle = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const walletIsKYCd = useSelector(isWalletKYCd);

    const [amount, setAmount] = React.useState("");
    const onSetMax = () => setAmount(fromWei(asset.wallet, asset.unit));

    const [enableAllocate, setEnableAllocate] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            // Will eventually crash if fed a NaN, TODO: fix in DF-184
            setEnableAllocate(true);
        }
    }, [amount, asset.wallet, asset.unit]);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Allocate"
            triggerButtonColor="secondary"
            triggerButtonVariant="outlined"
            enableButtonClick={enableAllocate}
            onButtonClick={() =>
                onAllocateAction({ drizzle, userWalletAddress, asset, amount })
            }
            isDoingAction={asset.allocating}
            usdPrice={formatETHMoney(asset.price, "USD", asset.unit, USDPrice)}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={setAmount}
            mainTitle={`Mint New ${asset.unit} Tokens`}
            balanceValue={`0.00`}
            amountValue={`Wallet: ${formatNumber(asset.wallet, asset.unit)}`}
            walletIsKYCd={walletIsKYCd}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onAllocateAction }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    DrawerAllocateContainer
);
