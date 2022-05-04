import React from 'react';
import './Login.css';

import { getUserExist } from '../fetcher.js';

class Account extends React.Component {
    constructor(props) {
      super(props);
      var data = JSON.parse(localStorage.getItem('userInfo'));
    
      this.state = {
        email: data[0]["email"],
        firstName: data[0]["first_name"],
        lastName: data[0]["last_name"],
        dob: data[0]["DOB"],
        preferences: data[0]["preferences"]
      }
    }
  
  
    render() {
        return (
          <main className='Main'>
            <div className='Login-border'>
            <h1>User Profile</h1>
            <h3>Hello, {this.state.firstName} {this.state.lastName}</h3>
              <div className='Login-input'>
                
                <h5>Email: {this.state.email}</h5>
                <h5>Date of birth: {this.state.dob}</h5>
              </div>
            </div>
          </main>
        );
      
    }
    }
  
  export default Account