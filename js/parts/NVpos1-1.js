var svg1_1 = d3.select("#svg-pos1-1"),
      margin = {top: 80, right: 90, bottom: 30, left: 65},
      width = +svg1_1.attr("width") - margin.left - margin.right,
      height = +svg1_1.attr("height") - margin.top - margin.bottom,
      g1_1 = svg1_1.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    
var x = d3.scaleLinear().range([0, width]);
      
      x.domain([0,9])
        .range([0,width]);

      g1_1.append("g")
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
    
      g1_1.append("text")
          .attr("x", (width / 2))             
          .attr("y", 0 - (margin.top / 2) - 5)
          .attr("text-anchor", "middle")  
          .style("font", "2.4em ink_freeregular") 
          .style("fill", "#111")
          .text("Nausea + Vomiting");
      






