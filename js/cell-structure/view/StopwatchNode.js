define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Vector2 = require( 'DOT/Vector2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var LedFont = require( 'CELL_STRUCTURE/cell-structure/helpers/LedFont' );

  function StopwatchNode( model, modelViewTransform ) {
    model.locationProperty.set(new Vector2(400, 343));
    model.size = new Dimension2(100, 100);

    Node.call( this, {
      cursor: 'pointer',
      x: model.location.x,
      y: model.location.y
    } );

    var image = new Image( model.image, { x: 0, y: 0 } );
    this.addChild(image);
    image.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / image.width,
      modelViewTransform.modelToViewDeltaY( model.size.height ) / image.height );

    var time = new Text( model.time, { x: 36, y: 62, font: new LedFont(14), fill: 'red'});
    this.addChild(time);
  }

  return inherit( Node, StopwatchNode );
} );
