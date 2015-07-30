/**
 * Model of an animal cell object.
 *
 * @author Srujan Kumar (BalaSwecha)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * Create a new cell model.  The object has fixed size, and mutable location.
   *
   * @param {Vector2} location, the position of the cell in model coordinates
   * @param {Dimension2} size, the size of the cell in model coordinates
   * @constructor
   */
  function Cell( location, size, image, text, parentModel ) {
    PropertySet.call( this, { location: location, image: image, text: text, parentModel: parentModel } );
    this.size = size;
  }

  return inherit( PropertySet, Cell );
} );
