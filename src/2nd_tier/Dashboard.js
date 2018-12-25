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
        <img src={gankster_cat4} alt="Smiley face" usemap="#catMap"/>
        <div class="Dashboard-overlay">
          <div class="text">{this.state.catMessage}</div>
        </div>
        <map name="catMap">
          {/*salid*/}
          <area onMouseOver={() => this.catSaid(HEADER_UNDERSTANDABILITY)} onClick={() => this.onCatClick(HEADER_UNDERSTANDABILITY)} coords="0,872,273,360" shape="rect"/>
          <area onMouseOver={() => this.catSaid(HEADER_UNDERSTANDABILITY)} onClick={() => this.onCatClick(HEADER_UNDERSTANDABILITY)} coords="363,807,273,552" shape="rect"/>
          <area onMouseOver={() => this.catSaid(HEADER_UNDERSTANDABILITY)} onClick={() => this.onCatClick(HEADER_UNDERSTANDABILITY)} coords="364,765,487,832,240,507" shape="rect"/>
          <area onMouseOver={() => this.catSaid(HEADER_UNDERSTANDABILITY)} onClick={() => this.onCatClick(HEADER_UNDERSTANDABILITY)} coords="271,459,290,552" shape="rect"/>

          {/*swat*/}
          <area onMouseOver={() => this.catSaid("ประวัติส่วนตัว")} coords="258,8,510,359" shape="rect"/>
          <area onMouseOver={() => this.catSaid("ประวัติส่วนตัว")} coords="290,358,646,508" shape="rect"/>
          <area onMouseOver={() => this.catSaid("ประวัติส่วนตัว")} coords="289,507,554,552" shape="rect"/>
          <area onMouseOver={() => this.catSaid("ประวัติส่วนตัว")} coords="509,279,642,358" shape="rect"/>
          <area onMouseOver={() => this.catSaid("ประวัติส่วนตัว")} coords="273,362,291,458" shape="rect"/>
          <area onMouseOver={() => this.catSaid("ประวัติส่วนตัว")} coords="362,552,515,590" shape="rect"/>
          <area onMouseOver={() => this.catSaid("ประวัติส่วนตัว")} coords="363,590,397,766" shape="rect"/>
          <area onMouseOver={() => this.catSaid("ประวัติส่วนตัว")} coords="397,710,476,767" shape="rect"/>

          {/*gankster*/}
          <area onMouseOver={() => this.catSaid("understandability test")} coords="649,290,927,500" shape="rect"/>
          <area onMouseOver={() => this.catSaid("understandability test")} coords="703,501,877,559" shape="rect"/>

          {/*kids*/}
          <area onMouseOver={() => this.catSaid("statistic")} coords="488,590,1069,846" shape="rect"/>
          <area onMouseOver={() => this.catSaid("statistic")} coords="555,507,702,589" shape="rect"/>
          <area onMouseOver={() => this.catSaid("statistic")} coords="398,590,487,709" shape="rect"/>
          <area onMouseOver={() => this.catSaid("statistic")} coords="704,559,838,591" shape="rect"/>
          <area onMouseOver={() => this.catSaid("statistic")} coords="951,546,1067,591" shape="rect"/>
        </map>
      </div>
    );
  }
}

export default Dashboard;
