import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { hot } from "react-hot-loader/root";
import { DrizzleProvider } from "@drizzle/react-plugin";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "assets/scss/style.scss";
import theme from "themes/theme";
import Layout from "containers/Layout/Layout";
import store, { options } from 'containers/Drizzle/drizzleStore'
import { history } from "redux/enhancers/middlewares/router";

class App extends Component {
  render() {
    return (
      <DrizzleProvider store={store} options={options}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Layout />
            </MuiThemeProvider>
          </ConnectedRouter>
        </Provider>
      </DrizzleProvider>
    );
  }
}

export default hot(App);
