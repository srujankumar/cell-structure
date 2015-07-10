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
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // images
  var microscopeImage = require( 'image!CELL_STRUCTURE/microscope.png' );

  /**
   * Constructor for the BarMagnetNode which renders the bar magnet as a scenery node.
   * @param {BarMagnet} microscope the model of the bar magnet
   * @param {ModelViewTransform2} modelViewTransform the coordinate transform between model coordinates and view coordinates
   * @constructor
   */
  function MicroscopeNode( microscope, modelViewTransform ) {

    var microscopeNode = this;

    // Call the super constructor
    Node.call( microscopeNode, {

      // Show a cursor hand over the bar magnet
      cursor: 'pointer'
    } );

    // Add the centered bar magnet image
    microscopeNode.addChild( new Image( microscopeImage, { centerX: 0, centerY: 0 } ) );

    // Scale it so it matches the model width and height
    microscopeNode.scale( modelViewTransform.modelToViewDeltaX( microscope.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( microscope.size.height ) / this.height );

    // When dragging, move the bar magnet
    microscopeNode.addInputListener( new SimpleDragHandler(
      {
        // When dragging across it in a mobile device, pick it up
        allowTouchSnag: true,

        // Translate on drag events
        translate: function( args ) {
          microscope.location = modelViewTransform.viewToModelPosition( args.position );
        }
      } ) );

    // Register for synchronization with model.
    microscope.locationProperty.link( function( location ) {
      microscopeNode.translation = modelViewTransform.modelToViewPosition( location );
    } );

    // Register for synchronization with model
    microscope.orientationProperty.link( function( orientation ) {
      microscopeNode.rotation = orientation;
    } );
  }

  return inherit( Node, MicroscopeNode );
} );