/**
 * View for the microscope object, which can be dragged to translate.
 *
 * @author Srujan Kumar ( BalaSwecha )
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
   * Constructor for the MicroscopeNode which renders the microscope as a scenery node.
   * @param {Microscope} microscope, the model of the microscope
   * @param {ModelViewTransform2} modelViewTransform, the coordinate transform between model coordinates and view coordinates
   * @constructor
   */
  function MicroscopeNode( microscope, modelViewTransform ) {

    var microscopeNode = this;

    Node.call( microscopeNode, {

      cursor: 'pointer'
    } );

    microscopeNode.addChild( new Image( microscopeImage, { centerX: 0, centerY: 0 } ) );

    // Scale it so it matches the model width and height
    microscopeNode.scale( modelViewTransform.modelToViewDeltaX( microscope.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( microscope.size.height ) / this.height );

    microscopeNode.addInputListener( new SimpleDragHandler(
      {
        // When dragging across it in a mobile device, pick it up
        allowTouchSnag: true,

        // Translate on drag events
        translate: function( args ) {
          console.log(args.position);
          microscope.location = modelViewTransform.viewToModelPosition( args.position );
        }
      } ) );

    // Register for synchronization with model.
    microscope.locationProperty.link( function( location ) {
      microscopeNode.translation = modelViewTransform.modelToViewPosition( location );
    } );

  }

  return inherit( Node, MicroscopeNode );
} );
