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
  var DropNode = require( 'CELL_STRUCTURE/cell-structure/view/DropNode' );

  function FillerNode( model, modelViewTransform ) {
    model.size = new Dimension2(60, 150);

    Node.call( this, {
      cursor: 'pointer',
      x: model.location.x,
      y: model.location.y
    } );

    var image = new Image( model.image, { x: 0, y: 0 } );
    image.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / image.width,
               modelViewTransform.modelToViewDeltaY( model.size.height ) / image.height );
    var removeButton = new TextPushButton( "X", {
      font: new PhetFont( 10 ),
      baseColor: 'yellow',
      x: 0,
      y: 0,
      listener: function() {
        CS.trigger('ApparatusRemoved',{ model: model, node: this });
      }.bind(this)
    } );
    this.addChild(removeButton);

    var dropNode = new DropNode( model.drop, modelViewTransform );
    this.addChild(dropNode);

    var knobButton = new TextPushButton( "    ", {
      font: new PhetFont( 10 ),
      baseColor: 'black',
      x: 17,
      y: 30,
      listener: function() {
        model.onKnobPressed();
      }
    } );
    this.addChild(knobButton);

    var liquidNode;
    var redraw = function( liquid ) {
      this.removeChild(image);
      this.removeChild(knobButton);
      this.removeChild(removeButton);
      this.removeChild(dropNode);
      if(liquidNode) {
        this.removeChild(liquidNode);
      }
      if(liquid) {
        liquidNode = new Rectangle( 10, 80, 40, 67, 10, 20, {lineWidth: 0, stroke: '#000', fill: liquid.color });
        this.addChild(liquidNode);
      }
      this.addChild(image);
      this.addChild(knobButton);
      this.addChild(removeButton);
      this.addChild(dropNode);
    }.bind(this);
    model.liquidProperty.link( redraw);

    this.scale(1,1);
    this.setLeft(50);
    this.setBottom(250);

    CS.addDropListener(this);
    this.onReceiveDrop = model.onReceiveDrop;
    this.collidesWith = model.collidesWith;

    this.unregisterObservers = function() {
      model.liquidProperty.unlink( redraw);
      CS.removeDropListener(this);
    }.bind(this);
  }

  return inherit( Node, FillerNode );
} );
