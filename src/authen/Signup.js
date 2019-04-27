import React, { Component } from 'react';
import { Container, Button, TextInput, Progress, Radios } from "nes-react";
import '../App.css';

import bcrypt from 'bcryptjs';
import {SERVER, SERVER_ADD_USER, URL_HOME,METHOD_POST, HEADER_JSON} from '../properties/url.js'

const URL_ADD_NEW_USER = SERVER + SERVER_ADD_USER;
const GENDER = [{value: 'male', label: 'male'}, {value: 'female', label: 'female'}]

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      password: "",
      gender: GENDER[0].value,
      age: 0,
      exp: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }





  handleSubmit() {
    const data = new FormData();
    var hashPassword = this.encryptPassword(this.state.password);
    fetch(URL_ADD_NEW_USER, {
      method: METHOD_POST,
      headers: HEADER_JSON,
      body: JSON.stringify({name: this.state.name,
                            password: hashPassword ,
                            gender: this.state.gender,
                            age: this.state.age,
                            exp: this.state.exp
                          })
    }).then(response => {window.location.href = URL_HOME;});
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

  render() {
    return (

        <div>
          <Container  title='Signup' className='nes-container-center-overwrite'>
            <TextInput label='username' className='nes-input-text' onChange={this.setUserName}></TextInput>
            <TextInput label='password' className='nes-input-text' onChange={this.setPassword} type='password'></TextInput>
            <div>
              <label>Gender</label>
              <Radios options={GENDER} selectedValue={this.state.gender} onValueChange={this.onGenderChange}></Radios>
            </div>
            <TextInput value={this.state.age} label='age' className='nes-input-number' onChange={this.setAge} type='number'></TextInput>
            <TextInput value={this.state.exp} label='How many years have you know data association?'
              className='nes-input-number' onChange={this.setDataAssoExp} type='number'></TextInput>
            <Button onClick={this.handleSubmit} primary>Save data</Button>
      </Container>
        </div>
    );
  }
}

export default Signup;
