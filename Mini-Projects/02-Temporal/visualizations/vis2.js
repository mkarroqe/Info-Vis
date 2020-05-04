function vis2(data, div) {
  const margin = {top: 40, right: 10, bottom: 100, left: 45};
  const visWidth = 1430 - margin.left - margin.right;
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
  const x_elements = d3.set(data.map(function(item) { 
      return item.year; 
    }
  )).values();
  // console.log(x_elements);

  const x = d3.scaleBand()
      .domain(x_elements)
      .range([0, visWidth * 0.82]);
      // .padding(0.25);

  const xAxis = d3.axisBottom(x);
  
  g.append('g')
      .call(xAxis)
      .call(g => g.selectAll('.domain').remove())
      .attr('y', visHeight / 2);
      // .attr('x', -40);

  // ------------------ y values ------------------ 
  const y = d3.scaleLinear()
      .domain([0, 1]).nice()
      .range([visHeight, 0]);
  
  const yAxis = d3.axisLeft(y).tickFormat(d3.format(".0%"));

  g.append("g")
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove())
    .append('text')
      .attr('fill', 'black')
      .attr('x', -40)
      .attr('y', visHeight / 2)
      .text("Amt (%)");

  // -------------------- data -------------------- 
  const purpose = d3.set(data.map(function(item) { 
      return item.purpose; 
    }
  )).values();
  const amount = d3.set(data.map(function(item) { 
      return item.amount; 
    }
  )).values();
  // console.log(amount);

  const color = d3.scaleOrdinal()
    .domain(purpose)
    .range(d3.schemeCategory10);

  const series = g.selectAll('.series')
    .data(data)
    .join('g')
      .attr('fill', d => color(d.key))
      // .attr('class', 'amount')
    .selectAll('rect')
    .data(d => d)
    .join('rect')
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]))
      .attr('x', (d, i) => x(d.data.year))
      .attr('width', x.bandwidth());

  // -------------------- legend ------------------
  svg.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(1200, 355)")
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
      .attr('x', visWidth / 2 - 200)
      .attr('y', -45)
      .attr('font-size', 20)
      .text('Top 10 Coalesced Purposes of Donations')
  
}




