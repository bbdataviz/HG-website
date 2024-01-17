var svg4 = d3.select("#svgyneg2"),
  margin = {top: 50, right: 50, bottom: 30, left: 50},
  width = +svg4.attr("width") - margin.left - margin.right,
  height = +svg4.attr("height") - margin.top - margin.bottom,
  g4 = svg4.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var color4 = d3.scaleOrdinal()
    .domain(["fatigue", "headache", "depress", "sleep"])
    .range(["#a6b7da90", "#FFFF0080", "#00000099", "#0022ff85"]); //#6805fc87
       //https://www.w3schools.com/colors/colors_names.asp
      var x = d3.scaleLinear().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      z4 = color4;
    
    var area4 = d3.area()
      .curve(d3.curveCardinal.tension(0.6))
      .x(function(d) { return x(d.month); })
      .y0(y(0))    //.y0(y(0)) 
      .y0(y.range()[1]) // inverts but sums up above 0
      .y1(function(d) { return y(d.val); })
     
    
    d3.csv("https://raw.githubusercontent.com/bbdataviz/HG-D3/main/noNV_symptoms_negvalues--y.csv", type, function(error, data) {
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
      //*/
      z4.domain(sources.map(function(c) { return c.id; }));
    
      g4.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
      
    
      g4.append("g")
          .attr("class", "axis axis--y")      
          .call(d3.axisLeft(y))   //.call(d3.axisLeft(y))
    
        .append("text")
          .attr("transform", "rotate(0)")
          .attr("y", 7)
          .attr("dx", "0em")
          .attr("dy", "-1.5em")
          .attr("fill", "#000")
          .text("");
    
      var source = g4.selectAll(".area")
          .data(sources)
          .enter().append("g")
          .attr("class", function(d) { return `area ${d.id}`; })
    
      source.append("path")
           .attr("d", function(d) { console.log(area4(d.values)); return area4(d.values); })
           .style("fill", function(d) { return z4(d.id); });
    });
    
    function type(d, _, columns) {
      for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
      return d;
    }






