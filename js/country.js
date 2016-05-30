$(document).ready(function(){
	var countries = ['Afghanistan', 'Africa', 'Albania', 'Algeria',
       'American Samoa', 'Andorra', 'Angola', 'Anguilla',
       'Antigua And Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Asia',
       'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
       'Baker Island', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
       'Belize', 'Benin', 'Bhutan', 'Bolivia',
       'Bonaire, Saint Eustatius And Saba', 'Bosnia And Herzegovina',
       'Botswana', 'Brazil', 'British Virgin Islands', 'Bulgaria',
       'Burkina Faso', 'Burma', 'Burundi', "Côte D'Ivoire", 'Cambodia',
       'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands',
       'Central African Republic', 'Chad', 'Chile', 'China',
       'Christmas Island', 'Colombia', 'Comoros',
       'Congo', 'Costa Rica',
       'Croatia', 'Cuba', 'Curaçao', 'Cyprus', 'Czech Republic',
        'Denmark', 'Djibouti', 'Dominica',
       'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
       'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Europe',
       'Falkland Islands (Islas Malvinas)', 'Faroe Islands',
       'Federated States Of Micronesia', 'Fiji', 'Finland',
       'France', 'French Guiana', 'French Polynesia',
       'French Southern And Antarctic Lands', 'Gabon', 'Gambia',
       'Gaza Strip', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Greenland',
       'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey',
       'Guinea Bissau', 'Guinea', 'Guyana', 'Haiti',
       'Heard Island And Mcdonald Islands', 'Honduras', 'Hong Kong',
       'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
       'Ireland', 'Isle Of Man', 'Israel', 'Italy', 'Jamaica', 'Japan',
       'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kingman Reef',
       'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
       'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
       'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi',
       'Malaysia', 'Mali', 'Malta', 'Martinique', 'Mauritania',
       'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia',
       'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia',
       'Nepal', 'Netherlands', 'New Caledonia',
       'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue',
       'North America', 'North Korea', 'Northern Mariana Islands',
       'Norway', 'Oceania', 'Oman', 'Pakistan', 'Palau', 'Palestina',
       'Palmyra Atoll', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
       'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar',
       'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy',
       'Saint Kitts And Nevis', 'Saint Lucia', 'Saint Martin',
       'Saint Pierre And Miquelon', 'Saint Vincent And The Grenadines',
       'Samoa', 'San Marino', 'Sao Tome And Principe', 'Saudi Arabia',
       'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
       'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands',
       'Somalia', 'South Africa', 'South America',
       'South Georgia And The South Sandwich Isla', 'South Korea', 'Spain',
       'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard And Jan Mayen',
       'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan',
       'Tajikistan', 'Tanzania', 'Thailand', 'Timor Leste', 'Togo',
       'Tonga', 'Trinidad And Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
       'Turks And Caicas Islands', 'Uganda', 'Ukraine',
       'United Arab Emirates', 'United Kingdom',
       'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam',
       'Virgin Islands', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
	var months = {
			1: 'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct',11: 'Nov', 12:'Dec'
		},
		color = d3.scale.category20c(),
		colorrange =[ "#C02E1D", "#D94E1F", "#F16C20", "#EF8B2C", "#ECAA38", "#EBC844","#A2B86C","#5CA793","#1395BA","#117899","#0F5B78","#0D3C55"];
	var color = d3.scale.ordinal().range(colorrange);
	var margin = {top:30, right:20, left:100, bottom:50},
		w = 920 -margin.left - margin.right,
		h = 600 - margin.top - margin.bottom;
	
	// Droplist for countries selection
	var dropDown = d3.select("#countries").append("select").attr("name", "country-list");
		var options = dropDown.selectAll("option")
           .data(countries)
         	.enter()
           .append("option");
		options.text(function (d) { return d; })
       .attr("value", function (d) { return d; });	
	//--------------------------------------Create legend
	var month_list = d3.select("#graph").append("svg").attr("width",150).attr("height", 600);
	
	//Legend title
	month_list.append("text")
		.attr('class','month-label')
	.attr('y', 30).attr('x', 30).attr('font-size', '18px').attr('fill','#3b454e')
	.text ("Select month");

		//Container of graph
	var svg = d3.select("#graph").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
	.append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	//render body
	var body = svg.append("defs")
		.append("clipPath") 
  		.attr("id", "body-clip")
  		.append("rect")
  		.attr("width", w)
  		.attr("height", h);
	
	var title = d3.select("#months").append("svg").attr("width",1000).attr("height", 50).append("text")
		.attr('y', 40 )
		.attr('x', 350)
		.attr('font-size', '26px')
		.attr('fill','#345883');
	// Display info
		var info = d3.select("#graph").append("svg").attr("width",200).attr("height", 600);
	info.append("text").attr("y", 25).attr("x", 0).attr("fill",'#3b454e').attr('font-size', '18px')
		.attr('fill','#3b454e').text('Monthly Info');
	info.append("text").attr("class", "info")
		.attr('y', 75 )
		.attr('x', 10)
		.attr('font-size', '18px')
		.attr('fill','#3b454e')
		.text("Max");
	info.append("text").attr("class", "info")
		.attr('y', 150 )
		.attr('x', 10)
		.attr('font-size', '18px')
		.attr('fill','#3b454e')
		.text("Min");
	info.append("text").attr("class", "info")
		.attr('y', 225 )
		.attr('x', 10)
		.attr('font-size', '18px')
		.attr('fill','#3b454e')
		.text("Mean");
	var each_c = d3.select("#graph").append("svg").attr("width",200).attr("height", 600);
	
	d3.select("#countries select")
		.on("change", change);
	var df;
	d3.csv("TempByCountry(clean).csv", function(error, raw){
			if (error) throw error;
			df = raw;
			drawline();
	});
	var altKey, selection ="United States";
	d3.select("#countries select")
		.on("keydown", function(){altKey = d3.event.altKey;})
		.on("keyup", function(){altKey = false;});
	
	function change(){
		selection = d3.event.target.value;
		d3.transition().duration(altKey ? 7000 :1500)
			.each(drawline);
	}
function drawline() {
	//Title of graph
	var monthdata=[];
	title.text('Land Temperature of ' + selection + ' from 1813-2013');
	// Subset raw data based on selected country
	var data = d3.nest()
			.key(function(d) { return d.Country; })
			.map(df)[selection];

	data.forEach(function(d){ 
		d.year = parseInt(d.year);
		d.month = parseInt(d.month);
		d.temp = parseFloat(d.AverageTemperature);
		d.uncertain = 
		parseFloat(d.AverageTemperatureUncertainty);
				});
		
	var sort_order = ["1","2","3","4","5","6","7","8","9","10","11","12"];

	monthdata = d3.nest().key(function(d){return parseInt(d.month);}).sortKeys(function(a,b) { return sort_order.indexOf(a) - sort_order.indexOf(b); })
			.entries(data);

	//--------------------------------------  Legend
	var legend = month_list.selectAll('.cmonth').data(monthdata);
	
	var create_legend = legend.enter()
			.append('g').attr("class", "cmonth")
		.attr('id', function(d){return months[d.key];})
			.on("click", function (d){
				if($(this).css('opacity') == 1){	
					var line_unselected = document.getElementById(this.id +" line");
					d3.select(line_unselected)
					.transition().duration(1000)
					.style("opacity", 0.1);				
					d3.select(this).attr("indicate","unselected")
					.transition().duration(1000).style("opacity",0.1);
				} else {
					d3.select(document.getElementById(this.id +" line"))
					.transition().duration(1000)
					.style("opacity", 1);
					d3.select(this).attr("indicate","selected")
					.transition().duration(1000).style("opacity",1);
				}
		});
	//Month circles
	create_legend.append('circle')
		.attr('r', 12).attr('cx', 50)
		.attr('cy', function(d){ 
			return 4.5*(d.key + 1);})
		.style("fill", function(d){ return color(d.key);});
	// Month labels
	create_legend.append("text").attr("class", "month-label")
		.attr('y', function(d){return 4.5*(d.key+1);})
		.attr('x', 80)
		.attr('font-size', '14px')
		.attr('fill','#3b454e')
		.text(function(d){return months[d.key];});
	
	
	//------------------------------Defining axes
	//Scale of x,y and colors
	var scale=d3.extent(data,function(a){return a.year;}),
	years=d3.range(scale[0],scale[1]+1);
	
	var x =d3.scale.ordinal().rangePoints([0, w]).domain(years);
	var y= d3.scale.linear().range([h,0]);

	// Domain 
	y.domain([
    d3.min(monthdata, function(a) { return d3.min(a.values, function(b) { return b.temp; }); }),
    d3.max(monthdata, function(a) { return d3.max(a.values, function(b) { return b.temp; }); })
  	]);
	
	//Render x,y axes
	var xAxis = d3.svg.axis().scale(x).orient("bottom")
	.tickValues(x.domain().filter(function(d, i) { return !(i % 20); })),
		yAxis = d3.svg.axis().scale(y).orient("left");
	//Append axes
	svg.append("svg:g")
	    .attr("class", "x axis");
	 svg.append("svg:g")
    	.attr("class", "y axis")
		.append("text")
     	.attr("y", 8)
     	.attr("dy", ".8em")
     	.style("text-anchor", "end")
      	.text("Temperature (ºC)");

	var line = d3.svg.line().interpolate("basis")
    	.x(function(d) { return x(d.year); })
	    .y(function(d) { return y(d.temp); });

	// Display info
	
	var maxf= info.append("text").attr("id","max")
		.attr('y', 100).attr('x', 10)
		.attr('font-size','18px')
		.attr('fill', "#c02e1d");
	var minf = info.append("text").attr("id","min")
		.attr('y', 175).attr('x', 10)
		.attr('font-size','18px')
		.attr('fill', "#c02e1d");
	var meanf = info.append("text").attr("id","mean")
		.attr('y', 250).attr('x', 10)
		.attr('font-size','18px')
		.attr('fill', "#c02e1d");
	//--------------------------------------------------------
	var NumFloat = d3.format(".3f");
	// Generate lines
	 var linegraph = svg.selectAll(".linegraph")
    	.data(monthdata);
	var lines = linegraph.enter().append("g").attr("class", "linegraph").attr('id', function(d){ return months[d.key] +' line';})
	 	.style("stroke-width", 2);
	lines.append("path")
		.attr("class", "line")
		.style("stroke", function(d){return color(d.key);}).attr("d", function(d) {return line(d.values);});

		lines.on("mouseover", function(d){
			d3.selectAll($('.linegraph').not(this))
				.style('opacity', 0.1);
			var unselected = $('.cmonth').not(document.getElementById(months[d.key]));
			d3.selectAll(unselected).style('opacity',0.2);
			var selected = document.getElementById(months[d.key]);
			d3.selectAll(selected).style('opacity',1);
			find_info(d);
	})
	.on("mouseout", function(d){
		d3.selectAll($('.linegraph').not(this))
				.style('opacity', 1);
		var selected = document.getElementById(months[d.key]),
			inactivecirc = $('.cmonth[indicate="selected"]');
		d3.selectAll($('.cmonth').not(selected).not(inactivecirc)).style("opacity",1);
	});
console.log([monthdata[0].key, d3.max(monthdata[0].values, function(d){return d.temp;})]);

function find_info(d){
	var filter_data = monthdata.filter(function(a){return a.key==d.key;}),
		max_temp = d3.max(filter_data, function(a){ return d3.max(a.values, function(c){return c.temp;})}),
		min_temp = d3.min(filter_data, function(a){return d3.min(a.values, function(c){return c.temp;})}),
		mean_temp = NumFloat(d3.mean(filter_data, function(a){return d3.mean(a.values, function(c){return c.temp;})})),
		max_year = filter_data[0].values.filter(function(d){ if (d.temp == max_temp){return d.year;}})[0]["year"],
		min_year = filter_data[0].values.filter(function(d){ if (d.temp == min_temp){return d.year;}})[0]["year"];
		d3.select('#max').text(NumFloat(max_temp) + " in " + max_year);
		d3.select('#min').text(NumFloat(min_temp) + " in " + min_year);
		d3.select('#mean').text(mean_temp);
}
linegraph.exit().remove();
	
	
	//Update
	var updateLegend = d3.transition(legend);
	updateLegend.select('circle').attr('cy', function(d){ return 4.5*(d.key + 1);})
		.style("fill", function(d){ return color(d.key);});
	updateLegend.select("text").attr('y', function(d){return 4.5*(d.key+1);})
		.text(function(d){return months[d.key];});
	
	d3.transition(svg).select(".x.axis").attr("transform", "translate(0," + h + ")")
		.transition().duration(800).call(xAxis);
	var updateLine = d3.transition(linegraph);

updateLine.select("path").transition().duration(800).attr("d", function(d){return line(d.values);});
	d3.transition(svg).select(".y.axis").transition().duration(300).ease("linear").call(yAxis);
	
}
});