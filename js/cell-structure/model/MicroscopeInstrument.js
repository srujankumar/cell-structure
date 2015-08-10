define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var instrumentImage = require( 'image!CELL_STRUCTURE/microscope.png' );

  function MicroscopeInstrument( location, size, microscope ) {
    PropertySet.call( this, { location: location, objectUnderLens: null, image: instrumentImage } );
    this.microscope = microscope;
    this.size = size;

    this.microscope.objectUnderLensProperty.link(function(object) {
      if( this.objectUnderLens ) {
        this.objectUnderLens.visibilityProperty.set(true);
      }
      if(!object) return;
      this.objectUnderLensProperty.set(object);

      object.reset();
      object.visibilityProperty.set(false);
    }.bind(this));
  }

  return inherit( PropertySet, MicroscopeInstrument );
} );
