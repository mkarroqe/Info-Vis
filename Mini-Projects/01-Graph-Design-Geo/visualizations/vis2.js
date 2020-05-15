function vis2(data, geoJSON, div) {
  const margin = {top: 120, right: 20, bottom: 0, left: 20};
  const visWidth = 1900 - margin.left - margin.right;
  const visHeight = 600 - margin.top - margin.bottom;

  // ------------------- svg + g ------------------
  const svg = div.append('svg')
      .attr('width', visWidth + margin.left + margin.right)
      .attr('height', visHeight + margin.top + margin.bottom);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // ----------------- projection ----------------- 
  const projection =  d3.geoNaturalEarth1()
      .fitSize([visWidth / 2, visHeight / 1.2], geoJSON);

  const path = d3.geoPath().projection(projection);

  // -------------------- legend ------------------
  var color = d3.scaleSequential()
    .domain([0, 1])
    .interpolator(d3.interpolateGreens);

  svg.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(950, 50)")
    .attr("font-size", 9);

  var legendLinear = d3.legendColor()
    .shapeWidth(35)
    .cells(10)
    .orient('vertical')
    .scale(color)
    .title("Donation Ratio");

  svg.select(".legendLinear")
    .call(legendLinear);
  
  // -------------------- data --------------------
  ratios = Object.fromEntries(new Map(data.map(d => [d.country, d.ratio])));

  g.selectAll('.border')
    .data(geoJSON.features)
    .join('path')
      .attr('class', 'border')
      .attr('d', path)
      .attr('fill', d => color(ratios[d.properties.NAME]))
      .attr('stroke', '#ececec');
  
  // --------------------- title ------------------
  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 5)
      .attr('y', -65)
      .attr('font-size', 20)
      .text('International Donation Percentages')
}

