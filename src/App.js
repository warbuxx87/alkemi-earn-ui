import React from 'react';
import './App.scss';
import Routers from './routers'
import { BrowserRouter } from "react-router-dom";
import { hot } from 'react-hot-loader/root'


const App = () =>{

  return (
    <BrowserRouter>
      <Routers/>
    </BrowserRouter>
  );
}

export default hot(App)
