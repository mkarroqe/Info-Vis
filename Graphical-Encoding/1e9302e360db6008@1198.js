// https://observablehq.com/d/1e9302e360db6008@1198
import define1 from "./a33468b95d0b15b0@692.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["gz_2010_us_040_00_20m.json",new URL("./files/5bffca711a2b45090494c77bab30bfa36859ecb5a0619c7d93e1da8f8089be61df96021c578b53cfbd2c3f6611e2567183fec5ed9a66876b50bb47123b2c56b9",import.meta.url)],["unemployment-dec-2019@2.csv",new URL("./files/6ff47364694fc89e81852ef1f47e221ae3b0dc3b06edf3248613be7840459f835ce51379b282d7a1e5460d03f88565e5883f64691061d81835a633a0edbd4a07",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Graphical Encoding - Exercise

In this exercise, we have a dataset that contains the unemployment rate for each state for December 2019. Your task is to visualize this data in 5 different ways. This exercise is about exploring possibilities, so it's okay if some of your visualizations aren't the most effective.

To get started, create a fork of this notebook. When you are finished, **do not** publish your notebook. Instead, go to the menu at the top with the three dots and click "Enable link sharing." You can then submit the link on NYU Classes.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Data

The map data comes from [here](https://eric.clst.org/tech/usgeojson/) and is based on boundaries given by the U.S. Census Bureau.`
)});
  main.variable(observer("usaGeo")).define("usaGeo", ["FileAttachment"], function(FileAttachment){return(
FileAttachment('gz_2010_us_040_00_20m.json').json()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The unemployment data comes from the [U.S. Bureau of Labor Statistics](https://www.bls.gov/web/laus/laumstrk.htm). We'll put the unemployment data in two formats:
- An array of objects where each object has the name and unemployment rate of the state.
- A single object where the keys are the state names and the values are the unemployment rates.`
)});
  main.variable(observer("unemployment")).define("unemployment", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment('unemployment-dec-2019@2.csv').text(),
                           d3.autoType)
)});
  main.variable(observer("stateToRate")).define("stateToRate", ["unemployment"], function(unemployment){return(
Object.fromEntries(new Map(unemployment.map(d => [d.state, d.rate])))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`We'll calculate the min and max unemployment rates:`
)});
  main.variable(observer("extent")).define("extent", ["d3","unemployment"], function(d3,unemployment){return(
d3.extent(unemployment, d => d.rate)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Next, we'll create a color scale. Feel free to modify this or use other color scales too.`
)});
  main.variable(observer("color")).define("color", ["d3","extent"], function(d3,extent){return(
d3.scaleSequential()
      .domain(extent)
      .interpolator(d3.interpolateBlues)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Lastly, you may find it handy to have a mapping from state name to abbreviation. This data is from [World Population Review](https://worldpopulationreview.com/states/state-abbreviations/).`
)});
  main.variable(observer("stateToAbbr")).define("stateToAbbr", function(){return(
{
  "Alabama": "AL",
  "Alaska": "AK",
  "American Samoa": "AS",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "District of Columbia": "DC",
  "Federated States Of Micronesia": "FM",
  "Florida": "FL",
  "Georgia": "GA",
  "Guam": "GU",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Marshall Islands": "MH",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Northern Mariana Islands": "MP",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Palau": "PW",
  "Pennsylvania": "PA",
  "Puerto Rico": "PR",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virgin Islands": "VI",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY"
}
)});
  main.variable(observer("mean")).define("mean", ["d3","unemployment"], function(d3,unemployment){return(
d3.mean(unemployment, d => d.rate)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Example 1: Choropleth Map`
)});
  main.variable(observer()).define(["legend","color"], function(legend,color){return(
legend({
  color: color,
  title: 'Unemployment Rate, Decemeber 2019'
})
)});
  main.variable(observer()).define(["d3","DOM","usaGeo","color","stateToRate"], function(d3,DOM,usaGeo,color,stateToRate)
{
  const margin = {top: 0, right: 0, bottom: 0, left: 0};
  const visWidth = 600 - margin.left - margin.right;
  const visHeight = 400 - margin.top - margin.bottom;

  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // draw map
  
  const projection =  d3.geoAlbersUsa()
      .fitSize([visWidth, visHeight], usaGeo);

  const path = d3.geoPath().projection(projection);

  g.selectAll('.border')
    // we're not going to show Puerto Rico and it's not in the
    // unemployment rate data, so we'll filter it out
    .data(usaGeo.features.filter(d => d.properties.NAME !== 'Puerto Rico'))
    .join('path')
      .attr('class', 'border')
      .attr('d', path)
      .attr('fill', d => color(stateToRate[d.properties.NAME]))
      .attr('stroke', 'white')

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Example 2: Speedometer Charts

This visualization encodes the unemployment rate using the angle of a line.

We'll augment the data to make it easier to place into a grid.`
)});
  main.variable(observer("numCols")).define("numCols", function(){return(
8
)});
  main.variable(observer("numRows")).define("numRows", function(){return(
7
)});
  main.variable(observer("gridPositions")).define("gridPositions", ["d3","numRows","numCols"], function(d3,numRows,numCols){return(
d3.cross(d3.range(numRows),
                         d3.range(numCols),
                         (row, col) => ({row, col}))
)});
  main.variable(observer("unemploymentWithGrid")).define("unemploymentWithGrid", ["d3","unemployment","gridPositions"], function(d3,unemployment,gridPositions){return(
d3.zip(unemployment, gridPositions)
    .map(([data, pos]) => ({...data, ...pos}))
)});
  main.variable(observer()).define(["d3","DOM","numCols","numRows","extent","unemploymentWithGrid","lightgray"], function(d3,DOM,numCols,numRows,extent,unemploymentWithGrid,lightgray)
{
  const margin = {top: 30, right: 20, bottom: 0, left: 30};
  const visWidth = 750 - margin.left - margin.right;
  const visHeight = 450 - margin.top - margin.bottom;

  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // title
  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2)
      .attr('y', -margin.top)
      .text('Unemployment Rate, Dec. 2019');

  // set up scales
  
  const column = d3.scaleBand()
      .domain(d3.range(numCols))
      .range([0, visWidth])
      .paddingInner(0.05);
  
  const row = d3.scaleBand()
      .domain(d3.range(numRows))
      .range([0, visHeight])
      .paddingInner(0.05);
  
  const angle = d3.scaleLinear()
      .domain([0, Math.ceil(extent[1])])
      .range([0, Math.PI]);
  
  const radius = Math.min(column.bandwidth(), row.bandwidth()) / 2;
  
  // create a group for each cell in the grid
  const cell = g.selectAll('g')
    .data(unemploymentWithGrid)
    .join('g')
      .attr('transform', d => `translate(${column(d.col) + radius},${row(d.row) + radius})`);
  
  // use an arc generator to create a half-circle
  
  const arc = d3.arc()
      .innerRadius(radius - 1)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);
  
  cell.append('path')
      .attr('d', arc())
      .attr('fill', lightgray);
  
  // add baseline
  const line = d3.line();
  
  cell.append('path')
      .attr('d', d => line([[-radius, 0], [radius, 0]]))
      .attr('fill', 'none')
      .attr('stroke', lightgray)
      .attr('stroke-width', 1)
  
  // add sloped line
  cell.append('path')
      .attr('d', d => {
        const start = [0, 0];
        const end = [-Math.cos(angle(d.rate)) * radius,
                     -Math.sin(angle(d.rate)) * radius];
        return line([start, end])
      })
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 2);
  
  // add labels
  
  cell.append('text')
      .attr('y', 20)
      .attr('class', 'state-label')
      .text(d => d.state);
  
  cell.append('text')
      .attr('class', 'arc-label')
      .attr('x', -radius)
      .attr('y', 10)
      .text('0');
  
  cell.append('text')
      .attr('class', 'arc-label')
      .attr('x', radius)
      .attr('y', 10)
      .text(Math.ceil(extent[1]));

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Solution 1: Matrix Grid
My inspiration for this solution was inspired by the speedometer example above. Personally, I had significantly more difficulty understanding the data in that example than the map. I think "filling in" the cells of the grid with color hues that correspond to unemployment rate will make it easier to see at a glance which states are highest and lowest. Ordering the states from best to worst also helps with visibility!`
)});
  main.variable(observer("color1")).define("color1", ["d3","extent"], function(d3,extent){return(
d3.scaleSequential()
           .domain([0, extent[1]])
           .interpolator(d3.interpolatePuOr)
)});
  main.variable(observer()).define(["legend","color1"], function(legend,color1){return(
legend({
  color: color1,
  title: "Unemployment Rate (%)"
})
)});
  main.variable(observer()).define(["d3","DOM","numCols","numRows","extent","unemploymentWithGrid","color1"], function(d3,DOM,numCols,numRows,extent,unemploymentWithGrid,color1)
{
  const margin = {top: 30, right: 20, bottom: 0, left: 30};
  const visWidth = 750 - margin.left - margin.right;
  const visHeight = 450 - margin.top - margin.bottom;

  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // title
  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2)
      .attr('y', -margin.top)
      .text('Unemployment Rate, Dec. 2019');

  // set up scales
  
  const column = d3.scaleBand()
      .domain(d3.range(numCols))
      .range([0, visWidth])
      .paddingInner(0.05);
  
  const row = d3.scaleBand()
      .domain(d3.range(numRows))
      .range([0, visHeight])
      .paddingInner(0.05);
  
  const angle = d3.scaleLinear()
      .domain([0, Math.ceil(extent[1])])
      .range([0, Math.PI]);
  
  const radius = Math.min(column.bandwidth(), row.bandwidth()) / 2;
  
  // create a group for each cell in the grid
  const cell = g.selectAll('g')
    .data(unemploymentWithGrid)
    .join('g')
      .attr('transform', d => `translate(${column(d.col) + radius},${row(d.row) + radius})`);
  
  const box = d3.symbol()
                .type(d3.symbolSquare)
                .size(500)
  
  cell.append('path')
      .attr('d', box())
      .attr('fill', d => color1(d.rate));
  
  // add labels
  cell.append('text')
      .attr('y', 20)
      .attr('class', 'state-label')
      .text(d => d.state);

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Solution 2: Vertical Bar Chart
The goal of this chart is to easily distinguish if a state's unemployment rate is above or below the national average.
- The length of the bars will be their difference from the mean. 
- I added colors to make the information pop more and to make the graph more interesting.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`*(shoutout to Mike Bostock for posting [this](https://observablehq.com/@d3/diverging-bar-chart) guide on diverging bar charts three days ago)*`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### 1. First I transformed the data to calculate the difference from the mean for each state:`
)});
  main.variable(observer("getDistFromMean")).define("getDistFromMean", ["mean"], function(mean){return(
function getDistFromMean(data) {
  let new_data = data;
  var i;
  for (i = 0; i < data.length; i++) {
    new_data[i].rate = mean - data[i].rate;
  }
  return new_data;
}
)});
  main.variable(observer("distFromMean")).define("distFromMean", ["getDistFromMean","unemployment"], function(getDistFromMean,unemployment){return(
getDistFromMean(unemployment)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### 2. Then I graphed the data in the Diverging Bar Chart:`
)});
  main.variable(observer()).define(["legend_ex5"], function(legend_ex5){return(
legend_ex5()
)});
  main.variable(observer()).define(["distFromMean","d3","DOM","bin_colors"], function(distFromMean,d3,DOM,bin_colors)
{
  const margin = ({top: 30, bottom: 10, left: 60, right: 60});
  const visWidth = 600 - margin.left - margin.right;
  const barHeight = 10;
  const visHeight = Math.ceil((distFromMean.length + 0.1) * barHeight) + margin.top + margin.bottom
  
  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));
  const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  // Title
  g.append("text")
    .attr("x", visWidth / 2)
    .attr("y", -margin.top)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .text("Unemployment Rate 2019: Difference from National Average");
  
  const x = d3.scaleLinear()
              .domain(d3.extent(distFromMean, d => d.rate))
              .rangeRound([margin.left, visWidth - margin.right]);
  
  const format = d3.format("+,.00");
  const tickFormat = d3.formatPrefix("+.1", 1e2);

  const xAxis = g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(visWidth / 70).tickFormat(tickFormat))
    .call(g => g.select(".domain").remove())
    .attr('color', 'DarkSlateGrey')
  
  const y = d3.scaleBand()
    .domain(d3.range(distFromMean.length))
    .rangeRound([margin.top, visHeight - margin.bottom])
    .padding(0.1)
    
  const yAxis = g => g
    .attr("transform", `translate(${x(0)},0)`)
    .attr('color', 'DarkSlateGrey')
    .call(d3.axisLeft(y).tickFormat(i => distFromMean[i].state).tickSize(0).tickPadding(6))
    .call(g => g.selectAll(".tick text").filter(i => distFromMean[i].rate < 0)
        .attr("text-anchor", "start")
        .attr("x", 6))
    
  // Rectangles
  g.selectAll("rect")
    .data(distFromMean)
    .join("rect")
      .attr("x", d => x(Math.min(d.rate, 0))) // Mike's suggestion
      .attr("y", (d, i) => y(i)) 
      .attr("width", d => Math.abs(x(d.rate) - x(0))) // Mike's suggestion
      .attr("height", y.bandwidth()) 
      
      // color segmentation activity
      .attr("fill", function(d) {
        if (d.rate < 0) { return bin_colors[0] }
        else { return bin_colors[1] }
      });
  
   g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("text")
    .data(distFromMean)
    .join("text")
      // color segmentation activity
      .style("fill", function(d) {
        if (d.rate < 0) { return bin_colors[0] }
        else { return bin_colors[1] }
      })
  
      .attr("text-anchor", d => d.rate < 0 ? "end" : "start")
      .attr("x", d => x(d.rate) + Math.sign(d.rate - 0) * 4)
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => format(d.rate));
  
  // Y-axis Group
  g.append("g")
     .call(yAxis);
  
  // X-axis Group
  g.append("g")
      .attr("transform", `translate(0, ${visHeight})`)
      .call(xAxis)
  
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Solution 3: Worst/Best States Maps
The goal of this chart is to highlight and compares the states with the highest and lowest unemployment rates *individually*.
- To do this, I have created two complimentary maps.
- I used red and green hues because humans commonly associate red negatively, and green positively (like traffic lights)
- Worst States Map:
  - all states with unemployment rates above the mean are highlighted in red.
  - the remaining states are greyed out, as they are not the focus of this visualization.
  - the states with above average unemployment states are colored in using a sequential scale. The color intensity corresponds with unemployment rate.
  - this is a simple and effective visualization, as it is easy to pin-point the problem states and see which ones have the worst rates.
