function vertical_bar(data, div) {
  const margin = {top: 30, right: 20, bottom: 40, left: 180};
  
  /* width is a part of the Observable standard library.
     it contains the width of the page and is updated
     when you resize the page. */
  const visWidth = width - margin.left - margin.right;
  const visHeight = 600 - margin.top - margin.bottom;

  const svg = div.append('svg')
      .attr('width', visWidth + margin.left + margin.right)
      .attr('height', visHeight + margin.top + margin.bottom)
  
  const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // add title
  
  g.append("text")
    .attr("x", visWidth / 2)
    .attr("y", -margin.top)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .text("Top 20 NYC 311 Service Request Types for February 4th, 2019");
  
  // create scales
  
  const x = d3.scaleLinear()
      .domain([0, d3.max(topRequestTypes, d => d.count)]).nice()
      .range([0, visWidth]);
  
  const y = d3.scaleBand()
      .domain(topRequestTypes.map(d => d.type))
      .range([0, visHeight])
      .padding(0.2);
  
  // create and add axes
  
  const xAxis = d3.axisBottom(x);
  
  g.append("g")
      .attr("transform", `translate(0, ${visHeight})`)
      .call(xAxis)
      .call(g => g.selectAll(".domain").remove())
    .append("text")
      .attr("x", visWidth / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Count");
  
  const yAxis = d3.axisLeft(y);
  
  g.append("g")
      .call(yAxis)
      .call(g => g.selectAll(".domain").remove());
  
  // draw bars
  
  g.selectAll("rect")
    .data(topRequestTypes)
    .join("rect")
      .attr("x", d => 0)
      .attr("y", d => y(d.type))
      .attr("width", d => x(d.count))
      .attr("height", d => y.bandwidth())
      .attr("fill", "steelblue");
  
  return svg.node();
}