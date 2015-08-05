define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  function MicroscopeInstrument( location, size, parentModel ) {
    PropertySet.call( this, { location: location, objectUnderLens: null, parentModel: parentModel } );
    this.size = size;
    CS.addDroppable(this);
    this.onReceiveDrop = function(model){
      this.parent.onReceiveDrop(model);
    };
  }

  return inherit( PropertySet, MicroscopeInstrument );
} );
