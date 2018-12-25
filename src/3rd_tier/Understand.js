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

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      files: [],
      loginData: {},
      catMessage: ""
    };
    this.catSaid = this.catSaid.bind(this);
  }

  catSaid(catMessage){
    this.setState({
      catMessage: catMessage
    })
  }
  randomColor(){

  }

  render() {
    return (
      <div className="Dashboard-container">
        <div class="Head-bar">
          <div class="text">Understand</div>
        </div>
        <div class="Question-text">จงย่อ/ขยายกราฟ</div>
      </div>
    );
  }
}

export default Dashboard;
