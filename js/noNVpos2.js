
var svg2 = d3.select("#svg-pos2"),
margin = {top: 80, right: 90, bottom: 30, left: 65},
width = +svg2.attr("width") - margin.left - margin.right,
height = +svg2.attr("height") - margin.top - margin.bottom,
g2 = svg2.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var color2 = d3.scaleOrdinal()
  .domain(["NV"])
  .range(["#e6b9cfff"]);
 //https://www.w3schools.com/colors/colors_names.asp

var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z2 = color2;

var area2 = d3.area()
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
   .range([0,height]);
//*/
z2.domain(sources.map(function(c) { return c.id; }));

var source = g2.selectAll(".area")
    .data(sources)
    .enter().append("g")
    .attr("class", function(d) { return `area ${d.id}`; })

source.append("path")
     .attr("d", function(d) { console.log(area2(d.values)); return area2(d.values); })
     .style("fill", function(d) { return z2(d.id); });

g2.append("g")
    .attr("class", "axis axis--x")
    .style("font", "1.2em ink_freeregular")
    .attr("x", "font-size", "20em")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

    .append("text")
        .attr("transform", "rotate(0)")
        .attr("font-size", "1.35em") // label fontsize (x) 
        .attr("dx", "650px") // position of the label x-coord
        .attr("dy", "15px") // position of the label y-coord
        .attr("fill", "#000")
        .text("month");

g2.append("g")
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



});

function type(d, _, columns) {
for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
return d;
}

