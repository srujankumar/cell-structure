define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var instrumentImage = require( 'image!CELL_STRUCTURE/microscope.svg' );
  var Vector2 = require('DOT/Vector2');
  var Dimension2 = require('DOT/Dimension2');

  function MicroscopeInstrument( location, size, microscope ) {
    PropertySet.call( this, { location: location, objectUnderLens: null, image: instrumentImage } );
    this.microscope = microscope;
    this.size = size;

    this.microscope.objectUnderLensProperty.link(function(object) {
      this.objectUnderLensProperty.set(object);

      if(!object) return;
      object.locationProperty.set(new Vector2(this.microscope.attachedTo.slotno * 250 + 100, 580));
      object.sizeProperty.set(new Dimension2( 30, 30 ));
    }.bind(this));
  }

  return inherit( PropertySet, MicroscopeInstrument );
} );
