import React, { Component } from 'react';
import _ from 'lodash';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import request from "superagent";
import '../App.css';

import * as indenttreeGraph from '../graph_component/Util_indent_tree.js';
import * as indenttagGraph from '../graph_component/Util_indent_tag.js';
import * as tabletoolGraph from '../graph_component/Util_table_tool.js';

import {GRAPH_MAX_PROGRESS_COUNT, ANSWER_NODE_SEPERATOR, ANSWER_LINE_SEPERATOR,
  ANSWER_UNDERSTANDABILITY, UNDERSTAND_DATA}
  from '../properties/obj_d3.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlay, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const GRAPH_SERIAL = {
    PLAIN_TEXT: 0,
    INDENTTREE: 1,
    INDENTTAG: 2,
    TABLE_TOOL: 3
}

class Understand extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginData: {},

      progress: [],
      currentGraphType: GRAPH_SERIAL.INDENTTREE,

      currentAnswerClickCount: 0
    };
    this.createGraph = this.createGraph.bind(this);
    this.createIndentTree = this.createIndentTree.bind(this);
    this.createIndentTag = this.createIndentTag.bind(this);
    this.createTableTool = this.createTableTool.bind(this);

    this.clearGraph = this.clearGraph.bind(this);
    this.getFormedAnswer = this.getFormedAnswer.bind(this);
    this.updateOnGraphClick = this.updateOnGraphClick.bind(this);
    this.renderProgressbar = this.renderProgressbar.bind(this);
    this.updateGraphBoxHover = this.updateGraphBoxHover.bind(this);
  }

  componentDidMount() {
    //set 1st graph
    this.createGraph(this.state.currentGraphType);
    // this.createIndentTag();
    var {loginData, progress, indentTree, indentTag, tabletool, currentAnswerClickCount} = this.state;
    this.setState({progress:[{name: "indenttreeGraph", complete: indentTree},
      {name: "indenttag", complete: indentTag},
      {name: "tabletool", complete: tabletool}]}
    )
  }
  //create all graph here
  createIndentTree(){
    var graphData = UNDERSTAND_DATA;
    indenttreeGraph.create(graphData, ".understandGraph", this.updateOnGraphClick.bind(this));
  }

  createIndentTag(){
    var graphData = UNDERSTAND_DATA;
    indenttagGraph.create(graphData, ".understandGraph", this.updateOnGraphClick.bind(this));
  }

  createTableTool(){
    var graphData = UNDERSTAND_DATA;
    tabletoolGraph.create(graphData, ".understandGraph", this.updateOnGraphClick.bind(this));
  }

  createGraph(currentGraphType){
    if(currentGraphType == GRAPH_SERIAL.INDENTTREE){
      this.createIndentTree();
    }else if(currentGraphType == GRAPH_SERIAL.INDENTTAG){
      this.createIndentTag();
    }else if(currentGraphType == GRAPH_SERIAL.TABLE_TOOL){
      this.createTableTool();
    }
  }

  clearGraph(){
    var graph = document.getElementById("graph");
    graph.innerHTML = '';
  }

  getFormedAnswer(node) {
    var nodes = [];

    while(node != null){
      nodes.push(node.data.name);
      node = node.parent;
    }

    nodes = nodes.reverse();
    var answer = nodes.join(ANSWER_NODE_SEPERATOR);
    answer += ANSWER_LINE_SEPERATOR;

    return answer;
  }

  updateOnGraphClick(node){

    if(ANSWER_UNDERSTANDABILITY == this.getFormedAnswer(node)){//correct!
      this.clearGraph();
      var nextGraphType = this.state.currentGraphType + 1;
      this.setState({currentGraphType: nextGraphType});
      this.createGraph(nextGraphType);
    }
  }

  updateGraphBoxHover(e){
    // console.log("x: " + e.screenX + "y: "+ e.screenY);
  }

  renderProgressbar(){
      // return this.state.progress.map((item,i) => <div className="Understand-progress-bar"> <FontAwesomeIcon icon={faCheckCircle} size="lg"/> {item.name}  </div>)
  }

  render() {
    return (
      <div className="Understand-container">

        <div className="Understand-test-part">
          <div className="Head-bar">
            <div className="text">Understand</div>
          </div>
          <div className="Question-text">จงย่อและขยายกราฟอย่างละหนึ่งครั้ง</div>
          <div id="graph" className="understandGraph" style={{visibility: 'visible'}} onMouseMove={this.updateGraphBoxHover}></div>
        </div>
        {/*
          <div className="Understand-progress-box">
            {this.renderProgressbar()}
          </div>
        */}

      </div>
    );
  }
}

export default Understand;
