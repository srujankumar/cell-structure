/*
  Kit which holds animal cell, plant cell, etc
 */
define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var Image = require( 'SCENERY/nodes/Image');
  var Node = require( 'SCENERY/nodes/Node');
  var texture = require( 'image!CELL_STRUCTURE/wood-texture.jpg' );

  function ExperimentAreaNode( model, options, modelViewTransform ) {
    Node.call(this, options);

    var bounds = new Rectangle(0,0,800,768,0,0, { fill: 'transparent', stroke: 'orange', lineWidth:10 });
    bounds.addChild(new Image(texture, {x: 0, y: 0}));
    this.addChild(bounds);

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
