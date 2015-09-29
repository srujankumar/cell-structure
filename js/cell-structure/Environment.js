define( function( require ) {
  
  window.CS = {};
  CS.dropListeners = [];
  CS.addDropListener = function(node) {
    if(node && (typeof node.getGlobalBounds !== 'function')) return;
    CS.dropListeners.push(node);
  };

  CS.removeDropListener = function(node) {
    var nodeIndex = CS.dropListeners.indexOf(node);
    if(node &&  nodeIndex != -1)
      CS.dropListeners.splice( nodeIndex, 1);
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
    CS.dropListeners.forEach( function( dropListener ){
      if(node == dropListener) return;
      //if(typeof dropListener.collidesWith == "function") {
      //  dropListener.collidesWith(model);
      //}
      if(CS.isNodeOnDroppable(node, dropListener)) {
        if(typeof dropListener.onReceiveDrop == "function")
          dropListener.onReceiveDrop(model);
      }
    });
  };

  CS.isNodeOnDroppable = function(node, dropListener) {
      var within = function(value, lowerBound, upperBound) {
        return lowerBound < value && value < upperBound;
      };

      var dropListenerBounds = dropListener.getGlobalBounds();
      var nodeBounds = node.getGlobalBounds();

      return within(nodeBounds.minX, dropListenerBounds.minX, dropListenerBounds.maxX) && within(nodeBounds.minY, dropListenerBounds.minY, dropListenerBounds.maxY);
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
