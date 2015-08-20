define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  function Drop(properties) {
    PropertySet.call(this, _.extend({location: null, color: 'transparent'}, properties) )
  }

  return inherit( PropertySet, Drop );
} );
