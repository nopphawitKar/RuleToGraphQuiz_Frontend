import * as d3 from "d3";
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

const BOX_WIDTH = 200;
const BOX_HIGHT = 100;
const TEXT_PADDING = BOX_HIGHT / 2;
const ORIGINAL_DEPTH = 0;

const TITLE_HIGHT = 25;
const TITLE_WIDTH = 1000;
// const TITLE_TEXT_LENGTH_LIMIT =
const TITLE_TEXT_INDENT = 20;
const TITLE_TEXT_FIRST = 'คุณลักษณะที่เลือกแล้ว';
const TITLE_TEXT_CHOICE = 'คุณลักษณะที่สามารถเลือกได้';

const COLOR_BOX = '#ffac00';
const COLOR_BOX_CHOICE = 'white';

var selectedCount = 0;
// var xCoordinates = [0];
// var yCoordinates = [0];
// var attributes = [];
var attributes = {};
attributes.xCoordinates = [];
attributes.yCoordinates = [];
attributes.texts = [];

// var graphData = [100,2,3];
// var selectData = ['softdrink', 'cola', 'paper']

export function create(treeData, selector, updater) {
	var margin = {top: 20, right: 90, bottom: 30, left: 90},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

	var treeDataCopy = Object.assign({}, treeData);
	var rootNode = d3.hierarchy(treeDataCopy)

	rootNode.sum(function(d) {
	  // return d.value;
		var fakeValue = 1;
		return fakeValue;
	});

	function initiate(depth) {
		var margin = {top: 20, right: 90, bottom: 30, left: 90},
				width = 960 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

		var	x = scaleLinear().range([0, width]),
	      y = scaleLinear().range([0, height]);

		d3.select(selector).append('svg')
			.attr("width", width + margin.right + margin.left)
			.attr("height", height + margin.top + margin.bottom)
			.append('g')
		  .selectAll('rect')
		  .data(rootNode.descendants())
		  .enter()
			.append('rect')
			.attr('class', 'tabletool_top')
		  .attr('width', function(d) { return BOX_WIDTH})
		  .attr('height', function(d) { return BOX_HIGHT })
			.attr('y', function(d) {return TITLE_HIGHT + 0;})
			// .attr('rx', function(d) {return 20;})
			// .attr('ry', function(d) {return 20;})
			.attr("id", function(d,i){
				console.log(i + ':' + d.data.name+' hierarchy ' + d.depth);
				return "tabletool" + i
			})
			.style("display", function(d) {
		    if (d.depth > depth) {
		      return "none";//nodes whose depth is more than 1 make its vanish
		    }
		  })

			d3.selectAll('g')
			.append('rect')
			.attr('class', 'box_title')
			.attr('width', (d) => { return TITLE_WIDTH})
			.attr('height', (d) => { return TITLE_HIGHT })

			d3.selectAll('g')
			.append('rect')
			.attr('class', 'box_title')
			.attr('y', (d) => { return TITLE_HIGHT + BOX_HIGHT})
			.attr('width', (d) => { return TITLE_WIDTH})
			.attr('height', (d) => { return TITLE_HIGHT })


			//save x y and boxvalue for creating text
			// attributes.xCoordinates = [0]
			// attributes.yCoordinates= [0]
			// attributes.texts = [treeDataCopy.name]
			createBoxTexts(rootNode, true);
	}

	function createTitleText(){
		d3.selectAll('g')
		.append('text')
		.attr('class', 'title_text')
		.attr('alignment-baseline', () => { return 'central';})
		.attr('x', () => { return TITLE_TEXT_INDENT;})
		.attr('y', () => { return TITLE_HIGHT/2;})
		.text(()=>{
			return TITLE_TEXT_FIRST;
		})

		d3.selectAll('g')
		.append('text')
		.attr('class', 'title_text')
		.attr('alignment-baseline', () => { return 'central';})
		.attr('x', () => { return TITLE_TEXT_INDENT;})
		.attr('y', () => { return (1.5 * TITLE_HIGHT) + BOX_HIGHT;})
		.text(()=>{
			return TITLE_TEXT_CHOICE;
		})
	}
	function createBoxTexts(clickedNode, isInitiation){
		//inner fucntion to create HTML
		// fucntion buildParentTitle
		function buildBoxTextsHTML(node, index, clickedNode){
			d3.selectAll('g')
			.append('text')
			.attr('class', 'box_text')
			.attr('text-anchor', () => { return 'middle';})
			.attr('alignment-baseline', () => { return 'central';})
			.attr('x', () => { return (index * BOX_WIDTH) + (BOX_WIDTH/2);})
			.attr('y', () => {
				if(node.depth <= clickedNode.depth){//ancestors and me lvl
					return TITLE_HIGHT + 0 + TEXT_PADDING;
				}else{//children lvl
					return (2 * TITLE_HIGHT) + (1 * BOX_HIGHT) + TEXT_PADDING;
				}
			})
			// .text(()=>{
			// 	// var childrenCount = (node.children)? node.children.length : 0;
			// 	return  node.data.name
			// })
			.html(()=>{
				const TSPAN_HEAD = '<tspan';
				const TSPAN_X = ' x=';
				const TSPAN_Y =' y=';
				const TSPAN_HEAD_CLOSE = '>';
				const TSPAN_TAIL = '</tspan>';
				const TSPAN_GAP = 25;

				var html = '';
				var titleName = node.data.name;
				var title_parts = titleName.split(",");
				var beginOfX = (index * BOX_WIDTH) + (BOX_WIDTH/2);
				var beginOfY = 0;

				if(node.depth <= clickedNode.depth){//ancestors and me lvl
					beginOfY = TITLE_HIGHT + 0 + TEXT_PADDING;

				}else{//children lvl
					beginOfY = (2 * TITLE_HIGHT) + (1 * BOX_HIGHT) + TEXT_PADDING;
				}
				var textSpanYRange = BOX_HIGHT / title_parts.length;
				// var y = beginOfY / title_parts.length
				for(var i=0;i<title_parts.length;i++){
					var y = beginOfY + (i*TSPAN_GAP);
					html += TSPAN_HEAD + TSPAN_X + beginOfX + TSPAN_Y + y + TSPAN_HEAD_CLOSE+ title_parts[i] + (i == title_parts.length -1 ? '':',') + TSPAN_TAIL;
				}
				return  html;
			})
		}

		//create html
		d3.selectAll('text').remove();
		createTitleText();

		var ancestors = getAncestors(clickedNode);
		ancestors.push(clickedNode);
		var children = clickedNode.children || [];
		if(isInitiation){
			children = [];
		}

		ancestors.forEach((ancestor, index) => {
		  buildBoxTextsHTML(ancestor, index, clickedNode);
		});
		children.forEach((child, index) => {
		  buildBoxTextsHTML(child, index, clickedNode);
		});
	}

	function resetCoordinate(depth) {
		d3.selectAll('.tabletool_top')
		.attr('x', (node) => {
			if (node.depth > depth) {
				return;
			}
			return node.x;
		})
		.attr('y', (node) => {
			if (node.depth > depth) {
				return;
			}
			return node.x;
		})
	}

	function getAncestors(node){
		var ancestors = [];
		while(node.parent !== null){
			ancestors.push(node.parent);
			node = node.parent;
		}
		return ancestors.reverse();
	}

	function onTabletoolClick(){
		d3.selectAll('.tabletool_top').on('click', function(d) {
			//update to react parent class
			updater(d);
			//kill same hierarchy when (select)
			var parent = d;
			var ancestors = getAncestors(parent);
			var children = parent.children || [];
			var childDepth = parent.depth + 1;

			createBoxTexts(parent);

			d3.selectAll('.tabletool_top')
			.style('fill', (node) => {
				if(node.depth == childDepth){
					return COLOR_BOX_CHOICE;
				}
				return COLOR_BOX;
			})
			.style("display", (node) => {
				var childIndex = children.findIndex((child, index) => {
					return (child.data.name == node.data.name);
				});
				var isAncestor = ancestors.find((ancestor, index) => {
					return (ancestor.data.name == node.data.name);
				});

				if(node.depth == parent.depth){//parent lvl
					return (node.data.name == parent.data.name ? "" : "none")
				}else if (node.depth < parent.depth) {//ancestors lvl
					if(isAncestor){
						return "";
					}else{
						return "none";
					}
					// return "";
				}else{//child lvl
					if(childIndex > -1 && node.depth == parent.depth +1){
						return "";
					}
					return "none";
				}
			})
			.attr('x', (node) => {
				var childIndex = children.findIndex((child, index) => {
					return (child.data.name == node.data.name);
				});

				if(node.depth <= parent.depth){//parent
					return node.depth * BOX_WIDTH;
				}else if(node.depth == childDepth){//child

					if( childIndex > -1){
						node.x = childIndex * BOX_WIDTH;
					}
					return node.x;
				}else{//grand grand grand ... child
					return 0;
				}
			})
			.attr('y', (node) => {
				var childIndex = children.findIndex((child, index) => {
					return (child.data.name == node.data.name);
				});

				if (node.depth <= parent.depth){//parent and grand grand grand
					return TITLE_HIGHT + 0;
				}else{
					return (2 * TITLE_HIGHT) + BOX_HIGHT;//childDepth * BOX_HIGHT;
				}
			})
		});
	}

	initiate(ORIGINAL_DEPTH);
	onTabletoolClick();
}
