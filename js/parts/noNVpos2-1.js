
var svg2_1 = d3.select("#svg-pos2-1"),
  margin = {top: 80, right: 90, bottom: 50, left: 65},
  width = +svg2_1 .attr("width") - margin.left - margin.right,
  height2 = 470 - margin.top - margin.bottom,
  g2_1  = svg2_1 .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var color2_1 = d3.scaleOrdinal()
.domain(["noNV"])
  .range(["#e6b9cfff"]);
 //https://www.w3schools.com/colors/colors_names.asp

var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height2, 0]),
    z2_1 = color2_1;

var area2_1 = d3.area()
  .curve(d3.curveCardinal.tension(0.6))
  .x(function(d) { return x(d.month); })
  .y0(y(0))    //.y0(y(0)) 
  .y0(y.range()[0]) // inverts but sums up above 0
  .y1(function(d) { return y(d.val); })


d3.csv("https://raw.githubusercontent.com/bbdataviz/HG-D3/main/noNV_y%2B%2B", type, function(error, data) {
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
    .range([0,height2]);

  z2_1.domain(sources.map(function(c) { return c.id; }));

  var source = g2_1.selectAll(".area")
    .data(sources)
    .enter().append("g")
    .attr("class", function(d) { return `area ${d.id}`; })

  source.append("path")
    .attr("d", function(d) { console.log(area2_1(d.values)); 
        return area2_1(d.values); })
    .style("fill", function(d) { return z2_1(d.id); });

  // create a tooltip
  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "6px 10px 4px 8px")
    .style("font-family", "greatthings")
    .style("font-size", "2em")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke-width", 3)
    }
  var mousemove = function(d) {
    tooltip
      .html(d.val + "%")
      .style("left", (d3.mouse(this)[0] + 1020) + "px")
      .style("top", (d3.mouse(this)[1] + margin.top + 80) + "px") 
    }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke-width", 1)
    }

  // Add the points
  source.selectAll("points")
    .data(function(d) {return d.values})
    .enter()
    .append("circle")
    //.filter(function (d) {return (d.month > 2) })
    //.filter(function (d) {return (d.val > 10) })
    .attr("class", "point")
    .attr("cx", function(d) { return x(d.month) } )
    .attr("cy", function(d) { return y(d.val) } )
    .attr("r", 5.5)
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .style("fill", function(d) { return z2_1(d.id); })
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

  g2_1.append("g")
    .attr("class", "axis axis--x")
    .style("font", "1.2em ink_freeregular")
    .attr("x", "font-size", "20em")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x))
    .append("text")
      .attr("transform", "rotate(0)")
      .attr("font-size", "1.35em") // label fontsize (x) 
      .attr("dx", "650px") // position of the label x-coord
      .attr("dy", "15px") // position of the label y-coord
      .attr("fill", "#000")
      .text("month");

  g2_1.append("g")
    .attr("class", "axis axis--y")   
    .style("font", "1.2em ink_freeregular")   
    .call(d3.axisLeft(y).ticks(5).tickSize(5)) //tickSize = length of tick line
    .append("text")
      .attr("transform", "rotate(0)")
      .attr("y", 7)
      .attr("dx", "-45px")
      .attr("dy", "15px")
      .style("font", "2.5em greatthings") 
      .attr("fill", "#000")
      .text("%");

  g2_1.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2) - 5)
    .attr("text-anchor", "middle")  
    .style("font", "2.4em ink_freeregular") 
    .style("fill", "#111")
    .text("Only Nausea / Neither Nausea nor Vomiting");

});


