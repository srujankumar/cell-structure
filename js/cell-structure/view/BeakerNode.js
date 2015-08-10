define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  function BeakerNode( model, modelViewTransform ) {

    Node.call( this, {
      cursor: 'pointer',
      x: model.location.x,
      y: model.location.y
    } );

    this.addChild( new Image( model.image, { x: 0, y: 0 } ) );

    // Scale it so it matches the model width and height
    this.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( model.size.height ) / this.height );
    // Register for synchronization with model.
    model.locationProperty.link( function( location ) {
      this.translation = modelViewTransform.modelToViewPosition( location );
    }.bind(this) );

  }

  return inherit( Node, BeakerNode );
} );
