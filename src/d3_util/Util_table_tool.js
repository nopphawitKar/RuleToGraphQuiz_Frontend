import * as d3 from "d3";
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

const BOX_WIDTH = 100;
const BOX_HIGHT = 100;
const ORIGINAL_DEPTH = 0;

var selectedCount = 0;
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
			.append("g")
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


	function onTabletoolClick(){
		d3.selectAll('.tabletool_top').on('click', function(d) {
			//kill same hierarchy when (select)
			var parent = d;
			d3.selectAll('.tabletool_top')
			.style("display", (node) => {
				if(node.depth == parent.depth && node.data.name != parent.data.name){
					return "none";
				}
			})
			.attr('x', (node) => {
				if(node.depth == parent.depth && node.data.name == parent.data.name){
					return node.depth * BOX_WIDTH
				}
			})
			.attr('y', (node) => {
				if(node.depth == parent.depth && node.data.name == parent.data.name){
					return 0
				}
			})

			//show all children
			var children = d.children || [];
			var childCounter = 0;
			children.forEach((child) => {
				var childName = child.data.name;
				var childDepth = child.depth;
				//show all the clicked node's children
				d3.selectAll('.tabletool_top')
				.style("display", (node) => {
			    if (node.depth == childDepth && node.data.name == childName) {
			      return "";
			    }
			  })
				.attr('x', (node) => {
					if (node.depth == childDepth && node.data.name == childName) {
						node.x = childCounter * BOX_WIDTH;
			      return childCounter * BOX_WIDTH;
			    }
					return node.x;
				})
				.attr('y', (node) => {
					if (node.depth == childDepth && node.data.name == childName) {
						node.y = childDepth * BOX_HIGHT;
			      return childDepth * BOX_HIGHT;
			    }
					return node.y;
				})
				childCounter++;
			})
		});
	}

	initiate(ORIGINAL_DEPTH);
	onTabletoolClick();


	// var margin = {top: 20, right: 90, bottom: 30, left: 90},
	// 	    width = 960 - margin.left - margin.right,
	// 	    height = 500 - margin.top - margin.bottom;
	//
	//
	// var selectData = treeData.name;
	//
	// var select = d3.select(selector)
	// 			.append("div")
	// 				.attr("width", width + margin.right + margin.left)
	// 				.attr("height", height + margin.top + margin.bottom)
	// 			.append('select')
	// 				.attr('class','select')
	// 			.on('change',onchange);
	//
	// var options = select
	// 			.selectAll('option')
	// 			.data(selectData).enter()
	// 			.append('option')
	// 			.text(function (d) { return d; });
	//
	// d3.select(selector)
	//   .append("div")
	// 	.attr("width", width + margin.right + margin.left)
	// 	.attr("height", height + margin.top + margin.bottom)
	//
	//   .selectAll("div")
	//   .data(selectData)
	//     .enter()
	//
	//     .append("div")
	//     .attr("class", "block")
	//     // .style("width", function(d) { return d + "px"; })
	//     .style("width", function(d) { return 100 + "px"; })
	//     .style("height", function(d) { return "50px"; })
	//     .on('click',onBlockClick)
	//     .text(function(d) { return d; });
	//
	//
	//     function onBlockClick(){
	//
	//     }
}
