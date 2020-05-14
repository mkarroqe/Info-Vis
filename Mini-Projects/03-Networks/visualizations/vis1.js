// Heatmap for Vis1
function vis1(data, div) {
  const margin = {top: 60, right: 20, bottom: 300, left: 65};
  const visWidth = 1250 - margin.left - margin.right;

  // ------------------ x values ------------------ 
  const x_elements = d3.set(data.map(function(item) { 
      return item.recipient; 
    }
  )).values();

  const x = d3.scaleBand()
      .domain(x_elements)
      .range([0, visWidth * 0.95])  

  // ------------------ y values ------------------ 
  const visHeight = x.step() * 6;

  const y_elements = d3.set(data.map(function(item) { 
      return item.donor; 
    } 
  )).values();

  const y = d3.scaleBand()
      .domain(y_elements)
      .range([0, visHeight])

  const extent = [1568, 48830067295] // hardcoded from ordered data
  // -------------------- color ------------------- 
  const color = d3.scaleSequential()
      .domain([extent[0], extent[1] / 10])
      .interpolator(d3.interpolateOranges)

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
      .attr('x', d => x(d.recipient))
      .attr('y', d => y(d.donor))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', d => color(d.amount))

  // -------------------- grid -------------------
  const grid = g.append("g")
      .attr("class", "grid");
  
  grid.append("g")
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("stroke", "#ede")
      .attr("stroke-width", "0.25px")
      .attr("x1", 0)
      .attr("x2", (visWidth / 10) * 9.5)
      .attr("y1", d => y(d.donor))
      .attr("y2", d => y(d.donor));
  
  grid.append("g")
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("stroke", "#ede")
      .attr("stroke-width", "0.25px")
      .attr("x1", d => x(d.recipient))
      .attr("x2", d => x(d.recipient))
      .attr("y1", d => 0)
      .attr("y2", d => visHeight);

  // -------------------- legend ------------------
  svg.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(750, 750)")
    .attr("font-size", 9);

  var legendLinear = d3.legendColor()
    .shapeWidth(80)
    .cells(5)
    .orient('horizontal')
    .scale(color)
    .title("Donation Amount (USD)");

  svg.select(".legendLinear")
    .call(legendLinear);
  
  // --------------------- title ------------------
  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2 - 200)
      .attr('y', -80)
      .attr('font-size', 20)
      .text('Top Donation v. Receipt Relationships')

  // -------------------- labels -------------------
  // x-axis
  const xAxis = d3.axisTop(x)
      .tickPadding(10)
      .tickSize(0);

  g.append('g')
    .call(xAxis)
    .call(g => g.selectAll('.domain').remove());

  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2 - 75)
      .attr('y', -50)
      .attr('font-size', 14)
      .text("Receipient Countries")

  // y-axis
  const yAxis = d3.axisLeft(y)
      .tickPadding(10)
      .tickSize(0);
  
  g.append('g')
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove());

  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2 - 700)
      .attr('y', 300)
      .attr('font-size', 14)
      .attr('writing-mode', 'vertical-rl')
      .text("Donor Countries")
  
}