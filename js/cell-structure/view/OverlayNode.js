define( function( require ) {
  'use strict';

  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var DownUpListener = require( 'SCENERY/input/DownUpListener' );

  function OverlayNode( model, modelViewTransform ) {

    Node.call( this, {
      cursor: 'pointer'
    } );

    // Scale it so it matches the model width and height
    //this.scale( modelViewTransform.modelToViewDeltaX( microscope.size.width ) / this.width,
    //  modelViewTransform.modelToViewDeltaY( microscope.size.height ) / this.height );
    //// Register for synchronization with model.
    //microscope.locationProperty.link( function( location ) {
    //  this.translation = modelViewTransform.modelToViewPosition( location );
    //}.bind(this) );

    var circle = new Circle(model.radius, {x: model.location.x, y: model.location.y, fill: 'transparent', stroke: 'black', lineWidth:3 });
    circle.addInputListener( new DownUpListener( {
      up: function( event ) {
        model.parentModel.microscope.magnifierView.magnifiedImageProperty.set(model.magnifiedImage);
      }
    } ) );
    this.addChild(circle);
  }

  return inherit( Node, OverlayNode );
} );
