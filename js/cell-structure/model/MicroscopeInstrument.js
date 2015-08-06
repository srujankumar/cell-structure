define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var instrumentImage = require( 'image!CELL_STRUCTURE/microscope.png' );

  function MicroscopeInstrument( location, size, parentModel ) {
    PropertySet.call( this, { location: location, objectUnderLens: null, parentModel: parentModel, image: instrumentImage } );
    this.size = size;
    this.onReceiveDrop = function(model){
      this.parent.onReceiveDrop(model);
    };
  }

  return inherit( PropertySet, MicroscopeInstrument );
} );
