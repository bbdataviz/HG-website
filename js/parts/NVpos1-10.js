var svg1_10_1 = d3.select("#svg-pos1-10"),
    margin = {top: 80, right: 90, bottom: -55, left: 65},
    width = +svg1_10_1.attr("width") - margin.left - margin.right,
    height3 = 380 - margin.top - margin.bottom,
    g1_10_1 = svg1_10_1.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color1_10_1 = d3.scaleOrdinal()
      .domain(["NV", "fatigue", "headache", "sleep", "depress", "hospital"])
      .range(["#00d02395", "#92a2c3", "#ff794bed",  "url(#gradient01)", "#1119"]);
      //https://www.w3schools.com/colors/colors_names.asp

    var x = d3.scaleLinear().range([0, width]),
      y = d3.scaleLinear().range([height3, 0]),
      z1_10_1 = color1_10_1;

    var area1_10_1 = d3.area()
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
    console.log(sources);

    x.domain([0,9])
      .range([0,width]);

    y.domain([100,0])
      .range([0,height3]);

    z1_10_1.domain(sources.map(function(c) { return c.id; }));

    var source = g1_10_1.selectAll(".area")
      .data(array1)
      .enter().append("g")
        .attr("class", function(d) { return `area ${d.id}`; })
        .style("fill", function(d) { return z1_10_1(d.id); })

    source.append("path")
      .attr("d", function(d) { console.log(area1_10_1(d.values)); 
        return area1_10_1(d.values); })
      .style("fill", function(d) { return z1_10_1(d.id); });

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
        .style("left", (d3.mouse(this)[0] ) + margin.left + 105 + "px") 
          .style("top", (d3.mouse(this)[1]) + margin.top + -60 + "px")
          
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

    g1_10_1.append("g")
      .attr("class", "axis axis--x")
      .style("font", "1.2em ink_freeregular")
      .attr("x", "font-size", "20em")
      .attr("transform", "translate(0," + height3 + ")")
      .call(d3.axisBottom(x).tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9]))

      .append("text")
      .attr("transform", "rotate(0)")
      .attr("font-size", "1.35em") // label fontsize (x) 
      .attr("dx", "650px") // position of the label x-coord
      .attr("dy", "15px") // position of the label y-coord
      .attr("fill", "#000")
      .text("month");

    g1_10_1.append("g")
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

    g1_10_1.append("text")
      .attr("x", (width / 2))                 // centers chart headline along x-axis
      .attr("y", 0 - ((margin.top / 2) - 5)) // translates chart headline along y-axis
      .attr("text-anchor", "middle")  
      .style("font", "2em ink_freeregular") 
      .style("fill", "#111")
      .text("Nausea with Vomiting");
    });
    
  function type(d, _, columns) {
    for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
    return d;
  }





