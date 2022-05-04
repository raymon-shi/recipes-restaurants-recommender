import React from 'react';
// import './Login.css';

import { getUserExist } from '../fetcher.js';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dob: '',
      isLogin: true
    }

    this.currEmail = this.currEmail.bind(this);
    this.currPassword = this.currPassword.bind(this);
    this.checkSubmit = this.checkSubmit.bind(this);
    this.currFirstName = this.currFirstName.bind(this);
    this.currLastName = this.currLastName.bind(this);
    this.currDOB = this.currDOB.bind(this);
    this.toSignUp = this.toSignUp.bind(this);
    this.toLogIn = this.toLogIn.bind(this);
    this.confirmSignUp = this.confirmSignUp.bind(this);

  }

  currEmail(event) {
    this.setState({email: event.target.value});
  }

  currPassword(event) {
    this.setState({password: event.target.value});
  }

  currFirstName(event) {
    this.setState({firstName: event.target.value});
  }

  currLastName(event) {
    this.setState({lastName: event.target.value});
  }

  currDOB(event) {
    this.setState({dob: event.target.value});
  }

  checkSubmit() {
    getUserExist(this.state.email, this.state.password).then(res => {
      const val = Object.keys(res.results).length;
      if (val === 0) {
        alert('User does not exist');
      } else {
        alert('User exists');
      }
    })
  }

  confirmSignUp() {
    alert(`name: ${this.state.firstName} ${this.state.lastName}`)
  }

  toSignUp() {
    this.setState(
      {
        isLogin: false,
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        password: ''
      });
  }

  toLogIn() {
    this.setState(
      {
        isLogin: true,
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        password: ''
      }
      );
  }

  render() {
    console.log(this.state.isLogin);
    if (this.state.isLogin) {
      return (
        <main className='Main'>
          <div className='Login-border'>
          <h1>Yelp Restaurant Recommender</h1>
            <div className='Login-input'>
              <h3>Sign in</h3>
              <input type='text' placeholder = 'Enter Email' value={this.state.email} onChange={this.currEmail} required/><br/>
              <input type='password' placeholder = 'Enter Password' value={this.state.password} onChange={this.currPassword} required/><br/>
              <button type ='submit' onClick={this.checkSubmit}>Log in</button>
              <button type ='sign' onClick={this.toSignUp}> Not a member? Sign Up </button>
            </div>
          </div>
        </main>
      );
    } else {
      return (
        <main className='Main'>
          <div className='Login-border'>
          <h1>Yelp Restaurant Recommender</h1>
            <div className='Login-input'>
              <h3>Sign Up</h3>
              <input type='text' placeholder = 'First Name' value={this.state.firstName} onChange={this.currFirstName} required/><br/>
              <input type='text' placeholder = 'Last Name' value={this.state.lastName} onChange={this.currLastName} required/><br/>
              <input type='text' placeholder = 'Date of Birth (mmddyyyy)' value={this.state.dob} onChange={this.currDOB} required/><br/>
              <input type='text' placeholder = 'Enter Email' value={this.state.email} onChange={this.currEmail} required/><br/>
              <input type='password' placeholder = 'Enter Password' value={this.state.password} onChange={this.currPassword} required/><br/>
              <button type ='submit' onClick={this.confirmSignUp}>Sign Up</button>
              <button type ='login' onClick={this.toLogIn}> Already a member? Log in </button>
            </div>
          </div>
        </main>
      );
    }
  }
  }

export default Login