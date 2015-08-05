define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var MagnifierView = require( 'CELL_STRUCTURE/cell-structure/model/MagnifierView' );
  var MicroscopeInstrument = require( 'CELL_STRUCTURE/cell-structure/model/MicroscopeInstrument' );
  var Vector2 = require( 'DOT/Vector2' );
  var Dimension2 = require( 'DOT/Dimension2' );

  function Microscope() {
    var instrument = new MicroscopeInstrument( new Vector2( 600, 300 ), new Dimension2( 200, 200 ) );
    var magnifierView = new MagnifierView();
    instrument.parent = magnifierView.parent = this;
    PropertySet.call( this, {instrument: instrument, magnifierView: magnifierView} );

    this.onReceiveDrop = function(model) {
      if( instrument.objectUnderLens ) {
        instrument.objectUnderLens.visibilityProperty.set(true);
      }
      instrument.objectUnderLensProperty.set(model);

      magnifierView.magnifiedImageProperty.set(model.magnifiedImage);

      model.reset();
      model.visibilityProperty.set(false);
    };
  }

  return inherit( PropertySet, Microscope );
} );
