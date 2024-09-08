var svg1_2 = d3.select("#svg-pos1-2"),
      margin = {top: 80, right: 90, bottom: 30, left: 65},
      width = +svg1_2.attr("width") - margin.left - margin.right,
      height = +svg1_2.attr("height") - margin.top - margin.bottom,
      g1_2 = svg1_2.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x = d3.scaleLinear().range([0, width]),
      y = d3.scaleLinear().range([height, 0]);
    
      x.domain([0,9])
        .range([0,width]);
      
      y.domain([100,0])
         .range([0,height]);
      
      g1_2.append("g")
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
    
      g1_2.append("g")
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
    
       g1_2.append("text")
          .attr("x", (width / 2))             
          .attr("y", 0 - ((margin.top / 2) + 5))
          .attr("text-anchor", "middle")  
          .style("font", "2.4em ink_freeregular") 
          .style("fill", "#111")
          .text("Nausea + Vomiting");
   
    





