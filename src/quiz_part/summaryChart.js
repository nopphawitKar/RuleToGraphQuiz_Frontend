import React, { Component } from 'react';
import '../App.css';
import { Container, Button, TextInput, Progress, Radios } from "nes-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import '../../node_modules/react-toastify/dist/ReactToastify.css';

import * as component_manager from "../resource/util/component.js";
import * as urlManager  from '../properties/url.js';
import * as cookieManager  from '../resource/util/cookies.js';
const data = [
    {name: 'Page A', uv: 4000},
    {name: 'Page B', uv: 3000},
    {name: 'Page C', uv: 2000},
    {name: 'Page D', uv: 2780},
    {name: 'Page E', uv: 1890},
    {name: 'Page F', uv: 2390},
    {name: 'Page G', uv: 3490},
  ];

class SummaryChart extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      password: ''
    };
  }

  componentDidMount() {
    //return to home if dont login
    if(!cookieManager.getCookie()){
      window.location = urlManager.URL_HOME;
    }

    if(!cookieManager.getCookie()){
      window.location = urlManager.URL_HOME;
    }
    //set currentGraphType
    var classScope = this;
    var userId = cookieManager.getCookie();
    fetch(urlManager.SERVER + '/users/' + userId + '/getAllScores', {
      method: urlManager.METHOD_GET,
      headers: urlManager.HEADER_JSON
    })
    .then(response => response.json())
    .then((response)=> {

        if(response.length < 8){
          window.location = urlManager.URL_UNDERSTAND;
        }

    })
    .catch((err) => {
      console.log(err)
    });


  }

  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="../../node_modules/react-notifications/dist/react-notifications.css"/>
        <Container className='nes-container-center-overwrite'>
          <div>Quiz end here! Ty so much!</div>
        </Container>
          {/*<BarChart width={1000} height={1000} data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="name"/>
           <YAxis/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>*/}

      </div>
    );
  }
}

export default SummaryChart;
