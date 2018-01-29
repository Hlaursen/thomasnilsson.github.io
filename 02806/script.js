let body = d3.select("body")
let content = body.select("#panelDiv")

let addButton = (weekNumber) => content.append("a")
	.attr("class", "btn btn-primary btn-block")
	.text("Week " + weekNumber)
	.attr("href", "/week" + weekNumber + "/")

let weeks = [1]

for (i in weeks) {
	let w = weeks[i]
	addButton(w)
}





