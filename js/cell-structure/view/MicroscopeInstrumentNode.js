/**
 * View for the model object, which can be dragged to translate.
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

  /**
   * Constructor for the modelNode which renders the model as a scenery node.
   * @param {model} model, the model of the model
   * @param {ModelViewTransform2} modelViewTransform, the coordinate transform between model coordinates and view coordinates
   * @constructor
   */
  function MicroscopeInstrumentNode( model, options, modelViewTransform ) {

    this.objectUnderLensNode = null;

    Node.call( this, {
      cursor: 'pointer'
    } );

    this.addChild( new Image( model.image, { centerX: 0, centerY: 0 } ) );

    // Scale it so it matches the model width and height
    this.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( model.size.height ) / this.height );
    // Register for synchronization with model.
    model.locationProperty.link( function( location ) {
      this.translation = modelViewTransform.modelToViewPosition( location );
    }.bind(this) );

    model.objectUnderLensProperty.link( function( cell ) {
      if(this.objectUnderLensNode) {
        this.removeChild(this.objectUnderLensNode);
      }

      if (!cell) { return; }
      this.objectUnderLensNode = new Image( cell.image, { x: -80, y: 20 } );
      this.addChild(this.objectUnderLensNode);

      //model.parentModel.magnifierView.magnifiedImageProperty.set(cell.magnifiedImage);
    }.bind(this) );

  }

  return inherit( Node, MicroscopeInstrumentNode );
} );
