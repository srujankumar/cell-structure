define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );


  function MessageBox(properties) {
    PropertySet.call(this, _.extend(
      {
        location: new Vector2( 400, 550), 
        size: new Dimension2( 200, 170), 
        visibility: false,
        message: ''
      }, properties) );
  }

  return inherit( PropertySet, MessageBox );
} );
