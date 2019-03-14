import * as d3 from "d3";
import { select } from 'd3-selection';

var graphData = [100,2,3];
// var selectData = ['softdrink', 'cola', 'paper']

export function create(treeData, selector, updater) {
	var margin = {top: 20, right: 90, bottom: 30, left: 90},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;


	var selectData = treeData.name;

	var select = d3.select(selector)
				.append("div")
					.attr("width", width + margin.right + margin.left)
					.attr("height", height + margin.top + margin.bottom)
				.append('select')
					.attr('class','select')
				.on('change',onchange);

	var options = select
				.selectAll('option')
				.data(selectData).enter()
				.append('option')
				.text(function (d) { return d; });
				
	d3.select(selector)
	  .append("div")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)

	  .selectAll("div")
	  .data(graphData)
	    .enter()

	    .append("div")
	    .attr("class", "block")
	    // .style("width", function(d) { return d + "px"; })
	    .style("width", function(d) { return 100 + "px"; })
	    .style("height", function(d) { return "50px"; })
	    .on('click',onBlockClick)
	    .text(function(d) { return d; });


	    function onBlockClick(){
	    	
	    }

}
