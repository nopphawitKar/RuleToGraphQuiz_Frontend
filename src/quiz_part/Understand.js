import React, { Component } from 'react';
import _ from 'lodash';
import '../App.css';
import { Container, Button, TextInput, Progress, Icon } from "nes-react";
import '../../node_modules/nes.css/css/nes.css';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';

import * as plaintextGraph from '../graph_component/Util_plain_text.js';
import * as indenttreeGraph from '../graph_component/Util_indent_tree.js';
import * as indenttagGraph from '../graph_component/Util_indent_tag.js';
import * as tabletoolGraph from '../graph_component/Util_table_tool.js';


import * as componentManager from '../resource/util/component.js';
import * as cookieManager from '../resource/util/cookies.js';
import * as d3LogicManager from '../resource/util/d3Logic.js';
import * as objManager from '../properties/obj_d3.js';
import * as urlManager from '../properties/url.js';

const GRAPH_SERIAL = {
    PLAIN_TEXT: 0,
    INDENTTREE: 1,
    INDENTTAG: 2,
    TABLE_TOOL: 3
}
const COMMAND = "จงเลือก {begin,Popcorn,Softdrink} => {Movie_DVD}";
const DOM_GRAPH_CLASS = ".understandGraph";
var understandRef = this;
var saveTimeChecker = 0;
var clickedNodeCount = 0;

