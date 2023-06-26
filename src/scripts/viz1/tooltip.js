/**
 *
 */
export function initialize () {
  // Initialize the tooltip HTML and styles
  d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('pointer-events', 'none')
    .style('opacity', 0)
}

/**
 * @param data
 * @param event
 */
export function show (event, data) {
  const tooltip = d3.select('.tooltip')
  const contents = getContents(data)

  tooltip
    .html(contents)
    .style('left', event.pageX + 'px')
    .style('top', event.pageY + 'px')
    .style('opacity', 1)
}

/**
 *
 */
export function hide () {
  d3.select('.tooltip').style('opacity', 0)
}

/**
 * @param event
 */
export function update (event) {
  if (event) {
    d3.select('.tooltip')
      .style('left', event.pageX + 'px')
      .style('top', event.pageY + 'px')
  }
}

/**
 * @param data
 */
export function getContents (data) {
  const team = data.data.Équipe
  const scoreDifference = data[1] - data[0]
  let resultType = ''

  if (data[0] === 0) {
    if (data[1] === 1) {
      resultType = 'Victoire'
    } else {
      resultType = 'Victoires'
    }
  } else if (data[1] === 7) {
    if (data[1] - data[0] === 1) {
      resultType = 'Défaite'
    } else {
      resultType = 'Défaites'
    }
  } else {
    resultType = 'Matchs nuls'
  }

  var contents = `<div id="tooltip-title">${team}</div>`
  contents += '<p></p>'
  contents += `<div class="tooltip-value"> <div>${scoreDifference} ${resultType}  </div>`

  return contents
}
