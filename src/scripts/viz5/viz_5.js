export function drawCircles(height, width, ticks, svg, valueScale, tickLabels) {
  ticks.forEach((tick, index) => {
    svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", valueScale(tick))
      .attr("fill", "none")
      .attr("stroke", "darkgoldenrod");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2 - valueScale(tick))
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "baseline")
      .text(tickLabels[index]);
  });
}

export function drawRadarPath(svg, formattedData, valueScale) {
  // Create a function to generate the radar path
  const radarLine = d3
    .lineRadial()
    .angle((d, i) => (i * 2 * Math.PI) / formattedData.length)
    .radius((d) => valueScale(d))
    .curve(d3.curveLinearClosed);

  // Draw the radar path
  svg
    .append("path")
    .datum(Object.values(formattedData[0]).slice(1))
    .attr("d", radarLine)
    .attr("fill", "rgba(0, 0, 255, 0.5)")
    .attr("stroke", "blue")
    .attr("stroke-width", 2);
}

function angleToCoordinate(angle, radius) {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return { x, y };
}

export function drawAreaLines(data, svg, valueScale, radius, width, height) {
    // Create feature data
    const featureData = Object.keys(data[0])
      .slice(1)
      .map((key, i) => {
        const angle = ((2 * Math.PI * i) / (Object.keys(data[0]).length - 1)) - Math.PI / 2;
        return {
          label: key,
          angle: angle,
          line_coord: angleToCoordinate(angle, radius),
          label_coord: angleToCoordinate(angle, radius + 20),
        };
      });
    console.log(featureData);
  
    // Draw axis lines
    svg
      .selectAll("line")
      .data(featureData)
      .join("line")
      .attr("x1", width / 2)
      .attr("y1", height / 2)
      .attr("x2", (d) => width / 2 + d.line_coord.x)
      .attr("y2", (d) => height / 2 + d.line_coord.y)
      .attr("stroke", "darkgoldenrod");
  
    // Draw axis labels
    svg
      .selectAll(".axislabel")
      .data(featureData)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("x", (d) => width / 2 + d.label_coord.x)
      .attr("y", (d) => height / 2 + d.label_coord.y)
      .text((d) => '%' + d.label);
  }