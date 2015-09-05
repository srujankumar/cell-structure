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
    model.size = new Dimension2(200, 200);

    Node.call( this, {
      cursor: 'pointer',
      x: model.location.x,
      y: model.location.y
    } );

    var image = new Image( model.image, { x: 0, y: 0 } );
    this.addChild(image);
    image.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / image.width,
      modelViewTransform.modelToViewDeltaY( model.size.height ) / image.height );

    var timeNode = new Text( "", { x: 80, y: 124, font: new LedFont(30), fill: 'red'});
    model.timeProperty.link(function(time) {
      var formatTime = function(t) {
        var hours = Math.floor(t / 60);
        var minutes = t % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ":" + minutes;
      };
      timeNode.setText(formatTime(time));
    });

    var upButton = new TextPushButton( "", {
      font: new PhetFont(0),
      baseColor: 'transparent',
      x: 133,
      y: 102,
      listener: function() {
        console.log("Increasing");
      },
      opacity: 0
    });
    this.addChild(upButton);

    var downButton = new TextPushButton( "", {
      font: new PhetFont(0),
      baseColor: 'transparent',
      x: 133,
      y: 114,
      listener: function() {
        console.log("Decreasing");
      },
      opacity: 0
    });
    this.addChild(downButton);

    var startButton = new TextPushButton( "   ", {
      font: new PhetFont(2),
      baseColor: 'transparent',
      x: 30,
      y: 30,
      listener: function() {
        console.log("Starting timer");
      },
      opacity: 0
    });
    this.addChild(startButton);

    model.timeVisibleProperty.link(function(visible) {
      timeNode.setVisible(visible);
    });
    this.addChild(timeNode);
  }

  return inherit( Node, StopwatchNode );
} );
