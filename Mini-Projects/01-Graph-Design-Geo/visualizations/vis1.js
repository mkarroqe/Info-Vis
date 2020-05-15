function vis1(data, div) {
  
  var margin = {top: 40, right: 0, bottom: 60, left: 30};
    
  var width = 1100 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var svg = div.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var x = d3.scaleLinear()
    .range([0, width]);

  var color = d3.scaleSequential(d3.interpolatePRGn);

  var y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1);


  y.domain(data.map(function(d) { return d.country; }));
  x.domain(d3.extent(data, function(d) { return d.amount; }));
  
  var max = d3.max(data, function(d) { return d.amount; });
  color.domain([-max, max]);
  
  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + x(0) + ",0)")
    .append("line")
      .attr("y1", 0)
      .attr("y2", height);
  
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (height + 10) + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));
  
  var bars = svg.append("g")
    .attr("class", "bars")
  
  bars.selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("class", "annual-growth")
    .attr("x", function(d) {
      return x(Math.min(0, d.amount));
    })
    .attr("y", function(d) { return y(d.country); })
    .attr("height", y.bandwidth())
    .attr("width", function(d) { 
      return Math.abs(x(d.amount) - x(0))
    })
    .style("fill", function(d) {
      return color(d.amount)
    });
  
  var labels = svg.append("g")
    .attr("class", "labels");
  
  labels.selectAll("text")
    .data(data)
  .enter().append("text")
    .attr("class", "bar-label")
    .attr("x", x(0))
    .attr("y", function(d) { return y(d.country)})
    .attr("dx", function(d) {
      return d.amount < 0 ? 5 : -5;
    })
    .attr("dy", y.bandwidth())
    .attr("text-anchor", function(d) {
      return d.amount < 0 ? "start" : "end";
    })
    .text(function(d) { return d.country });
    
}

