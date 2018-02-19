let h = 400
let w = 1000
let padding = 25
let height = h - padding
let width = w - padding

let indexToShow = 0

let animationTime = 2000
let body = d3.select("body")
let content = body.selectAll()
let barChartDiv = body.select("#barChartDiv")

let parseRow = row => {
  return {
    "Index" : parseInt(row.Index),
    "Month" : row.Month,
    "Count" : parseInt(row.Count)
  }
}

let barSvg = barChartDiv
	.append("svg")
	.attr("width", w)
	.attr("height", h)

d3.csv("data/nydata.csv", allData => {

  // Filter out data and convert relevant rows
  let data = allData
    .map(d => parseRow(d))
    .filter(d => d.Index == indexToShow)
  console.log(data)

  let N = data.length
  let maxY = d3.max(data, d => d.Count)

  console.log(maxY)

  let x = d3.scaleBand()
    .domain(d3.range(N))
    .rangeRound([padding, width])
    .paddingInner(0.05)

  console.log(x(5))

  let xAxis = d3.axisBottom(x)

  let y = d3.scaleLinear()
    .domain([0, maxY])
    .range([height, padding])

  console.log(y(0))

  let yAxis = d3.axisLeft(y)

  // Bars
  barSvg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d,i) => x(i))
    .attr("y", d =>  y(d.Count))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.Count))
    .attr("fill", d => "rgb(40,40,40)")

    // Axes
    barSvg.append("g")
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis)

    barSvg.append("g")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis)

})

let updateChart = () => {
  indexToShow = (indexToShow + 1) % 4
  d3.csv("data/nydata.csv", allData => {

    // Filter out data and convert relevant rows
    let data = allData
      .map(d => parseRow(d))
      .filter(d => d.Index == indexToShow)

    console.log(data)

    let N = data.length
    let maxY = d3.max(data, d => d.Count)

    console.log(maxY)

    let x = d3.scaleBand()
      .domain(d3.range(N))
      .rangeRound([padding, width])
      .paddingInner(0.05)

    console.log(x(5))

    let xAxis = d3.axisBottom(x)

    let y = d3.scaleLinear()
      .domain([0, maxY])
      .range([height, padding])

    console.log(y(0))

    let yAxis = d3.axisLeft(y)

    // Bars
    barSvg.selectAll("rect")
      .data(data)
      .transition()
      .attr("x", (d,i) => x(i))
      .attr("y", d =>  y(d.Count))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Count))
      .attr("fill", d => "rgb(40,40,40)")


  })
}
