"use strict";

import * as viz from './viz_5'
import * as helper from './helper'
import * as legend from './legend'
/**
 * @file This file is the entry point for the code of the radar chart.
 */

export function build() {
  (function (d3) {
    d3.csv("./Métriques.csv").then(function (data) {
      const formattedData = data.map((d) => ({
        Equipe: d["Équipe"],
        Arrets: parseFloat(d["Arrets%"].replace(",", ".")),
        Gagnes: parseFloat(d["% gagnés"].replace(",", ".")),
        Tcl: parseFloat(d["Tcl%"].replace(",", ".")),
        Possession: parseFloat(d["Possession"].replace(",", ".")),
        Cmp: parseFloat(d["Cmp%"].replace(",", ".")),
      }));

      const width = 400;
      const height = 400;
      const radius = Math.min(width, height) / 2;
      const margin = { top: 35, right: 300, bottom: 35, left: 300 }



        const svg = helper.generateSVG(width, height, margin)


      const valueScale = d3.scaleLinear().domain([0, 1]).range([0, radius]);

      const ticks = [0, 0.25, 0.5, 0.75, 1];
      const tickLabels = ["0", "25", "50", "75", "100"];

      // Draw the circles to represent percentages
      viz.drawCircles(height, width, ticks, svg, valueScale, tickLabels);
    
      // Extract the data values for the first data point
// const dataValues = Object.values(formattedData[0]).slice(1);


// Draw the area lines
viz.drawAreaLines(formattedData, svg, valueScale, radius, width, height);






      // Create a function to generate the radar path
    //   const radarLine = d3
    //     .lineRadial()
    //     .angle((d, i) => (i * 2 * Math.PI) / formattedData.length)
    //     .radius((d) => valueScale(d))
    //     .curve(d3.curveLinearClosed);

      // Draw the radar path
    //   svg
    //     .append("path")
    //     .datum(Object.values(formattedData[0]).slice(1))
    //     .attr("d", radarLine)
    //     .attr("fill", "rgba(0, 0, 255, 0.5)")
    //     .attr("stroke", "blue")
    //     .attr("stroke-width", 2);

      // Create labels for each data point
    //   svg
    //     .selectAll(".label")
    //     .data(Object.keys(formattedData[0]).slice(1))
    //     .enter()
    //     .append("text")
    //     .attr("class", "label")
    //     .attr("x", (d, i) => {
    //       const angle = (i * 2 * Math.PI) / formattedData.length;
    //       return valueScale(1.2) * Math.sin(angle) + width / 2;
    //     })
    //     .attr("y", (d, i) => {
    //       const angle = (i * 2 * Math.PI) / formattedData.length;
    //       return -valueScale(1.2) * Math.cos(angle) + height / 2;
    //     })
    //     .attr("text-anchor", "middle")
    //     .attr("dominant-baseline", "central")
    //     .text((d) => d);
    });
  })(d3);
}
