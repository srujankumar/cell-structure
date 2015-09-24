define( function( require ) {
  
  window.CS = {};
  CS.droppables = [];
  CS.addDroppable = function(model) {
    if(model && (typeof model.getGlobalBounds !== 'function')) return;
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

  CS.onDrop = function(node, model) {
    CS.droppables.forEach( function( droppable ){
      if(node == droppable) return;
      //if(typeof droppable.collidesWith == "function") {
      //  droppable.collidesWith(model);
      //}
      if(CS.isNodeOnDroppable(node, droppable)) {
        console.log('on');
        if(typeof droppable.onReceiveDrop == "function")
          droppable.onReceiveDrop(model);
      }
    });
  };

  CS.isNodeOnDroppable = function(node, droppable) {
      var within = function(value, lowerBound, upperBound) {
        return lowerBound < value && value < upperBound;
      };

      var droppableBounds = droppable.getGlobalBounds();
      var nodeBounds = node.getGlobalBounds();

      debugger;
      return within(nodeBounds.minX, droppableBounds.minX, droppableBounds.maxX) && within(nodeBounds.minY, droppableBounds.minY, droppableBounds.maxY);
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
  var TestTubeNode = require( 'CELL_STRUCTURE/cell-structure/view/TestTubeNode' );
  var BurnerKitNode = require( 'CELL_STRUCTURE/cell-structure/view/BurnerKitNode' );
  CS.views = {
      'Microscope': MicroscopeNode,
      'Beaker': BeakerNode,
      'Filler': FillerNode,
      'Stopwatch': StopwatchNode,
      'WideMouthedBottle': WideMouthedBottleNode,
      'TestTube': TestTubeNode,
      'BurnerKit': BurnerKitNode
    };

  CS.utils = require( 'CELL_STRUCTURE/cell-structure/helpers/utils' );

});
