import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import store from './redux/store';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Provider store={ store }>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/carteira" element={ <Wallet/> } />
      </Routes>
    </Provider>  
  )
}

export default App;
