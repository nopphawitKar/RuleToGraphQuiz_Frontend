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

const MAX_QUESTION = 10;
const MAX_GRAPH = 8;
var questionCount = 0;
const START_OF_LEARNABILITY = 4;
const GRAPH_SERIAL = {
    PLAIN_TEXT: 0,
    INDENTTREE: 1,
    INDENTTAG: 2,
    TABLE_TOOL: 3,
    L_PLAIN: 4,
    L_INDENTTREE: 5,
    L_INDENTTAG: 6,
    L_TABLE_TOOL: 7
}
const COMMAND = "จงเลือก ";
// var currentQuestionText = '';
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

  saveProcess(){
    toast.info('Saving data! Pleas wait.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false
    });
  }

  correctProcess(){
    toast.success('Correct! Next Question!', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  wrongProcess(){
    toast.error('Wrong! Try again!', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  loading(){
    toast.info('Loading!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2
    });
  }

  constructor(props){
    super(props);
    this.state = {
      //central offset
      time: 0,
      clickedNodes: {},
      hoverObjs: [],
      currentGraphType: GRAPH_SERIAL.PLAIN_TEXT,
      currentAnswerClickCount: 0,
      currentQuestionText: ''
    };
    this.createGraph = this.createGraph.bind(this);

    this.clearGraph = this.clearGraph.bind(this);
    this.getFormedAnswer = this.getFormedAnswer.bind(this);
  }

  componentWillMount(){
    this.loading();
  }
  componentDidMount() {
    //return to home if dont log
    var userId = cookieManager.getCookie();
    if(!userId){
      window.location = urlManager.URL_HOME;
    }
    //if u already done the question back to summary
    fetch(urlManager.SERVER + '/users/' + userId + '/getAllScores', {
      method: urlManager.METHOD_GET,
      headers: urlManager.HEADER_JSON
    })
    .then(response => response.json())
    .then((response)=> {

        if(response.length == MAX_GRAPH){
          window.location = urlManager.URL_SUMMARY;
        }

    })
    .catch((err) => {
      console.log(err)
    });
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

        var isUnderstand = this.isUnderstand(currentGraphType);
        var initiateQuestion = (isUnderstand)? objManager.ANSWER_UNDERSTANDABILITY: objManager.ANSWER_LEARNABILITY[0];
        this.setState({
          currentQuestionText: componentManager.changeSecretToQuestion(initiateQuestion)
        })

        classScope.setState({currentGraphType : currentGraphType});
        classScope.createGraph(currentGraphType);
        componentManager.addKeyDownListener();

    })
    .catch((err) => {
      this.setState({
        currentQuestionText: componentManager.changeSecretToQuestion(objManager.ANSWER_UNDERSTANDABILITY)
      })
      classScope.createGraph(classScope.state.currentGraphType);
      // classScope.timedCount();
      componentManager.addKeyDownListener();
    });
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


    }else if(currentGraphType == GRAPH_SERIAL.L_PLAIN){
      var graphData = objManager.LEARN_DATA;
      plaintextGraph.create(graphData, DOM_GRAPH_CLASS, this.updateOnGraphClick.bind(this));
    }else if(currentGraphType == GRAPH_SERIAL.L_INDENTTREE){
      var graphData = objManager.LEARN_DATA;
      indenttreeGraph.create(graphData, DOM_GRAPH_CLASS, this.updateOnGraphClick.bind(this), null, 700);
    }else if(currentGraphType == GRAPH_SERIAL.L_INDENTTAG){
      var graphData = objManager.LEARN_DATA;
      indenttagGraph.create(graphData, DOM_GRAPH_CLASS, this.updateOnGraphClick.bind(this));
    }else if(currentGraphType == GRAPH_SERIAL.L_TABLE_TOOL){
      var graphData = objManager.LEARN_DATA;
      tabletoolGraph.create(graphData, DOM_GRAPH_CLASS, this.updateOnGraphClick.bind(this));
    }
  }

  saveScore = (isLearnability) =>{
    this.saveProcess();

    var graphScore = {};
    Object.assign(graphScore, objManager.graphFormat);

    //assign graph score
    graphScore.time = this.state.time;
    graphScore.clickedNodes = this.state.clickedNodes;
    graphScore.keyStroke = componentManager.keycodeString;
    graphScore.heatmap = this.state.hoverObjs;
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
  }

  clearGraph(){
    var graph = document.getElementById("graph");
    graph.innerHTML = '';

    //clear central offset
    this.setState({
      time: 0
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
  isUnderstand = (graphType) => {
    if(graphType < START_OF_LEARNABILITY){
      return true;
    }
    return false;
  }
  changeQuestionText = () => {
    var secret = objManager.ANSWER_UNDERSTANDABILITY;
    var currentGraphType = this.state.currentGraphType;
    if(!this.isUnderstand(currentGraphType)){
      secret = objManager.ANSWER_LEARNABILITY[questionCount];
    }
    this.setState({
      currentQuestionText: componentManager.changeSecretToQuestion(secret)
    })
  }
  updateOnGraphClick(node, hoverObjs){
    console.log(node);
    var clickedNode = d3LogicManager.getClickedNode(node);
    var clickedNodes = this.state.clickedNodes;//[clickedNodeCount] = clickedNode;
    clickedNodes[clickedNodeCount++] = clickedNode;
    this.setState({clickedNodes: clickedNodes});
    this.setState({hoverObjs: hoverObjs});
    // this.setState({time: time});

    var IS_UNDERSTAND = this.isUnderstand(this.state.currentGraphType);

    if(IS_UNDERSTAND && objManager.ANSWER_UNDERSTANDABILITY == this.getFormedAnswer(node)){//correct!
      this.changeQuestionText();
      this.saveScore();
    }else if(!IS_UNDERSTAND){
      // console.log(objManager.ANSWER_LEARNABILITY[questionCount])
      if(objManager.ANSWER_LEARNABILITY[questionCount] == this.getFormedAnswer(node)){
        if(questionCount < MAX_QUESTION-1){
          this.correctProcess();
          questionCount++;
          this.changeQuestionText();
          window.scrollTo(0, 0);
        }else{
          this.saveScore();
        }
      }
    }
  }


  render() {
    return (
      <div className="Understand-container">
        <ToastContainer />
        <div className="Understand-test-part">
          <div className="Head-bar">
            <div className="text">{COMMAND + this.state.currentQuestionText}</div>
          </div>
          {/*}<div className="Question-text">{COMMAND + this.state.currentQuestionText}</div>*/}
          <div id="graph" className="understandGraph" style={{visibility: 'visible'}} ></div>
        </div>
        {/*<Icon className='timer-icon' icon='trophy' medium></Icon>*/}
        <div className='timer'><p className='text_align_center'>{this.state.time}</p></div>

      </div>
    );
  }
}

export default Understand;
