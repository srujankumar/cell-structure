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

  function KitObjectNode( model, modelViewTransform ) {

    Node.call( this, {
      x: model.location.x,
      y: model.location.y,
      cursor: 'pointer'
    } );

    //var cellIcon = new Image( model.kitImage, { x: 0, y: 0 } );
    var bottle = new Rectangle(0, 0, 50, 100, 3, 3, {fill: model.color, stroke: "#000", lineWidth: 10});
    //var bottleTop = new Path(new Arc(new Vector2(38,0),38, 3*Math.PI, 4*Math.PI, false), {});
    var bottleTopShape = new Shape()
      .moveTo( modelViewTransform.modelToViewX( 0 ), modelViewTransform.modelToViewY( 0 ) )
      .lineTo( modelViewTransform.modelToViewX( 20 ), modelViewTransform.modelToViewY( 0 ) );
    var bottleTop = new Path( bottleTopShape, { top: 20, stroke: '#000', lineWidth: 10 } );
    var cellIconText = new Text( model.text, { font: new PhetFont(14), fill: '#000'});

    var line = new Line(0,0,120,0);

    var content = new VBox( { align: 'center', spacing: 1, children: [ bottleTop, bottle, line, cellIconText ] } );

    if( model.showOutline ) {
      var rect = new Rectangle(0,0,120,120,5,5, { fill: '#000000', stroke: 'orange', lineWidth:1 });
      rect.addChild(content);
      this.addChild(rect);
    } else {
      this.addChild(content);
    }


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
          if( typeof model.onDragEnd == "function" ) {
            model.onDragEnd();
          }
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
