// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 20, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom

// Generate random JSON data
let randomValuesX = function(l) {
	let numbers = []
	for (i = 1; i <= l; i++){
		let x = Math.round(Math.random() * height)
		let obj = { "x" : x }
		numbers.push(obj)
	}
	return numbers
}

// Set the ranges
var x = d3.scaleBand().range([0, width])
var y = d3.scaleLinear().range([height, 0])

// Define the axes
var xAxis = d3.axisBottom().scale(x)
var yAxis = d3.axisLeft().scale(y)

let elements = 20
let data = randomValuesX(elements)

// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")")

// Scale the range of the data
x.domain(d3.range(data))
y.domain([0, d3.max(data, d  => d.x)])

// Add the rectangles
svg.selectAll("rect")
		.data(data)
		.append("rect")
	  .attr("x", (d,i) => x(i))
	  .attr("y", d =>  y(height - d.x))
	  .attr("width", x.bandwidth())
	  .attr("height", d => y(d.x))
	  .attr("fill", d => "rgb(40,40," + Math.round(d.x * 5) + ")")

// Add the X Axis
svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)

// Add the Y Axis
svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
