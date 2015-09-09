define( function( require ) {
  
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
      if(typeof droppable.collidesWith == "function") {
        droppable.collidesWith(model)
      }
      else if(CS.positionDelta( model.location, droppable.location, droppable.size.width, droppable.size.height)) {
        if(typeof droppable.onReceiveDrop == "function")
          droppable.onReceiveDrop(model);
      }
    });
  };

  CS.positionDelta = function( position1, position2, deltaX, deltaY){
    var within = function(value, lowerBound, upperBound) {
      return lowerBound < value && value < upperBound;
    };
    return within(position1.x, position2.x, position2.x + deltaX) && within(position1.y, position2.y, position2.y + deltaY);
  };

  CS.showMessageBox = function( message, autoClose, timeOut, location){
    if(location)
      CS.model.messageBox.locationProperty.set( location);
    else
      CS.model.messageBox.locationProperty.reset();
    CS.model.messageBox.visibilityProperty.set(true);
    CS.model.messageBox.messageProperty.reset();
    if(autoClose) {
      var timeOutId = window.setTimeout(function() {
        CS.model.messageBox.visibilityProperty.set(false);
        clearInterval(timeOutId);
      }, timeOut);
    }
    CS.model.messageBox.messageProperty.set(message);
  };

  var MicroscopeNode = require( 'CELL_STRUCTURE/cell-structure/view/MicroscopeNode' );
  var BeakerNode = require( 'CELL_STRUCTURE/cell-structure/view/BeakerNode' );
  var FillerNode = require( 'CELL_STRUCTURE/cell-structure/view/FillerNode' );
  var StopwatchNode = require( 'CELL_STRUCTURE/cell-structure/view/StopwatchNode' );
  var WideMouthedBottleNode = require( 'CELL_STRUCTURE/cell-structure/view/WideMouthedBottleNode' );
  CS.views = {
      'Microscope': MicroscopeNode,
      'Beaker': BeakerNode,
      'Filler': FillerNode,
      'Stopwatch': StopwatchNode,
      'WideMouthedBottle': WideMouthedBottleNode
    };

  CS.utils = require( 'CELL_STRUCTURE/cell-structure/helpers/utils' );

});
