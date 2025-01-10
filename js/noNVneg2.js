
var svg22 = d3.select("#svg-neg2"),
      margin = {top: 15, right: 90, bottom: 10, left: 65},
      width = +svg22.attr("width") - margin.left - margin.right,
      height3 = 370 - margin.top - margin.bottom,
      g22 = svg22.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var color22 = d3.scaleOrdinal()
      .domain(["fatigue", "headache", "depress", "sleep"])
      .range(["#92a2c390", "#ff794bcc", "#00000099", "url(#gradient01)"]); //#0022ff85
       //https://www.w3schools.com/colors/colors_names.asp
      var x = d3.scaleLinear().range([0, width]),
      y = d3.scaleLinear().range([height3, 0]),
      z22 = color22;
    
    var area22 = d3.area()
      //.curve(d3.curveMonotoneX)   //.curve(d3.curveLinear)
      .curve(d3.curveCardinal.tension(0.6))
      .x(function(d) { return x(d.month); })
      .y0(y(0))    //.y0(y(0)) 
      .y0(y.range()[1]) // inverts but sums up above 0
      .y1(function(d) { return y(d.val); })
     
    
    d3.csv("https://raw.githubusercontent.com/bbdataviz/HG-D3/main/hg-neg2", type, function(error, data) {
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

      x.domain([0,9])
        .range([0,width]);

      y.domain([100,0])
         .range([height3,0]);

      var y_axis = d3.axisLeft(y) 

      //*/
      z22.domain(sources.map(function(c) { return c.id; }));
    
      var source = g22.selectAll(".area")
          .data(sources)
          .enter().append("g")
          .attr("class", function(d) { return `area ${d.id}`; })
    
      source.append("path")
           .attr("d", function(d) { console.log(area22(d.values)); return area22(d.values); })
           .style("fill", function(d) { return z22(d.id); });

      g22.append("g")
      .attr("class", "axis axis--y")  
      .style("font", "1.2em ink_freeregular")    
      .call(y_axis)   //.call(d3.axisLeft(y))
      .call(d3.axisLeft(y).ticks(5).tickSize(5))

      .append("text")
      .attr("transform", "rotate(0)")
      .attr("y", 7)
      .attr("dx", "-47px")
      .attr("dy", "370px")
      .style("font", "2.3em greatthings") 
      .attr("fill", "#000")
      .text("%")
        
      
    });
    
    function type(d, _, columns) {
      for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
      return d;
    }





