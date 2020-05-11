// i know vis2 is a yikes but it is what it is
Promise.all([
  d3.csv('data/vis1.csv', d3.autoType),

  d3.csv('data/vis2-1.csv', d3.autoType),
  d3.csv('data/vis2-2.csv', d3.autoType),
  d3.csv('data/vis2-3.csv', d3.autoType),
  d3.csv('data/vis2-4.csv', d3.autoType),
  d3.csv('data/vis2-5.csv', d3.autoType),
  d3.csv('data/vis2-6.csv', d3.autoType),
  d3.csv('data/vis2-7.csv', d3.autoType),
  d3.csv('data/vis2-8.csv', d3.autoType),
  d3.csv('data/vis2-9.csv', d3.autoType),
  d3.csv('data/vis2-10.csv', d3.autoType),
  
]).then(([
	data1, 

	data2_1, 
	data2_2, 
	data2_3, 
	data2_4, 
	data2_5, 
	data2_6, 
	data2_7, 
	data2_8, 
	data2_9, 
	data2_10

]) => {
	vis1(data1, d3.select('#vis1'));
	vis2(
		data2_1, 
		data2_2, 
		data2_3, 
		data2_4, 
		data2_5, 
		data2_6, 
		data2_7, 
		data2_8, 
		data2_9, 
		data2_10, d3.select('#vis2'));
});
