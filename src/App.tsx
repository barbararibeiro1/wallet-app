import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={ store }>
      <Routes>
        <Route path="/" element={ <Login /> } />
      </Routes>
    </Provider>  
  )
}

export default App;
