let chartHeight = 200
let chartWidth = 500
let body = d3.select("body")
let content = body.selectAll()
let barChartDiv = body.select("#barChartDiv")

let barSvg = barChartDiv
	.append("svg")
	.attr("width", chartWidth)
	.attr("height", chartHeight)

let addParagraph = (c,t) => c
	.append("p")
	.text(t)

let randomValuesX = function(l) {
	let numbers = []
	for (i = 1; i <= l; i++){
		let x = Math.round(Math.random() * 1000)
		let obj = { "x" : x }
		numbers.push(obj)
	}
	return numbers
}

let randomValuesY = function(l) {
	let numbers = []
	for (i = 1; i <= l; i++){
		let x = Math.round(Math.random() * 800)
		let obj = { "y" : x }
		numbers.push(obj)
	}
	return numbers
}

let animateChart = function(jsonData) {
	// Remove old graphics
	barSvg.selectAll("rect").remove()
	barSvg.selectAll("text").remove()

	let xMax = d3.max(jsonData, p => p.x)

	console.log(xMax)

	let range = d3.range(jsonData.length)

	let xScale = d3.scaleBand()
		.domain(range)
		.range([0, w])
		.paddingInner(0.05)

	let xAxis = d3.axisBottom(xScale).ticks(5)


	// Draw a vertical rectangle for each datapoint
	barSvg.selectAll("rect")
		.data(jsonData)
		.enter()
		.append("rect")
		.attr("x", (d,i) => i * deltaX)
		.attr("y", d => chartHeight - d.x)
		.attr("width", barWidth)
		.attr("height", d => d.x)
		.attr("fill", d => "rgb(" + Math.round(d.x * 2) + ", 0, 0)")

	// Draw values of each bar as text
	barSvg.selectAll("text")
		.data(jsonData)
		.enter()
		.append("text")
		.text(d => d.x)
		.attr("fill", "white")
		.attr("font-size", "8")
		.attr("x", (d,i) => i * deltaX + 3)
		.attr("y", (d,i) => chartHeight - d.x + 12)

}

let drawChart = function() {
	let length = 25
	// let dataset = randomArray(length, chartHeight)
	let dataset = randomValuesX(length)
	animateChart(dataset)
}

let drawChartCSV = function() {
	d3.csv('data/x_data.csv', function(jsonData) {
		animateChart(jsonData)
	})	
}

drawChart()

addParagraph(barChartDiv, "Figure: A bar chart")










