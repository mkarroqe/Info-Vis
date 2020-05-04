function vis1(data, div) {
  const margin = {top: 40, right: 20, bottom: 300, left: 65};
  const visWidth = 1250 - margin.left - margin.right;

  // ------------------ x values ------------------ 
  const x_elements = d3.set(data.map(function(item) { 
      return item.year; 
    }
  )).values();

  const x = d3.scaleBand()
      .domain(x_elements)
      .range([0, visWidth * 0.95])  

  // ------------------ y values ------------------ 
  const visHeight = x.step() * 20;

  const y_elements = d3.set(data.map(function(item) { 
      return item.country; 
    } 
  )).values();

  const y = d3.scaleBand()
      .domain(y_elements)
      .range([0, visHeight * 1.25])

  // -------------------- color ------------------- 
  const color = d3.scaleSequential()
      .domain([-300, 300])
      .interpolator(d3.interpolatePiYG)

  // ------------------- svg + g ------------------
  const svg = div.append("svg")
      .attr("width", visWidth + margin.left + margin.right)
      .attr("height", visHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // --------------------- cells ------------------
  g.selectAll('rect')
    .data(data)
    .join('rect')
      .attr('x', d => x(d.year))
      .attr('y', d => y(d.country))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', d => color(d.value))

  // -------------------- legend ------------------
  svg.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(820, 740)")
    .attr("font-size", 9);

  var legendLinear = d3.legendColor()
    .shapeWidth(30)
    .cells(11)
    .orient('horizontal')
    .scale(color)
    .title("Net Donation (USD)");

  svg.select(".legendLinear")
    .call(legendLinear);
  
  // --------------------- title ------------------
  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2 - 200)
      .attr('y', -65)
      .attr('font-size', 20)
      .text('Amount Donated v. Amount Received')

  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2 - 80)
      .attr('y', -45)
      .attr('font-size', 20)
      .text('1973-2013');

  // -------------------- labels -------------------
  // x-axis
  const xAxis = d3.axisTop(x)
      .tickPadding(10)
      .tickSize(0);

  g.append('g')
    .call(xAxis);

  // y-axis
  const yAxis = d3.axisLeft(y)
      .tickPadding(10)
      .tickSize(0);
  
  g.append('g')
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove());
}