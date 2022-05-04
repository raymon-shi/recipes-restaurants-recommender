import React, { useState } from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'

const NavHeader = () => {
  const [loggedin, setLoggedIn] = useState('')

  const loggedInView = () => {
    return (
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>Yelp-Recommender</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <NavDropdown title='Blogs' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/blogs'>Read Blogs</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='Account' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/account'>Account</NavDropdown.Item>
                <NavDropdown.Item 
                href='/login' 
                onClick = {() => localStorage.clear()}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

  const loggedOutView = () => {
    return (
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>Yelp-Recommender</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/blogs'>Read Blogs</Nav.Link>
              <NavDropdown title='Login/Signup' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
                <NavDropdown.Item href='/signup'>Sign Up</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

  if (localStorage.getItem("loggedIn")) {
    return <>{loggedInView()}</>
  } else {
    return <>{loggedOutView()}</>
  }

  
}

export default NavHeader
