// i know vis2 is a yikes but it is what it is
Promise.all([
  d3.csv('data/vis1.csv', d3.autoType),
  d3.csv('data/vis2.csv', d3.autoType)
]).then(([
	data1, 
	data2
]) => {
	vis1(data1, d3.select('#vis1'));
	vis2(
		data2, d3.select('#vis2'));
});
