// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the bar magnet object, which can be dragged to translate.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
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
   * Constructor for the BarMagnetNode which renders the bar magnet as a scenery node.
   * @param {BarMagnet} microscope the model of the bar magnet
   * @param {ModelViewTransform2} modelViewTransform the coordinate transform between model coordinates and view coordinates
   * @constructor
   */
  function PlantCellNode( plantCell, modelViewTransform ) {

    var PlantCellNode = this;

    // Call the super constructor
    Node.call( PlantCellNode, {

      // Show a cursor hand over the bar magnet
      cursor: 'pointer'
    } );

    // Add the centered bar magnet image
    var plantCellIcon = new Image( plantCellImage, { centerX: 80, centerY: 80 } );
    var plantCellIconText = new Text("Plant Cell",{ font: new PhetFont(14), fill: 'orange'});

    var line = new Line(0,0,120,0, {});

    var content = new VBox( { align: 'center', spacing: 10, children: [ line, plantCellIcon, plantCellIconText ] } );

    var rect = new Rectangle(0,0,120,120,5,5, { fill: '#000000', stroke: 'orange', lineWidth:1 });
    rect.addChild(content);

    PlantCellNode.addChild(rect);

    // Scale it so it matches the model width and height
    PlantCellNode.scale( modelViewTransform.modelToViewDeltaX( plantCell.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( plantCell.size.height ) / this.height );

    // When dragging, move the bar magnet
    PlantCellNode.addInputListener( new SimpleDragHandler(
      {
        // When dragging across it in a mobile device, pick it up
        allowTouchSnag: true,

        // Translate on drag events
        translate: function( args ) {
          plantCell.location = modelViewTransform.viewToModelPosition( args.position );
        }
      } ) );

    // Register for synchronization with model.
    plantCell.locationProperty.link( function( location ) {
      PlantCellNode.translation = modelViewTransform.modelToViewPosition( location );
    } );

    // Register for synchronization with model
    //plantCell.orientationProperty.link( function( orientation ) {
    //  PlantCellNode.rotation = orientation;
    //} );
  }

  return inherit( Node, PlantCellNode );
} );