import React, { Component } from 'react';
import '../App.css';
import { Container, Button, TextInput, Progress, Radios } from "nes-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import bcrypt from 'bcryptjs';
import {SERVER, SERVER_ADD_USER, URL_HOME,METHOD_POST, HEADER_JSON, URL_UNDERSTAND, COOKIE_TOKEN_ID}  from '../properties/url.js'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {

      name: '',
      password: ''
    };
  }

  // setCookie = (name, value, mins) => {
  //   var date = new Date();
  //   date.setTime(d.getTime() + (mins*60*1000));
  //   var expires = "expires="+ d.toUTCString();
  //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // }
  authen = () => {
    var classScope = this;
    const data = new FormData();
    var hashPassword = this.encryptPassword(this.state.password);
    fetch(SERVER + '/users/authen', {
      method: METHOD_POST,
      headers: HEADER_JSON,
      body: JSON.stringify({name: this.state.name,
                            password: hashPassword ,
                          })
    }).then(response =>
      response.json().then(data => ({
          data: data,
          status: response.status
      }))
    ).then(response => {
        if(response.data){
          var tokenId = response.data._id;
          // console.log(response);

          //set cookie for tokenId
          var mins = 20;
          var date = new Date();
          date.setTime(date.getTime() + (mins*60*1000));
          var expires = "expires="+ date.toUTCString();
          document.cookie = COOKIE_TOKEN_ID + "=" + tokenId + ";" + expires + ";path=/";

          window.location.href = URL_UNDERSTAND;
        }
    }).catch(error => {
      console.log('login page ' + error);
    });
  }


  // if (!response.ok) {
  //       throw Error(response.statusText);
  //   }
  //   return response;

  encryptPassword = (password) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  setUserName = e => {
    this.setState({name: e.target.value});
  }

  setPassword = e => {
    var rawPassword = e.target.value;
    this.setState({password: rawPassword})
  }

  render() {
    return (
      <div>
        <Container  title='Login' className='nes-container-center-overwrite'>
          <TextInput label='username' className='nes-input-text' onChange={this.setUserName}></TextInput>
          <TextInput label='password' className='nes-input-text' onChange={this.setPassword} type='password'></TextInput>

          <Button onClick={this.authen} primary>Login</Button>
        </Container>
      </div>
    );
  }
}

export default Login;