class Understand extends Component {
  canNotSendDataError(){
    toast.error(urlManager.ERROR + 'Cannot send score this time!', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  constructor(props){
    super(props);
    this.state = {
      //central offset
      time: 0,
      mouseCoords: [],
      clickedNodes: {},
      currentGraphType: GRAPH_SERIAL.PLAIN_TEXT,
      currentAnswerClickCount: 0
    };
    this.createGraph = this.createGraph.bind(this);

    this.clearGraph = this.clearGraph.bind(this);
    this.getFormedAnswer = this.getFormedAnswer.bind(this);
  }

  componentDidMount() {
    //set currentGraphType
    var classScope = this;
    var userId = cookieManager.getCookie();
    fetch(urlManager.SERVER + '/users/' + userId + '/getScore', {
      method: urlManager.METHOD_GET,
      headers: urlManager.HEADER_JSON
    })
    .then(response => response.json())
    .then((response)=> {

        var currentGraphType = response.currentGraph + 1;
        classScope.setState({currentGraphType : currentGraphType});
        classScope.createGraph(currentGraphType);
        classScope.timedCount();
        componentManager.addKeyDownListener();

    })
    .catch(function(err) {
      classScope.createGraph(classScope.state.currentGraphType);
      classScope.timedCount();
      componentManager.addKeyDownListener();
    });
  }

  timedCount = () => {
    this.setState({time: ++this.state.time})
    setTimeout(this.timedCount, 1000);
  }
  //create all graph here
  createGraph(currentGraphType){
    var graphData = objManager.UNDERSTAND_DATA;
    if(currentGraphType == GRAPH_SERIAL.PLAIN_TEXT){
      plaintextGraph.create(graphData, DOM_GRAPH_CLASS, this.updateOnGraphClick.bind(this));
    }else if(currentGraphType == GRAPH_SERIAL.INDENTTREE){
      indenttreeGraph.create(graphData, DOM_GRAPH_CLASS, this.updateOnGraphClick.bind(this));
    }else if(currentGraphType == GRAPH_SERIAL.INDENTTAG){
      indenttagGraph.create(graphData, DOM_GRAPH_CLASS, this.updateOnGraphClick.bind(this));
    }else if(currentGraphType == GRAPH_SERIAL.TABLE_TOOL){
      tabletoolGraph.create(graphData, DOM_GRAPH_CLASS, this.updateOnGraphClick.bind(this));
    }
  }

  saveScore = () =>{
    var graphScore = {};
    Object.assign(graphScore, objManager.graphFormat);

    //assign graph score
    graphScore.time = this.state.time;
    graphScore.clickedNodes = this.state.clickedNodes;
    graphScore.keyStroke = componentManager.keycodeString;
    graphScore.heatmap = this.state.mouseCoords;
    //set to understand Form
    var understandForm = {};
    //send post
    understandForm[this.state.currentGraphType] = graphScore;
    //set to quiz Form
    var quizForm = {};
    quizForm.userId = cookieManager.getCookie();
    quizForm.currentQuiz = objManager.FORMAT_UNDERSTAND;
    quizForm.currentGraph = this.state.currentGraphType;
    quizForm.underStand = understandForm;
    var date = new Date();
    quizForm.timeStamp = date.getTime();
    //quizForm.learn = xxx;
    console.log(quizForm);

    const data = new FormData();
    fetch(urlManager.SERVER + '/users/addScore', {
      method: urlManager.METHOD_POST,
      headers: urlManager.HEADER_JSON,
      body: JSON.stringify(quizForm)
    })
    .then(response => (window.location.reload())
    )
    .catch(error => {
      console.log(error);
      this.canNotSendDataError();
    });
    // .then(response => {
    //     if(response.data){
    //       console.log(response.data);
    //       var scoreData = response.data;
    //       this.clearGraph();
    //       var nextGraphType = scoreData.currentGraph + 1;//this.state.currentGraphType + 1;
    //       this.setState({currentGraphType: nextGraphType});
    //       this.createGraph(nextGraphType);
    //     }
    // })

  }

  clearGraph(){
    var graph = document.getElementById("graph");
    graph.innerHTML = '';

    //clear central offset
    this.setState({
      time: 0,
      mouseCoords: []
    });
  }

  getFormedAnswer(node) {
    var nodes = [];

    while(node != null){
      nodes.push(node.data.name);
      node = node.parent;
    }

    nodes = nodes.reverse();
    var answer = nodes.join(objManager.ANSWER_NODE_SEPERATOR);
    answer += objManager.ANSWER_LINE_SEPERATOR;

    return answer;
  }

  updateOnGraphClick(node){
    var clickedNode = d3LogicManager.getClickedNode(node);
    var clickedNodes = this.state.clickedNodes;//[clickedNodeCount] = clickedNode;
    clickedNodes[clickedNodeCount++] = clickedNode;
    this.setState({clickedNodes: clickedNodes});

    if(objManager.ANSWER_UNDERSTANDABILITY == this.getFormedAnswer(node)){//correct!
      this.saveScore();
      // this.clearGraph();
      // var nextGraphType = this.state.currentGraphType + 1;
      // this.setState({currentGraphType: nextGraphType});
      // this.createGraph(nextGraphType);
    }
  }

  onHover = (e) => {
    var target = e.target;
    var rect = target.getBoundingClientRect();
    // console.log("x: " + (e.clientX-rect.left) + "y: "+ (e.clientY-rect.top));
    var x = e.clientX-rect.left;
    var y = e.clientY-rect.top;

    var newCoords = {x: x, y: y};
    var date = new Date();
    var currentTime = date.getTime();
    if(saveTimeChecker == 0 || currentTime > saveTimeChecker + 1000){
      saveTimeChecker = currentTime;

      var newStateCoords = this.state.mouseCoords.concat(newCoords);
      this.setState({mouseCoords: newStateCoords});
      // console.log(newStateCoords)
    }


  }


  render() {
    return (
      <div className="Understand-container">
        <ToastContainer />
        <div className="Understand-test-part">
          <div className="Head-bar">
            <div className="text">Understand</div>
          </div>

          <div className="Question-text">{COMMAND}</div>
          <div id="graph" className="understandGraph" style={{visibility: 'visible'}} onClick={this.onHover} onMouseMove={this.onHover}></div>
        </div>
        <Icon className='timer-icon' icon='trophy' medium></Icon>
        <div className='timer'><p className='text_align_center'>{this.state.time}</p></div>

      </div>
    );
  }
}

export default Understand;
