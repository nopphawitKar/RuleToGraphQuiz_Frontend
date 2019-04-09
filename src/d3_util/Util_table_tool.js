import * as d3 from "d3";
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

const BOX_WIDTH = 100;
const BOX_HIGHT = 100;
const ORIGINAL_DEPTH = 0;

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
		  .attr('width', function(d) { /*return x(d.x1 - d.x0); }*/return BOX_WIDTH})
		  .attr('height', function(d) { /*return y(d.y1 - d.y0);*/return BOX_HIGHT })
			.attr("id", function(d,i){ return "tabletool" + i})
			.style("display", function(d) {
		    if (d.depth > depth) {
		      return "none";//nodes whose depth is more than 1 make its vanish
		    }
		  })
			//save x y and boxvalue for creating text
			attributes.xCoordinates = [0]
			attributes.yCoordinates= [0]
			attributes.texts = [treeDataCopy.name]
			createBoxTexts()
	}

	function createBoxTexts(){
		d3.selectAll('text').remove();
		attributes.xCoordinates.forEach((data, index) => {
			d3.selectAll('g')
			.append('text')
			.attr('x', (node) => {
				return attributes.xCoordinates[index] + 10;//10px padding
			})
			.attr('y', (node) => {
				return attributes.yCoordinates[index] + 10;//10px padding
			})
			.text(()=>{
				return attributes.texts[index];
			})
		});
	}

	function resetBoxTexts(){
		attributes.xCoordinates = [0]
		attributes.yCoordinates= [0]
		attributes.texts = [treeDataCopy.name]
		createBoxTexts()
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
		return ancestors;
	}

	function onTabletoolClick(){
		resetBoxTexts();
		d3.selectAll('.tabletool_top').on('click', function(d) {
			//kill same hierarchy when (select)
			var parent = d;
			var parentDepth = d.depth;

			var ancestors = getAncestors(parent);

			var children = parent.children || [];
			// var childCounter = 0;
			var childDepth = parentDepth + 1;

			d3.selectAll('.tabletool_top')
			.style("display", (node) => {
				var childIndex = children.findIndex((child, index) => {
					return (child.data.name == node.data.name);
				});
				var isAncestor = ancestors.find((ancestor, index) => {
					return (ancestor.data.name == node.data.name);
				});

				if(node.depth == parentDepth){//parent lvl
					return (node.data.name == parent.data.name ? "" : "none")
				}else if (node.depth < parentDepth) {//ancestors lvl
					if(isAncestor){
						return "";
					}else{
						return "none";
					}
					// return "";
				}else{//child lvl
					if(childIndex > -1){
						return "";
					}
					return "none";
				}
			})
			.attr('x', (node) => {
				var childIndex = children.findIndex((child, index) => {
					return (child.data.name == node.data.name);
				});

				if(node.depth <= parent.depth){//parent and grand grand grand
					return node.depth * BOX_WIDTH
				}else if(node.depth == childDepth){//child

					if( /*node.data.name == childName*/childIndex > -1){

						node.x = childIndex * BOX_WIDTH;
						//save x y and boxvalue for creating text
						attributes.xCoordinates.push(node.x)
						// return node.x;
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

				if (node.depth <= parentDepth){//parent and grand grand grand
					return 0;
				}else{
					if(childIndex > -1){
						//save x y and boxvalue for creating text
						attributes.yCoordinates.push(BOX_HIGHT)
						attributes.texts.push(node.data.name)
					}
					return BOX_HIGHT;//childDepth * BOX_HIGHT;
				}
			})
			createBoxTexts();
		});
	}

	initiate(ORIGINAL_DEPTH);
	onTabletoolClick();
}
