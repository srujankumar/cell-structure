define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  function Overlay( radius, location, magnifiedImage, parentModel ) {
    PropertySet.call( this, { location: location, radius: radius, magnifiedImage: magnifiedImage, parentModel: parentModel } );
  }

  return inherit( PropertySet, Overlay );
} );
