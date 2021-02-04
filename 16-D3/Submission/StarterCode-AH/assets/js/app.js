// @TODO: YOUR CODE HERE!

$(document).ready(function() {

    doingWork();
})



function doingWork() {
    d3.csv("../assets/data/data.csv").then(function(data) {
        // console.log(data);

        // make graph data int
        data.forEach((variable) => {
            variable.poverty = +variable.poverty
            variable.obesity = +variable.obesity
        });
        buildScatter(data);

    })



}


function buildScatter(data) {
    // build svg container
    var svgHeight = 600;
    var svgWidth = 1000;
    // margins
    var margin = { top: 50, right: 100, bottom: 50, left: 50 };

    // chart area minus margins
    var chartHeight = svgHeight - margin.top - margin.bottom;
    var chartWidth = svgWidth - margin.left - margin.right;

    // create svg container
    var svg = d3.select(".article").append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // shift everything over by the margins
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // scale y to chart height
    var yScale = d3.scaleLinear()
        .domain([20, d3.max(data.map(x => +x.obesity))])
        .range([chartHeight, 0])

    // scale x to chart width
    var xScale = d3.scaleLinear()
        .domain([d3.min(data, x => +x.poverty), d3.max(data, x => +x.poverty)])
        .range([0, chartWidth])


    // create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    // set the x axis to the bottom of the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    // set the y axis
    chartGroup.append("g")
        .call(yAxis);






    // append circles to data points
    var circlesGroup = chartGroup.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(d.poverty))
        .attr("cy", d => yScale(d.obesity))
        .attr("r", "10")
        .classed("stateCircle", true);
    // make state name labels
    var textGroup = chartGroup.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("alightment-baseline", "central")
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => yScale(d.obesity))
        .attr("font-size", 10)
        .classed("stateText", true);

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 0)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Obesity (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top-4})`)
        .attr("class", "axisText")
        .text("Poverty Level");
    // make tool tip

    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 10])
        .html(function(d) {
            return (`${d.abbr}<br>obesity (%): ${d.obesity}%<br>Poverty: ${d.poverty}`);
        });

    circlesGroup.call(toolTip);

    //  "mouseover" event listener 
    circlesGroup.on("mouseover", function(event, d) {
            toolTip.show(d, this);

            //make bubbles big for fun!
            d3.select(this)
                .transition()
                .duration(500)
                .attr("r", 20);
        })
        // Step 4: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function(event, d) {
            toolTip.hide(d);
            // make bubbles small again
            d3.select(this)
                .transition()
                .duration(500)
                .attr("r", 10);
        });


    return circlesGroup;
}