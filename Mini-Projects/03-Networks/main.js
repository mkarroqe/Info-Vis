Promise.all([
  d3.csv('data/vis1.csv', d3.autoType),
  d3.csv('data/vis2-india.csv', d3.autoType),
  d3.csv('data/vis2-thailand.csv', d3.autoType),
  d3.csv('data/vis2-brazil.csv', d3.autoType),
  d3.csv('data/vis2-colombia.csv', d3.autoType),
  d3.csv('data/vis2-korea.csv', d3.autoType),
  d3.csv('data/vis2-poland.csv', d3.autoType),
  d3.csv('data/vis2-south-africa.csv', d3.autoType),
  d3.csv('data/vis2-kuwait.csv', d3.autoType),
  d3.csv('data/vis2-chile.csv', d3.autoType),
  d3.csv('data/vis2-saudi-arabia.csv', d3.autoType)
  
]).then(([
	data1, 
	india, 
    thai, 
    brazil,
    colombia,
    korea,
    poland,
    south_africa,
    kuwait,
    chile,
    saudi_arabia
]) => {
	vis1(data1, d3.select('#vis1'));
	vis2(
		india, 
	    thai, 
	    brazil,
	    colombia,
	    korea,
	    poland,
	    south_africa,
	    kuwait,
	    chile,
	    saudi_arabia,
		d3.select('#vis2'));
});
