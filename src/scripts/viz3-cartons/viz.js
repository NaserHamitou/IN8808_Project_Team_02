import * as tip from "./tooltip";

export function updateXScale(scale, data, width) {
    const equipes = data.map(d => { return d.Equipe })
    console.log(equipes)
    scale.domain(equipes)
        .range([0, width])
        .padding([0.2])
}

export function unpdateYScale(scale, data, height) {
    const max = d3.sum(data, d => d.CJ) / 2
    scale.domain([0, max])
         .range([height, 0]);
}

export function drawBars(data, color, x, y, svg){
    const subgroups = data.columns.slice(1)
    const stackedData = d3.stack().keys(subgroups)(data)

    svg.append("g")
    .selectAll("g")
    .data(stackedData)
    .enter().append("g")
    .attr("fill", function(d) { return color(d.key); })
    .attr("id", function(d) { return color(d.key) })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.data.Equipe); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
    .on("mouseover", tip.tooltip.show)
    .on("mouseout", tip.tooltip.hide)

    svg.call(tip.tooltip)
}