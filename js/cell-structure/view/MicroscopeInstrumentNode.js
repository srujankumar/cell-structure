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
  function MicroscopeInstrumentNode( microscope, modelViewTransform ) {

    this.objectUnderLensNode = null;

    Node.call( this, {
      cursor: 'pointer'
    } );

    this.addChild( new Image( microscopeImage, { centerX: 0, centerY: 0 } ) );

    // Scale it so it matches the model width and height
    this.scale( modelViewTransform.modelToViewDeltaX( microscope.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( microscope.size.height ) / this.height );
    // Register for synchronization with model.
    microscope.locationProperty.link( function( location ) {
      this.translation = modelViewTransform.modelToViewPosition( location );
    }.bind(this) );

    microscope.objectUnderLensProperty.link( function( cell ) {
      if(this.objectUnderLensNode) {
        this.removeChild(this.objectUnderLensNode);
      }

      if (!cell) { return; }
      this.objectUnderLensNode = new Image( cell.image, { x: -80, y: 20 } );
      this.addChild(this.objectUnderLensNode);

      microscope.parentModel.magnifierView.magnifiedImageProperty.set(cell.magnifiedImage);
    }.bind(this) );

  }

  return inherit( Node, MicroscopeInstrumentNode );
} );
