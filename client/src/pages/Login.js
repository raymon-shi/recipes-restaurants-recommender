import React from 'react';
import LoginForm from './LoginForm';
import './Login.css';

const Login = ({ setLoggedIn }) => (
  <div>
    <LoginForm setLoggedIn={setLoggedIn} />
  </div>
);

export default Login;
