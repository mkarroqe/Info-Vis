function vis2(data, div) {
  var yMax = 1;
  var yFormat = '.0%';
  var yLabel = "Percent of Injured";

  var margin = {top: 10, right: 0, bottom: 20, left: 120};
  var width = 1100 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
  
  var svg = div.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var months = ["2019-01-01T05:00:00.000Z", "2019-02-01T05:00:00.000Z", "2019-03-01T05:00:00.000Z", "2019-04-01T04:00:00.000Z", "2019-05-01T04:00:00.000Z", "2019-06-01T04:00:00.000Z", "2019-07-01T04:00:00.000Z", "2019-08-01T04:00:00.000Z", "2019-09-01T04:00:00.000Z", "2019-10-01T04:00:00.000Z", "2019-11-01T04:00:00.000Z", "2019-12-01T05:00:00.000Z"]

  var x = d3.scaleBand()
      .domain(months)
      .range([0, width])
      .padding(0.25);
  
  var y = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);
  
  var boroughs = ["BROOKLYN", "QUEENS", "BRONX", "MANHATTAN", "STATEN ISLAND"];

  var color = d3.scaleOrdinal()
    .domain(boroughs)
    .range(d3.schemeTableau10);

  var series = svg.selectAll('.series')
    .data(data)
    .join('g')
      .attr('fill', d => color(d.key))
      .attr('class', 'series')
    .selectAll('rect')
    .data(d => d)
    .join('rect')
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]))
      .attr('x', d => x(d.data.month))
      .attr('width', x.bandwidth());
  
  return svg.node();
}



















