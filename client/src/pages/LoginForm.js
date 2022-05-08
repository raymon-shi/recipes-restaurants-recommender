import React, { useState } from 'react';
import { Form, Button, Container, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { getUserInfo } from '../fetcher.js';
///import SignInForm from './SignInForm';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [showSignIn, setShowSignIn] = useState(false);

  const navigate = useNavigate();

  // login route
  const login = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password });
      if (data.results.length > 0) {
        localStorage.setItem('loggedIn', true);
        console.log('here');
        await getUserInfo(email, password).then((res) => {
          console.log(res);
          const val = Object.keys(res.results).length;
          console.log(res.results);
          if (val === 0) {
            alert('Username and/or password incorrect');
          } else {
            localStorage.setItem('userInfo', JSON.stringify(res.results));
          }
        });
        console.log('after');
        navigate('/');
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
      alert('Error in getting the User!');
    }
  };

  return (
    <div className="Main">
      <Form className="Login-border">
        <h1 className="Login-header"> Log in </h1>
        <Form.Group className="Login-input" controlId="UserEmail">
          <Form.Control className="Login-text" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Form.Control
            className="Login-text"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button className="Login-button" onClick={login}>
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
