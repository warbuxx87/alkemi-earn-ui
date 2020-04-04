import React,{ useState } from 'react';
import Routers from './routers'
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { hot } from 'react-hot-loader/root';
import './assets/scss/style.scss';
import theme from "./constants/theme";


const App = () =>{

  return (

    <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Routers/>
    </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default hot(App)
