Promise.all([
	  	d3.csv('data/vis1Data.csv', d3.autoType),
	    d3.csv('data/vis2Data.csv', d3.autoType),
	    d3.json('data/countries.json')
	])
.then(([data1, data2, geoJSON]) => {
  vis1(data1, d3.select('#vis1'));
  vis2(data2, geoJSON, d3.select('#vis2'));
});




