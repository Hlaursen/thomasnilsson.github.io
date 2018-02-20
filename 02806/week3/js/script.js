let h = 200
let w = 500
let padding = 25
let height = h - padding
let width = w - padding

let indexToShow = 0
let colors = ["rgb(40,40,40)", "rgb(66, 134, 244)", "rgb(89, 165, 94)", "rgb(214, 79, 64)"]
let titles = ["Fresh Fruit", "Storage Fruit", "Fresh Vegetable", "Storage Vegetale"]

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

let svg = barChartDiv
	.append("svg")
	.attr("width", w)
	.attr("height", h)

d3.csv("data/nydata.csv", allData => {

  barChartDiv.append("h4").text(titles[indexToShow])

  // Filter out data and convert relevant rows
  let data = allData
    .map(d => parseRow(d))
    .filter(d => d.Index == indexToShow)

  let N = data.length
  let maxY = d3.max(data, d => d.Count)
  let months = data.map(d => d.Month)

  let x = d3.scaleBand()
    .domain(months)
    .rangeRound([padding, width])
    .paddingInner(0.05)

  let xAxis = d3.axisBottom(x)

  let y = d3.scaleLinear()
    .domain([0, maxY])
    .range([height, padding])

  let yAxis = d3.axisLeft(y).ticks(5)

  // Bars
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d,i) => x(d.Month))
    .attr("y", d =>  y(d.Count))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.Count))
    .attr("fill", d => colors[indexToShow])

    // Axes
    svg.append("g")
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis)

    svg.append("g")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis)

})

let updateChart = () => {
  indexToShow = (indexToShow + 1) % 4
  barChartDiv.selectAll("h4").text(titles[indexToShow])
  d3.csv("data/nydata.csv", allData => {

    // Filter out data and convert relevant rows
    let data = allData
      .map(d => parseRow(d))
      .filter(d => d.Index == indexToShow)

    let N = data.length
    let maxY = d3.max(data, d => d.Count)
    let months = data.map(d => d.Month)

    let x = d3.scaleBand()
      .domain(months)
      .rangeRound([padding, width])
      .paddingInner(0.05)

    let xAxis = d3.axisBottom(x)

    let y = d3.scaleLinear()
      .domain([0, maxY])
      .range([height, padding])

    let yAxis = d3.axisLeft(y).ticks(5)

    // Bars
    svg.selectAll("rect")
      .data(data)
      .transition()
      .duration(animationTime)
      .attr("x", (d,i) => x(d.Month))
      .attr("y", d =>  y(d.Count))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Count))
      .attr("fill", d => colors[indexToShow])

      svg.selectAll("g").remove()

      // Axes
      svg.append("g")
        .attr("transform", "translate(0, " + (h - padding) + ")")
        .call(xAxis)

      svg.append("g")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis)
  })
}
