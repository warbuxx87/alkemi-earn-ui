import React, { Component } from "react";
import ReactDOM from "react-dom";

//Cache bust
import CacheBuster from "./CacheBuster";

// Error handler
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackComponent from "components/ErrorBoundary/ErrorFallback";

// Web3
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

// sentry libs
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

// store provider set up
import { Provider } from "react-redux";
import store from "containers/Drizzle/drizzleStore.js";

import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "react-perfect-scrollbar/dist/css/styles.css";
import "assets/scss/style.scss";
import theme from "themes/theme";
import Layout from "containers/Layout/Layout";
import { history } from "redux/enhancers/middlewares/router";
import Drizzle from "containers/Drizzle/drizzleContextProvider"; // This will make metamask pop up

import registerServiceWorker from "./utils/registerServiceWorker";

// sentry config
Sentry.init({
    dsn: "https://b333f7a9d2ef4c7582dec39e3eb529c7@o301678.ingest.sentry.io/5427094",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
});

// Library of ethers/web3-react
function getLibrary(provider, connector) {
    return new ethers.providers.Web3Provider(provider);
}
export class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
                    <CacheBuster>
                        <Web3ReactProvider getLibrary={getLibrary}>
                            <Provider store={store}>
                                <Drizzle>
                                    <ConnectedRouter history={history}>
                                        <CssBaseline />
                                        <Layout />
                                    </ConnectedRouter>
                                </Drizzle>
                            </Provider>
                        </Web3ReactProvider>
                    </CacheBuster>
                </ErrorBoundary>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root") || document.createElement("div")
);
registerServiceWorker();
