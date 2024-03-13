import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateEmail } from '../redux/actions/index';

const loginRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnEnable, setBtnEnable] = useState(false);

  const navigate = useNavigate();
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
    const isEmailValid = loginRegex.test(email);
    const isPasswordValid = password.length >= 6;
    setBtnEnable(isEmailValid && isPasswordValid);
  }, [email, password]);

  return (
    <div>
      <form onSubmit={ handleLogin }>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleEmailChange }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          value={ password }
          onChange={ handlePasswordChange }
          autoComplete="current-password"
        />
        <button
          type="submit"
          disabled={ !btnEnable }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
