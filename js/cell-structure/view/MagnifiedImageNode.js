define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var Node = require( 'SCENERY/nodes/Node');
  var Image = require( 'SCENERY/nodes/Image' );
  var OverlayNode = require( 'CELL_STRUCTURE/cell-structure/view/OverlayNode' );

  function MagnifiedImageNode( model, modelViewTransform ) {

    Node.call(this);
    if ( !model.image ) { return; }
    var imageNode = new Image( model.image, { x: 0, y: 0 } );
    this.addChild(imageNode);

    this.scale( modelViewTransform.modelToViewDeltaX( 240 ) / this.width,
      modelViewTransform.modelToViewDeltaY( 200  ) / this.height );

    if(model.overlays) {
      model.overlays.forEach(function(overlay) {
        var overlayNode = new OverlayNode(overlay);
        this.addChild(overlayNode);
      }.bind(this));
    }
  }

  return inherit ( Node, MagnifiedImageNode);

});
