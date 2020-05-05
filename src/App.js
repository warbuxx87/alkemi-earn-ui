import React, { Component } from "react";
import { Provider } from "react-redux";
import createStore from "redux/store";
import { history } from "redux/enhancers/middlewares/router";
import { ConnectedRouter } from "connected-react-router";

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "assets/scss/style.scss";
import theme from "themes/theme";
import Layout from "containers/Layout/Layout";

import { hot } from "react-hot-loader/root";

class App extends Component {
    render() {
        return (
            <Provider store={createStore()}>
                <ConnectedRouter history={history}>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline />
                        <Layout />
                    </MuiThemeProvider>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default hot(App);
