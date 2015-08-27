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
  var Cutter = require( 'CELL_STRUCTURE/cell-structure/model/Cutter' );
  var Cell = require( 'CELL_STRUCTURE/cell-structure/model/Cell' );
  var treeCellIcon = require( 'image!CELL_STRUCTURE/tree.svg' );
  var treeRedImage = require( 'image!CELL_STRUCTURE/tree-red.svg' );

  function PlantRootCell( properties ) {
    Cell.call( this, _.merge({image: treeCellIcon}, properties) );

    var onTimeout = function() {
      this.imageProperty.set(treeRedImage);
    }.bind(this);

    this.onDippedInLiquid = function(liquid) {
      if(liquid.text === "Red Water") {
        CS.model.experimentArea.createStopwatch(onTimeout);
      }
    }.bind(this);

    this.attachedToProperty.link(function(attachedTo) {
      if(!CS.model) return; // still initializing
      if(!attachedTo || attachedTo.name !== "beaker") {
        CS.model.experimentArea.stopStopwatch();
      }
    });
  }

  return inherit( Cell, PlantRootCell, {
    collidesWith: function(model) {
      if(model instanceof Cutter)
        model.collidesWith(this);
      return false;
    }

  });
} );
