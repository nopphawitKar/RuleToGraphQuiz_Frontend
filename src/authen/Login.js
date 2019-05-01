import React, { Component } from 'react';
import '../App.css';
import { Container, Button, TextInput, Progress, Radios } from "nes-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import bcrypt from 'bcryptjs';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';

import * as component_manager from "../resource/util/component.js";
import {SERVER, SERVER_ADD_USER, URL_HOME,METHOD_POST, HEADER_JSON, URL_UNDERSTAND
  , COOKIE_TOKEN_ID, VALIDATION_INFO, VALIDATION_ERROR, VALIDATION_SUCCESS
  , VALIDATION_WARNING, SPACE, MESSAGE, ERROR, ERROR_NOT_MATCH}  from '../properties/url.js';

class Login extends Component {
  loginError(){
    toast.error(ERROR + ERROR_NOT_MATCH, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  loginProcess(){
    toast.info('Logging in! Please wait', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false
    });
  }

  constructor(props){
    // this.loading();
    super(props);
    this.state = {
      name: '',
      password: ''
    };
  }


  authen = () => {
    this.loginProcess();
    var classScope = this;
    const data = new FormData();
    // var hashPassword = this.encryptPassword(this.state.password);
    fetch(SERVER + '/users/authen', {
      method: METHOD_POST,
      headers: HEADER_JSON,
      body: JSON.stringify({name: this.state.name,
                            password: this.state.password
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
          date.setTime(date.getTime() + (12*60*60*1000));//2 hours cookie
          var expires = "expires="+ date.toUTCString();
          document.cookie = COOKIE_TOKEN_ID + "=" + tokenId + ";" + expires + ";path=/";

          window.location.href = URL_UNDERSTAND;
        }
    }).catch(error => {
      this.loginError();
    });
  }

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
        <link rel="stylesheet" type="text/css" href="../../node_modules/react-notifications/dist/react-notifications.css"/>
        <Container  title='Login' className='nes-container-center-overwrite'>
        <ToastContainer />
          <TextInput label='username' className='nes-input-text' onChange={this.setUserName}></TextInput>
          <TextInput label='password' className='nes-input-text' onChange={this.setPassword} type='password'></TextInput>

          <Button onClick={this.authen} primary>Login</Button>
        </Container>
      </div>
    );
  }
}

export default Login;
