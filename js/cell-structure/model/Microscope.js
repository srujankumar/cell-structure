define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var MagnifierView = require( 'CELL_STRUCTURE/cell-structure/model/MagnifierView' );
  var MicroscopeInstrument = require( 'CELL_STRUCTURE/cell-structure/model/MicroscopeInstrument' );
  var Apparatus = require( 'CELL_STRUCTURE/cell-structure/model/Apparatus' );
  var Vector2 = require( 'DOT/Vector2' );
  var Dimension2 = require( 'DOT/Dimension2' );

  function Microscope() {
    var instrument = new MicroscopeInstrument( new Vector2( 0, 0 ), new Dimension2( 200, 200 ) );
    var magnifierView = new MagnifierView();
    instrument.parent = magnifierView.parent = this;
    Apparatus.call( this, {instrument: instrument, magnifierView: magnifierView, image: instrument.image, size: new Dimension2( 50, 50 ), location: new Vector2(675,365) } );

    CS.addDroppable(this);
    this.onReceiveDrop = function(model) {
      if( instrument.objectUnderLens ) {
        instrument.objectUnderLens.visibilityProperty.set(true);
      }
      instrument.objectUnderLensProperty.set(model);

      magnifierView.magnifiedImageProperty.set(model.magnifiedImage);

      model.reset();
      model.visibilityProperty.set(false);
    };
    this.onDragEnd = function() {
      CS.model.apparatusKit.removeChild(this);
      CS.onDrop(this);
    };
  }

  return inherit( Apparatus, Microscope );
} );
