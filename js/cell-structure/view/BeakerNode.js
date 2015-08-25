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

  function BeakerNode( model, modelViewTransform ) {
    model.locationProperty.set(new Vector2(200, 343));
    model.size = new Dimension2(200, 200);

    Node.call( this, {
      cursor: 'pointer',
      x: model.location.x,
      y: model.location.y
    } );

    var image = new Image( model.image, { x: 0, y: 0 } );
    //this.addChild(image);

    var removeButton = new TextPushButton( "X", {
      font: new PhetFont( 50 ),
      baseColor: 'yellow',
      x: 0,
      y: 0,
      listener: function() {
        CS.trigger('ApparatusRemoved',model);
      }
    } );
    this.addChild(removeButton);

    var liquidNode;
    var redraw = function() {
      this.removeChild(image);
      this.removeChild(removeButton);
      if(liquidNode) {
        this.removeChild(liquidNode);
      }
      if(model.liquid) {
        liquidNode = new Rectangle(103, 175, 313, 295, 0, 0, {lineWidth: 0, stroke: '#000', fill: model.liquid.color });
        this.addChild(liquidNode);
      }
      this.addChild(image);
      this.addChild(removeButton);
    }.bind(this);

    model.liquidProperty.link( function() {
      redraw();
    }.bind(this) );
    // Scale it so it matches the model width and height
    this.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( model.size.height ) / this.height );
    // Register for synchronization with model.
    /*model.locationProperty.link( function( location ) {
      this.translation = modelViewTransform.modelToViewPosition( location );
    }.bind(this) );*/

  }

  return inherit( Node, BeakerNode );
} );
