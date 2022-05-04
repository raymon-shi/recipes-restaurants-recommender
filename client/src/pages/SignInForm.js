import React, { useEffect, useState } from 'react';
import {
  Form, Button, Modal, Alert,
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
//import { data } from '../data/index';

const SignInForm = ({ showSignIn, setShowSignIn }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDOB] = useState('');
  const [id, setID] = useState(0);

  const navigate = useNavigate();

  const signup = async (event) => {
    event.preventDefault();
    console.log(`${email} | ${firstName} ${lastName} | ${password} | ${dob}`);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    // signup route -> login route -> navigate to homepage
    try {
        const newid = await axios.get('/signup/id');
        setID(Object.keys(newid.data).length);
        console.log(id);
    } catch (error) {
        alert(`Can't get new ID`)
    }

    try {
        const {data} = await axios.post('/signup',
          {
            email,
            firstName,
            lastName,
            password,
            dob,
            id
          },
        )
        console.log(data);
    } catch (error) {
        alert("not working");
    }
    // try {
    //   await Promise.all([
    //     ,
    //     await axios.post('/login', {
    //       email, password
    //     }),
    //   ]).then(() => {}/*navigate('/')*/);
    // } catch (error) {
    //   alert(`Could not sign up`);
    //   console.log(error);
    // }
  };

  return (
    <main className = 'Main'/*show={showSignUp} onHide={() => setShowSignUp(false)}*/>
        <Form
          className="Login-border"
          id="signup-form"
          onSubmit={signup}
        >
            <h1 className="Login-header">Sign Up</h1>
          <Form.Group className="Login-input" controlId="signUpFormName" style={{ display: 'flex', flexDirection: 'row' }}>
            <Form.Control className = "Login-text" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <Form.Control className = "Login-text" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="Login-input" controlId="signUpFormPennEmail">
            <Form.Control className = "Login-text" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="Login-input" controlId="signUpFormPassword">
            <Form.Control className = "Login-text" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Form.Group className="Login-input" controlId="signUpFormBirthday">
            <Form.Label className="Login-header">Birthday</Form.Label>
            <Form.Group className="Login-input" controlId="signUpFormBirthdaySelect" style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Control className = "Login-text" type="text" placeholder="mmddyyyy" value={dob} onChange={(e) => setDOB(e.target.value)} required>
              </Form.Control>
            </Form.Group>
            <Button className = "Login-button" variant="primary" type="submit" form="signup-form">
          Create Account
        </Button>
          </Form.Group>
          
        </Form>
    </main>
  );
};

export default SignInForm;
