// From NYU DataVis Repo
// Load the datasets and call the functions to make the visualizations

function get_service_requests() {
    let url = "https://gist.githubusercontent.com/DanielKerrigan/3c14969a2386ed074f9b17ddc2759b6a/raw/bdf612245d0cbe8940788c9db98f1ad9b4ed44ae/nyc-311-feb-04-2019-reduced.csv"

    return d3.csv(url, request => ({
      date: d3.timeParse('%m/%d/%Y %H:%M:%S %p')(request['Created Date']),
      agency: request['Agency'],
      type: request['Complaint Type'],
      zip: request['Incident Zip'],
      borough: request['Borough'],
    }))
  }

function get_request_types() {
	serviceRequests = get_service_requests();
	console.log("hi", serviceRequests);

	const numRequestsByType = d3.rollup(serviceRequests,
                                   requestsForType => requestsForType.length,
                                   d => d.type);

	topRequestTypes = Array.from(numRequestsByType, ([type, count]) => ({type, count}))
	    .sort((a, b) => d3.descending(a.count, b.count))
	    .slice(0, 20);

	return topRequestTypes;
}

topRequestTypes = get_request_types();
vertical_bar(topRequestTypes, d3.select('#vis2'));
 

// Promise.all([
// 	  d3.csv('data/scores.csv', d3.autoType),
// 	  d3.json('data/countries.json'),
// 	])
// .then(([data, geoJSON]) => {
//   vis1(data, d3.select('#vis1'));
//   vertical_bar(topRequestTypes, d3.select('#vis2'));
// });




