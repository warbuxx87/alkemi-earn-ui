import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Routers from './routers'
import { ConnectedRouter } from 'connected-react-router';

const App = ({ history }) =>{
  
  return (
    <ConnectedRouter history={history}>
      <Routers/>
    </ConnectedRouter>
  );
}

export default App;
