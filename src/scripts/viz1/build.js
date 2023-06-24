import * as viz from './viz_1.js'
var width = 1000
var height = 400

/**
 *
 */
export function build () {
// Création de l'élément SVG
  var svg = d3.select('.viz1-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // Chargement des données depuis le fichier CSV
  d3.csv('./Résultats.csv')
    .then(function (data) {
      viz.createGraph(svg, data)
    })
}
