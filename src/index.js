'use strict'

import * as helper from './scripts/helpers/helper.js'
import * as preproc from './scripts/preprocess.js'
// import * as viz from './scripts/viz.js'
// import * as legend from './scripts/legend.js'
// import * as hover from './scripts/hover.js'
// import * as util from './scripts/util.js'

import * as d3Chromatic from 'd3-scale-chromatic'

/**
 * @file This file is the entry-point for the the code for the project for the course INF8808.
 * @author Olivia Gélinas
 * @version v1.0.0
 */

(function (d3) {
  

  d3.csv('./arbres.csv', d3.autoType).then(function (data) {
   

    /**
     *   This function handles the graph's sizing.
     */
    function setSizing () {
      
    }

    /**
     *   This function builds the graph.
     */
    function build () {
      
    }

    window.addEventListener('resize', () => {
      setSizing()
      build()
    })
  })
})(d3)
