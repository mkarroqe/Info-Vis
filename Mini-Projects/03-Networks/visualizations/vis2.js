function vis2(data2_1, data2_2, data2_3, data2_4, data2_5, data2_6, data2_7, data2_8, data2_9, data2_10, div) {
  const margin = {top: 40, right: 100, bottom: 100, left: 55};
  const visWidth = 1420 - margin.left - margin.right;
  const visHeight = 600 - margin.top - margin.bottom;

  // ------------------- svg + g ------------------
  const svg = div.append("svg")
      .attr("width", visWidth + margin.left + margin.right)
      .attr("height", visHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // ------------------ x values ------------------ 
  const x_elements = d3.set(data2_1.map(function(item) { 
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
    .attr('transform', `translate(0,${(visHeight / 2) + outerRadius + 5})`)
    .call(xAxis)
    .call(g => g.selectAll('.domain').remove());
  
  // ------------------ y values ------------------ 
  const y_elements = d3.set(data2_1.map(function(item) { 
      return item.recipient; 
    }
  )).values();

  const y = d3.scalePoint()
      .domain(y_elements)
      .range([visHeight, 0]);

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
    .range(d3.schemeTableau10);
  
  // -------------------- data --------------------
  
  // ---------- 1. INDIA ----------
  // const amounts = d3.set(data2_1.map(function(item) { 
  //     return item.amount; 
  //   }
  // )).values();

  // // TODO: figure out why amount values aren't coming up
  // const pie = d3.pie()
  //     .value(d => 2)
  //     // .value(d => d.amount);

  // const arc = d3.arc()
  //     .innerRadius(0)
  //     .outerRadius(outerRadius);

  // const pieGroups = g.selectAll('.pieGroup')
  //   .data(data2_1)
  //   .join('g')
  //     .attr('class', 'pieGroup')
  //     .attr('transform', d => `translate(${x(d.donor)},${visHeight / 2})`);

  // pieGroups.selectAll('path')
  //   .data(d => pie(d.coalesced_purpose_name))
  //   .join('path')
  //     .attr('d', d => arc(d))
  //     .attr('fill', d => color(d.data.coalesced_purpose_name))

  // ---------- 2. THAILAND ----------
  const amounts2 = d3.set(data2_2.map(function(item) { 
      return item.amount; 
    }
  )).values();

  // TODO: figure out why amount values aren't coming up
  const pie2 = d3.pie()
      .value(d => 2)
      // .value(d => d.amount);

  const arc2 = d3.arc()
      .innerRadius(0)
      .outerRadius(outerRadius);

  const pieGroups2 = g.selectAll('.pieGroup')
    .data(data2_2)
    .join('g')
      .attr('class', 'pieGroup')
      .attr('transform', d => `translate(${x(d.donor)},${visHeight / 2})`);

  pieGroups2.selectAll('path')
    .data(d => pie2(d.coalesced_purpose_name))
    .join('path')
      .attr('d', d => arc2(d))
      .attr('fill', d => color(d.data.coalesced_purpose_name))

  // -------------------- legend ------------------
  svg.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(-10, 375)")
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
}




