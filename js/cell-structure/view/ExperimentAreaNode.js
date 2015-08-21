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

  function ExperimentAreaNode( model, options, modelViewTransform ) {
    Node.call(this, options);

    this.addChild(new Image(table, {x: model.location.x, y: model.location.y + 200}));

    // Scale it so it matches the model width and height
    this.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( model.size.height ) / this.height );
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
  }


  return inherit ( Node, ExperimentAreaNode);

});
