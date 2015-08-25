/**
 * Model of an animal cell object.
 *
 * @author Srujan Kumar (BalaSwecha)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Filler = require( 'CELL_STRUCTURE/cell-structure/model/Filler' );
  var Cell = require( 'CELL_STRUCTURE/cell-structure/model/Cell' );

  function PlantRootCell( properties ) {
    Cell.call( this, properties );

    var onTimeout = function() {
      console.log('timed out');
    };

    this.onDippedInLiquid = function(liquid) {
      if(liquid.text === "Red Water") {
        CS.model.experimentArea.createStopwatch(onTimeout);
      }
    }.bind(this);
  }

  return inherit( Cell, PlantRootCell );
} );
