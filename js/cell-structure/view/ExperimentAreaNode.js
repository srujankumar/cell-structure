/*
  Kit which holds animal cell, plant cell, etc
 */
define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var Image = require( 'SCENERY/nodes/Image');
  var Node = require( 'SCENERY/nodes/Node');
  var table = require( 'image!CELL_STRUCTURE/table.svg' );
  var StopwatchNode = require( 'CELL_STRUCTURE/cell-structure/view/StopwatchNode' );

  function ExperimentAreaNode( model, options, modelViewTransform ) {
    Node.call(this, options);

    var image = new Image(table, {x: model.location.x, y: model.location.y + 200});
    image.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / image.width,
      modelViewTransform.modelToViewDeltaY( model.size.height ) / image.height );
    this.addChild(image);

    this.scale(1,1);
    model.onAddChild = function(child) {
      if(!child) { return; }
      var view = CS.views[child.constructor.name];
      if(view) {
        this.addChild(new view(child, modelViewTransform));
      }
    }.bind(this);

    model.onRemoveChild = function(index) {
      this.removeChildAt(index + 1);
    }.bind(this);

    model.stopwatchProperty.link(function(stopwatch) {
      if(!stopwatch) {
        return;
      }
      this.addChild(new StopwatchNode(stopwatch, modelViewTransform));
    }.bind(this));
  }


  return inherit ( Node, ExperimentAreaNode);

});
