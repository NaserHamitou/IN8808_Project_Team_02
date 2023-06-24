// Dimensions du graphique
var width = 500
var height = 400

// Marge du graphique
var margin = { top: 50, right: 20, bottom: 50, left: 50 }
var graphWidth = width - margin.left - margin.right
var graphHeight = height - margin.top - margin.bottom

/**
 * @param data
 */
function convertData (data) {
  data.forEach(function (d) {
    d.V = +d.V
    d.N = +d.N
    d.D = +d.D
  })
}

/**
 * @param data
 * @returns {*}
 */
function createXScale (data) {
  return d3.scaleBand()
    .domain(data.map(function (d) { return d.Équipe }))
    .range([0, graphWidth])
    .padding(0.2)
}

// Fonction pour créer l'échelle en axe des ordonnées
/**
 *@returns {*}
 */
function createYScale () {
  return d3.scaleLinear()
    .domain([0, 8])
    .range([graphHeight, 0])
}

// Fonction pour créer l'échelle des couleurs
/**
 *@returns {*}
 */
function createColorScale () {
  return d3.scaleOrdinal()
    .domain(['Victoires', 'Nul', 'Défaites'])
    .range(['green', 'yellow', 'red'])
}

// Fonction pour créer les barres empilées
/**
 * @param svg
 * @param xScale
 * @param yScale
 * @param colorScale
 * @param data
 * @returns {*}
 */
function createStackedBars (svg, xScale, yScale, colorScale, data) {
  var graph = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var stackedBars = graph.selectAll('.stacked-bar')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'stacked-bar')
    .attr('transform', function (d) { return 'translate(' + xScale(d.Équipe) + ',0)' })

  stackedBars.selectAll('rect')
    .data(function (d) {
      return [
        { type: 'Défaites', value: d.D + d.N + d.V },
        { type: 'Nul', value: d.N + d.V },
        { type: 'Victoires', value: d.V }
      ]
    })
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', function (d) { return yScale(d.value) })
    .attr('width', xScale.bandwidth())
    .attr('height', function (d) { return graphHeight - yScale(d.value) })
    .attr('fill', function (d) { return colorScale(d.type) })

  return graph
}

// Fonction pour ajouter l'axe des abscisses
/**
 * @param graph
 * @param xScale
 */
function addXAxis (graph, xScale) {
  graph.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + graphHeight + ')')
    .call(d3.axisBottom(xScale))
}

// Fonction pour ajouter l'axe des ordonnées
/**
 * @param graph
 * @param yScale
 */
function addYAxis (graph, yScale) {
  graph.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale))
}

// Fonction pour ajouter la légende
/**
 * @param svg
 * @param colorScale
 */
function addLegend (svg, colorScale) {
  var legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(' + (margin.left + graphWidth - 10) + ',' + margin.top + ')')

  legend.selectAll('.legend-item')
    .data(colorScale.domain())
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('transform', function (d, i) { return 'translate(0,' + i * 20 + ')' })
    .each(function (d) {
      var item = d3.select(this)
      item.append('rect')
        .attr('x', 0)
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', colorScale(d))
      item.append('text')
        .attr('x', 24)
        .attr('y', 9)
        .attr('dy', '0.35em')
        .text(d)
    })
}

// Fonction principale de création du graphique
/**
 * @param svg
 * @param data
 */
export function createGraph (svg, data) {
  convertData(data)

  var xScale = createXScale(data)
  var yScale = createYScale()
  var colorScale = createColorScale()

  var graph = createStackedBars(svg, xScale, yScale, colorScale, data)

  addXAxis(graph, xScale)
  addYAxis(graph, yScale)
  addLegend(svg, colorScale)
}