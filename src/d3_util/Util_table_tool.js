import * as d3 from "d3";
import { select } from 'd3-selection';

// var graphData = [100,2,3];
// var selectData = ['softdrink', 'cola', 'paper']

export function create(treeData, selector, updater) {
	var margin = {top: 20, right: 90, bottom: 30, left: 90},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

	var partitionLayout = d3.partition()
	  .size([400, 200]);
	var treeDataCopy = Object.assign({}, treeData);
	var rootNode = d3.hierarchy(treeDataCopy)

	rootNode.sum(function(d) {
	  // return d.value;
		return 100;
	});


	partitionLayout(rootNode);

	function reset(depth){
		d3.select(selector).append('svg')
			.attr("width", width + margin.right + margin.left)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
		  .selectAll('rect')
		  .data(rootNode.descendants())
		  .enter()
		  .append('rect')
			.attr('class', 'tabletool_top')
		  .attr('x', function(d) { return d.x0; })
		  .attr('y', function(d) { return d.y0; })
		  .attr('width', function(d) { return 80; })
		  .attr('height', function(d) { return d.y1 - d.y0; })
			.attr("id", function(d,i){ return "tabletool" + i})
			.style("display", function(d) {
		    if (d.depth > depth) {
		      return "none";//nodes whose depth is more than 1 make its vanish
		    }
		  })
	}
	reset(0);

		d3.selectAll('.tabletool_top').on('click', function(d) {
			//click on a child
			// var clickedX = d3.select(this).attr('x');
			// var clickedY = d3.select(this).attr('y');
			// var siblink = d.parent.children;
			//
			// siblink.forEach((each) => {
			// 	var eachX = each.x0;
			// 	var eachY = each.y0;
			// 	if(clickedX != eachX){
			// 		console.log(each.x0)
			// 	}
			// })

			//click on a parent
			var parent = d;
			d3.selectAll('.tabletool_top')
			.style("display", (node) => {
				if(node.depth == parent.depth && node.x0 != parent.x0){
					return "none";
				}
			})
			 .attr('x', (node) => {
				if(node.depth == parent.depth && node.x0 == parent.x0){
 					return 0;
 				}else{
					return node.x0;
				}
			 })
			var children = d.children || [];
			children.forEach((child) => {
				var childX = child.x0;
				var childDepth = child.depth;
				//show all the clicked node's children
				d3.selectAll('.tabletool_top').style("display", (node) => {
			    if (node.depth == childDepth && node.x0 == childX) {
			      return "";//nodes whose depth is more than 1 make its vanish
			    }
			  })
			})

		  // console.log('x: '+d3.select(this).attr('x')+' y: '+d3.select(this).attr('y')); // Logs the id attribute.
			// console.log(d3.select(this).attr('x'))
			// console.log(d.parent)
		});



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
