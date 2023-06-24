import * as performance from './scripts/viz4/build.js'
import * as results from './scripts/viz1/build.js'
import * as offensive from './scripts/viz6/build.js'
import * as cards from './scripts/viz3-cartons/cartons.js'


results.build() // Viz 1
cards.build()
performance.build() // Viz 4
offensive.build() // Viz 6
