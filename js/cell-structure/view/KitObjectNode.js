/**
 * View for the Cell object, which can be dragged to translate.
 *
 * @author Srujan Kumar ( BalaSwecha)
 */
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
  var Line = require( 'SCENERY/nodes/Line');
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Constructor for the CellNode which renders the cell object as a scenery node.
   * @param {CellNode} cell, the model of the cell
   * @param {ModelViewTransform2} modelViewTransform the coordinate transform between model coordinates and view coordinates
   * @constructor
   */
  function KitObjectNode( model, modelViewTransform ) {

    Node.call( this, {
      x: model.location.x,
      y: model.location.y,
      cursor: 'pointer'
    } );

    var cellIcon = new Image( model.kitImage, { x: 0, y: 0 } );
    var cellIconText = new Text( model.text, { font: new PhetFont(14), fill: 'orange'});

    var line = new Line(0,0,120,0);

    var content = new VBox( { align: 'center', spacing: 10, children: [ line, cellIcon, cellIconText ] } );

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
    model.sizeProperty.link(function() {
      this.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / this.width,
        modelViewTransform.modelToViewDeltaY( model.size.height ) / this.height );
    }.bind(this));

    this.addInputListener( new SimpleDragHandler(
      {
        // When dragging across it in a mobile device, pick it up
        allowTouchSnag: true,

        // Translate on drag events
        translate: function (args) {
          //this.translation = args.position;
          model.location = modelViewTransform.viewToModelPosition( args.position );
        },
        start: function( event ) {
          if(!model.attachedTo) return;
          model.attachedTo.onChildRemoved(model);
          model.attachedToProperty.set(null);
        },
        end: function( event ) {
          //if( typeof model.onDragEnd == "function" ) {
          //  model.onDragEnd();
          CS.onDrop(this, model);
        }.bind(this)
      } ) );

    // Register for synchronization with model.
    model.locationProperty.link( function( location ) {
      this.translation = modelViewTransform.modelToViewPosition( location );
    }.bind(this) );

    model.visibilityProperty.link( function( visibility ) {
      this.setVisible(visibility);
    }.bind(this) );

    model.imageProperty.link(function(image) {
      cellIcon.setImage(image);
    });
  }

  return inherit( Node, KitObjectNode );
} );
