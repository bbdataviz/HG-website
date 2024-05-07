var svg12_2 = d3.select("#svg-neg1-2"),
      margin = {top: 50, right: 90, bottom: 30, left: 65},
      width = +svg12_2.attr("width") - margin.left - margin.right,
      height = +svg12_2.attr("height") - margin.top - margin.bottom,
      g12_2 = svg12_2.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var color12_2 = d3.scaleOrdinal()
      .domain(["fatigue","headache"])
      .range(["#92a2c390","#ff794bcc","#92a2c330","#92a2c300"]); //#0022ff85
       //https://www.w3schools.com/colors/colors_names.asp
      var x = d3.scaleLinear().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      z12_2 = color12_2;
    
    var area12_2 = d3.area()
      //.curve(d3.curveMonotoneX)   //.curve(d3.curveLinear)
      .curve(d3.curveCardinal.tension(0.6))
      .x(function(d) { return x(d.month); })
      .y0(y(0))    //.y0(y(0)) 
      .y0(y.range()[1]) // inverts but sums up above 0
      .y1(function(d) { return y(d.val); })
     
    
    d3.csv("https://raw.githubusercontent.com/bbdataviz/HG-D3/main/hg-neg1", type, function(error, data) {
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


      y.domain([100,0])
      .range([height, 0]);

      var y_axis = d3.axisLeft(y) 
      
      //*/
      z12_2.domain(sources.map(function(c) { return c.id; }));
    
      var source = g12_2.selectAll(".area")
          .data(sources)
          .enter().append("g")
          .attr("class", function(d) { return `area ${d.id}`; })
    
      source.append("path")
           .attr("d", function(d) { console.log(area12_2(d.values)); return area12_2(d.values); })
           .style("fill", function(d) { return z12_2(d.id); });

      g12_2.append("g")
          .attr("class", "axis axis--y")  
          .style("font", "1.2em ink_freeregular")    
          .call(y_axis)   //.call(d3.axisLeft(y))
          .call(d3.axisLeft(y).ticks(5).tickSize(5))
    
        .append("text")
          .attr("transform", "rotate(0)")
          .attr("y", 7)
          .attr("dx", "0em")
          .attr("dy", "-1.5em")
          .attr("fill", "#000")
          .text("");

      
    });
    
    function type(d, _, columns) {
      for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
      return d;
    }

