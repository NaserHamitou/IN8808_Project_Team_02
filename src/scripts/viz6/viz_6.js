/**
 * @param scale
 * @param data
 * @param width
 */
export function updateXScale (scale, data, width) {
  const joueurs = data.map(d => { return d.Joueur })
  scale.domain(joueurs)
    .range([0, width])
    .padding([0.55])
}

/**
 * @param scale
 * @param data
 * @param height
 */
export function unpdateYScale (scale, data, height) {
  scale.domain([0, 8])
    .range([height, 0])
}

/**
 * @param data
 * @param color
 * @param x
 * @param y
 * @param svg
 */
export function drawBars (data, color, x, y, svg) {
  // Map each subgroup to a specific color
  const colorMapping = {
    Buts: 'blue',
    PD: 'red',
    PC: 'orange'
  }

  const subgroups = data.columns.slice(1)
  const xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.1]) // This makes sure there's a little space between each bar

  svg.append('g')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', d => `translate(${x(d.Joueur) - 10})`) // Shift the position of each bar group
    .selectAll('rect')
    .data(function (d) {
      return subgroups.map(function (key) { return { key: key, value: d[key] } })
    })
    .enter().append('rect')
    .attr('x', d => xSubgroup(d.key))
    .attr('y', d => y(d.value))
    .attr('width', xSubgroup.bandwidth())
    .attr('height', d => y(0) - y(d.value))
    .attr('fill', d => colorMapping[d.key])
}
