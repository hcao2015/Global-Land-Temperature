$(document).ready(function(){
var margin = {top: 30, right:150, bottom:50, left:30},
	w = 1100 - margin.left - margin.right,
	h = 600 - margin.top - margin.bottom,
	xScale = d3.scale.linear().range([0,w]).domain([1,12]),
	xAxis = d3.svg.axis().scale(xScale).orient("bottom");
	
//Container of main graph
var svg = d3.select("#bubble").append("svg")
			 .attr("width", w + margin.left + margin.right)
    		.attr("height", h + margin.top + margin.bottom)
			.append("g")
     		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
	svg.append("svg:g")
	    .attr("class", "x axis")
		.attr("stroke","#eee")
		.attr("transform", "translate(0," + h + ")")
		.call(xAxis);

// axis label
	svg.append("text")
    .attr("class", "axis_label")
    .attr("text-anchor", "end")
    .attr("x", w)
    .attr("y", h - 6)
	.attr("fill","#eee");
	
var months = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"],
regions = ["Africa","Asia","Europe","North America","Oceania","South America"],
gridPlot = Math.floor(w/12);

//year label
	var aside = d3.select("#bubble").append("svg")
			 .attr("width", 400)
    		.attr("height", 300);


var colors={"Africa":"#488FB7","Asia":"#F39308","Europe":"#A1C51C","North America":"#A166B7","South America":"#cd383f",
			"Oceania":"#eae583"};
var matching = {"Africa":40,"Asia":120,"Europe":200,"North America":280,"Oceania":360,"South America":440};
var column = svg.selectAll(".region")
			.data(regions).enter().append("text").attr("class","col_label")
			.text(function(d){return d;}).attr("x",w)
			.attr("y", function(d,i){ return i* gridPlot; })
            .attr("transform", "translate(40," + gridPlot / 1.2 + ")").attr("fill", "#eee");
var div = d3.select("#bubble").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

var NumFloat = d3.format(".3f");
d3.csv("regions.csv", function(csv) {

		var g = svg.append("g").attr("class","circles");

		var circles = g.selectAll("circle")
			.data(year_data(2013))
			.enter()
			.append("circle").attr("class","circle")
			.call(properties);

	function properties(circ){
	circ
		.attr("cx", function(d, i) { return xScale(d.month); })
			.attr("cy", function(d){return matching[d.region];})
			.attr("r", function(d) { return (d.temp+20)*0.5; })
			.style("fill", function(d) { return colors[d.region]; })
			.on("mouseover", function(d) {		
            	div.transition()		
                	.duration(200)		
                	.style("opacity", .8);		
            div	.html(months[d.month -1] + "<br/>"  + NumFloat(d.temp) + " ºC")	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 50) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });
}
	var year_label = aside.append("g")
			.attr("transform", "translate(100,90)")
			.append("text")
			.attr("class", "year_label")
			.text(2013);

	var overlay = aside.append("rect")
				.attr("class", "overlay")
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", 400)
				.attr("height", 100)
				.on("mouseover", yearSelect);
	
	svg.transition()
      .duration(30000)
      .ease("circle").each(yearSelect);

	function yearSelect() {
			var yearScale = d3.scale.linear()
				.domain([1850, 2013])
				.range([10,336])
				.clamp(true);

			overlay
				.on("mouseover", mouseover)
				.on("mouseout", mouseout)
				.on("mousemove", mousemove)
				.on("touchmove", mousemove);

			function mouseover() {
			  year_label.classed("active", true);
			}

			function mouseout() {
			  year_label.classed("active", false);
			}

			function mousemove() {
			  displayYear(Math.floor(yearScale.invert(d3.mouse(this)[0])));
			}
		  }
	function year_data(year) {
		var data = d3.nest()
			.key(function(d) { return d.year; })
			.map(csv)[year];
    	return data.map(function(d) {
      		return {
				month: +d.month,
        		region: d.Country,
        		temp: parseFloat(d.AverageTemperature)
      			};
    		});
  		}
 	function displayYear(year) {
		g.selectAll("circle").data(year_data(year))
				.call(properties);
		year_label.text(Math.round(year));
	  }

});
});
