'use strict'

import * as viz from './viz_7'
import * as helper from './helper'
import * as legend from './legend'

export function build () {
  (function (d3) {
    const margin = { top: 35, right: 100, bottom: 35, left: 150 }
    const width = 700
    const height = 550

    const barColors = [
      '#007AFF',
      '#FF2E2E'
    ]

    const yScale = d3.scaleBand() 
    const xScale = d3.scaleLinear()

    const svg = helper.generateSVG(width, height, margin)

    d3.csv('./Tirs.csv').then(function (data) {
      const subgroups = data.columns.slice(1)

      viz.updateYScale(yScale, data, height)
      viz.updateXScale(xScale, data, width)

      svg.append('g')
      .attr('height', 20)
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale).tickSizeOuter(10))

      svg.append('g')
        .call(d3.axisLeft(yScale).ticks(5))

      const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(barColors)

      viz.drawBars(data, color, xScale, yScale, svg)
    })

    legend.drawLegend()
  })(d3)
}