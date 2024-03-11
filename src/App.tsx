import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import Login from './pages/Login';
import store from './redux/store';
import Wallet from './pages/Wallet';
import { DispatchType } from './types';
import { callApi } from './redux/actions/index';

function App() {
  const dispatch:DispatchType = useDispatch();
  useEffect(() => {
    dispatch(callApi());
  }, [dispatch]);
  return (
    <Provider store={ store }>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/carteira" element={ <Wallet /> } />
      </Routes>
    </Provider>
  );
}

export default App;
