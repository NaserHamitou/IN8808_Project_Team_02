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
export function show (data, event) {
  return getContents(event) 
    // .style('left', event.pageX + 'px')
    // .style('top', event.pageY + 'px')
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
  console.log(data.data.Équipe)


  var contents = `<div >${data.data.Équipe}</div>`
  contents += '<p></p>'
  contents += `<div > ${data[1] - data[0]} lines </div>`

  return contents
}
