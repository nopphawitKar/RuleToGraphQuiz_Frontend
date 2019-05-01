import React, { Component } from 'react';
import { Container, Button, TextInput, Progress, Radios } from "nes-react";
import '../App.css';

import bcrypt from 'bcryptjs';
import {SERVER, SERVER_ADD_USER, URL_HOME,METHOD_POST, HEADER_JSON, ERROR} from '../properties/url.js'
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';

const URL_ADD_NEW_USER = SERVER + SERVER_ADD_USER;
const GENDER = [{value: 'male', label: 'male'}, {value: 'female', label: 'female'}]

class Signup extends Component {
  emptyFeild(){
      toast.error(ERROR + 'Please enter all required fields', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  duplicatedUser(){
      toast.error(ERROR + 'Someone use this username already! Try new username', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: false
    });
  }
  saveProcess(){
    toast.info('Saving data! Pleas wait.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3
    });
  }

  constructor(props){
    super(props);
    this.state = {
      name: "",
      password: "",
      gender: GENDER[0].value,
      age: 1,
      exp: 1,
      programExp: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleSubmit() {
    const data = new FormData();
    if(this.state.name=='' || this.state.password==''){
      this.emptyFeild();
      return;
    }
    this.saveProcess();
    var hashPassword = this.encryptPassword(this.state.password);
    fetch(URL_ADD_NEW_USER, {
      method: METHOD_POST,
      headers: HEADER_JSON,
      body: JSON.stringify({name: this.state.name,
                            password: hashPassword ,
                            gender: this.state.gender,
                            age: this.state.age,
                            exp: this.state.exp + '-' + this.state.programExp
                          })
    })
    .then(response =>
      response.json().then(data => ({
          data: data,
          status: response.status
      }))
    )
    .then(response => {
      // console.log('this.signup ' + response.status)
      window.location.href = URL_HOME;
    })
    .catch((err) => {
      this.duplicatedUser();
    });;
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

  onGenderChange= (genderValue) =>{
    this.setState({gender: genderValue});
    console.log(this.state.gender)
  }

  setAge = e => {
    var age = e.target.value;
    this.setState({age: age});
  }

  setDataAssoExp = e => {
    var exp = e.target.value;
    this.setState({exp: exp});
  }

  setProgramExp  = e => {
    var programExp = e.target.value;
    this.setState({programExp: programExp});
  }

  render() {
    return (

        <div>
          <Container  title='Signup' className='nes-container-center-overwrite'>
            <ToastContainer />
            <TextInput label='username' className='nes-input-text' onChange={this.setUserName}></TextInput>
            <TextInput label='password' className='nes-input-text' onChange={this.setPassword} type='password'></TextInput>
            <div>
              <label>Gender</label>
              <Radios options={GENDER} selectedValue={this.state.gender} onValueChange={this.onGenderChange}></Radios>
            </div>
            <TextInput value={this.state.age} label='age' className='nes-input-number' onChange={this.setAge} type='number' min="0"></TextInput>
            <TextInput value={this.state.programExp} label='How many years have you known programming?'
                className='nes-input-number' onChange={this.setProgramExp} type='number' min="0"></TextInput>

            <TextInput value={this.state.exp} label='How many years have you know data association?'
              className='nes-input-number' onChange={this.setDataAssoExp} type='number' min="0"></TextInput>
            <Button onClick={this.handleSubmit} primary>Save data</Button>
      </Container>
        </div>
    );
  }
}

export default Signup;
