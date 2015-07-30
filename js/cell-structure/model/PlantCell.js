/**
 * Model of a plant cell object.
 * The object has fixed size, and mutable location.
 *
 * @author Srujan Kumar ( BalaSwecha )
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * Create a new plant cell object model.  The object has fixed size, and mutable location.
   *
   * @param {Vector2} location, the position of the plant cell in model coordinates
   * @param {Dimension2} size, the size of the plant cell in model coordinates
   * @constructor
   */
  function PlantCell( location, size ) {
    PropertySet.call( this, { location: location } );
    this.size = size;
  }

  return inherit( PropertySet, PlantCell );
} );