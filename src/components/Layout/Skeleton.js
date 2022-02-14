// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: UI imports
import { withStyles, fade } from "@material-ui/core/styles";

// Section 3: Components & Containers import from the application
import LayoutContent from "containers/Layout/Content";
import Sidebar from "containers/Sidebar/Sidebar";
import AppBar from "containers/AppBar/AppBar";

import Banner from "components/UI/Banner";

import PoolSelect from "containers/PoolSelect/PoolSelect";
import WalletSelect from "containers/WalletSelect/WalletSelect";

import WalletConnectModal from "containers/WalletConnectModal/WalletConnectModal";

// Section 4: Define Styles function taking theme as argument and returning an object
const styles = (theme) => ({
    frame: {
        position: "relative",
        display: "flex",
        width: "100%",
        minHeight: "100%",
        overflow: "auto",
        height: "calc(100vh - 10px)",
    },
    alert: {
        backgroundColor: fade(theme.palette.background.paper, 0.5),
    },
    content: {
        position: "relative",
        width: "100%",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        minHeight: "calc(100% - 56px)",
        marginLeft: 36,
        marginRight: 36,
        "@media (min-width: 1680px)": {
            maxWidth: "1180px",
            margin: "0 auto",
        },

        "@media (min-width: 1940px)": {
            maxWidth: "1280px",
            margin: "0 auto",
        },
        "@media (max-width:1024px)": {
            marginLeft: 0,
            marginRight: 0,
        },
        [theme.breakpoints.up("sm")]: {
            minHeight: "calc(100% - 64px)",
        },
    },
    contentShifted: {
        width: "calc(100% - 400px)",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        minHeight: "calc(100% - 56px)",
        //marginTop: 56,
        marginTop: "100px",
        marginLeft: "125px",
        marginRight: "100px",
        [theme.breakpoints.up("sm")]: {
            minHeight: "calc(100% - 64px)",
            marginTop: 100,
        },
        "@media (min-width: 1550px)": {
            marginLeft: "50px!important",
            marginRight: "25px!important",
        },
    },
});

// Section 5: Code Component
function LayoutSkeleton({
    classes,
    userWalletNetwork,
    currentNetworkName,
    userWalletAddress,
    DEFAULT_NETWORK,
    walletIsLiquidator,
    DISPLAY_FREEZE_OF_TXS,
    currentPool,
}) {
    // networkID is null when no wallet is selected
    return (
        <div className={classes.frame}>
            <PoolSelect />
            <WalletSelect />
            <Sidebar
                walletIsLiquidator={walletIsLiquidator}
                currentPool={currentPool}
            />
            <div className={classes.content}>
                <AppBar />
                <Banner
                    userWalletNetwork={userWalletNetwork}
                    currentNetworkName={currentNetworkName}
                    userWalletAddress={userWalletAddress}
                    DEFAULT_NETWORK={DEFAULT_NETWORK}
                    DISPLAY_FREEZE_OF_TXS={DISPLAY_FREEZE_OF_TXS}
                />
                <LayoutContent />
                <WalletConnectModal />
            </div>
        </div>
    );
}

// Section 6: Documentation with PropTypes
LayoutSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
};

// Section 7:  Connect styles and export
export default withStyles(styles)(LayoutSkeleton);
