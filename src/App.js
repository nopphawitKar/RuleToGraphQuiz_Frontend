import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import Header from './web_component/header.js'


import Signup from "./authen/Signup.js";
import Login from "./authen/Login.js";
import Dashboard from "./authen/Dashboard.js";

import Understandability from "./quiz_part/Understand.js";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginStatus: false,
      files: [],
      loginData: {},
      loginPass: false
    };

    // this.onUpdateLoginData = this.onUpdateLoginData.bind(this);
    this.updateLoginStatus = this.updateLoginStatus.bind(this);
  }

  componentDidMount() {
    
  }

  updateLoginStatus(isLogin) {
    this.setState({loginStatus: isLogin});
  }

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
        <Header updateLoginStatus={this.updateLoginStatus} loginStatus={this.state.loginStatus}></Header>
        <Router>
          <div className="App-container">
            <Route exact path="/" render={() => <Dashboard updateLoginStatus={this.updateLoginStatus} loginStatus={this.state.loginStatus}></Dashboard>}></Route>
            <Route exact path="/understand" render={() => <Understandability></Understandability>}></Route>
            <Route exact path="/signup" render={() => <Signup></Signup>}></Route>
          </div>
        </Router>


      {/**/}

      </div>
    );
  }
}

export default App;
