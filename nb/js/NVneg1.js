
var svg2 = d3.select("#svgyneg1"),
  margin = {top: 50, right: 50, bottom: 30, left: 50},
  width = +svg2.attr("width") - margin.left - margin.right,
  height = +svg2.attr("height") - margin.top - margin.bottom,
  g2 = svg2.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
var color2 = d3.scaleOrdinal()
  .domain(["fatigue", "headache", "depress", "sleep"])
  .range(["#a6b7da90", "#FFFF0080", "#00000099", "#0022ff85"]);
       //https://www.w3schools.com/colors/colors_names.asp

var x = d3.scaleLinear()
    .range([0, width]);
  
var y = d3.scaleLinear()
    .range([height, 0])
    //.ticks(5).tickFormat(D3.numberFormat(",d"))
    ;

var z2 = color2;


var area2 = d3.area()   
  .curve(d3.curveCardinal.tension(0.6))
  .x(function(d) { return x(d.month); })
  .y0(y(0))    //.y0(y(0)) 
  .y0(y.range()[1]) // inverts but sums up above 0
  .y1(function(d) { return y(d.val); })
      

    // https://raw.githubusercontent.com/bbdataviz/HG-D3/main/hg-neg1.csv
    //https://raw.githubusercontent.com/bbdataviz/HG-D3/main/NV_symptoms_negvalues_--y.csv 
    d3.csv("https://raw.githubusercontent.com/bbdataviz/HG-D3/main/NV_symptoms_negvalues_--y.csv ", type, function(error, data) {
      if (error) throw error;
    
      var sources = data.columns.slice(1).map(function(id) {
        return {
          id: id,
          values: data.map(function(d) {
            return {month: d.month, val: d[id]};
          })
        };
      });
      
      console.log(sources);

      x.domain([0,8])
        .range([0,width]);
      y.domain([0,-70])
         .range([0,height]);
      var y_axis = d3.axisLeft(y) 
         //.tickSize(33)
         .ticks(7);
   
      z2.domain(sources.map(function(c) { return c.id; }));
    
      g2.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")");
          //.call(d3.axisBottom(x));
    
      g2.append("g")
          .attr("class", "axis axis--y")      
          .call(y_axis)   //.call(d3.axisLeft(y))
    
        .append("text")
          .attr("transform", "rotate(0)")
          .attr("y", 90)
          .attr("dx", "0em")
          .attr("dy", "-1.5em")
          .attr("fill", "#000")
          .text("");
    
      var source = g2.selectAll(".area")
          .data(sources)
          .enter().append("g")
          .attr("class", function(d) { return `area ${d.id}`; })
    
      source.append("path")
           .attr("d", function(d) { console.log(area2(d.values)); return area2(d.values); })
           .style("fill", function(d) { return z2(d.id); });
    });
    
    function type(d, _, columns) {
      for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
      return d;
    }

   




