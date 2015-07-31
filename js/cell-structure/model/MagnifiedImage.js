/**
 * Model of a Magnified Image
 *
 * @author Srujan Kumar (BalaSwecha)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * Create a new magnified image.
   *
   * @param {Vector2} location, the position of the cell in model coordinates
   * @param {Dimension2} size, the size of the cell in model coordinates
   * @constructor
   */
  function MagnifiedImage( image, overlay, parentImage ) {
    if( overlay ) {
      if( overlay.magnifiedImage ) {
        overlay.magnifiedImage.parentImage = this;
      }
    }

    PropertySet.call( this, { image: image, overlay: overlay, parentImage: parentImage } );
  }

  return inherit( PropertySet, MagnifiedImage );
} );
