// https://observablehq.com/d/80992086c9c9d047@1080
import define1 from "./a33468b95d0b15b0@692.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["population-2018-2019.csv",new URL("./files/18e58346b5d3a52c4e301e25fbe613316a9e21fd4c76d0c1eea3d5dc537322c3f8928fe0074754c3d6bff498f4bec3d2a32928aa1db8f138b18ce8a6c6034253",import.meta.url)],["gz_2010_us_040_00_20m.json",new URL("./files/5bffca711a2b45090494c77bab30bfa36859ecb5a0619c7d93e1da8f8089be61df96021c578b53cfbd2c3f6611e2567183fec5ed9a66876b50bb47123b2c56b9",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Color - Exercise

In this exercise, we have created visualizations that do not have any color. Your task is to add appropriate color to them.

The [Color Legend](/@d3/color-legend) notebook imported below contains examples of how to make various color scales and their legends. I recommend looking at that notebook and the links it gives.`
)});
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.import("swatches", child1);
  main.variable(observer()).define(["md","companies"], function(md,companies){return(
md`## Problem 1

First, we have a line chart that shows the stock prices for ${companies.length} companies: ${companies.join(', ')}.`
)});
  main.variable(observer("stocksByCompany")).define("stocksByCompany", ["datasets","d3","minStockDate"], async function(datasets,d3,minStockDate)
{
  const stocks = (await datasets['stocks.csv']())
    .map(d => ({
      'symbol': d.symbol,
      'price': d.price,
      'date': d3.timeParse('%b %e %Y')(d.date)
    }))
    .filter(d => d.date >= minStockDate)

  return Array.from(d3.group(stocks, d => d.symbol),
                    ([symbol, prices]) => ({symbol, prices}))
}
);
  main.variable(observer("companies")).define("companies", ["stocksByCompany"], function(stocksByCompany){return(
stocksByCompany.map(d => d.symbol)
)});
  main.variable(observer("minStockDate")).define("minStockDate", ["d3"], function(d3){return(
d3.timeParse('%b %e %Y')('Jan 1 2005')
)});
  main.variable(observer("maxStockDate")).define("maxStockDate", ["d3","stocksByCompany"], function(d3,stocksByCompany){return(
d3.max(stocksByCompany, d => d3.max(d.prices, p => p.date))
)});
  main.variable(observer("maxPrice")).define("maxPrice", ["d3","stocksByCompany"], function(d3,stocksByCompany){return(
d3.max(stocksByCompany, d => d3.max(d.prices, p => p.price))
)});
  main.variable(observer("legend1")).define("legend1", ["d3","DOM","width","color1"], function(d3,DOM,width,color1){return(
function legend1() {
  const size = 10;
  const lineHeight = size * 1.5;
  
  const svg =  d3.select(DOM.svg(width, color1.domain().length * lineHeight));
  
  const rows = svg
    .selectAll("g")
    .data(color1.domain())
    .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * lineHeight})`);
  
  rows.append("rect")
      .attr("height", size)
      .attr("width", size)
      .attr("fill", d => color1(d));
  
  rows.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("dominant-baseline", "hanging")
      .attr("x", lineHeight)
      .text(d => d);
  
  return svg.node();
}
)});
  main.variable(observer("color1")).define("color1", ["d3","companies"], function(d3,companies){return(
d3.scaleOrdinal()
    .domain(companies)
    .range(d3.schemeSet1)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Notes:
- I changes the color hue of the axes to be slightly less prominent. I felt that the black took away from the color hues of the lines.`
)});
  main.variable(observer()).define(["legend1"], function(legend1){return(
legend1()
)});
  main.variable(observer()).define(["width","d3","DOM","minStockDate","maxStockDate","maxPrice","stocksByCompany","color1"], function(width,d3,DOM,minStockDate,maxStockDate,maxPrice,stocksByCompany,color1)
{
  const margin = {top: 30, right: 30, bottom: 30, left: 40};
  const visWidth = width - margin.left - margin.right;
  const visHeight = 500 - margin.top - margin.bottom;
  
  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
      g.append('text')
              .attr('class', 'title')
              .attr('x', visWidth/2 - 90)
              .attr('y', -15)
              .text('Stock Prices by Company');
  
  const x = d3.scaleTime()
      .domain([minStockDate, maxStockDate])
      .range([0, visWidth]);
  
  const y = d3.scaleLinear()
      .domain([0, maxPrice]).nice()
      .range([visHeight, 0]);
  
  const xAxis = d3.axisBottom(x);
  
  const yAxis = d3.axisLeft(y);
  
  g.append('g')
      .attr('transform', `translate(0,${visHeight})`)
      .call(xAxis)
      .attr('color', 'darkslategrey');
  
  g.append('g')
      .call(yAxis)
      .attr('color', 'darkslategrey')
      // .call(g => g.selectAll('.domain').remove())
    .append('text')
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'darkslategrey')
      .attr('x', 5)
      .text('Stock Price ($)');
  
  const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.price));

  const series = g.selectAll('.series')
    .data(stocksByCompany)
    .join('g')
      .attr('stroke', d => color1(d.symbol)) // this is where line color is set
      .attr('class', 'series')
    .append('path')
      .datum(d => d.prices)
      .attr('fill', 'none')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Problem 2

Next, we have a heat map that should show the daily precipitation amounts in millimeters for Seattle, WA in 2015.`
)});
  main.variable(observer("minWeatherDate")).define("minWeatherDate", ["d3"], function(d3){return(
d3.timeParse('%Y/%m/%d')("2015/01/01")
)});
  main.variable(observer("maxWeatherDate")).define("maxWeatherDate", ["d3"], function(d3){return(
d3.timeParse('%Y/%m/%d')("2015/12/31")
)});
  main.variable(observer("weather")).define("weather", ["datasets","d3","minWeatherDate","maxWeatherDate"], async function(datasets,d3,minWeatherDate,maxWeatherDate)
{
  return (await datasets['seattle-weather.csv']())
    .map(d => {
      const date = d3.timeParse('%Y/%m/%d')(d.date);
      return {
        'precipitation': d.precipitation,
        'date': date,
        'day': d3.timeFormat('%a')(date),
        'week': +d3.timeFormat('%U')(date)
      }
    })
    .filter(d => d.date >= minWeatherDate && d.date <= maxWeatherDate)
}
);
  main.variable(observer("maxPrecipitation")).define("maxPrecipitation", ["d3","weather"], function(d3,weather){return(
d3.max(weather, d => d.precipitation)
)});
  main.variable(observer("color2")).define("color2", ["d3","maxPrecipitation"], function(d3,maxPrecipitation){return(
d3.scaleSequential()
    .domain([0, maxPrecipitation])
    .interpolator(d3.interpolatePuRd)
)});
  main.variable(observer()).define(["legend","color2"], function(legend,color2){return(
legend({
  color: color2,
  title: 'Precipitation in Millimeters'
})
)});
  main.variable(observer()).define(["width","d3","DOM","weather","color2"], function(width,d3,DOM,weather,color2)
{
  const margin = {top: 40, right: 10, bottom: 10, left: 30};
  const visWidth = width - margin.left - margin.right;
  
  const x = d3.scaleBand()
      .domain(d3.range(53))
      .range([0, visWidth])
      .padding(0.05);
  
  const visHeight =  x.step() * 7;
  
  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
       g.append('text')
          .attr('class', 'title')
          .attr('x', visWidth/2 - 150)
          .attr('y', -25)
          .text('Daily Precipitation in Seattle, WA, 2019');
  
  const y = d3.scaleBand()
      .domain(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
      .range([0, visHeight])
      .padding(0.05)
  
  // day of week labels
  const yAxis = d3.axisLeft(y)
      .tickPadding(10)
      .tickSize(0);
  
  g.append('g')
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove());
  
  // month labels
  const firstOfMonths = weather.filter(d => d.date.getDate() === 1);
  
  g.selectAll('.month')
    .data(firstOfMonths)
    .join('text')
      .attr('class', 'month')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('x', d => x(d.week))
      .attr('y', -5)
      .text(d => d3.timeFormat('%b')(d.date))
  
  // squares

  g.selectAll('rect')
    .data(weather)
    .join('rect')
      .attr('x', d => x(d.week))
      .attr('y', d => y(d.day))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      // making 0 values grey:
      // .attr('fill', d => d.precipitation == 0 ? 'lightgrey' : color2_1(d.precipitation))
      .attr('fill', d => color2(d.precipitation))
  
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Problem 3

This dataset contains estimated percent changes in population for each state for 2018 to 2019. We want to show it in a choropleth map. The data is from the [U.S. Census Bureau, Population Division](https://www.census.gov/content/census/en/data/tables/time-series/demo/popest/2010s-state-total.html).

You can find it in the following table linked above: Annual Estimates of the Resident Population for the United States, Regions, States, and Puerto Rico: April 1, 2010 to July 1, 2019 (NST-EST2019-01)`
)});
  main.variable(observer("populations")).define("populations", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment('population-2018-2019.csv').text(), d3.autoType)
    .map(d => ({state: d.state, change: d['percent-change'], population: d.population}))
)});
  main.variable(observer("stateToPopulation")).define("stateToPopulation", ["populations"], function(populations)
{
  const map = new Map(populations.map(d => [
    d.state,
    { change: d.change, population: d.population }
  ]));
  
  return Object.fromEntries(map);
}
);
  main.variable(observer("percentChangeExtent")).define("percentChangeExtent", ["d3","populations"], function(d3,populations){return(
d3.extent(populations, d => d.change)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The map data comes from [here](https://eric.clst.org/tech/usgeojson/) and is based on boundaries given by the U.S. Census Bureau.`
)});
  main.variable(observer("usaGeo")).define("usaGeo", ["FileAttachment"], function(FileAttachment){return(
FileAttachment('gz_2010_us_040_00_20m.json').json()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Data Transformation Added:`
)});
  main.variable(observer("stateToChange")).define("stateToChange", ["populations"], function(populations){return(
Object.fromEntries(new Map(populations.map(d => [d.state, d.change])))
)});
  main.variable(observer("color3")).define("color3", ["d3","percentChangeExtent"], function(d3,percentChangeExtent){return(
d3.scaleSequential()
      .domain([-percentChangeExtent[1], percentChangeExtent[1]])
      .interpolator(d3.interpolatePuOr)
)});
  main.variable(observer()).define(["legend","color3"], function(legend,color3){return(
legend({
  color: color3,
  title: 'Percent Change in Population'
})
)});
  main.variable(observer()).define(["d3","DOM","usaGeo","color3","stateToChange"], function(d3,DOM,usaGeo,color3,stateToChange)
{
  const margin = {top: 30, right: 0, bottom: 0, left: 0};
  const visWidth = 600 - margin.left - margin.right;
  const visHeight = 400 - margin.top - margin.bottom;

  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth/2 - 130)
      .attr('y', -10)
      .text('Percent Change in Population, 2018-2019');
  
  // draw map
  const projection =  d3.geoAlbersUsa()
      .fitSize([visWidth, visHeight], usaGeo);

  const path = d3.geoPath().projection(projection);

  g.selectAll('.border')
    .data(usaGeo.features.filter(d => d.properties.NAME !== 'Puerto Rico'))
    .join('path')
      .attr('class', 'border')
      .attr('d', path)
      .attr('fill', d => color3(stateToChange[d.properties.NAME])) // this is where the color of a state is set
      .attr('stroke', 'white')

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Problem 4

Next, we want to have a choropleth map that shows the estimated 2019 population for each state. In this choropleth, we want you to bin the data into 5 bins. Rather than a continuous color range, we only want the map to contain 5 colors.

We can use the same population data as the previous problem.`
)});
  main.variable(observer()).define(["populations"], function(populations){return(
populations
)});
  main.variable(observer()).define(["stateToPopulation"], function(stateToPopulation){return(
stateToPopulation
)});
  main.variable(observer("statePopulationNum")).define("statePopulationNum", ["populations"], function(populations){return(
Object.fromEntries(new Map(populations.map(d => [d.state, d.population])))
)});
  main.variable(observer("data_bins")).define("data_bins", ["d3"], function(d3){return(
d3.bin().thresholds(5)
)});
  main.variable(observer("buckets")).define("buckets", ["data_bins","populations"], function(data_bins,populations){return(
data_bins(populations.map(d => d.population))
)});
  main.variable(observer("color4")).define("color4", ["d3"], function(d3){return(
d3.scaleThreshold()
    .domain([5000000, 10000000, 20000000, 30000000, 35000000])
    // .range(d3.schemeAccent);
    .range(["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0"])
)});
  main.variable(observer()).define(["legend","color4"], function(legend,color4){return(
legend({
  color: color4,
  title: 'US Populations 2019'
})
)});
  main.variable(observer()).define(["d3","DOM","usaGeo","color4","statePopulationNum"], function(d3,DOM,usaGeo,color4,statePopulationNum)
{
  const margin = {top: 20, right: 0, bottom: 0, left: 0};
  const visWidth = 600 - margin.left - margin.right;
  const visHeight = 400 - margin.top - margin.bottom;

  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
      g.append('text')
          .attr('class', 'title')
          .attr('x', visWidth/2 - 100)
          .attr('y', -5)
          .text('Estimated 2019 Population by State');
  
  // draw map
  
  const projection =  d3.geoAlbersUsa()
      .fitSize([visWidth, visHeight], usaGeo);

  const path = d3.geoPath().projection(projection);

  g.selectAll('.border')
    .data(usaGeo.features.filter(d => d.properties.NAME !== 'Puerto Rico'))
    .join('path')
      .attr('class', 'border')
      .attr('d', path)
      .attr('fill', d => color4(statePopulationNum[d.properties.NAME])) // this is where the color of a state is set
      .attr('stroke', 'white')

  return svg.node();
}
);
  main.variable(observer()).define(["md","lifeExpectancies"], function(md,lifeExpectancies){return(
md`## Problem 5

This dataset contains the life expectancy for ${lifeExpectancies.length} different countries over a few decades. We have a line chart that shows every country, but we want to highlight a few specific countries, listed below.`
)});
  main.variable(observer("highlightCountries")).define("highlightCountries", function(){return(
['Rwanda', 'Kenya', 'China', 'Japan']
)});
  main.variable(observer("countryToLifeExpectancies")).define("countryToLifeExpectancies", ["d3","datasets"], async function(d3,datasets){return(
d3.rollup((await datasets['countries.json']()),
                                g => g.map(d => ({year: d3.timeParse('%Y')(d.year),
                                           life_expect: d.life_expect})),
                                d => d.country)
)});
  main.variable(observer("lifeExpectancies")).define("lifeExpectancies", ["countryToLifeExpectancies"], function(countryToLifeExpectancies){return(
Array.from(countryToLifeExpectancies, ([country, info]) => ({country, info}))
)});
  main.variable(observer("labelPoints")).define("labelPoints", ["highlightCountries","countryToLifeExpectancies"], function(highlightCountries,countryToLifeExpectancies){return(
highlightCountries.map(c => {
  const years = countryToLifeExpectancies.get(c);
  return {
    country: c,
    year: years[years.length - 1].year,
    life_expect: years[years.length - 1].life_expect
  }
})
)});
  main.variable(observer("minYear")).define("minYear", ["d3","lifeExpectancies"], function(d3,lifeExpectancies){return(
d3.min(lifeExpectancies, country => d3.min(country.info, c => c.year))
)});
  main.variable(observer("maxYear")).define("maxYear", ["d3","lifeExpectancies"], function(d3,lifeExpectancies){return(
d3.max(lifeExpectancies, country => d3.max(country.info, c => c.year))
)});
  main.variable(observer("maxLifeExpect")).define("maxLifeExpect", ["d3","lifeExpectancies"], function(d3,lifeExpectancies){return(
d3.max(lifeExpectancies, country => d3.max(country.info, c => c.life_expect))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Note:
- Here, I chose not to give each of the highlighted countries different color hues.
- Based on the instructions, I assumed that these 4 countries were highlighted because they are part of a common group. 
- For this reason, I followed the football example from our graphical decoding excercise and kept them all the same hue.
- I think simply lowering the opacity of the other countries allows the highlighted ones to come into focus.
- Additionally, since there are only 4 highlighted countries and they are labelled at the end of their lines, I felt that adding colors for each one would only make the visualization of many lines more cluttered.`
)});
  main.variable(observer()).define(["width","d3","DOM","minYear","maxYear","maxLifeExpect","lifeExpectancies","labelPoints"], function(width,d3,DOM,minYear,maxYear,maxLifeExpect,lifeExpectancies,labelPoints)
{
  const margin = {top: 20, right: 100, bottom: 20, left: 40};
  const visWidth = width - margin.left - margin.right;
  const visHeight = 500 - margin.top - margin.bottom;
  
  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
      g.append('text')
          .attr('class', 'title')
          .attr('x', visWidth/2 - 100)
          .attr('y', -5)
          .text('Life Expectancy by Country');
  
  const x = d3.scaleTime()
      .domain([minYear, maxYear])
      .range([0, visWidth]);
  
  const y = d3.scaleLinear()
      .domain([0, maxLifeExpect]).nice()
      .range([visHeight, 0]);
  
  const xAxis = d3.axisBottom(x);
  
  const yAxis = d3.axisLeft(y);
  
  g.append('g')
      .attr('transform', `translate(0,${visHeight})`)
      .call(xAxis);
  
  g.append('g')
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove())
    .append('text')
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'black')
      .attr('x', 5)
      .text('Life Expectancy');
  
  const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.life_expect));

  const series = g.selectAll('.series')
    .data(lifeExpectancies)
    .join('g')
      .attr('class', 'series')
      .attr('stroke', 'seagreen')
      .attr('stroke-opacity', d => ((d.country == "Japan") || 
                                    (d.country == "China") || 
                                    (d.country == "Kenya") || 
                                    (d.country == "Rwanda")) ? '1' 
                              : '0.08') 
      .attr('stroke-width', 1)
    .append('path')
      .datum(d => d.info)
      .attr('fill', 'none')
      .attr('d', line);
  
  g.selectAll('.country-label')
    .data(labelPoints)
    .join('text')
      .attr('class', 'country-label')
      .attr('x', d => x(d.year) + 2)
      .attr('y', d => y(d.life_expect))
      .attr('font-size', 10)
      .attr('font-family', 'sans-serif')
      .attr('dominant-baseline', 'middle')
      .text(d => d.country);
  
  return svg.node();
}
);
  main.variable(observer()).define(["md","origins"], function(md,origins){return(
md`## Problem 6

Finally, we have a scatter plot of cars that compares horsepower and weight. Each car has one of three origins: ${origins.join(', ')}. We want the plot to also show the origin of each car.`
)});
  main.variable(observer("cars")).define("cars", ["datasets"], async function(datasets){return(
(await datasets['cars.json']()).map(d => ({
  horsepower: d['Horsepower'],
  weight: d['Weight_in_lbs'],
  origin: d['Origin']
})).filter(d => d.horsepower !== null && d.weight !== null && d.origin !== null)
)});
  main.variable(observer("origins")).define("origins", ["cars"], function(cars){return(
Array.from(new Set(cars.map(d => d.origin)))
)});
  main.variable(observer("colors6")).define("colors6", function(){return(
["#66c2a5", "#fc8d62", "#8da0cb"]
)});
  main.variable(observer("color6")).define("color6", ["origins","colors6"], function(origins,colors6){return(
function color6(d) {
  if (d.origin == origins[0]) { return colors6[0] }
  else if (d.origin == origins[1]) { return colors6[1] }
  else if (d.origin == origins[2]) { return colors6[2] }
  else { return "grey" }
}
)});
  main.variable(observer("color6_legend")).define("color6_legend", ["origins","colors6"], function(origins,colors6){return(
function color6_legend(d) {
  if (d == origins[0]) { return colors6[0] }
  else if (d == origins[1]) { return colors6[1] }
  else if (d == origins[2]) { return colors6[2] }
  else { return "grey" }
}
)});
  main.variable(observer("legend6")).define("legend6", ["d3","DOM","width","origins","color6_legend"], function(d3,DOM,width,origins,color6_legend){return(
function legend6() {
  const size = 10;
  const lineHeight = size * 1.5;
  
  const svg =  d3.select(DOM.svg(width, origins.length * lineHeight));
  
  const rows = svg
    .selectAll("g")
    .data(origins)
    .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * lineHeight})`);
  
  rows.append("rect")
      .attr("height", size)
      .attr("width", size)
      .attr("fill", d => color6_legend(d));
  
  rows.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("dominant-baseline", "hanging")
      .attr("x", lineHeight)
      .text(d => d);
  
  return svg.node();
}
)});
  main.variable(observer()).define(["legend6"], function(legend6){return(
legend6()
)});
  main.variable(observer()).define(["d3","DOM","cars","lightgray","color6"], function(d3,DOM,cars,lightgray,color6)
{
  // margin convention
  const margin = {top: 20, right: 10, bottom: 50, left: 100};
  const visWidth = 510 - margin.left - margin.right;
  const visHeight = 460 - margin.top - margin.bottom;

  const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
      
      g.append('text')
          .attr('class', 'title')
          .attr('x', visWidth/2 - 150)
          .attr('y', -8)
          .text('Car Weight and Horsepower by Origin');
  
  // create scales
  
  const x = d3.scaleLinear()
      .domain(d3.extent(cars, d => d.horsepower)).nice()
      .range([0, visWidth]);
  
  const y = d3.scaleLinear()
      .domain(d3.extent(cars, d => d.weight)).nice()
      .range([visHeight, 0]);
  
  // create and add axes
  
  const xAxis = d3.axisBottom(x);
  
  g.append("g")
      .attr('transform', `translate(0, ${visHeight})`)
      .call(xAxis)
      .call(g => g.selectAll('.domain').remove())
    .append('text')
      .attr('x', visWidth / 2)
      .attr('y', 40)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .text('horsepower');
  
  const yAxis = d3.axisLeft(y);
  
  g.append('g')
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove())
    .append('text')
      .attr('x', -40)
      .attr('y', visHeight / 2)
      .attr('fill', 'black')
      .attr('dominant-baseline', 'middle')
      .text('weight (lbs)');
  
  // draw grid, based on https://observablehq.com/@d3/scatterplot
  
  const grid = g.append('g')
      .attr('class', 'grid');
  
  grid.append('g')
    .selectAll('line')
    .data(y.ticks())
    .join('line')
      .attr('stroke', lightgray)
      .attr('x1', 0)
      .attr('x2', visWidth)
      .attr('y1', d => 0.5 + y(d))
      .attr('y2', d => 0.5 + y(d));
  
  grid.append('g')
    .selectAll('line')
    .data(x.ticks())
    .join('line')
      .attr('stroke', lightgray)
      .attr('x1', d => 0.5 + x(d))
      .attr('x2', d => 0.5 + x(d))
      .attr('y1', d => 0)
      .attr('y2', d => visHeight);
  
  // draw points
  
  g.selectAll('circle')
    .data(cars)
    .join('circle')
      .attr('cx', d => x(d.horsepower))
      .attr('cy', d => y(d.weight))
      .attr('fill', d => color6(d)) // this is where the dot color is set
      .attr('opacity', 1)
      .attr('r', 3);
  
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Appendix`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5', 'd3-array@2')
)});
  main.variable(observer("datasets")).define("datasets", ["require"], function(require){return(
require('vega-datasets')
)});
  main.variable(observer("lightgray")).define("lightgray", function(){return(
'#dcdcdc'
)});
  return main;
}
