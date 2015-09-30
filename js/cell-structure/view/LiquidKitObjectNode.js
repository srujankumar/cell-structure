define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var Arc = require( 'KITE/segments/Arc');
  var Line = require( 'SCENERY/nodes/Line');
  var Path = require( 'SCENERY/nodes/Path');
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Shape = require( 'KITE/Shape' );
  var bottleImage = require( 'image!CELL_STRUCTURE/bottle.svg' );

  function KitObjectNode( model, modelViewTransform ) {

    Node.call( this, {
      x: model.location.x,
      y: model.location.y,
      cursor: 'pointer'
    } );

    var bottle = new Image(bottleImage, {x: 0, y: 0});
    var bottleText = new Text( model.text, { font: new PhetFont(14), fill: '#000'});

    var line = new Line(0,0,120,0);

    var bottleFill = new Rectangle(33, 45, 54, 53, 0, 0, {fill: model.color, stroke: "#000", lineWidth: 0});
    this.addChild(bottleFill);
    var content = new VBox( { align: 'center', spacing: 1, children: [ bottle, line, bottleText ] } );
    this.addChild(content);

    var positionDelta = function( position1, position2, deltaX, deltaY){
      return ( Math.abs(position1.x - position2.x) <=  deltaX) && ( Math.abs(position1.y - position2.y) <= deltaY);
    };

    // Scale it so it matches the model width and height
    this.scale( modelViewTransform.modelToViewDeltaX( 80 ) / this.width,
      modelViewTransform.modelToViewDeltaY( 80 ) / this.height );

    this.addInputListener( new SimpleDragHandler(
      {
        // When dragging across it in a mobile device, pick it up
        allowTouchSnag: true,

        // Translate on drag events
        translate: function (args) {
          //this.translation = args.position;
          model.location = modelViewTransform.viewToModelPosition( args.position );
        },
        end: function( event ) {
          CS.onDrop( this, model);
          model.reset();
        }.bind(this)
      } ) );

    // Register for synchronization with model.
    model.locationProperty.link( function( location ) {
      this.translation = modelViewTransform.modelToViewPosition( location );
    }.bind(this) );

    model.visibilityProperty.link( function( visibility ) {
      this.setVisible(visibility);
    }.bind(this) );
  }

  return inherit( Node, KitObjectNode );
} );
