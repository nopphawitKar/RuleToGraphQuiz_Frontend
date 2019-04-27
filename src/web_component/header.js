import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Balloon, Button } from "nes-react";

import bear from '../resource/image/bear.png'
import '../App.css';
import './header.css';


const SCROLL_TRIGGER_LENGTH = 50;
const CLASS_SHRINK = 'shrink';
const IMG_WIDTH = 100;

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
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



  render() {
    return (
      <div class='header_container'>
        <link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet"/>
        <link href='https://fonts.googleapis.com/css?family=Press Start 2P' rel='stylesheet'/>
        <header id='main_header'>
          <div className='header_name'>
            <img src={bear} width={IMG_WIDTH} height={IMG_WIDTH}/>
              <h1>Visualize Quiz!</h1>
          </div>
          <div className='header_login'>
            {/*<p>Nopphawit</p>*/}
            <Button warning>Login/Signup</Button>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
