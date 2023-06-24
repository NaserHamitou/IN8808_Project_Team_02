import d3Tip from 'd3-tip'

export const tooltip = d3Tip().attr('class', 'd3-tip').html(function (d) {
    return getContent(d) 
})

function getContent(d) {
    return d.target.parentNode.id == "#FAD02C" ? d.target.__data__.data.CJ : d.target.__data__.data.CR
}
