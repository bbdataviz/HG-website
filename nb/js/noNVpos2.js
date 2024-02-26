var svg3 = d3.select("#svgypos2"),
margin = {top: 50, right: 90, bottom: 30, left: 50},
width = +svg3.attr("width") - margin.left - margin.right,
height = +svg3.attr("height") - margin.top - margin.bottom,
g3 = svg3.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var color3 = d3.scaleOrdinal()
.domain(["NV"])
.range(["#ef9ee090"]);
 //https://www.w3schools.com/colors/colors_names.asp
var x = d3.scaleLinear().range([0, width]),
y = d3.scaleLinear().range([height, 0]),
z3 = color3;

var area3 = d3.area()
.curve(d3.curveCardinal.tension(0.6))
.x(function(d) { return x(d.month); })
.y0(y(0))    //.y0(y(0)) 
.y0(y.range()[0]) // inverts but sums up above 0
.y1(function(d) { return y(d.val); })


d3.csv("https://raw.githubusercontent.com/bbdataviz/HG-D3/main/noNV_symptoms%2B%2By.csv", type, function(error, data) {
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
z3.domain(sources.map(function(c) { return c.id; }));

g3.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

    .append("text")
        .attr("transform", "rotate(0)")
        .attr("x", 10)
        .attr("dx", "640px")
        .attr("dy", "0em")
        .attr("font-size", "1.5em")
        .attr("fill", "#000")
        .text("month");

g3.append("g")
    .attr("class", "axis axis--y")      
    .call(d3.axisLeft(y))   //.call(d3.axisLeft(y))

  .append("text")
    .attr("transform", "rotate(0)")
    .attr("y", 7)
    .attr("dx", "-0.5em")
    .attr("dy", "-1.3em")
    .attr("font-size", "1.6em")
    .attr("fill", "#000")
    .text("%");

var source = g3.selectAll(".area")
    .data(sources)
    .enter().append("g")
    .attr("class", function(d) { return `area ${d.id}`; })

source.append("path")
     .attr("d", function(d) { console.log(area3(d.values)); return area3(d.values); })
     .style("fill", function(d) { return z3(d.id); });
});

function type(d, _, columns) {
for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
return d;
}

