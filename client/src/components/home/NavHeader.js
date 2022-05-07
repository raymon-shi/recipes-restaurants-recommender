import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import axios from 'axios';

const NavHeader = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get('/get');
      console.log(data.email);
      if (data.email) {
        setLoggedIn(true);
        setEmail(data.email);
      }
    } catch (error) {
      Error('There was an error with getting the user information');
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post('/logout');
      console.log(data);
      console.log('hello world logout');
      setLoggedIn(false);
    } catch (error) {
      alert('Error logging out!');
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const loggedInView = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href='#home'>Yelp-Recommender</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/saved'>View Saved Recipes</Nav.Link>
              <NavDropdown title='Account' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/account'>Account</NavDropdown.Item>
                <NavDropdown.Item 
                href='/login' 
                onClick = {() => localStorage.clear()}>Logout</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#">
                {' '}
                <p>{`Logged in as: ${email}`}</p>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

  const loggedOutView = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href='/'>Yelp-Recommender</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <NavDropdown title='Login/Signup' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
                <NavDropdown.Item href='/signup'>Sign Up</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

  return <>{loggedIn ? loggedInView() : loggedOutView()}</>;
};


export default NavHeader;
