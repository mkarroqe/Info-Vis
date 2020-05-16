function vis1(data, div) {
  var margin = {top: 40, right: 0, bottom: 160, left: 30};
    
  var visWidth = 1100 - margin.left - margin.right;
  var visHeight = 800 - margin.top - margin.bottom;

  // ------------------- svg + g ------------------
  var svg = div.append("svg")
        .attr("width", visWidth + margin.left + margin.right)
        .attr("height", visHeight + margin.top + margin.bottom);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // ------------------- x-values ------------------
  var x = d3.scaleLinear()
            .range([0, visWidth]);

  var extent = d3.extent(data, d => d.amount);
  x.domain(extent);

  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (visHeight + 10) + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2 - 75)
      .attr('y', -50)
      .attr('font-size', 14)
      .text("Net Donation (USD)")

  // ------------------- y-values ------------------
  var y = d3.scaleBand()
    .range([visHeight, 0])
    .padding(0.1);

  y.domain(data.map(function(d){ 
    return d.country; 
  }));

  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + x(0) + ",0)")
    .append("line")
      .attr("y1", 0)
      .attr("y2", visHeight);

  // -------------------- legend ------------------
  var color = d3.scaleSequential()
    .domain([-130000000000, 130000000000])
    .interpolator(d3.interpolateRdYlBu);

  svg.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(950, 20)")
    .attr("font-size", 9);

  var legendLinear = d3.legendColor()
    .shapeWidth(35)
    .cells(11)
    .orient('vertical')
    .scale(color)
    .labelFormat(d3.format("$,"))
    .title("Net Donation (USD)");

  svg.select(".legendLinear")
    .call(legendLinear);

  // -------------------- data ------------------
  var max = d3.max(data, function(d) { return d.amount; });
  color.domain(extent);
  
  var bars = svg.append("g")
    .attr("class", "bars")
  
  bars.selectAll("rect")
    .data(data)
  .enter()
    .append("rect")
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

  // -------------------- labels ------------------
  // x-axis
  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2 - 50)
      .attr('y', 625)
      .attr('font-size', 15)
      .text('Net Donation (USD)');

  // Countries 
  var labels = svg.append("g")
    .attr("class", "labels");
  
  labels.selectAll("text")
    .data(data)
  .enter()
    .append("text")
    .attr("class", "bar-label")
    .attr('font-size', 9)

    .attr("x", x(0))
    .attr("y", function(d) { 
      return y(d.country);
    })

    .attr("dx", function(d) {
      if (d.amount < 0) {
        return 5;
      }
      else {
        return -5;
      }
    })

    .attr("dy", y.bandwidth())

    .attr("text-anchor", function(d) {
      return d.amount < 0 ? "start" : "end";
    })
    .text(function(d) { 
      return d.country;
    });
}

