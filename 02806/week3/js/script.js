let h = 400
let w = 1000
let padding = 25
let height = h - padding
let width = w - padding



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


d3.csv("../data/nydata.csv", allData => {

  // Filter out data and convert relevant rows
  let data = allData
    .filter(d => d.Index == "0")
    .map(d => parseRow(d))
  console.log(data)

  let N = 12
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

    // Text
    // barSvg.selectAll("text")
    //   .data(jsonData)
    //   .enter()
    //   .append("text")
    //   .text(d => h - d.x)
    //   .attr("fill", "white")
    //   .attr("font-size", "12")
    //   .attr("x", (d,i) => x(i) + x.bandwidth() / 3)
    //   .attr("y", (d,i) => h - y(d.x) - 8)

    // Axes
    barSvg.append("g")
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis)

    barSvg.append("g")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis)

})

// let randomValuesX = function(l) {
// 	let numbers = []
// 	for (i = 1; i <= l; i++){
// 		let x = Math.round(Math.random() * h)
// 		let obj = { "x" : x }
// 		numbers.push(obj)
// 	}
// 	return numbers
// }
//
// let elements = 25
// let jsonData = randomValuesX(elements)
//
// let N = jsonData.length
//
// let x = d3.scaleBand()
//   .domain(d3.range(N))
//   .rangeRound([padding, w - padding])
//   .paddingInner(0.05)
//
// let xAxis = d3.axisBottom(x)
//
// let y = d3.scaleLinear()
//   .domain([0, h])
//   .range([h - padding, padding])
//
// let yAxis = d3.axisLeft(y).ticks(5)
//
// // Bars
// barSvg.selectAll("rect")
//   .data(jsonData)
//   .enter()
//   .append("rect")
//   .attr("x", (d,i) => x(i))
//   .attr("y", d =>  y(h - d.x) - padding)
//   .attr("width", x.bandwidth())
//   .attr("height", d => y(d.x))
//   .attr("fill", d => "rgb(40,40," + Math.round(d.x * 5) + ")")
//
//   // Text
//   barSvg.selectAll("text")
//     .data(jsonData)
//     .enter()
//     .append("text")
//     .text(d => h - d.x)
//     .attr("fill", "white")
//     .attr("font-size", "12")
//     .attr("x", (d,i) => x(i) + x.bandwidth() / 3)
//     .attr("y", (d,i) => h - y(d.x) - 8)
//
//   // Axes
//   barSvg.append("g")
//     .attr("transform", "translate(0, " + (h - padding) + ")")
//     .call(xAxis)
//
//   barSvg.append("g")
//     .attr("transform", "translate(" + padding + ", 0)")
//     .call(yAxis)
//
// let updateChart = function(){
//     let dataset = randomValuesX(elements)
//
//     barSvg.selectAll("rect")
//       .data(dataset)
//       .transition()
//       .duration(animationTime)
//       .attr("y", d => y(h - d.x) - padding)
//       .attr("height", d => y(d.x))
//       .attr("fill", d => "rgb(40,40," + Math.round(d.x * 5) + ")")
//
//       barSvg.selectAll("text")
//         .data(dataset)
//         .transition()
//         .duration(animationTime)
//         .text(d => h - d.x)
//         .attr("y", (d,i) => h - y(d.x) - 8)
//
// }
