window.CS = {};
CS.droppables = [];
CS.addDroppable = function(model) {
  CS.droppables.push(model);
};

CS.onDrop = function(model) {
  CS.droppables.forEach( function( droppable){
    if(CS.positionDelta( model.location, droppable.location, droppable.size.width, droppable.size.height)) {
      if(typeof droppable.onReceiveDrop == "function")
        droppable.onReceiveDrop(model);
    }
  });
};

CS.positionDelta = function( position1, position2, deltaX, deltaY){
  return ( Math.abs(position1.x - position2.x) <=  deltaX) && ( Math.abs(position1.y - position2.y) <= deltaY);
};

/**
 *
 * @author Srujan Kumar ( BalaSwecha )
 */
define( function( require ) {
  'use strict';

  // modules
  var CellStructureModel = require( 'CELL_STRUCTURE/cell-structure/model/CellStructureModel' );
  var CellStructureScreenView = require( 'CELL_STRUCTURE/cell-structure/view/CellStructureScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var cellStructureSimString = require( 'string!CELL_STRUCTURE/cell-structure.name' );

  /**
   * @constructor
   */
  function CellStructureScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = null;
    Screen.call( this, cellStructureSimString, icon,
      function() { return new CellStructureModel(); },
      function( model ) { return new CellStructureScreenView( model ); },
      { backgroundColor: 'grey' }
    );
  }

  return inherit( Screen, CellStructureScreen );
} );
