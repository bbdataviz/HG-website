
// https://tympanus.net/codrops/2022/03/29/building-an-interactive-sparkline-graph-with-d3/

var margin = {top: 80, right: 90, bottom: 30, left: 65},
  width = 750 - margin.left - margin.right,
  height = 480 - margin.top - margin.bottom;
  
var svg1_3_1 = d3.select("#svg-pos1-3-1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
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
    //var obj_hos = sources["5"];

    var array1 = [];
    array1.push(obj_nv);
    //array1.push(obj_fat);
    //array1.push(obj_hea);
    //array1.push(obj_sle);
    //array1.push(obj_dep);
    //array1.push(obj_hos);

    console.log(sources);
    console.log(array1);

    var color1_3 = d3.scaleOrdinal()
      .domain(["NV", "fatigue", "headache", "sleep", "depress", "hospital"])
      .range(["#00d02388", "#9900", "#0000", "#0000", "#0000", "#0000"]);
        //https://www.w3schools.com/colors/colors_names.asp

    const x = d3.scaleLinear().range([0, width]).domain([0,9]),
        y = d3.scaleLinear().range([height, 0]).domain([0,100]),
        z1_3 = color1_3;

    var area1_3_1 = d3.area()
      .curve(d3.curveCardinal.tension(0.6))
      .x(function(d) { return x(d.month); })
      .y0(y(0))   
      .y0(y.range()[0]) // inverts but sums up above 0
      .y1(function(d) { return y(d.val); })


    z1_3.domain(sources.map(function(c) { return c.id; }));

    svg1_3_1.append("g")
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

    svg1_3_1.append("g")
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

    svg1_3_1.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2) - 5)
      .attr("text-anchor", "middle")  
      .style("font", "2.4em ink_freeregular") 
      .style("fill", "#111")
      .text("Nausea with Vomiting");

    var source = svg1_3_1.selectAll(".area")
        .data(array1)
        .enter()
        .append("g")
          .attr("class", function(d) { return `area ${d.id}`; })

    source.append("g").append("path")
      //.filter(function (d) {return (d.values > 10) })
        .attr("d", function(d) { console.log(area1_3_1(d.values)); 
          return area1_3_1(d.values); })
        .style("fill", function(d) { return z1_3(d.id); });

    // create a tooltip
    var tooltip = d3.select("#svg-pos1-3-1")
      .append("div")
        .style("position", "absolute")
        .style("opacity", 0)
        .attr("class", "tooltip")
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
        .style("left", (d3.mouse(this)[0] ) + margin.left + 15 + "px") 
        .style("top", (d3.mouse(this)[1]) + margin.top + -70 + "px") 
    }
    var mouseleave = function(d) {
      tooltip
        .style("opacity", 0)          
      d3.select(this)
        .style("stroke-width", 1)
    }

    // Add the points
    source.append('g')
      .selectAll("dot")
      .data(function(d) {return d.values})
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.month) } )
        .attr("cy", function(d) { return y(d.val) } )
        .attr("r", 5.5)
        .style("fill", function(d) { return z1_3(d.id); })
        .attr("stroke", "white")
        .attr("stroke-width", 1)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

    
  });
