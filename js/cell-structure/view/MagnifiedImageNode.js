define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var Node = require( 'SCENERY/nodes/Node');
  var Image = require( 'SCENERY/nodes/Image' );
  var OverlayNode = require( 'CELL_STRUCTURE/cell-structure/view/OverlayNode' );

  function MagnifiedImageNode( model, options, modelViewTransform ) {

    Node.call(this);
    if ( !model.image ) { return; }
    var imageNode = new Image( model.image, { x: 0, y: 0 } );
    this.addChild(imageNode);

    var overlayNode = new OverlayNode(model.overlay);
    this.addChild(overlayNode);
  }

  return inherit ( Node, MagnifiedImageNode);

});
