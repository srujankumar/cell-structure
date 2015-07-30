/**
 * View for the Animal Cell object, which can be dragged to translate.
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

  // images
  var animalCellImage = require( 'image!CELL_STRUCTURE/animal-cell-small.png' );

  /**
   * Constructor for the AnimalCellNode which renders the animal cell object as a scenery node.
   * @param {AnimalCellNode} animalCell, the model of the animal cell
   * @param {ModelViewTransform2} modelViewTransform the coordinate transform between model coordinates and view coordinates
   * @constructor
   */
  function AnimalCellNode( model, modelViewTransform ) {

    var animalCellNode = this;

    Node.call( animalCellNode, {

      cursor: 'pointer'
    } );

    var animalCellIcon = new Image( animalCellImage, { centerX: 80, centerY: 80 } );
    var animalCellIconText = new Text("Animal Cell",{ font: new PhetFont(14), fill: 'orange'});

    var line = new Line(0,0,120,0);

    var content = new VBox( { align: 'center', spacing: 10, children: [ line, animalCellIcon, animalCellIconText ] } );


    var rect = new Rectangle(0,0,120,120,5,5, { fill: '#000000', stroke: 'orange', lineWidth:1 });
    rect.addChild(content);

    animalCellNode.addChild(rect);

    var positionDelta = function( position1, position2, deltaX, deltaY){
      return ( Math.abs(position1.x - position2.x) <=  deltaX) && ( Math.abs(position1.y - position2.y) <= deltaY);
    };

    // Scale it so it matches the model width and height
    animalCellNode.scale( modelViewTransform.modelToViewDeltaX( model.animalCell.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( model.animalCell.size.height ) / this.height );

    animalCellNode.addInputListener( new SimpleDragHandler(
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
            model.microscope.objectUnderLens = model.animalCell;
            animalCellNode.setVisible(false);
          }
          model.animalCell.location = modelViewTransform.viewToModelPosition( args.position );
        }
      } ) );

    // Register for synchronization with model.
    model.animalCell.locationProperty.link( function( location ) {
      animalCellNode.translation = modelViewTransform.modelToViewPosition( location );

    } );
  }

  return inherit( Node, AnimalCellNode );
} );
