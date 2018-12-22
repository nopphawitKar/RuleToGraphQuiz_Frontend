import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import request from "superagent";
import logo from './logo.svg';
import './App.css';
import Signup from "./Signup.js";
import Login from "./Login.js";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      files: [],
      loginData: {}
    };
    this.onUpdateLoginData = this.onUpdateLoginData.bind(this);
  }

  onUpdateLoginData(userData){
    this.setState({loginData: userData});
  }

  // handleChange(files){
  //   this.setState({
  //     files: files
  //   });
  //   console.log('files' + files[0].name);
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   const data = new FormData(event.target);
  //   console.log(event.target)
  //   fetch('http://localhost:3001/users/create', {
  //     method: 'POST',
  //     headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({name: event.target['username'].value}),
  //   });
  // }

  render() {
    let files = this.state.files;
    let style = {
        addFileBtn: {
            'marginTop': '15px',
        },
    };
    return (
      <div className="App">
        {/*<Signup/>*/}
        <div>{this.state.loginData.username}</div>
        <Login onUpdateLoginData={this.onUpdateLoginData}/>
        {/*<form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Enter username</label>
          <input id="username" name="username" type="text" />
          <button>Send data!</button>
        </form>

         <FilePond allowMultiple={true} server="http://localhost:3001/users/file/upload" name="arfffiles"/>*/}
      </div>
    );
  }
}

export default App;
