var svg0 = d3.select("#dv-svg-pos1-res2"),
      margin = {top: 50, right: 90, bottom: 30, left: 65},
      width = +svg0.attr("width") - margin.left - margin.right,
      height = +svg0.attr("height") - margin.top - margin.bottom,
      g0 = svg0.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
var color0 = d3.scaleOrdinal()
      .domain(["NV", "hospital"])
      .range(["#00d02388", "#FF0000"]); // high: #00d023ff
       //https://www.w3schools.com/colors/colors_names.asp

var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z0 = color0;
    
var area0 = d3.area()
      //.curve(d3.curveMonotoneX)   //.curve(d3.curveLinear)
      .curve(d3.curveCardinal.tension(0.6))
      .x(function(d) { return x(d.month); })
      .y0(y(0))    //.y0(y(0)) 
      .y0(y.range()[0]) // inverts but sums up above 0
      .y1(function(d) { return y(d.val); })
     
    
d3.csv("https://raw.githubusercontent.com/bbdataviz/HG-D3/main/NV_symptoms%2B%2By.csv", type, function(error, data) {
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
      .range([0,height]);

    z0.domain(sources.map(function(c) { return c.id; }));
   
    var source = g0.selectAll(".area")
          .data(sources)
          .enter().append("g")
          .attr("class", function(d) { return `area ${d.id}`; })
   
    source.append("path")
           .attr("d", function(d) { console.log(area1(d.values)); return area1(d.values); })
           .style("fill", function(d) { return z1(d.id); });

    g0.append("g")
        .attr("class", "axis axis--x")
        .style("font", "1.2em ink_freeregular")
        .attr("x", "font-size", "20em")
        //.style("font", "1em sans-serif")  
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

        .append("text")
          .attr("transform", "rotate(0)")
          .attr("font-size", "1.35em") // label fontsize (x) 
          .attr("dx", "650px") // position of the label x-coord
          .attr("dy", "15px") // position of the label y-coord
          .attr("fill", "#000")
          .text("month");
  
    g0.append("g")
          .attr("class", "axis axis--y") 
          .style("font", "1em ink_freeregular")     
          .call(d3.axisLeft(y).ticks(5).tickSize(5)) //tickSize = length of tick line
    
        .append("text")
          .attr("transform", "rotate(0)")
          .attr("y", 7)
          .attr("dx", "-1.6em")
          .attr("dy", "-0em")
          .attr("font-size", "1.6em")
          .style("font", "1.7em greatthings") 
          .attr("fill", "#000")
          .text("%");
      
      g0.selectAll(".x.axis line")
          .style("stroke","white");


var aspect = width / height,
          chart = d3.select('#dv-svg-pos1-res2');
      d3.select(window)
        .on("resize", function() {
          var targetWidth = chart.node().getBoundingClientRect().width;
          chart.attr("width", targetWidth);
          chart.attr("height", targetWidth / aspect);
        });

});

function type(d, _, columns) {
for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
return d;
}
