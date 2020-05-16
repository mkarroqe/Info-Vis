function vis2(india, thai, brazil, colombia, korea, poland, south_africa, kuwait, chile, saudi_arabia, div) {

  const data = [india, 
                thai, 
                brazil,
                colombia,
                korea,
                poland,
                south_africa,
                kuwait,
                chile,
                saudi_arabia];

  const margin = {top: 40, right: 100, bottom: 100, left: 55};
  const visWidth = 1420 - margin.left - margin.right;
  const visHeight = 700 - margin.top - margin.bottom;

  // ------------------- svg + g ------------------
  const svg = div.append("svg")
      .attr("width", visWidth + margin.left + margin.right)
      .attr("height", visHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // ------------------ x values ------------------ 
  const donors = ['United States',
      'Japan',
      'Germany',
      'United Kingdom',
      'France',
      'Netherlands',
      'Canada',
      'Sweden',
      'Norway',
      'Italy',
      'Denmark',
      'Switzerland',
      'Australia',
      'Belgium',
      'Spain',
      'Saudi Arabia',
      'Kuwait',
      'Korea',
      'Austria',
      'Finland']

  const x = d3.scalePoint()
      .domain(donors)
      .range([0, visWidth / 1.01]);

  // the radius of the pie charts
  const outerRadius = x.step() / 4.1;
  
  const xAxis = d3.axisBottom(x)
      .tickSize(0)

  g.append('g')
    .attr('transform', `translate(0,${(visHeight * 1.01) + outerRadius + 5})`)
    .call(xAxis)
    .call(g => g.selectAll('.domain').remove());
  
  // ------------------- color --------------------
  const purposes = ["Air transport", "Industrial development", "Power generation/non-renewable sources", "Rail transport", "RESCHEDULING AND REFINANCING"]

  const color = d3.scaleOrdinal()
    .domain(purposes)
    .range(d3.schemeCategory10);

  // -------------------- legend ------------------
  svg.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(1110, -30)")
    .attr("font-size", 9);

  var legendOrdinal = d3.legendColor()
    .shape("path", d3.symbol().type(d3.symbolSquare).size(120)())
    .shapePadding(10)
    .scale(color);

  svg.select(".legendOrdinal")
    .call(legendOrdinal);
  
  // --------------------- title ------------------
  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2 - 170)
      .attr('y', -35)
      .attr('font-size', 20)
      .text('Top 5 Coalesced Donation Purposes across Countries')

  g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth / 2 - 725)
      .attr('y', -20)
      .attr('font-size', 14)
      .text("Recipient Countries")

   g.append('text')
      .attr('class', 'title')
      .attr('x', visWidth)
      .attr('y', 610)
      .attr('font-size', 14)
      .text("Donors")

  // ------------------ all pie groups ------------------ 
  for (var i = 0; i < data.length; i++) {
    // ------------------ y values ------------------ 
    const y_elements = d3.set(data[i].map(function(item) { 
        return item.recipient; 
      }
    )).values();

    console.log(y_elements);

    const y = d3.scalePoint()
        .domain(y_elements)
        .range([visHeight, visHeight - (i * 85)]);

    // y-axis
    const yAxis = d3.axisLeft(y)
        .tickPadding(50)
        .tickSize(0);

    g.append("g")
        .call(yAxis)
        .call(g => g.selectAll('.domain').remove())
    
    // -------------------- data --------------------
    const data2 = d3.rollup(data[i],
      group => d3.sum(new Set(group.map(g => g.amount))),
      d => d.donor,
      d => d.coalesced_purpose_name);

    console.log(data2);

    const amounts = Array.from(data2, 
                              ([donor, purposes]) => ({
                                donor: donor,
                                types: Array.from(purposes, ([purpose, amount]) => ({purpose, amount}))
                              })); 

    const maxRadius = 10;
    const radius = d3.scaleSqrt()
        .domain([0, d3.max(amounts, d => d3.max(d.types, b => b.amount))])
        .range([0, maxRadius]);

    const pie = d3.pie()
        .value(d => d.amount);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(outerRadius);

    const pie_height = visHeight - (i * 42.5);
    console.log(pie_height);

    // india
    if (i == 0) {
      const pieGroups = g.selectAll('.pieGroup-india')
        .data(amounts)
        .join('g')
          .attr('class', 'pieGroup-india')
          .attr('transform', d => `translate(${x(d.donor)}, ${pie_height})`);

      pieGroups.selectAll('path')
        .data(d => pie(d.types))
        .join('path')
          .attr('d', d => arc(d))
          .attr('fill', d => color(d.data.purpose))
    }

    // thailand
    else if (i == 1) {
      const pieGroups = g.selectAll('.pieGroup-thai')
        .data(amounts)
        .join('g')
          .attr('class', 'pieGroup-thai')
          .attr('transform', d => `translate(${x(d.donor)}, ${pie_height})`);

      pieGroups.selectAll('path')
        .data(d => pie(d.types))
        .join('path')
          .attr('d', d => arc(d))
          .attr('fill', d => color(d.data.purpose))
    }

    // brazil
    else if (i == 2) {
      const pieGroups = g.selectAll('.pieGroup-brazil')
        .data(amounts)
        .join('g')
          .attr('class', 'pieGroup-brazil')
          .attr('transform', d => `translate(${x(d.donor)}, ${pie_height})`);

      pieGroups.selectAll('path')
        .data(d => pie(d.types))
        .join('path')
          .attr('d', d => arc(d))
          .attr('fill', d => color(d.data.purpose))
    }
    
    // colombia
    else if (i == 3) {
      const pieGroups = g.selectAll('.pieGroup-colombia')
        .data(amounts)
        .join('g')
          .attr('class', 'pieGroup-colombia')
          .attr('transform', d => `translate(${x(d.donor)}, ${pie_height})`);

      pieGroups.selectAll('path')
        .data(d => pie(d.types))
        .join('path')
          .attr('d', d => arc(d))
    }

    // korea
    else if (i == 4) {
      const pieGroups = g.selectAll('.pieGroup-korea')
        .data(amounts)
        .join('g')
          .attr('class', 'pieGroup-korea')
          .attr('transform', d => `translate(${x(d.donor)}, ${pie_height})`);

      pieGroups.selectAll('path')
        .data(d => pie(d.types))
        .join('path')
          .attr('d', d => arc(d))
    }

    // poland
    else if (i == 5) {
      const pieGroups = g.selectAll('.pieGroup-poland')
        .data(amounts)
        .join('g')
          .attr('class', 'pieGroup-poland')
          .attr('transform', d => `translate(${x(d.donor)}, ${pie_height})`);

      pieGroups.selectAll('path')
        .data(d => pie(d.types))
        .join('path')
          .attr('d', d => arc(d))
    }

    // south-africa
    else if (i == 6) {
      const pieGroups = g.selectAll('.pieGroup-south-africa')
        .data(amounts)
        .join('g')
          .attr('class', 'pieGroup-south-africa')
          .attr('transform', d => `translate(${x(d.donor)}, ${pie_height})`);

      pieGroups.selectAll('path')
        .data(d => pie(d.types))
        .join('path')
          .attr('d', d => arc(d))
    }

    // kuwait
    else if (i == 7) {
      const pieGroups = g.selectAll('.pieGroup-kuwait')
        .data(amounts)
        .join('g')
          .attr('class', 'pieGroup-kuwait')
          .attr('transform', d => `translate(${x(d.donor)}, ${pie_height})`);

      pieGroups.selectAll('path')
        .data(d => pie(d.types))
        .join('path')
          .attr('d', d => arc(d))
    }

    // chile
    else if (i == 8) {
      const pieGroups = g.selectAll('.pieGroup-chile')
        .data(amounts)
        .join('g')
          .attr('class', 'pieGroup-chile')
          .attr('transform', d => `translate(${x(d.donor)}, ${pie_height})`);

      pieGroups.selectAll('path')
        .data(d => pie(d.types))
        .join('path')
          .attr('d', d => arc(d))
    }

    // saudi-arabia
    else if (i == 9) {
      const pieGroups = g.selectAll('.pieGroup-saudi-arabia')
        .data(amounts)
        .join('g')
          .attr('class', 'pieGroup-saudi-arabia')
          .attr('transform', d => `translate(${x(d.donor)}, ${pie_height})`);

      pieGroups.selectAll('path')
        .data(d => pie(d.types))
        .join('path')
          .attr('d', d => arc(d))
    }

  } // loop end
}




