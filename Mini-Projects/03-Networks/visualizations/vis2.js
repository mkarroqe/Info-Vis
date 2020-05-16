function vis2(data, div) {
  const margin = {top: 40, right: 100, bottom: 100, left: 55};
  const visWidth = 1420 - margin.left - margin.right;
  const visHeight = 700 - margin.top - margin.bottom;

  // ------------------- svg + g ------------------
  const svg = div.append("svg")
      .attr("width", visWidth + margin.left + margin.right)
      .attr("height", visHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // ------------------ x values ------------------ 
  const x_elements = d3.set(data.map(function(item) { 
      return item.donor; 
    }
  )).values();

  const x = d3.scalePoint()
      .domain(x_elements)
      .range([0, visWidth / 1.01]);

  // the radius of the pie charts
  const outerRadius = x.step() / 4.1;
  
  const xAxis = d3.axisBottom(x)
      .tickSize(0)

  g.append('g')
    .attr('transform', `translate(0,${(visHeight * 1.01) + outerRadius + 5})`)
    .call(xAxis)
    .call(g => g.selectAll('.domain').remove());
  
  // ------------------ y values ------------------ 

  const y_elements = d3.set(data.map(function(item) { 
      return item.recipient; 
    }
  )).values();

  console.log()

  const y = d3.scalePoint()
      .domain(y_elements)
      .range([visHeight, visHeight]);

  // y-axis
  const yAxis = d3.axisLeft(y)
      .tickPadding(50)
      .tickSize(0);

  g.append("g")
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove())

  // ------------------- color --------------------
  const purposes = ["Air transport", "Industrial development", "Power generation/non-renewable sources", "Rail transport", "RESCHEDULING AND REFINANCING"]

  const color = d3.scaleOrdinal()
    .domain(purposes)
    .range(d3.schemeCategory10);

  // -------------------- legend ------------------
  svg.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(1110, -30)")
    .attr("font-size", 9);

  var legendOrdinal = d3.legendColor()
    .shape("path", d3.symbol().type(d3.symbolSquare).size(120)())
    .shapePadding(10)
    .scale(color);

  svg.select(".legendOrdinal")
    .call(legendOrdinal);
  
  // --------------------- title ------------------
  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2 - 170)
      .attr('y', -35)
      .attr('font-size', 20)
      .text('Top 5 Coalesced Donation Purposes across Countries')

  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2 - 725)
      .attr('y', -20)
      .attr('font-size', 14)
      .text("Recipient Countries")

   g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth)
      .attr('y', 610)
      .attr('font-size', 14)
      .text("Donors")
  
  // -------------------- data --------------------
  const data2 = d3.rollup(data,
    group => d3.sum(new Set(group.map(g => g.amount))),
    d => d.donor,
    d => d.coalesced_purpose_name);

  console.log(data2);

  const amounts = Array.from(data2, 
                            ([donor, purposes]) => ({
                              donor: donor,
                              types: Array.from(purposes, ([purpose, amount]) => ({purpose, amount}))
                            })); 

  console.log(amounts);

  const maxRadius = 10;
  const radius = d3.scaleSqrt()
      .domain([0, d3.max(amounts, d => d3.max(d.types, b => b.amount))])
      .range([0, maxRadius]);

  const pie = d3.pie()
      .value(d => d.amount);

  const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(outerRadius);

  const pieGroups = g.selectAll('.pieGroup')
    .data(amounts)
    .join('g')
      .attr('class', 'pieGroup')
      .attr('transform', d => `translate(${x(d.donor)},${visHeight})`);

  pieGroups.selectAll('path')
    .data(d => pie(d.types))
    .join('path')
      .attr('d', d => arc(d))
      .attr('fill', d => color(d.data.purpose))
}




