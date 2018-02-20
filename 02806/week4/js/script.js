let h = 200
let w = 500
let padding = 25
let height = h - padding
let width = w - padding
let animationTime = 2000
let body = d3.select("body")
let histogramDiv = body.select("#histogramDiv")

// let tooltipDiv = body.append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0)
// let tooltipPointer = body.append("div")
//     .attr("class", "arrow-down")
//     .style("opacity", 0)


let INNER_PADDING = 0.1

let svg = histogramDiv
	.append("svg")
	.attr("width", w)
	.attr("height", h)

let parseRow = row => {
  return {
    "Index" : parseInt(row.Index),
    "Month" : row.Month,
    "Count" : parseInt(row.Count)
  }
}

let DATA_INDEX = 0
let COLORS = ["rgb(40,40,40)", "rgb(66, 134, 244)", "rgb(89, 165, 94)", "rgb(214, 79, 64)"]
let TITLES = ["Fresh Fruit", "Storage Fruit", "Fresh Vegetable", "Storage Vegetale"]
let MONTHS, ALL_DATA = []
let x, y, xAxis, yAxis

let handleMouseOver = (rect, d) => {
	// Log mouse coord
	console.log(d3.event.clientX, d3.event.clientY)

	// var xPosition = parseFloat(d3.select(rect).attr("x")) + width/2
	// var yPosition = parseFloat(d3.select(rect).attr("y")) / 2 + height

	let xPosition = d3.event.clientX - 40
	let yPosition = d3.event.clientY - 40
	//Update the tooltip position and value
    d3.select("#tooltip")
	      .style("left", xPosition + "px")
	      .style("top", yPosition + "px")

		d3.select("#count").text(d.Count)
    d3.select("#month").text(d.Month)
    //Show the tooltip
		d3.select("#tooltip").classed("hidden", false);
	// tooltipDiv.transition().style("opacity", 0.95)
	// tooltipDiv.html("<strong>" + d.Month + "</strong><br>" + d.Count)
  //  .style("left", xPos + "px")
  //  .style("top", yPos + "px")
  //
	// tooltipPointer.transition().style("opacity", 0.95)
	// tooltipPointer.style("left", xPos + 15 + "px").style("top", yPos + 40 + "px")

	d3.select(rect)
		.attr("fill", "orange")
}

let handleMouseOut = rect => {
	//Hide the tooltip
	d3.select("#tooltip").classed("hidden", true);
	// tooltipDiv.transition().style("opacity", 0.0)
	// tooltipPointer.transition().style("opacity", 0.0)
	d3.select(rect)
		.transition()
		.duration(250)
		.attr("fill", COLORS[DATA_INDEX])
  //
	// d3.select("#tooltip").remove()
}

d3.csv("data/nydata.csv", csvData => {
  histogramDiv
		.append("h4")
			.text(TITLES[DATA_INDEX])
  // parse data
  ALL_DATA = csvData.map(d => parseRow(d))

  // Filter out irrelevant data
  data = ALL_DATA.filter(d => d.Index == DATA_INDEX)

  let yMax = d3.max(data, d => d.Count)
  MONTHS = data.map(d => d.Month)

  x = d3.scaleBand()
    .domain(MONTHS)
    .rangeRound([padding, width])
    .paddingInner(INNER_PADDING)

  xAxis = d3.axisBottom(x)

  y = d3.scaleLinear()
    .domain([0, yMax])
    .range([height, padding])

  yAxis = d3.axisLeft(y).ticks(5)

  // Bars
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.Month))
    .attr("y", d =>  y(d.Count))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.Count))
    .attr("fill", COLORS[DATA_INDEX])
		.on("mouseover", function(d) {
			handleMouseOver(this, d)
		})
		.on("mouseout", function() {
			handleMouseOut(this)
		})

    // Axes
    svg.append("g")
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis)

    svg.append("g")
      .attr("id", "yAxis")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis)

})

let updateChart = () => {
  // Which category to display?
  DATA_INDEX = (DATA_INDEX + 1) % 4
  histogramDiv.selectAll("h4").text(TITLES[DATA_INDEX])

  // Filter out irrelevant data
  data = ALL_DATA.filter(d => d.Index == DATA_INDEX)

  let yMax = d3.max(data, d => d.Count)
  y.domain([0, yMax])

  yAxis = d3.axisLeft(y).ticks(5)

  // Redraw histogram bars
  svg.selectAll("rect")
    .data(data)
    .transition()
    .duration(animationTime)
    .attr("x", d => x(d.Month))
    .attr("y", d =>  y(d.Count))
    .attr("height", d => height - y(d.Count))
    .attr("fill", COLORS[DATA_INDEX])

    // Update y axis only
    svg.selectAll("#yAxis").call(yAxis)
}
