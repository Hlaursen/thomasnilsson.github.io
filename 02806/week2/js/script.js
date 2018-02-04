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

let randomArray = function(l, max) {
	let numbers = []
	for (i = 1; i <= l; i++){
		let x = Math.round(Math.random() * max)
		numbers.push(x)
	}
	return numbers
}

let drawChart = function() {
	// Remove old graphics
	barSvg.selectAll("rect").remove()
	barSvg.selectAll("text").remove()

	let length = 25
	let dataset = randomArray(length, chartHeight)	

	// Set attributes
	let padding = 1
	let barWidth = 20 
	let deltaX = barWidth + padding

	// Draw a vertical rectangle for each datapoint
	barSvg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x", (d,i) => i * deltaX)
		.attr("y", d => chartHeight - d)
		.attr("width", barWidth)
		.attr("height", d => d)
		.attr("fill", d => "rgb(" + Math.round(d*2) + ", 0, 0)")

	// Draw values of each bar as text
	barSvg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(d => d)
		.attr("fill", "white")
		.attr("font-size", "8")
		.attr("x", (d,i) => i * deltaX + 3)
		.attr("y", (d,i) => chartHeight - d + 12)


	console.log("chart made")
}
drawChart()

addParagraph(barChartDiv, "Figure: A bar chart")

// Scatter Plot
let scatterPlotDiv = body.select("#scatterPlotDiv")

let scatterPlotSvg = scatterPlotDiv
	.append("svg")
	.attr("width", chartWidth)
	.attr("height", chartHeight)

let drawScatterPlot = function() {
	// Remove old graphics
	scatterPlotSvg.selectAll("circle").remove()

	let length = 25
	let X = randomArray(length, chartWidth)
	let Y = randomArray(length, chartHeight)

	// Zip X and Y
	let dataset = X.map((x,i) => [x, Y[i]])

	while (dataset.length < 1) {
		console.log("waiting for csv")
	}

	scatterPlotSvg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", d => d[0]+ 100)
		.attr("cy", d => d[1])
		.attr("r", 2)
}

drawScatterPlot()
addParagraph(scatterPlotDiv, "Figure: A scatter plot")




// let barContainer = body.append("div")
// 	.attr("width", 5000)
// 	.attr("height", 500)
// 	.attr("id", "barContainer")

// let addBar = (w,h) => barContainer
// 	.append("div")
// 	.attr("class", "bar")
// 	.style("height", h + "px")
// 	.style("width", w + "px")

// let makeBarDiagram = (data) => body
// 	.selectAll("barContainer")
// 	.data(data)
// 	.enter()
// 	.append("div")
// 	.attr("class", "bar")
// 	.style("width", "5px")
// 	.style("height", d => d + "px")

// let addRectBar = (x,y,w,h) => svg
// 	.append("rect")
// 	.attr("x", x)
// 	.attr("y", y)
// 	.attr("width", w)
// 	.attr("height", h)

// let w = 20
// let max = 150
// let padding = 1
// for (i = 1; i <= 10; i++) {
// 	let v = 50
// 	let x = i * w + padding

// 	addRectBar(x, max, w, v)
// }



// Book method
// let dataset = []
// for (i = 1; i <= 50; i++) {
// 	let x = Math.random() * i * 5
// 	dataset.push(x)
// }
// makeBarDiagram(dataset)

// Better method
// let f = 2
// for (i = 1; i <= 100; i++) {
// 	let x = Math.random() * 200
// 	addBar(f, x)
// }










