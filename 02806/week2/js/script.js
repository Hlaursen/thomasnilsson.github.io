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

let randomValuesX = function(l, max) {
	let numbers = []
	for (i = 1; i <= l; i++){
		let x = Math.round(Math.random() * max)
		let obj = { "x" : x }
		numbers.push(obj)
	}
	return numbers
}

let randomValuesY = function(l, max) {
	let numbers = []
	for (i = 1; i <= l; i++){
		let x = Math.round(Math.random() * max)
		let obj = { "y" : x }
		numbers.push(obj)
	}
	return numbers
}

let animateChart = function(dataset) {
	// Remove old graphics
	barSvg.selectAll("rect").remove()
	barSvg.selectAll("text").remove()

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

let animateChartCSV = function(jsonData) {
	// Remove old graphics
	barSvg.selectAll("rect").remove()
	barSvg.selectAll("text").remove()

	// Set attributes
	let padding = 1
	let barWidth = 20 
	let deltaX = barWidth + padding

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

	console.log("chart made")
}

let drawChart = function() {
	let length = 25
	let dataset = randomArray(length, chartHeight)
	animateChart(dataset)
}

let drawChartCSV = function() {
	d3.csv('data/x_data.csv', function(jsonData) {
		animateChartCSV(jsonData)
	})	
}

drawChart()

addParagraph(barChartDiv, "Figure: A bar chart")

// Scatter Plot
let scatterPlotDiv = body.select("#scatterPlotDiv")

let scatterPlotSvg = scatterPlotDiv
	.append("svg")
	.attr("width", chartWidth)
	.attr("height", chartHeight)

// let animateScatterPlot = function(dataset) {
// 	// Remove old graphics
// 	scatterPlotSvg.selectAll("circle").remove()

// 	scatterPlotSvg.selectAll("circle")
// 		.data(dataset)
// 		.enter()
// 		.append("circle")
// 		.attr("cx", d => d[0] + 100)
// 		.attr("cy", d => d[1])
// 		.attr("r", 2)
	
// 	console.log(dataset)

// }

let animateScatterPlot = function(jsonData) {
	// Remove old graphics
	scatterPlotSvg.selectAll("circle").remove()

	scatterPlotSvg.selectAll("circle")
		.data(jsonData)
		.enter()
		.append("circle")
		.attr("cx", (d,i) => d.x)
		.attr("cy", (d,i) => chartHeight - d.y)
		.attr("r", 2)
		.attr("fill", "white")
		.attr("stroke", "black")
}

let drawScatterPlot = function() {
	let length = 25
	// let X = randomArray(length, chartWidth)
	// let Y = randomArray(length, chartHeight)
	let X = randomValuesX(length, chartWidth)
	let Y = randomValuesY(length, chartHeight)
	let dataset = []
	for (i in X) {
		let px = X[i].x
		let py = Y[i].y
		let p = {'x' : px, 'y' : py}
		dataset.push(p)
	}
	console.log(dataset)

	// Zip X and Y
	// let dataset = X.map((x,i) => [x, Y[i]])
	animateScatterPlot(dataset)
}

drawScatterPlot()
addParagraph(scatterPlotDiv, "Figure: A scatter plot")

let drawScatterPlotCSV = function() {
	d3.csv('data/xy_data.csv', function(jsonData) {
		console.log(jsonData)
		animateScatterPlot(jsonData)
	})	
}


// PRESIDENTS
let presidentsDiv = body.select("#presidentsDiv")
let presidentsSvg = presidentsDiv.append("svg")
	.attr("width", chartWidth)
	.attr("height", chartHeight)

let animatePresidentsPlotRandom = function(dataset) {
	// Remove old graphics
	presidentsSvg.selectAll("circle").remove()

	presidentsSvg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", d => d)
		.attr("cy", d => 150)
		.attr("r", 2)
		.attr("fill", "white")
		.attr("stroke", "black")


}

let drawPresidentsPlotRandom = function() {
	let months = []
	for (i = 0; i < 43; i++){
		let x = Math.round(Math.random(100) * chartWidth)
		months.push(x)
	}
	animatePresidentsPlotRandom(months)
}

drawPresidentsPlotRandom()



let animatePresidentsPlotCSV = function(dataset, max) {
	// Remove old graphics
	presidentsSvg.selectAll("circle").remove()

	let scale = chartWidth / max

	presidentsSvg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", d => d.months * scale)
		.attr("cy", d => chartHeight * Math.random(100))
		.attr("r", 5)
		.attr("stroke", "black")
		.attr("fill-opacity", 0.0)
	console.log(dataset)
}

let drawPresidentsPlotCSV = function() {
	d3.csv('data/presidents.csv', function(jsonData) {
		let max = 0

		for (i in jsonData) {
			let m = jsonData[i].months
			if (m > max) {
				max = m
			}
		}

		animatePresidentsPlotCSV(jsonData, max)
	})	
}


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










