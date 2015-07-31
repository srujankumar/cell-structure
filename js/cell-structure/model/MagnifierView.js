/**
 * Model of the Magnifier View Panel.
 * The magnet has fixed size and location.
 *
 * @author Srujan Kumar (BalaSwecha)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * Create a new magnifier view model.  The panel has fixed size and location.
   *
   * @param {Vector2} location, the position of the magnifier view panel in model coordinates
   * @param {Dimension2} size, the size of the magnifier view panel in model coordinates
   * @constructor
   */
  function MagnifierView() {
    PropertySet.call( this, { location: undefined, magnifiedImage: undefined } );
  }

  return inherit( PropertySet, MagnifierView );
} );
