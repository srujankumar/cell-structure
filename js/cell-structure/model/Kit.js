define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  function Kit( properties ) {
    var defaults = { location: '', text: '', size: '', visibility: true, children: []};
    var values = _.merge( defaults, properties );
    PropertySet.call( this, values );
    this.addChild = function(child){
      this.children.push(child);
    };
  }

  return inherit( PropertySet, Kit );
} );
