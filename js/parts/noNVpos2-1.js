
var svg2_1 = d3.select("#svg-pos2-1"),
margin = {top: 50, right: 90, bottom: 30, left: 65},
width = +svg2_1 .attr("width") - margin.left - margin.right,
height = +svg2_1 .attr("height") - margin.top - margin.bottom,
g2_1  = svg2_1 .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var color2_1 = d3.scaleOrdinal()
  .domain(["NV", "NoNV"])
  .range(["#00d02322", "#e6b9cfff"]);
 //https://www.w3schools.com/colors/colors_names.asp

var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z2_1 = color2_1;

var area2_1 = d3.area()
  .curve(d3.curveCardinal.tension(0.6))
  .x(function(d) { return x(d.month); })
  .y0(y(0))    //.y0(y(0)) 
  .y0(y.range()[0]) // inverts but sums up above 0
  .y1(function(d) { return y(d.val); })


d3.csv("https://raw.githubusercontent.com/bbdataviz/HG-D3/main/NV_and_NoNV.csv", type, function(error, data) {
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
//*/
z2_1.domain(sources.map(function(c) { return c.id; }));

var source = g2_1.selectAll(".area")
    .data(sources)
    .enter().append("g")
    .attr("class", function(d) { return `area ${d.id}`; })

source.append("path")
     .attr("d", function(d) { console.log(area2_1(d.values)); return area2_1(d.values); })
     .style("fill", function(d) { return z2_1(d.id); });

g2_1.append("g")
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

g2_1.append("g")
    .attr("class", "axis axis--y")   
    .style("font", "1.2em ink_freeregular")   
    .call(d3.axisLeft(y).ticks(5).tickSize(5)) //tickSize = length of tick line


    .append("text")
    .attr("transform", "rotate(0)")
    .attr("y", 7)
    .attr("dx", "-10px")
    .attr("dy", "-28px")
    .attr("font-size", "2em")
    .style("font", "2em greatthings") 
    .attr("fill", "#000")
    .text("%");



});

function type(d, _, columns) {
for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
return d;
}

