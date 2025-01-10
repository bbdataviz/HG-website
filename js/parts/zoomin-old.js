var svg1_3_2 = d3.select("#svg-pos1-3-2"),
      margin = {top: 50, right: 90, bottom: 30, left: 65},
      width = +svg1_3_2.attr("width") - margin.left - margin.right,
      height = +svg1_3_2.attr("height") - margin.top - margin.bottom,
      g1_3_2 = svg1_3_2.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var color1_3_2 = d3.scaleOrdinal()
    .domain(["NV", "fatigue", "headache", "sleep", "depress", "hospital"])
    .range(["#00d02388", "#0000", "#0000",  "#0000", "#0000", "#ff3300ff"]);
       //https://www.w3schools.com/colors/colors_names.asp
    
    var x = d3.scaleLinear().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      z1_3_2 = color1_3_2;
    
    var area1_3_2 = d3.area()
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
      
      x.domain([0,9])
        .range([0,width]);


      y.domain([100,0])
         .range([0,height]);

      //*/
      z1_3_2.domain(sources.map(function(c) { return c.id; }));

      var source = g1_3_2.selectAll(".area")
          .data(sources)
          .enter().append("g")
          .attr("class", function(d) { return `area ${d.id}`; })
    
      source.append("path")
          .attr("d", function(d) { console.log(area1_3_2(d.values)); return area1_3_2(d.values); })
          .style("fill", function(d) { return z1_3_2(d.id); });
    
      g1_3_2.append("g")
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
    
      g1_3_2.append("g")
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

    });
 
    function type(d, _, columns) {
      for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
      return d;
    }

function displaychart() {
  d3.select("#svg-pos1-3-2").remove();
 
  var svg1_3 = document.getElementById("svg-pos3");
      svg1_3.style.display = "block";
}

function zoomin() {

    var svg1_3 = d3.select("#svg-pos3")
    var svg1_3_40 = d3.select("#svg-pos3")
              // top: 50, right: 90, bottom: 30, left: 65
    var margin = {top: 5, right: 90, bottom: 30, left: 65},
        width = +svg1_3.attr("width") - margin.left - margin.right,
        height = +svg1_3.attr("height") - margin.top - margin.bottom,
        width = +svg1_3_40.attr("width") - margin.left - margin.right,
        height = +svg1_3_40.attr("height") - margin.top - margin.bottom,
        g1_3 = svg1_3.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");        

    var color1_3 = d3.scaleOrdinal()
        .domain(["NV", "fatigue", "headache", "sleep", "depress", "hospital"])
        .range(["#00d02388", "#0000", "#0000",  "#0000", "#0000", "url(#gradient-red)"]);

         //https://www.w3schools.com/colors/colors_names.asp
      
    var x = d3.scaleLinear()
            .range([0, width]),
        y = d3.scaleLinear()
            .range([height, 0]),
        y40 = d3.scaleLinear()
            .range([height, 0]),
        z1_3 = color1_3;
      
    var area1_3 = d3.area()
        //.curve(d3.curveMonotoneX)   //.curve(d3.curveLinear)
        .curve(d3.curveCardinal.tension(0.6))
        .x(function(d) { return x(d.month); })
        .y0(y(0))    //.y0(y(0)) 
        .y0(y40.range()[0]) // inverts but sums up above 0
        .y1(function(d) { return y(d.val); })

    var area1_3_40 = d3.area()
        //.curve(d3.curveMonotoneX)   //.curve(d3.curveLinear)
        .curve(d3.curveCardinal.tension(0.7))
        .x(function(d) { return x(d.month); })
        .y0(y(0))    //.y0(y(0)) 
        .y0(y40.range()[0]) // inverts but sums up above 0
        .y1(function(d) { return y40(d.val); })
   
       
      
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
        
        x.domain([0,9])
          .range([0,width]);
    
        y.domain([100,0])
           .range([0,height]);
        y40.domain([5,0])
           .range([0,height]);
    
     
        z1_3.domain(sources.map(function(c) { return c.id; }));
    
        var source = g1_3.selectAll(".area")
            .data(sources)
            .enter()
            .append("g")
                .attr("class", function(d) { return `area ${d.id}`; })
        
        source.append("path")
            .attr("d", function(d) { console.log(area1_3(d.values)); return area1_3(d.values); })
            .style("fill", function(d) { return z1_3(d.id); })

        g1_3.selectAll("path")
            .transition()
            .duration(5000) 
            .attr("d", function(d) { console.log(area1_3_40(d.values)); return area1_3_40(d.values); })

        g1_3.append("g")
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
        
        g1_3.append("g")
            .attr("class", "axis axis--y")      
            .style("font", "1.2em ink_freeregular")  
            .call(d3.axisLeft(y).ticks(5).tickSize(5))

            .transition().duration(5000)   // delay for display y axis  
            .call(d3.axisLeft(y40).ticks(5).tickSize(5))
        
        g1_3.append("g")
            .attr("class", "axis axis--y")      
            .append("text")
            .attr("transform", "rotate(0)")
            .attr("y", 7)
            .attr("dx", "-65px")
            .attr("dy", "15px")
            .style("font", "2.5em greatthings") 
            .attr("fill", "#000")
            .text("%");
    
      });
    
      function type(d, _, columns) {
        for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
        return d;
      }
    }

    //https://www.youtube.com/watch?v=VplDlwLTR50

    function updateDiv(){         
        $( "#svgpos3" ).load(window.location.href + "#svgpos3" );

        document.addEventListener("DOMContentLoaded", function(event) { 
            var scrollpos = localStorage.getItem('scrollpos');
            if (scrollpos) window.scrollTo(0, scrollpos);
        });
      
        window.onbeforeunload = function(e) {
            localStorage.setItem('scrollpos', window.scrollY);
        };
      
        //document.location.reload(true);

        }



    