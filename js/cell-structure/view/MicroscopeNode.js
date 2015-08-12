define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node');
  var MicroscopeInstrumentNode = require( 'CELL_STRUCTURE/cell-structure/view/MicroscopeInstrumentNode' );
  var MagnifierViewNode = require( 'CELL_STRUCTURE/cell-structure/view/MagnifierViewNode' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  function MicroscopeNode( model, modelViewTransform ) {

    model.location = new Vector2(400, 100);
    model.size = new Dimension2(300, 200);
    Node.call(this, {x: model.location.x, y: model.location.y});
    var instrumentNode = new MicroscopeInstrumentNode(model.instrument, {}, modelViewTransform);
    var magnifierViewNode = new MagnifierViewNode(model.magnifierView, {}, modelViewTransform);
    var removeButton = new TextPushButton( "X", {
      font: new PhetFont( 16 ),
      baseColor: 'yellow',
      x: -150,
      y: 0,
      listener: function() {
        CS.trigger('ApparatusRemoved',model);
      }
    } );
    this.addChild(removeButton);
    this.addChild(instrumentNode);
    this.addChild(magnifierViewNode);

    // Scale it so it matches the model width and height
    this.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( model.size.height ) / this.height );
  }
  return inherit( Node, MicroscopeNode );
});
