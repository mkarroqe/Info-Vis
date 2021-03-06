// Load the datasets and call the functions to make the visualizations

Promise.all([
  d3.csv('data/vis1-byValue.csv', d3.autoType),
  d3.csv('data/vis2Data.csv', d3.autoType),
  d3.csv('data/vis2datafull.csv', d3.autoType)
]).then(([data1, data2, data3]) => {
  vis1(data1, d3.select('#vis1'));
  vis2(data3, data2, d3.select('#vis2'));
});
