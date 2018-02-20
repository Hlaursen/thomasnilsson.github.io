let h = 350
let w = 600
let padding = 50
let height = h - padding
let width = w - padding
let body = d3.select("body")
let div = body.select("#chart")
let title = div.append("h4")
let svg = div
	.append("svg")
	.attr("width", w)
	.attr("height", h)

let parseRow = d => {
  return {
    "date" : new Date(+d.year, (+d.month - 1)),
    "average" : parseFloat(d.average)
  }
}

let x, y, xAxis, yAxis, dataset


d3.csv("data/co2.csv", parseRow, csvData => {
	dataset = csvData
	console.table(dataset, ["date", "average"])

	let dateMin = d3.min(dataset, d => d.date)
	let dateMax = d3.max(dataset, d => d.date)
	let avgMax = d3.max(dataset, d => d.average)

	console.log(avgMax)

	x = d3.scaleTime()
		.domain([dateMin, dateMax])
		.range([padding, width])

	y = d3.scaleLinear()
		.domain([0, avgMax])
		.range([height, padding])

	//Define line generator
	let line = d3.line()
		.x(d =>  x(d.date))
		.y(d => y(d.average))

  //Create line
  svg.append("path")
     .datum(dataset)
     .attr("class", "line")
     .attr("d", line)

})

let updateChart = () => {

}
