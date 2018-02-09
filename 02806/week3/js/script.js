const h = 200
const w = 500
const padding = 30
const body = d3.select("body")

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


// Scatter Plot
const scatterPlotDiv = body.select("#scatterPlotDiv")

scatterPlotDiv
	.attr("height", h + "px")
	.attr("width", w + "px")

let scatterPlotSvg = scatterPlotDiv
	.append("svg")
	.attr("width", w)
	.attr("height", h)
	// .attr("style", "outline: thin solid black")

let animateScatterPlot = function(jsonData) {
	// Remove old graphics
	scatterPlotSvg.selectAll("circle").remove()

	let xMax = d3.max(jsonData, p => p.x)
	let yMax = d3.max(jsonData, p => p.y)

	console.log(xMax)
	console.log(yMax)

	let xScale = d3.scaleLinear()
		.domain([0, xMax])
		.range([padding, w - padding])
		.nice()

	let yScale = d3.scaleLinear()
		.domain([0, yMax])
		.range([h - padding, padding]) //Reverse the y scale because grid
		.nice()

	let aScale = d3.scaleSqrt()
		.domain([0, yMax])
		.range([0, 10])

	let xAxis = d3.axisBottom(xScale).ticks(5)

	let yAxis = d3.axisLeft(yScale).ticks(5)

	scatterPlotSvg.selectAll("circle")
		.data(jsonData)
		.enter()
		.append("circle")
		.attr("cx", d => xScale(d.x))
		.attr("cy", d => yScale(d.y))
		.attr("r", d => aScale(d.y))
		.attr("fill", "white")
		.attr("stroke", "black")
	
	scatterPlotSvg.append("g")
		.attr("transform", "translate(0, " + (h - padding) + ")")
		.call(xAxis)

	scatterPlotSvg.append("g")
		.attr("transform", "translate(" + padding + ", 0)")
		.call(yAxis)
	// scatterPlotSvg.selectAll("text")
	// 	.data(jsonData)
	// 	.enter()
	// 	.append("text")
	// 	.attr("x", d => xScale(d.x))
	// 	.attr("y", d => yScale(d.y))
	// 	.attr("font-size", 10)
	// 	.text(d => d.x)
}

let drawScatterPlot = function() {
	let length = 50
	let X = randomValuesX(length)
	let Y = randomValuesY(length)
	let dataset = []
	
	for (i in X) {
		let px = X[i].x
		let py = Y[i].y
		let p = {'x' : px, 'y' : py}
		dataset.push(p)
	}
	console.log(dataset)

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