- Best States Map:
  - this map employs all the above ideas as well.
  - I think it's a great compliment to the first map, as you can see that the lower rates are concentrated in the midwest.`
)});
  main.variable(observer("color3")).define("color3", ["d3","mean","extent"], function(d3,mean,extent){return(
d3.scaleSequential()
    .domain([mean, extent[1]])
    .interpolator(d3.interpolateReds)
)});
  main.variable(observer()).define(["legend","color3"], function(legend,color3){return(
legend({
  color: color3,
  title: "Unemployment Rate (%)"
})
)});
  main.variable(observer()).define(["d3","DOM","usaGeo","stateToRate","mean","color3"], function(d3,DOM,usaGeo,stateToRate,mean,color3)
{
  const margin = {top: 10, right: 0, bottom: 0, left: 0};
  const visWidth = 600 - margin.left - margin.right;
  const visHeight = 400 - margin.top - margin.bottom;

  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth/2)
      .attr('y', -5)
      .text('Unemployment Rates Above National Average');
  
  // draw map
  const projection =  d3.geoAlbersUsa()
      .fitSize([visWidth, visHeight], usaGeo);

  const path = d3.geoPath().projection(projection);

  g.selectAll('.border')
    .data(usaGeo.features.filter(d => d.properties.NAME !== 'Puerto Rico'))
    .join('path')
      .attr('class', 'border')
      .attr('d', path)
      .attr('fill', d => (stateToRate[d.properties.NAME] > mean) ? color3(stateToRate[d.properties.NAME]) : "whitesmoke" )
      .attr('stroke', 'white')

  return svg.node();
}
);
  main.variable(observer("color3_2")).define("color3_2", ["d3","extent","mean"], function(d3,extent,mean){return(
d3.scaleSequential()
    .domain([extent[0], mean])
    .interpolator(d3.interpolateGreens)
)});
  main.variable(observer()).define(["legend","color3_2"], function(legend,color3_2){return(
legend({
  color: color3_2,
  title: "Unemployment Rate (%)"
})
)});
  main.variable(observer()).define(["d3","DOM","usaGeo","stateToRate","mean","color3_2"], function(d3,DOM,usaGeo,stateToRate,mean,color3_2)
{
  const margin = {top: 10, right: 0, bottom: 0, left: 0};
  const visWidth = 600 - margin.left - margin.right;
  const visHeight = 400 - margin.top - margin.bottom;

  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth/2)
      .attr('y', -5)
      .text('Unemployment Rates Below National Average');
  
  // draw map
  const projection =  d3.geoAlbersUsa()
      .fitSize([visWidth, visHeight], usaGeo);

  const path = d3.geoPath().projection(projection);

  g.selectAll('.border')
    .data(usaGeo.features.filter(d => d.properties.NAME !== 'Puerto Rico'))
    .join('path')
      .attr('class', 'border')
      .attr('d', path)
      .attr('fill', d => (stateToRate[d.properties.NAME] < mean) ? color3_2(stateToRate[d.properties.NAME]) : "whitesmoke" )
      .attr('stroke', 'white')

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Solution 4: Choropleth Map Segmentation
The goal of this visualization is to understand unemployment rates at a glance geographically.
- States are segmented into three colors:
  - if unemployment is above the mean: green
  - if unemployment is within to the mean: yellow
  - if unemployment is below the mean: red
- I think it's interesting to compare this visualization with the one above. While they are both maps, since the states in this visualization have a category for being *"within"* the mean, the states that previously may have looked "in danger" for being slightly above average are neutralized here. This therefore highlights only the states that are significantly above or below the mean.`
)});
  main.variable(observer("color2")).define("color2", ["d3","extent","mean"], function(d3,extent,mean){return(
d3.scaleQuantile()
      .domain([extent[0], mean, extent[1]])
      .range(["#7fc97f", "#ffff99", "#fdc086"])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### 3 color segmentation
- By creating 3 bins for the percentages to fall into, we can see on a map which states are within the average unemployment rate (yellow), which ones are above average (red), and which ones are below (green).
- This makes it easy to see which states are doing better or worse than others based on the general connotation of green meaning something positive and red being negative.`
)});
  main.variable(observer()).define(["legend","color2"], function(legend,color2){return(
legend({
  color: color2,
  title: "Percent Unemployment Rates"
})
)});
  main.variable(observer()).define(["d3","DOM","usaGeo","color2","stateToRate"], function(d3,DOM,usaGeo,color2,stateToRate)
{
  const margin = {top: 0, right: 0, bottom: 0, left: 0};
  const visWidth = 600 - margin.left - margin.right;
  const visHeight = 400 - margin.top - margin.bottom;

  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // draw map
  const projection =  d3.geoAlbersUsa()
      .fitSize([visWidth, visHeight], usaGeo);

  const path = d3.geoPath().projection(projection);

  g.selectAll('.border')
    .data(usaGeo.features.filter(d => d.properties.NAME !== 'Puerto Rico'))
    .join('path')
      .attr('class', 'border')
      .attr('d', path)
      .attr('fill', d => color2(stateToRate[d.properties.NAME]))
      .attr('stroke', 'white')

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Solution 5: Vertical Bar Chart + Binary Color Segmentation
This is more of a classic, familiar visualization, that users will have likely had past experiences reading.
- The bar chart is vertical rather than horizontal, as it is easier for the eye to follow left to right rather than up and down (like how we read!).
- Unlike my previous bar chart example, all bars extend to the right.
- States are ranked in ascending order
- Bars are red if they are below the mean, and green if they are above.`
)});
  main.variable(observer()).define(["legend_ex5"], function(legend_ex5){return(
legend_ex5()
)});
  main.variable(observer()).define(["d3","DOM","unemployment","extent","mean","bin_colors"], function(d3,DOM,unemployment,extent,mean,bin_colors)
{
  const margin = ({top: 0, bottom: 50, left: 110, right: 10});
  const visWidth = 600 - margin.left - margin.right;
  const visHeight = 610 - margin.top - margin.bottom;
  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));
  const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  // Title
  g.append("text")
    .attr("x", visWidth / 2)
    .attr("y", -margin.top)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .text("2019 Unemployment Rates by State");
  
  // States for the y-scale
  const states = unemployment.map(d => d.state);
  const y = d3.scaleBand()
              .domain(states)
              .range([0, visHeight])
              .padding(0.2);
  const yAxis = d3.axisLeft(y);
  
  // Rates for x-scale
  const minRate = extent[0] - 0.1
  const maxRate = extent[1]
  const x = d3.scaleLinear()
              .domain([minRate, maxRate])
              .range([0, visWidth]);
  const xAxis = d3.axisBottom(x);
  
  // Bind data to rectangles
  g.selectAll("rect")
    .data(unemployment)
    .join("rect")
      .attr("x", 0) 
      .attr("y", d => y(d.state)) 
      .attr("width", d => x(d.rate)) 
      .attr("height", d => y.bandwidth()) 
      
      // color segmentation activity
      .attr("fill", function(d) {
        if (d.rate > mean) { return bin_colors[0] }
        else { return bin_colors[1] }
      });

  
  // Y-axis Group
  g.append("g")
      .call(yAxis);
  
  // X-axis Group
  g.append("g")
      .attr("transform", `translate(0, ${visHeight})`)
      .call(xAxis)
  
    // X-axis Label
    .append("text")
      .attr("fill", "black")
      .attr("font-family", "sans-serif")
      .attr("x", visWidth / 2)
      .attr("y", 40)
      .attr("font-size", 12)
      .text("Unemployment Rate");
  
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Appendix`
)});
  main.variable(observer()).define(["html","lightgray"], function(html,lightgray){return(
html`<style>
.title {
  text-anchor: middle;
  dominant-baseline: hanging;
  font-family: sans-serif;
  font-size: 16px;
}

