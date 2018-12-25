import React, { Component } from 'react';
import '../App.css';
import babycats from '../image/baby_cats.png'

import bcrypt from 'bcryptjs';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      hashedPassword: "xxx",
      loginPass: false
    };
    this.authen = this.authen.bind(this);
  }


  authen(event){
    event.preventDefault();
    this.password = event.target['password'].value;
    const theThis = this;

    fetch("http://localhost:3001/username/"+event.target['username'].value)
      .then(response => response.json())
      .then( function (user) {
        // var user = user.replace("_id", "id");
        var inputPassword = theThis.password;//event.target['password'].value;
        bcrypt.compare(inputPassword, user.password, function(err, res) {
          // res === true
          if(res){
            // theThis.setState({loginPass: true});
            theThis.completeLogin(user);
          }
        });
      });
  }

  completeLogin(user){
    this.user = user;
    const theThis = this;
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(function (loginStatus){
        if(loginStatus.login){
          theThis.props.onUpdateLoginData(theThis.user);
        }
      });
  }

  render() {
    let files = this.state.files;
    let style = {
        addFileBtn: {
            'marginTop': '15px',
        },
    };
    return (
        <div className="Login-container">
          <img src={babycats} alt="Smiley face"/>
          <form className="Login-form"  onSubmit={this.authen}>
            <label >Username: </label>
            <input id="username" name="username" type="text" className="Login-input-field"  placeholder="User Name"/>
            <label >Password: </label>
            <input id="password" name="password" type="text" className="Login-input-field"  placeholder="Password"/>
            <button className="Login-button">Login</button>
          </form>
          {this.state.loginPass ? <div>pass</div> : null}
        </div>
    );
  }
}

export default Login;
