window.CS = {};
CS.droppables = [];
CS.addDroppable = function(model) {
  CS.droppables.push(model);
};

CS.eventHandlers = {};
CS.addEventHandler = function(eventName, handler) {
  CS.eventHandlers[eventName] = CS.eventHandlers[eventName] || [];
  CS.eventHandlers[eventName].push(handler);
};

CS.trigger = function(eventName, eventObj) {
  var handlers = CS.eventHandlers[eventName];
  if(!handlers) return;

  handlers.forEach(function(handler) {
    handler(eventObj);
  });
};

CS.onDrop = function(model) {
  CS.droppables.forEach( function( droppable){
    if(model == droppable) return;
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
  var MicroscopeNode = require( 'CELL_STRUCTURE/cell-structure/view/MicroscopeNode' );
  var BeakerNode = require( 'CELL_STRUCTURE/cell-structure/view/BeakerNode' );
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
    CS.model = new CellStructureModel();
    CS.views = {
      'Microscope': MicroscopeNode,
      'Beaker': BeakerNode
    };
    Screen.call( this, cellStructureSimString, icon,
      function() { return CS.model; },
      function( model ) { return new CellStructureScreenView( model ); },
      { backgroundColor: 'grey' }
    );
  }

  return inherit( Screen, CellStructureScreen );
} );
