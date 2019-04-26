import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import 'filepond/dist/filepond.min.css';
import request from "superagent";
import './App.css';
import Signup from "./2nd_tier/Signup.js";
import Login from "./2nd_tier/Login.js";
import Dashboard from "./2nd_tier/Dashboard.js";

import Understandability from "./3rd_tier/Understand.js";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      files: [],
      loginData: {},
      loginPass: false
    };

    this.onUpdateLoginData = this.onUpdateLoginData.bind(this);
  }

  componentDidMount() {
    var loginData = sessionStorage.getItem('loginData');
    if(loginData!=undefined){
      this.setState({loginData: JSON.parse(loginData)});
    }
  }

  onUpdateLoginData(userData){
    sessionStorage.setItem('loginData', JSON.stringify(userData));
    this.setState({loginData: userData});
    this.setState({loginPass: true})
    window.location.href = "http://localhost:3000/Dashboard/";
    console.log(this.state.loginData)
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
      <link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet"/>
      <link href='https://fonts.googleapis.com/css?family=Press Start 2P' rel='stylesheet'/>
      <Router>
        <div className="App-container">
          <Route exact path="/" render={() => (this.state.loginData==undefined ? (<Login onUpdateLoginData={this.onUpdateLoginData}/>) : (<Dashboard/>))}></Route>
          <Route exact path="/understand" render={() => <Understandability></Understandability>}></Route>
          <Route exact path="/signup" render={() => <Signup></Signup>}></Route>
        </div>
      </Router>
        {/*<Route path="/Dashboard" render={() => (
          this.state.loginData==undefined ? (
            <Redirect to="/"/>
          ) : (
            <Dashboard/>
          )
        )}>
      </Route>*/}
        {/*<Signup/>*/}
        {/*<div>{this.state.loginData.username}</div>
        <Login onUpdateLoginData={this.onUpdateLoginData}/>*/}
        {/*<Dashboard></Dashboard>*/}
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
