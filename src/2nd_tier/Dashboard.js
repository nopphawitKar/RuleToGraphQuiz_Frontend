import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import request from "superagent";
import '../App.css';
import gankstercat from '../image/gankster_cat.png'
import swatcat from '../image/swatcat.png'
import salidcat from '../image/salid_cat.png'
import babycats from '../image/baby_cats.png'
import gankster_cat4 from '../image/gankster_cat4.gif'

const HEADER_UNDERSTANDABILITY = "understandability test";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      files: [],
      loginData: {},
      catMessage: ""
    };
    this.catSaid = this.catSaid.bind(this);
    this.onCatClick = this.onCatClick.bind(this);
  }

  catSaid(catMessage){
    this.setState({
      catMessage: catMessage
    })

  }

  onCatClick(selectedMenu){
    if(selectedMenu === HEADER_UNDERSTANDABILITY){
      window.location.href = "http://localhost:3000/understand"
    }
  }

  randomColor(){

  }

  render() {
    return (
      <div className="Dashboard-container">


      </div>
    );
  }
}

export default Dashboard;
