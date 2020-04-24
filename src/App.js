import React, { Component } from "react";
import { Provider } from "react-redux";
import { history } from "redux/enhancers/middlewares/router";
import { ConnectedRouter } from "connected-react-router";

import withDrizzle from 'utils/HOC/withDrizzle'
import appReducers from 'redux/reducers'
import { MuiThemeProvider } from "@material-ui/core/styles";
import { DrizzleProvider } from '@drizzle/react-plugin'
import "assets/scss/style.scss";
import theme from "themes/theme";
import onboard from 'utils/onboard'
import Layout from "containers/Layout/Layout";
import Web3 from 'web3';
import { OnBoardProvider } from 'utils/HOC/withOnBoard'
import { hot } from "react-hot-loader/root";
import { EventActions } from 'drizzle'
import WETH_ABI from 'ABIs/WETH_ABI.json'

const contractEventNotifier = store => next => action => {
 if (action.type === EventActions.EVENT_FIRED) {
   const contract = action.name
   const contractEvent = action.event.event
   const contractMessage = action.event.returnValues._message
   const display = `${contract}(${contractEvent}): ${contractMessage}`

   // interact with your service
   console.log('Contract event fired', display)
 }
 return next(action)
}

const appMiddlewares = [ contractEventNotifier ]

class App extends Component {
  state = {
    options: {
      drizzleOptions: {
        contracts: [
          {
            contractName: 'WETH',
            web3Contract: new (new Web3()).eth.Contract(WETH_ABI, '0x06a1cd567e61b7edda49c30d3d32e60f607fd646') // An instance of a Web3 contract
          }
        ],
        web3: {
          customProvider: Web3.givenProvider
        }
      },
      appMiddlewares,
      appReducers,
      disableReduxDevTools: false  // enable ReduxDevTools!
    },
  }

  constructor(props) {
    super(props)
    this.onboard = onboard({
      onChooseWallet: this.onChooseWallet
    })
  }

  onChooseWallet = wallet => {
    this.web3 = new Web3(wallet.provider);
    this.setState({
      options: {
        drizzleOptions: {
          contracts: [
            {
              contractName: 'WETH',
              web3Contract: new this.web3.eth.Contract(WETH_ABI, '0x06a1cd567e61b7edda49c30d3d32e60f607fd646') // An instance of a Web3 contract
            }
          ],
          web3: {
            customProvider: this.web3.givenProvider
          }
        },
        appMiddlewares,
        appReducers,
        disableReduxDevTools: false  // enable ReduxDevTools!
      },
    })
  }

  render() {
    const MainApp = withDrizzle(({ store }) => (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <Layout />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    ))

    return (
      <DrizzleProvider options={this.state.options}>
        <OnBoardProvider value={this.onboard}>
          <MainApp />
        </OnBoardProvider>
      </DrizzleProvider>
    );
  }
}



export default hot(App);
