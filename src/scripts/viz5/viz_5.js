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
      .attr("text-anchor", "left")
      .attr("dominant-baseline", "baseline")
      .text(tickLabels[index]);
  });
}

// export function drawRadarPath(data, svg, valueScale, radius) {
//     // Filter the data for "Total Maroc" and "Total Adversaire"

//     const marocData = data.find(d => d.Equipe === "Total Maroc");
//     const adversaireData = data.find(d => d.Equipe === "Total Adversaire");
  
//     console.log(marocCoordinates);
//     console.log(adversaireCoordinates);

//     // Calculate the coordinates for each data point
//     const marocCoordinates = marocData.map(d => ({
//       angle: d.angle,
//       radius: valueScale(d.value)
//     }));
    
//     const adversaireCoordinates = adversaireData.map(d => ({
//       angle: d.angle,
//       radius: valueScale(d.value)
//     }));
  

//     // Create a line generator
//     const line = d3.lineRadial()
//       .angle(d => d.angle)
//       .radius(d => d.radius)
//       .curve(d3.curveLinearClosed);
  
//     // Append the path elements to the SVG and set their attributes
//     svg.append("path")
//       .datum(marocCoordinates)
//       .attr("d", line)
//       .attr("fill", "rgba(0, 0, 255, 0.5)")
//       .attr("stroke", "blue")
//       .attr("stroke-width", 2);
  
//     svg.append("path")
//       .datum(adversaireCoordinates)
//       .attr("d", line)
//       .attr("fill", "rgba(255, 0, 0, 0.5)")
//       .attr("stroke", "red")
//       .attr("stroke-width", 2);
//   }
  

function angleToCoordinate(angle, radius) {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return { x, y };
}

// export function drawRadarPath(data, svg, valueScale, radius) {
//     // Filter the data for "Total Maroc" and "Total Adversaire"
//     const marocData = data.find(d => d.Equipe === "Total Maroc");
//     const adversaireData = data.find(d => d.Equipe === "Total Adversaire");
  
//     // Calculate the scaled values for each data point
//     const marocValues = Object.values(marocData).slice(1).map(value => value / 100);
//     const adversaireValues = Object.values(adversaireData).slice(1).map(value => value / 100);
  
//     console.log(marocValues);
//     console.log(adversaireValues);
//     // Calculate the coordinates for each data point
//     const marocCoordinates = marocValues.map((value, i) => ({
//       angle: (i * 2 * Math.PI) / marocValues.length,
//       radius: valueScale(value)
//     }));
    
//     const adversaireCoordinates = adversaireValues.map((value, i) => ({
//       angle: (i * 2 * Math.PI) / adversaireValues.length,
//       radius: valueScale(value)
//     }));
  
//     // Create a line generator
//     const line = d3.lineRadial()
//       .angle(d => d.angle)
//       .radius(d => d.radius)
//       .curve(d3.curveLinearClosed);
  
//     // Append the path elements to the SVG and set their attributes
//     svg.append("path")
//       .datum(marocCoordinates)
//       .attr("d", line)
//       .attr("fill", "rgba(0, 0, 255, 0.5)")
//       .attr("stroke", "blue")
//       .attr("stroke-width", 2);
  
//     svg.append("path")
//       .datum(adversaireCoordinates)
//       .attr("d", line)
//       .attr("fill", "rgba(255, 0, 0, 0.5)")
//       .attr("stroke", "red")
//       .attr("stroke-width", 2);
//   }
  
export function drawRadarPath(data, svg, valueScale, radius, width, height) {
    // Filter the data for "Total Maroc" and "Total Adversaire"
    const marocData = data.find(d => d.Equipe === "Total Maroc");
    const adversaireData = data.find(d => d.Equipe === "Total Adversaire");
  
    // Calculate the scaled values for each data point
    const marocValues = Object.values(marocData).slice(1).map(value => value / 100);
    const adversaireValues = Object.values(adversaireData).slice(1).map(value => value / 100);
  
    // Calculate the coordinates for each data point
    const marocCoordinates = marocValues.map((value, i) => ({
      angle: (i * 2 * Math.PI) / marocValues.length,
      radius: valueScale(value)
    }));
  
    const adversaireCoordinates = adversaireValues.map((value, i) => ({
      angle: (i * 2 * Math.PI) / adversaireValues.length,
      radius: valueScale(value)
    }));
  
    // Create a line generator
    const line = d3.lineRadial()
      .angle(d => d.angle)
      .radius(d => d.radius)
      .curve(d3.curveLinearClosed);
  
    // Append the path elements to the SVG and set their attributes
    svg.append("path")
      .datum(marocCoordinates)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("transform", `translate(${width / 2}, ${height / 2})`); // Translate the path to the center
  
    svg.append("path")
      .datum(adversaireCoordinates)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("transform", `translate(${width / 2}, ${height / 2})`); // Translate the path to the center
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
          label_coord: angleToCoordinate(angle, radius + 35),
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
  
    svg
      .selectAll(".axislabel")
      .data(featureData)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("x", (d) => width / 2 + d.label_coord.x)
      .attr("y", (d) => height / 2 + d.label_coord.y)
      .text((d) => '% ' + d.label);
  }