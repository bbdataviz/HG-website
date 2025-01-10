
var svg1_4 = d3.select("#svg-pos1-4"),
  margin = {top: 80, right: 90, bottom: 30, left: 65},
  width = +svg1_4.attr("width") - margin.left - margin.right,
  height1 = 480 - margin.top - margin.bottom,
  g1_4 = svg1_4.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var color1_4 = d3.scaleOrdinal()
  .domain(["NV", "hospital"])
  .range(["url(#gradient-green)", "#ff3933"]);

var x = d3.scaleLinear().range([0, width]),
  y = d3.scaleLinear().range([height1, 0]),
  z1_4 = color1_4;

var area1_4 = d3.area()
  .curve(d3.curveCardinal.tension(0.6))
  .x(function(d) { return x(d.month); })
  .y0(y(0))   
  .y0(y.range()[0]) // inverts but sums up above 0
  .y1(function(d) { return y(d.val); })

  d3.csv("https://raw.githubusercontent.com/bbdataviz/HG-D3/main/NV_symptoms%2B%2By.csv", function(data) {

    var sources = data.columns.slice(1).map(function(id) {
      return {
        id: id,
        values: data.map(function(d) {
          return {month: d.month, val: d[id]}; // d[id], d.nv, d.fatigue, val: [d.nv, d.fatigue], d["nv","fatigue"]
        }) 
      };
    });

  var obj_nv = sources["0"]; // Object
  //var obj_fat = sources["1"];
  //var obj_hea = sources["2"];
  //var obj_sle = sources["3"];
  //var obj_dep = sources["4"];
  var obj_hos = sources["5"];

  var array1 = [];
  array1.push(obj_nv);
  //array1.push(obj_fat);
  //array1.push(obj_hea);
  //array1.push(obj_sle);
  //array1.push(obj_dep);
  array1.push(obj_hos);

  console.log(sources);
  console.log(array1);

  x.domain([0,9])
    .range([0,width]);

  y.domain([100,0])
      .range([0,height1]);

  
  z1_4.domain(array1.map(function(c) { return c.id; }));   // data instead sources
    
  var source = g1_4.selectAll(".area")
    .data(array1) // subdataset
      //.data(sources) // whole dataset
      .enter()
      .append("g")
        .attr("class", function(d) { return `area ${d.id}`; })
        .style("fill", function(d) { return z1_4(d.id); })  // add the color fill attr to the group to get the same color for area and points

  source.append("path")
    .attr("d", function(d) { console.log(area1_4(d.values)); 
      return area1_4(d.values); })

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
      .style("left", (d3.mouse(this)[0] ) + margin.left + 110 + "px") 
      .style("top", (d3.mouse(this)[1]) + margin.top + 80 + "px") 
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

  g1_4.append("g")
    .attr("class", "axis axis--x")
    .style("font", "1.2em ink_freeregular")
    .attr("x", "font-size", "20em")
    .attr("transform", "translate(0," + height1 + ")")
    .call(d3.axisBottom(x))
    
    .append("text")
      .attr("transform", "rotate(0)")
      .attr("font-size", "1.35em") // label fontsize (x) 
      .attr("dx", "650px") // position of the label x-coord
      .attr("dy", "15px") // position of the label y-coord
      .attr("fill", "#000")
      .text("month");

  g1_4.append("g")
    .attr("class", "axis axis--y")      
    .style("font", "1.2em ink_freeregular")     
    .call(d3.axisLeft(y).ticks(5).tickSize(5))
    .append("text")
    .attr("transform", "rotate(0)")
    .attr("y", 7)
    .attr("dx", "-45px")
    .attr("dy", "15px")
    .style("font", "2.5em greatthings") 
    .attr("fill", "#000")
    .text("%");

  g1_4.append("text")
    .attr("x", (width / 2))                 // centers chart headline along x-axis
    .attr("y", 0 - ((margin.top / 2) - 5)) // translates chart headline along y-axis
    .attr("text-anchor", "middle")  
    .style("font", "2.4em ink_freeregular") 
    .style("fill", "#111")
    .text("Nausea with Vomiting");
});





