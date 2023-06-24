export function getContents(d) {
    const target = d.target.__data__;
    const tooltipContents = d3.create("div");
  
    // Title
    tooltipContents
      .append("div")
      .style("font-family", "Grenze Gotisch")
      .style("font-size", "24px")
      .style("font-weight", "normal")
      .text(target.team);
  
    tooltipContents
      .append("div")
      .style("font-family", "Montserrat")
      .style("font-weight", "normal")
      .text(target.value + " Buts");
  
  
    tooltipContents.selectAll("div").style("margin-bottom", "8px");
  
    return tooltipContents.node().outerHTML;
  }
  