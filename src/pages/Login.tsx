import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateEmail } from '../redux/actions/index';
import { UPDATE_EMAIL } from '../redux/actions/index';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnEnable, setBtnEnable] = useState(false);

  const loginRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
  
  let navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(updateEmail(email));
    navigate('/carteira');
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  useEffect(() => { 
    console.log('Email: ', email);
    console.log('Password: ', password);
    const isEmailValid = loginRegex.test(email);
    const isPasswordValid = password.length >= 6;
    console.log('Is email valid: ', isEmailValid);
    console.log('Is password valid: ', isPasswordValid);
    setBtnEnable(isEmailValid && isPasswordValid);
    console.log('Button enabled: ', btnEnable);
  }, [email, password]); 

  return (
    <div>
      <form action="">
      <input 
        type="email" 
        name="email"
        data-testid='email-input' 
        value={email} 
        onChange={handleEmailChange}
      />
        <input 
          type="password" 
          name="password" 
          data-testid='password-input' 
          value={password} 
          onChange={handlePasswordChange}
          autoComplete="current-password"
        />     
        <button 
          disabled={!btnEnable}
          onClick={(e) => handleLogin(e)}
        >
        Entrar
        </button>
      </form>      
    </div>
  )
}

export default Login;