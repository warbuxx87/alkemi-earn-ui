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

//import withDrizzle from "utils/HOC/withDrizzle";
//import appReducers from "redux/reducers";
//import { DrizzleProvider } from "@drizzle/react-plugin";
//import ContractHandler from "containers/ContractHandler/ContractHandler";
//import Web3 from "web3";
//import { OnBoardProvider } from "utils/HOC/withOnBoard";
//import { EventActions } from "drizzle";
//import onboard from "utils/onboard";

// const contractEventNotifier = store => next => action => {
//   if (action.type === EventActions.EVENT_FIRED) {
//     const contract = action.name;
//     const contractEvent = action.event.event;
//     const contractMessage = action.event.returnValues._message;
//     const display = `${contract}(${contractEvent}): ${contractMessage}`;
//
//     // interact with your service
//     console.log("Contract event fired", display);
//   }
//   return next(action);
// };

// const appMiddlewares = [contractEventNotifier];

// class App extends Component {
// state = {
//   options: {
//     drizzleOptions: {
//       contracts: [],
//       web3: {
//         customProvider: Web3.givenProvider
//       }
//     },
//     appMiddlewares,
//     appReducers,
//     disableReduxDevTools: false // enable ReduxDevTools!
//   }
// };
//
// constructor(props) {
//   super(props);
//   this.onboard = onboard({
//     onChooseWallet: this.onChooseWallet
//   });
// }
//
// onChooseWallet = wallet => {
//   this.web3 = new Web3(wallet.provider);
//
//   this.setState({
//     options: {
//       drizzleOptions: {
//         contracts: [],
//         web3: {
//           customProvider: this.web3.givenProvider
//         }
//       },
//       appMiddlewares,
//       appReducers,
//       disableReduxDevTools: false // enable ReduxDevTools!
//     }
//   });
// };

// render() {
//    const MainApp = withDrizzle(({ store }) => (
//     <Provider store={store}>
//       <OnBoardProvider value={this.onboard}>
//         <ConnectedRouter history={history}>
//           <MuiThemeProvider theme={theme}>
//             <Layout />
//             <ContractHandler />
//           </MuiThemeProvider>
//         </ConnectedRouter>
//       </OnBoardProvider>
//     </Provider>
//   ));
//   return (
//     <DrizzleProvider options={this.state.options}>
//       <MainApp />
//     </DrizzleProvider>
//   );
// }
// }
