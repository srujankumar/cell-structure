define( function( require ) {
  'use strict';

  // modules
  var Font = require( 'SCENERY/util/Font' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {number|Object} [options] if number this is the font size, otherwise same options as scenery.Font
   * @constructor
   */
  function LedFont( options ) {

    // convenience constructor: new PhetFont( {number|string} size )
    if ( typeof options === 'number' || typeof options === 'string' ) {
      options = { size: options };
    }

    // PhET defaults
    options = _.extend( {
      family: '"Digital 7"'
    }, options );

    // Guarantee a fallback family
    assert && assert( options.family );
    options.family = options.family + ', sans-serif';

    Font.call( this, options );
  }

  return inherit( Font, LedFont );
} );
