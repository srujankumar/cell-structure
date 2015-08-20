define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );

  function DropNode( model, modelViewTransform ) {
    Node.call( this, {
      cursor: 'pointer',
      x: model.location.x,
      y: model.location.y
    } );

    var dropShape = new Shape()
      .moveTo( modelViewTransform.modelToViewX( 10 ), modelViewTransform.modelToViewY( 0 ) )
      //.lineTo( modelViewTransform.modelToViewX( 0 ), modelViewTransform.modelToViewY( 10 ) )
      .arc( modelViewTransform.modelToViewX(10), modelViewTransform.modelToViewY( 3 ), 2, -45 * Math.PI / 180, 225 * Math.PI / 180, false)
      //.lineTo( modelViewTransform.modelToViewX( 20 ), modelViewTransform.modelToViewY( 10 ) );
    var dropPath = new Path( dropShape, { top: 0, left: 0, fill: 'brown', stroke: 'brown', lineWidth: 0 } );
    this.addChild(dropPath);

    model.colorProperty.linkAttribute(dropPath, 'fill');

    // Scale it so it matches the model width and height
    this.scale( modelViewTransform.modelToViewDeltaX( 2 ),
      modelViewTransform.modelToViewDeltaY( 8 ) / this.height );

    model.locationProperty.link(function(location) {
      this.translation = modelViewTransform.modelToViewPosition( location );
    }.bind(this));
  }

  return inherit( Node, DropNode );
} );