.state-label {
  text-anchor: middle;
  font-family: sans-serif;
  font-size: 10px;
}

.arc-label {
  text-anchor: middle;
  font-family: sans-serif;
  font-size: 12px;
  fill: ${lightgray}
}
</style>`
)});
  main.variable(observer("get_color")).define("get_color", function(){return(
function get_color(d) {
  if (d == 2.4) { return "Above the mean" }
  else { return "Below the mean"}
}
)});
  main.variable(observer("legend_ex5")).define("legend_ex5", ["d3","DOM","width","color","bin_colors","get_color"], function(d3,DOM,width,color,bin_colors,get_color){return(
function legend_ex5() {
  const size = 10;
  const lineHeight = size * 1.5;
  
  const svg =  d3.select(DOM.svg(width, color.domain().length * lineHeight));
  
  const rows = svg
    .selectAll("g")
    .data(color.domain())
    .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * lineHeight})`);
  
  rows.append("rect")
      .attr("height", size)
      .attr("width", size)
  
      // color segmentation activity
      .attr("fill", function(d, i) {
        return bin_colors[i]
      });
  
  rows.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("dominant-baseline", "hanging")
      .attr("x", lineHeight)
      .text(d => get_color(d));
  
  return svg.node();
}
)});
  main.variable(observer("bin_colors")).define("bin_colors", function(){return(
["tomato", "teal"]
)});
  main.variable(observer("lightgray")).define("lightgray", function(){return(
'#dcdcdc'
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5', 'd3-array@2')
)});
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  return main;
}
