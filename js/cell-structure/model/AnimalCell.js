/**
 * Model of an animal cell object.
 * The magnet has fixed size, and mutable location.
 *
 * @author Srujan Kumar (BalaSwecha)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * Create a new animal cell model.  The object has fixed size, and mutable location.
   *
   * @param {Vector2} location, the position of the animal cell object in model coordinates
   * @param {Dimension2} size, the size of the animal cell object in model coordinates
   * @constructor
   */
  function AnimalCell( location, size ) {
    PropertySet.call( this, { location: location } );
    this.size = size;
  }

  return inherit( PropertySet, AnimalCell );
} );