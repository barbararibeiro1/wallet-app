import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import Login from './pages/Login';
import store from './redux/store';
import Wallet from './pages/Wallet';
import { DispatchType } from './types';
import callApi from './redux/actions/index';

function App() {
  const dispatch:DispatchType = useDispatch();
  useEffect(() => {
    dispatch(callApi.callApi());
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/carteira" element={ <Wallet /> } />
    </Routes>
  );
}

export default App;
