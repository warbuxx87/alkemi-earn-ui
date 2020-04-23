import React, { Component } from "react";
import { Provider } from "react-redux";
import createStore from "redux/store";
import { history } from "redux/enhancers/middlewares/router";
import { ConnectedRouter } from "connected-react-router";

import { MuiThemeProvider } from "@material-ui/core/styles";
import "assets/scss/style.scss";
import theme from "themes/theme";
import onboard from 'utils/onboard'
import Layout from "containers/Layout/Layout";
import Web3 from 'web3';
import { OnBoardProvider } from 'utils/HOC/withOnBoard'
import { hot } from "react-hot-loader/root";

class App extends Component {
  onboard = onboard({
    onChooseWallet: this.onChooseWallet
  })

  onChooseWallet = wallet => {
    console.log('onChooseWallet');
    this.web3 = new Web3(wallet.provider);
  }

  render() {
    return (
      <Provider store={createStore()}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <OnBoardProvider value={this.onboard}>
              <Layout />
            </OnBoardProvider>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default hot(App);
