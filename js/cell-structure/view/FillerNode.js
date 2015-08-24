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
    //model.location = new Vector2(10, 10);
    model.size = new Dimension2(60, 150);

    Node.call( this, {
      cursor: 'pointer',
      x: model.location.x,
      y: model.location.y
    } );

    var image = new Image( model.image, { x: 0, y: 0 } );
    var removeButton = new TextPushButton( "X", {
      font: new PhetFont( 20 ),
      baseColor: 'yellow',
      x: 0,
      y: 0,
      listener: function() {
        CS.trigger('ApparatusRemoved',model);
      }.bind(this)
    } );
    this.addChild(removeButton);

    var dropNode = new DropNode( model.drop, modelViewTransform );

    var knobButton = new TextPushButton( "    ", {
      font: new PhetFont( 50 ),
      baseColor: 'black',
      x: 35,
      y: 50,
      listener: function() {
        model.onKnobPressed();
      }
    } );
    this.addChild(knobButton);

    var liquidNode;
    model.liquidProperty.link( function( liquid ) {
      this.removeChild(image);
      this.removeChild(knobButton);
      this.removeChild(removeButton);
      if(liquidNode) {
        this.removeChild(liquidNode);
      }
      if(liquid) {
        liquidNode = new Rectangle(25, 175, 90, 160, 30, 20, {lineWidth: 0, stroke: '#000', fill: liquid.color });
        this.addChild(liquidNode);
      }
      this.addChild(image);
      this.addChild(knobButton);
      this.addChild(removeButton);
    }.bind(this) );
    this.addChild( dropNode );


    // Scale it so it matches the model width and height
    this.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / this.width,
               modelViewTransform.modelToViewDeltaY( model.size.height ) / this.height );
               // Register for synchronization with model.
    model.locationProperty.link( function( location ) {
      this.translation = modelViewTransform.modelToViewPosition( location );
    }.bind(this) );

    this.addInputListener( new SimpleDragHandler({
        // When dragging across it in a mobile device, pick it up
        allowTouchSnag: true,

        start: function (event) {
          this.dragStartPoint = event.pointer.point;
        }.bind(this),

        // Translate on drag events
        translate: function (args) {
          model.location = modelViewTransform.viewToModelPosition( args.position );
        },
        end: function( event ) {
          var dragStartPoint = this.dragStartPoint;
          this.dragStartPoint = undefined;
          if(dragStartPoint.x == event.pointer.point.x && dragStartPoint.y == event.pointer.point.y) {
            return;
          }
          if( typeof model.onDragEnd == "function" ) {
            model.onDragEnd();
          }
        }.bind(this)
      } ) );
  }

  return inherit( Node, FillerNode );
} );
