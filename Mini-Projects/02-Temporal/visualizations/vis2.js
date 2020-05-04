function vis2(data, data2, div) {
  const margin = {top: 40, right: 10, bottom: 100, left: 95};
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
  const x_elements = d3.set(data2.map(function(item) { 
      return item.year; 
    }
  )).values();

  const x = d3.scaleBand()
    .domain(x_elements)
    .range([0, visWidth * 0.8]);

  const xAxis = d3.axisBottom(x);
      // .tickPadding(10)
      // .tickSize(0); // ticks aid readibility
  
  g.append('g')
      .attr('transform', `translate(0,${visHeight})`)
      .call(xAxis)
      .call(g => g.selectAll('.domain').remove());
  
  const y = d3.scaleLinear()
      .domain([0, 1]).nice()
      .range([visHeight, 0]);
  
  // ------------------ y values ------------------ 
  const yAxis = d3.axisLeft(y).tickFormat(d3.format(".0%"));

  g.append("g")
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove())

  // ------------------- color --------------------
  var color = d3.scaleOrdinal()
    .domain(data.columns.slice(1))
    .range(d3.schemeCategory10);
  
  // -------------------- data --------------------
  const area = d3.area()
    .x(d => x(d.data.year))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]));

  const series = d3.stack()
    .keys(data.columns.slice(1))
    .offset(d3.stackOffsetExpand)(data);

  svg.append("g")
    .attr("transform", "translate(108, 40)")
    .selectAll("path")
    .data(series)
    .join("path")
    .attr("fill", ({key}) => color(key))
    .attr("d", area)
    .text(({key}) => key);

  // -------------------- legend ------------------
  svg.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(1180, 300)")
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
      .attr('x', visWidth / 2 - 300)
      .attr('y', -35)
      .attr('font-size', 20)
      .text('Top 10 Coalesced Purposes of Donations')
}




