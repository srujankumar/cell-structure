/**
 * Model of a microscope.
 * The microscope has fixed size, and mutable location.
 *
 * @author Srujan Kumar ( BalaSwecha )
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * Create a new microscope model.  The microscope has fixed size, and mutable location.
   *
   * @param {Vector2} location the position of the microscope in model coordinates
   * @param {Dimension2} size the size of the microscope in model coordinates
   * @constructor
   */
  function Microscope( location, size ) {
    PropertySet.call( this, { location: location } );
    this.size = size;
    this.objectUnderLens = null;
  }

  return inherit( PropertySet, Microscope );
} );
