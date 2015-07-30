/**
 * View for the plant cell object, which can be dragged to translate.
 *
 * @author Srujan Kumar ( BalaSwecha )
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

  // images
  var plantCellImage = require( 'image!CELL_STRUCTURE/plant-cell-small.png' );

  /**
   * Constructor for the PlantCellNode which renders the plant cell object as a scenery node.
   * @param {PlantCellNode} plantCell, the model of the plant cell object
   * @param {ModelViewTransform2} modelViewTransform, the coordinate transform between model coordinates and view coordinates
   * @constructor
   */
  function PlantCellNode( model, modelViewTransform ) {

    var plantCellNode = this;

    Node.call( plantCellNode, {

      cursor: 'pointer'
    } );

    var plantCellIcon = new Image( plantCellImage, { centerX: 80, centerY: 80 } );
    var plantCellIconText = new Text("Plant Cell",{ font: new PhetFont(14), fill: 'orange'});
    var line = new Line(0,0,120,0, {});
    var content = new VBox( { align: 'center', spacing: 10, children: [ line, plantCellIcon, plantCellIconText ] } );
    var rect = new Rectangle(0,0,120,120,5,5, { fill: '#000000', stroke: 'orange', lineWidth:1 });
    rect.addChild(content);

    plantCellNode.addChild(rect);

    var positionDelta = function( position1, position2, deltaX, deltaY){
      return ( Math.abs(position1.x - position2.x) <=  deltaX) && ( Math.abs(position1.y - position2.y) <= deltaY);
    };

    // Scale it so it matches the model width and height
    plantCellNode.scale( modelViewTransform.modelToViewDeltaX( model.plantCell.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( model.plantCell.size.height ) / this.height );

    plantCellNode.addInputListener( new SimpleDragHandler(
      {
        // When dragging across it in a mobile device, pick it up
        allowTouchSnag: true,

        // Translate on drag events
        translate: function( args ) {
          if(positionDelta( args.position, model.microscope.location, model.microscope.size.width, model.microscope.size.height)) {
            if(model.microscope.objectUnderLens !== null) {
              model.microscope.objectUnderLens.reset();
              model.microscope.objectUnderLens.setVisible(true);
            }
            model.microscope.objectUnderLens = model.plantCell;
            plantCellNode.setVisible(false);
          }
          model.plantCell.location = modelViewTransform.viewToModelPosition( args.position );
        }
      } ) );

    // Register for synchronization with model.
    model.plantCell.locationProperty.link( function( location ) {
      plantCellNode.translation = modelViewTransform.modelToViewPosition( location );
    } );

  }

  return inherit( Node, PlantCellNode );
} );
