import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Balloon, Button } from "nes-react";
import * as cookies from "../resource/util/cookies.js"

import bear from '../resource/image/bear.png'
import lion from '../resource/image/lion.png'
import '../App.css';
import './header.css';


const SCROLL_TRIGGER_LENGTH = 50;
const CLASS_SHRINK = 'shrink';
const IMG_WIDTH = 100;
const BUTTON_LOGIN = 'Signup/Login';
const BUTTON_LOGOUT = 'Logout';
const NO_ONE = '';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'Signup/Login',
      loginStatus: BUTTON_LOGIN,
      loginPass: false
    };

  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.onScroll);
  }

  onScroll= () =>{
    if (document.body.scrollTop > SCROLL_TRIGGER_LENGTH
      || document.documentElement.scrollTop > SCROLL_TRIGGER_LENGTH) {
      document.getElementById("main_header").className = CLASS_SHRINK;
    } else {
      document.getElementById("main_header").className = "";
    }
  }

  setHeaderLogInElement = () => {
    var tokenId = cookies.getCookie();
    if(!tokenId){
      this.setState({username: 'Signup/Login'})
    }
    // var user = cookies.getUserByTokenId(tokenId);
    // if(!user){
    //   return 'Signup/Login';
    // }
    // var userName = user.username;
    // return userName;
    // return Promise.all([cookies.getUserByTokenId(tokenId)])[0]

    cookies.getUserByTokenId(tokenId, this.userNameCallback);
  }
  userNameCallback = (username) => {
    this.setState({username: username})
    this.setState({loginStatus: BUTTON_LOGOUT});
  }

  logout = () => {
    this.props.updateLoginStatus(false);
    cookies.logout();
  }

  render() {
    return (
      <div className='header_container'>
        <link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet"/>
        <link href='https://fonts.googleapis.com/css?family=Press Start 2P' rel='stylesheet'/>
        <header id='main_header'>
          <div className='header_name'>
            <img src={bear} width={IMG_WIDTH} height={IMG_WIDTH}/>
              <h1>Visualize Quiz!</h1>
          </div>
          <div className='header_login'>
            {/*<p>Nopphawit</p>*/}
            <p>Welcome {this.props.loginStatus? this.state.username : NO_ONE}</p>
            <Button onClick={this.logout} warning>{this.props.loginStatus? BUTTON_LOGOUT: BUTTON_LOGIN}</Button>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
