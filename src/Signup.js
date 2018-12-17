import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import bcrypt from 'bcryptjs';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      name: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.encryptPassword = this.encryptPassword.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    var hash = this.encryptPassword(event.target['password'].value);
    fetch('http://localhost:3001/users/create', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: event.target['username'].value,
                            password:hash ,
                            firstname: event.target['firstname'].value,
                            lastname: event.target['lastname'].value}),
    });
  }

  encryptPassword(password){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  render() {
    let files = this.state.files;
    let style = {
        addFileBtn: {
            'marginTop': '15px',
        },
    };
    return (
        <div className="Signup-container">
          <form className="Signup-form"  onSubmit={this.handleSubmit}>
            <input id="username" name="username" type="text" className="Signup-input-field"  placeholder="User Name"/>
            <input id="password" name="password" type="text" className="Signup-input-field"  placeholder="Password"/>
            <input id="firstname" name="firstname" type="text" className="Signup-input-field"  placeholder="First name"/>
            <input id="lastname" name="lastname" type="text" className="Signup-input-field"  placeholder="Last name"/>
            <button className="Signup-button">Signup</button>
          </form>
        </div>
    );
  }
}

export default Signup;
