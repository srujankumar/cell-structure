/*
  Kit which holds animal cell, plant cell, etc
 */
define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var Node = require( 'SCENERY/nodes/Node');

  function ExperimentAreaNode( model, options, modelViewTransform ) {
    Node.call(this, options);

    var bounds = new Rectangle(0,0,600,400,5,5, { fill: 'transparent', stroke: 'orange', lineWidth:1 });
    this.addChild(bounds);

    // Scale it so it matches the model width and height
    this.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( model.size.height ) / this.height );
    model.newChildProperty.link(function(child) {
      if(!child) { return; }
      var view = CS.views[child.constructor.name];
      if(view) {
        this.addChild(new view(child, modelViewTransform));
      }
      model.newChild = undefined;
    }.bind(this));
  }


  return inherit ( Node, ExperimentAreaNode);

});
