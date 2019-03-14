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

import * as indenttreeGraph from '../d3_util/Util_indent_tree.js'; 
import * as indenttagGraph from '../d3_util/Util_indent_tag.js'; 
import * as tabletoolGraph from '../d3_util/Util_table_tool.js'; 

import {GRAPH_MAX_PROGRESS_COUNT, ANSWER_UNDERSTANDABILITY, understand_data} from '../data_obj/obj_d3.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlay, faCheckCircle } from '@fortawesome/free-solid-svg-icons'



class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginData: {},

      // progress: [{name: "indenttreeGraph", complete: false},{name: "indenttag", complete: false},{name: "tabletool", complete: false}],
      progress: [],
      // indentTree: false,
      // indentTag: false,
      // tabletool: false,
      graph: [false,false,false,false],
      graphType: 1,

      currentAnswerClickCount: 0
    };
    this.createGraph = this.createGraph.bind(this);
    this.createIndentTree = this.createIndentTree.bind(this);
    this.createIndentTag = this.createIndentTag.bind(this);
    this.createTableTool = this.createTableTool.bind(this);

    this.clearGraph = this.clearGraph.bind(this);
    this.updateOnGraphClick = this.updateOnGraphClick.bind(this);
    this.renderProgressbar = this.renderProgressbar.bind(this);
    this.updateGraphBoxHover = this.updateGraphBoxHover.bind(this);
  }

  componentDidMount() {
    //set 1st graph
    this.createGraph(3);
    // this.createIndentTag();
    var {loginData, progress, indentTree, indentTag, tabletool, currentAnswerClickCount} = this.state;
    this.setState({progress:[{name: "indenttreeGraph", complete: indentTree},
      {name: "indenttag", complete: indentTag},
      {name: "tabletool", complete: tabletool}]}
    )
  }

  createGraph(graphType){
    if(graphType == 1){
      this.createIndentTree();
    }else if(graphType == 2){
      this.createIndentTag();
    }else{
      this.createTableTool();
    }
  }

  createIndentTree(){
    var graphData = understand_data;
    indenttreeGraph.create(graphData, ".understandGraph", this.updateOnGraphClick.bind(this));
  }

  createIndentTag(){
    var graphData = understand_data;
    indenttagGraph.create(graphData, ".understandGraph", this.updateOnGraphClick.bind(this));
  }

  createTableTool(){
    var graphData = understand_data;
    tabletoolGraph.create(graphData, ".understandGraph", this.updateOnGraphClick.bind(this));
  }

  clearGraph(){
    var graph = document.getElementById("graph");
    graph.innerHTML = '';
  }

  updateOnGraphClick(node){
    console.log(node.data.name)
    var trueAnswer = ANSWER_UNDERSTANDABILITY;
    if(trueAnswer == node.data.name){
      if(this.state.currentAnswerClickCount == 1){
        //send post to save
        this.setState({currentAnswerClickCount: 0})

        this.clearGraph();
        //check GRAPH TYPE
        var graphType = this.state.graphType;
        this.setState({graphType: ++graphType})
        this.createGraph(graphType);
      }else{
        this.setState({currentAnswerClickCount: ++this.state.currentAnswerClickCount})
      }
    }
  }

  updateGraphBoxHover(e){
    // console.log("x: " + e.screenX + "y: "+ e.screenY);
  }

  renderProgressbar(){
      return this.state.progress.map((item,i) => <div className="Understand-progress-bar"> <FontAwesomeIcon icon={faCheckCircle} size="lg"/> {item.name}  </div>)
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
        <div className="Understand-progress-box">
          {this.renderProgressbar()}
        </div>

      </div>
    );
  }
}

export default Dashboard;
