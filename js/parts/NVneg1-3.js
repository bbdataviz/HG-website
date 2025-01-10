var svg12_3 = d3.select("#svg-neg1-3"),
  margin = {top: 80, right: 90, bottom: 50, left: 65},
  width = +svg12_3.attr("width") - margin.left - margin.right,
  height2 = 470 - margin.top - margin.bottom,
  g12_3 = svg12_3.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
var color12_3 = d3.scaleOrdinal()
  .domain(["fatigue", "headache", "sleep", "depress"])
  .range(["#92a2c3","#ff794b", "#0022ff50", "#1119"]);  // "url(#gradient01)"
    //https://www.w3schools.com/colors/colors_names.asp
  var x = d3.scaleLinear().range([0, width]),
  y = d3.scaleLinear().range([height2, 0]),
  z12_3 = color12_3;

var area12_3 = d3.area()
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
    
  var obj_fat = sources["0"];
  var obj_hea = sources["1"];
  var obj_sle = sources["2"];
  var obj_dep = sources["3"];
  //var obj_hos = sources["4"];

  var array1 = [];
  array1.push(obj_fat);
  array1.push(obj_hea);
  array1.push(obj_sle);
  array1.push(obj_dep);
  console.log(sources);

  x.domain([0,9])
  .range([0,width]);

  y.domain([100,0])
  .range([height2, 0]);

  var y_axis = d3.axisLeft(y) 

  z12_3.domain(sources.map(function(c) { return c.id; }));

  var source = g12_3.selectAll(".area")
    .data(array1)
    .enter().append("g")
      .attr("class", function(d) { return `area ${d.id}`; })
      .style("fill", function(d) { return z12_3(d.id); })

  source.append("path")
    .attr("d", function(d) { console.log(area12_3(d.values)); 
      return area12_3(d.values); })
    .style("fill", function(d) { 
      if(d == sources["2"]) 
        return "url(#gradient01)"  //"#0022ff85" blue
      else return z12_3(d.id); });

  // create a tooltip
  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("z-index", 10)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "6px 10px 4px 8px")
    .style("font-family", "greatthings")
    .style("font-size", "2em")

  // Three function that change the tooltip+interaction feedback when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke-width", 3)
  }
  var mousemove = function(d) {
    tooltip
      .html(d.val + "%")
      .style("left", (d3.mouse(this)[0] ) + margin.left + 125 + "px") 
      .style("top", (d3.mouse(this)[1]) + margin.top + 340 + "px") 
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke-width", 1)
  }

  // Add the points
  source.selectAll("circle")
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
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);

  g12_3.append("g")
    .attr("class", "axis axis--y")  
    .style("font", "1.2em ink_freeregular")    
    .call(y_axis)   //.call(d3.axisLeft(y))
    .call(d3.axisLeft(y).ticks(5).tickSize(5))

    .append("text")
    .attr("transform", "rotate(0)")
    .attr("y", 7)
    .attr("dx", "-47px")
    .attr("dy", "340px")
    .style("font", "2.3em greatthings") 
    .attr("fill", "#000")
    .text("%")
});

